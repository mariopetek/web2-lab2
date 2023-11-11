import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    if (req.query.vulnerability === 'on') {
        return res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="/css/xss.css" />
                <link rel="stylesheet" href="/css/global.css" />
                <title>XSS</title>
            </head>
            <body>
                <div class="container">
                    <a href="/">Početna stranica</a>
                    <h1>Cross-site scripting (XSS)</h1>
                    <p class="instructions">
                        <span>Upute:<br /></span>U nastavku je moguće isprobati
                        reflektirani Cross-site scripting (XSS) napad. Kako bi napad bio
                        moguć prvo je potrebno uključiti ranjivost. U polje za unos se
                        unosi URL slike koja će se potom, klikom na gumb za prikaz,
                        prikazati ispod obrasca, međutim ukoliko probamo unijeti tekst
                        poput
                        <span>" onerror="alert(document.cookie)"/></span>
                        vidimo da se izvršava JavaScript kod koji prikazuje podatke o
                        korisničkoj sjednici.
                    </p>
                    <div class="separator"></div>
                    <form action="/xss" method="get">
                        <div class="vulnerability-input">
                            <input
                                type="checkbox"
                                id="vulnerability"
                                name="vulnerability"
                                id="vulnerability"
                                checked
                            />
                            <label for="vulnerability">Ranjivost uključena</label>
                        </div>
                        <div class="image-input">
                            <label for="imageSrc"
                                >Unesite URL slike koju želite prikazati</label
                            >
                            <input
                                type="text"
                                placeholder="URL..."
                                name="imageSrc"
                                id="imageSrc"
                            />
                        </div>
                        <button type="submit">Prikaz</button>
                    </form>
                </div>
                <img src="${req.query.imageSrc}" alt="Neuspjelo učitavanje slike" />
            </body>
        </html>
        `)
    } else if (req.query.vulnerability === undefined) {
        return res.render('xss', { imageSrc: req.query.imageSrc })
    }
    return res.sendStatus(400)
})

export default router
