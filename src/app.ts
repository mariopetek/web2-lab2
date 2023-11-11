import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'

import xssRouter from './routes/xss'
import sdeRouter from './routes/sde'

dotenv.config()

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public/html' })
})

app.use('/xss', xssRouter)
app.use('/sde', sdeRouter)

const externalUrl = process.env.RENDER_EXTERNAL_URL

const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3000

if (externalUrl) {
    const hostname = '0.0.0.0'
    app.listen(port, hostname, () => {
        console.log(
            `Application locally running at http://${hostname}:${port} and from outside on ${externalUrl}`
        )
    })
} else {
    app.listen(port, () => {
        console.log(`Application running at http://localhost:${port}`)
    })
}
