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
        include: [db.author]
      })
      res.json({ article: article })
    } catch(error) {
      console.log(error)
      res.status(400).json({ message: 'bad request' })
    }
  })

  router.get('/', async (req, res) =>{
    try{
      const comments = await db.comment.findAll({ include: [db.article]})
      res.json({ comments: comment})
    }catch(err){
      console.log(err)
      res.status(400).json({ message: 'bad request'})
    }
  })

  router.post('/:id/comments', async(req, res) => {
    try{
      const article = await db.article.findByPk(req.params.id)
      const newComment = await article.createComment({
        name: req.body.name,
        content: req.body.content
      })
      res.redirect(`/articles/${req.params.id}`)
    }catch(err){
      console.log(err)
    }
  })

  router.put('/:id/comments', async(req, res) => {
    try{
      const article = await db.article.findByPk(req.params.id)
      const updateComment = await article.updateComment({
        name: req.body.name,
        content: req.body.content
      })
      res.redirect(`./articles/:id/${req.params.id}`)
    }catch(err){
      console.log(err)
    }
  })
  
  router.put('/:articleId/tags/:tagId', async (req, res) => {
    try {
      const tag = await db.findByPk(req.params.tagId)
      const article = await db.article.findByPk(req.params.articleId)
      await article.addTag(tag)
      res.redirect(`/articles/${req.params.articleId}`)
    }catch(err){
      console.log(err)
    }
    
  })
  module.exports = router