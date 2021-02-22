const router = require('express').Router()
const db = require('../models')

/**
 * /articles routes
 */

// GET /articles/:id - READ a specific post and include its author
router.get('/:id', async (req, res) => {
    try {
      const article = await db.article.findOne({
        where: { id: req.params.id },
        include: [db.author, db.comment]
      })
      res.json({ article: article })
    } catch(error) {
      console.log(error)
      res.status(400).json({ message: 'bad request' })
    }
  })
/**
 * /comments routes
 */
//POST
  router.post('/:id/comments', async (req, res) => {
    try {
      const article = await db.article.findByPk(req.params.id, {include: db.comment})
      if(!article) throw new Error('article not found')
      const comment = await db.comment.create({
        name: req.body.name,
        content: req.body.content
      })
      await article.addComment(comment)
      res.redirect(`/articles/${req.params.id}`)
    } catch(error) {
      console.log(error)
      res.status(400).json({ message: 'bad request' })
    }
  })
  
module.exports = router;