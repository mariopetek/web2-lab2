import express from 'express'

import usersMd5 from '../data/users_md5.json'
import usersBcrypt from '../data/users_bcrypt.json'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('sde')
})

router.get('/users', (req, res) => {
    if (req.query.vulnerability === 'on') {
        return res.render('sdeUsers', {
            vulnerability: req.query.vulnerability,
            users: usersMd5
        })
    } else if (req.query.vulnerability === undefined) {
        const users = usersBcrypt.map(user => {
            return { user_id: user.user_id, username: user.username }
        })
        return res.render('sdeUsers', {
            vulnerability: req.query.vulnerability,
            users
        })
    }
    return res.sendStatus(400)
})

export default router
