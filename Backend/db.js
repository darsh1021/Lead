// db.js
const mongoose = require('mongoose');
const UserData = require('./model/user_data');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');

        const existing = await UserData.findOne({ email: 'darsh@gmail.com' });
        if (!existing) {
            await UserData.create({
                name: 'Darsh',
                email: 'darsh@gmail.com',
                points: 10
            });
            console.log('👤 Predefined user "Darsh" added');
        } else {
            console.log('ℹ️ Predefined user already exists');
        }

    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
