const router = require('express').Router()
const db = require('../models')

router.post("/articles/:id/comments", async (req, res) => {
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

module.exports = router