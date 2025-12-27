const express = require('express')
const app = express();
const connectToDatabase = require('./src/db/db');
const messageRouter = require('./src/routes/message.routes')
const dotenv = require('dotenv');
const cors = require("cors")
const path = require("path");

dotenv.config()
connectToDatabase();

app.use(cors());


app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/about', (req, res) => {
    res.send(' about')
})

app.use(
    "/widget",
    express.static(path.join(__dirname, "../frontend/dist"))
);
app.use(
    "/widget-loader.js",
    express.static(path.join(__dirname, "public/widget-loader.js"))
);
app.use('/api', messageRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is running up ${port}`)
})

