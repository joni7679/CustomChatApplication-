const express = require('express')
const app = express();
const connectToDatabase = require('./src/db/db');
const messageRouter = require('./src/routes/message.routes')
connectToDatabase()
const port = 3000
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send(' about')
})

app.use('/api', messageRouter)

app.listen(port, () => {
    console.log(`server is running up ${port}`)
})
