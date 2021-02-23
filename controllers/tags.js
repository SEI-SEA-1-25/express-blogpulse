const router = require('express').Router()
const db = require('../models')

// GET /tags - READ all tags
router.get('/', async(req, res) => {
  try {
    const tags = await db.tag.findAll()
    res.json({ tags })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'OH NO 💩' })
  }
})

// POST /tags - CREATE a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await db.tag.create({
      name: req.body.tag
    })
    res.redirect(`/tags`)
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'OH NO 💩' })
  }
})

// GET /tags/:id - READ a tag and all associated articles
router.get('/:id', async (req, res) => {
  try {
    const tag = await db.tag.findByPk(req.params.id, {
      include: [db.article]
    })
    res.json({ tag })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'OH NO 💩' })
  }
})


module.exports = router