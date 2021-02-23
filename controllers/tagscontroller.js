const router = require('express').Router()
const db = require('../models')

// GET /tags - READ all tags
// 5
router.get('/', async (req, res) => {
    try {
      const tags = await db.tag.findAll()
      res.json({ tags })
    } catch(error) {
      console.log(error)
      res.status(400).json({ message: 'bad request' })
    }
  })
  
  // POST /tags - CREATE a new tag 
  //6
  router.post('/', async (req, res) => {
    try {
      const newTag = await db.tag.create({
        name: req.body.name
      })
      res.redirect(`/tags/${newTag.id}`)
    } catch(error) {
      console.log(error)
      res.status(400).json({ message: 'bad request' })
    }
  })

  
  // GET /tag/:id - READ a specific tag and inlcude their articles
  //7
  router.get('/:id', async (req, res) => {
    try {
      const tag = await db.tag.findOne({
        where: {id: req.params.id},
        include: [db.article]
      })
      res.json({ tag })
    } catch(error) {
      console.log(error)
      res.status(400).json({ message: 'bad request' })
    }
  })
  
  // POST /tags/:id/articles - CREATE a new article associated with an tag
  //Adding tags when new articles are created
  // router.post('/:id/articles', async (req, res) => {
  //   try {
  //     const tag = await db.tag.findByPk(req.params.id, {include: db.article})
  //     if(!tag) throw new Error('tag not found')
  //     const article = await db.article.create({
  //       title: req.body.title,
  //       content: req.body.content,
  //     })
  //     await tag.addTag(article)
  //     res.redirect(`/tags/${req.params.id}`)
  //   } catch(error) {
  //     console.log(error)
  //     res.status(400).json({ message: 'bad request' })
  //   }
  // })

module.exports = router;