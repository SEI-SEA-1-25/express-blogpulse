const db = require('../models') 
const router = require('express').Router()

/**
 * /articles routes
 */
// GET /articles - READ all articles
router.get('/', async (req, res) => {
  try {
    const articles = await db.article.findAll({
      include: [db.tag]
    })
    res.json({ articles })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})


// GET /articles/:id - READ a specific post and include its author
router.get('/:id', async (req, res) => {
      try {
        const article = await db.article.findOne({
          where: { id: req.params.id },
          include: [db.author, db.comment, db.tag]
        })
        res.json({ article })
      } catch(error) {
        console.log(error)
        res.status(400).json({ message: 'bad request' })
      }
    })
    
// comments routes
// POST /articles/:articleId/comments
router.post('/:id/comments', async (req, res) => {
  try {
    const article = await db.article.findByPk(req.params.id, {include: db.comment})
    if(!article) throw new Error('article not found')
    const comment = await db.comment.create({
      name: req.body.name,
      content: req.body.content,
    })
    await article.addComment(comment)
    res.redirect(`/articles/${req.params.id}`)
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'bad request' })
  }
})

// new tag with article
router.post('/:id/tags', async (req, res) => {
  try {
    const article = await db.article.findByPk(req.params.id, {include: db.tag})
    if(!article) throw new Error('article not found')
    const tag = await db.tag.create({
      name: req.body.name,
    })
    await article.addTag(tag)
    res.redirect(`/articles/${req.params.id}`)
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'bad request' })
  }
})

// PUT Connect existing article and existing tag
router.put('/:id/articles_tags', async (req, res) => {
  try {
    const article = await db.article.findByPk(req.params.id)
    if(!article) throw new Error('article not found')
    const articlesTags = await db.articles_tags.update({
      where: {articleId: req.body.articleId},
      tagId: req.body.tagId
    })
    await article.addArticlesTags(articlesTags)
    res.redirect(`/articles/${req.params.id}`)
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'bad request' })
  }
})


module.exports = router