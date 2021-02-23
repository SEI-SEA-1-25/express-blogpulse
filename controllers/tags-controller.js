const db = require('../models') 
const router = require('express').Router()

// GET all tags
router.get('/', async (req, res) => {
      try {
        const tags = await db.tag.findAll()
        res.json({ tags })
      } catch(error) {
        console.log(error)
        res.status(400).json({ message: 'bad request' })
      }
    })

// GET one tag
router.get('/:id', async (req, res) => {
      try {
        const tag = await db.tag.findOne({
          where: { id: req.params.id },
          include: [db.article]
        })
        res.json({ tag })
      } catch(error) {
        console.log(error)
        res.status(400).json({ message: 'bad request' })
      }
    })

// POST new tag
router.post('/', async (req, res) => {
      try {
        const tag = await db.tag.create({
          name: req.body.name,
        })
        res.json({ tag })
      } catch(error) {
        console.log(error)
        res.status(400).json({ message: 'bad request' })
      }
    })

module.exports = router