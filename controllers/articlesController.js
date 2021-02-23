const router = require('express').Router()
const db = require('../models')

/**
 * /articles routes
 */

// GET /articles/:id - READ a specific article and include its author
//Showing a single article along with all of the tags it has

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
/**
 * /comments routes
 */
//POST
// make a new comment
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
  //tag routes is this creating a tag or just updating the tag of an article? 
  //my postman only worked with an exiting tag...
    //POST /:id/tags - create an existing tag to existing article
    //creating an association between and existing tag and an existing article
    router.post('/:id/tags', async (req, res) => {
        try {
          const article = await db.article.findByPk(req.params.id)
          if(!article) throw new Error('article not found')
          // const tag = await db.tag.create({
          //   name: req.body.name,
          // })
          // const tag = await db.tag.findByPk(req.params.id)
          const tag = await db.tag.findOne({
            where: {id: req.params.id}
          })
        
          await article.addTag(tag)
          res.redirect(`/articles/${req.params.id}`)
        } catch(error) {
          console.log(error)
          res.status(400).json({ message: 'bad request' })
        }
      })
module.exports = router;