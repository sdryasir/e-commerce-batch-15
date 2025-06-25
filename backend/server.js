import express from 'express';
const app = express()
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3200

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
