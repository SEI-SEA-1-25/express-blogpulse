const router = require('express').Router()
const db = require('../models')

/**
 * /articles routes
 */

// GET /articles/:id - READ a specific article and include its author
//Showing a single article along with all of the tags it has 3

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
  
    //PUT /:id/article_tags - 4
    //creating an association between and existing tag and an existing article 4
// router.put('/:id/articles_tags', async (req, res) => {
//   try {
//     const article = await db.article.findByPk(req.params.id)
//     if(!article) throw new Error('article not found')
//     const articlesTags = await db.articles_tags.update({
//       where: {articleId: req.body.articleId},
//       tagId: req.body.tagId 
//     })
//     await article.addArticlesTags(articlesTags)
//     res.redirect(`/articles/${req.params.id}`)
//   } catch(error) {
//     console.log(error)
//     res.status(400).json({ message: 'bad request' })
//   }
// })

router.put('/:articleId/tags/:tagId', async (req, res) => {
  try {
    const tag = await db.tag.findByPk(req.params.tagId)
    const article = await db.article.findByPk(req.params.articleId)
    await article.addTag(tag)
    // if(!article) throw new Error('article not found')
    // const articlesTags = await db.articles_tags.update({
    //   where: {articleId: req.body.articleId},
    //   tagId: req.body.tagId
    // })
    // await article.addArticlesTags(articlesTags)
    res.redirect(`/articles/${req.params.articleId}`)
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'bad request' })
  }
})

module.exports = router;