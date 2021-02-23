const router = require('express').Router()
const db = require('../models')


module.exports = router

//GET /tags all tags
router.get('/', async (req, res) => {
    try {
        const tags = await db.tag.findAll()
        res.json({ tags })
    } catch(err) {
        console.log(err)
    }
})


//POST /tags
router.post('/', async (req, res) => {
    try {
        const newTag = db.tag.create({
            name: req.body.name
        })
        res.json({ newTag })
    }catch(err) {
        console.log(err)
    }
})

//GET /tags/:id show one tag and all articles
router.get('/:id', async (req, res) => {
    try {
        const tag = db.tag.findOne({
            where: { id: req.params.id },
            include: [db.article]
        })
        res.json({ tag })
    }catch(err) {
        console.log(err)
    }
})