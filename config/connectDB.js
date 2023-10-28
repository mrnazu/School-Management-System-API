const mongoose = require('mongoose');

const connectDB = async function(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected successfully');
    } catch (err) {
        console.log(`Can't connect to DB ${err}`);
    }
}

connectDB()