import React, { useEffect, useState } from 'react';
import './mainPage.css';

function MainPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://lead-5kzn.onrender.com/users');
      const data = await res.json();
      // sort by points descending
      const sorted = data.sort((a, b) => b.points - a.points);
      setUsers(sorted);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAddUser = async () => {
    const { name, email } = newUser;

    if (!name || !email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('https://lead-5kzn.onrender.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        alert("Failed to add user");
        return;
      }

      setNewUser({ name: '', email: '' });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  const handleClaim = async (email) => {
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    try {
      const res = await fetch('https://lead-5kzn.onrender.com/claim', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, points: randomPoints })
      });

      if (res.ok) {
        await fetchUsers();
        setSelectedUserIndex(null);
      }
    } catch (err) {
      console.error('Claim failed:', err);
    }
  };

  return (
    <div className="main-container">
      <div className="header">🏆 Leaderboard</div>

      <ul className="user-list">
        {users.map((user, index) => (
          <li
            key={index}
            className={`user-card ${selectedUserIndex === index ? 'selected' : ''}`}
            onClick={() => setSelectedUserIndex(index)}
          >
            <div>
              <strong>{user.name}</strong><br />
              <small>{user.email}</small>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{user.points} pts</span>
              {selectedUserIndex === index && (
                <button className="claim-btn" onClick={() => handleClaim(user.email)}>
                  🎁 Claim
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="footer">
        <button className="btn-add" onClick={() => setShowForm(true)}>
          ➕ Add User
        </button>
      </div>

      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add New User</h3>

            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />

            <div className="popup-actions">
              <button onClick={handleAddUser}>Submit</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
