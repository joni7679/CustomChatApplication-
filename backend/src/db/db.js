const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

async function connectToDatabase() {
    try {
        const db = await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("data base connect successfully !");
    } catch (error) {
        console.log("data base connect not successfully plz try again later...");
    }

}

module.exports = connectToDatabase