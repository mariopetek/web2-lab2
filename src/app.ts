import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import xssRouter from './routes/xss'

dotenv.config()

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public/html' })
})

app.use('/xss', xssRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Application running at http://localhost:${port}`)
})
