const router = require('express').Router()
const db = require('../models')

router.get('/:id', async (req, res) => {
    try {
      const article = await db.article.findOne({
        where: { id: req.params.id },
        include: [db.author, db.comment, db.tag]
      })
      res.json({ article: article })
    } catch(error) {
      console.log(error)
      res.status(400).json({ message: 'bad request' })
    }
  })
  
  router.get("/", async (req, res) => {
    try {
      const articles = await db.article.findAll();
      res.json({ articles: articles });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "bad request" });
    }
  });

  // for comments
  router.get("/:id/comments", async (req, res) => {
    try {
      const article = await db.article.findByPk(req.params.id, {includes:db.comment})
      if(!article) throw new Error("article not found")
      const comment = await db.comment.create({
        name: req.body.name,
        content: req.body.content
      })
      await article.addComment(comment)
      res.redirect(`/articles/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  })

  router.post("/:id/comments", async (req, res) => {
    try {
      const article = await db.article.findByPk(req.params.id, {includes:db.comment})
      if(!article) throw new Error("article not found")
      const comment = await db.comment.create({
        name: req.body.name,
        content: req.body.content
      })
      await article.addComment(comment)
      res.redirect(`/articles/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  })

  // for tags
  router.post("/:id/tags", async (req, res) => {
    try {
      const article = await db.article.findByPk(req.params.id, {includes:db.tag})
      if(!article) throw new Error("article not found")
      const tag = db.tag.create({
        name: req.body.name,
      })
      await article.addTag(tag)
      res.redirect(`/articles/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  })

  router.put("/:articleId/tags/:tagId", async (req, res) => {
    try {
      const tag = await db.tag.findByPk(req.params.tagId)
      const article = await db.article.findByPk(req.params.articleId)
      await article.addTag(tag)
      res.redirect(`/articles/${req.params.articleId}`)
    } catch (err) {
      console.log(err)
    }
  })

module.exports = router