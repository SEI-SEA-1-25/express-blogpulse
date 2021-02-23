const router = require('express').Router()
const db = require('../models')

/**
 * /authors routes
 */

// GET /authors - READ all authors
router.get('/', async (req, res) => {
  try {
    const authors = await db.author.findAll()
    res.json({ authors: authors })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

// POST /authors - CREATE a new author
router.post('/', async (req, res) => {
  try {
    const newAuthor = await db.author.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio
    })
    res.redirect(`/authors/${newAuthor.id}`)
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

// GET /authors/:id - READ a specific author and inlcude their articles
router.get('/:id', async (req, res) => {
  try {
    const author = await db.author.findOne({
      where: {id: req.params.id},
      // include: { all: true, nested: true }
      include: [{
        model: db.article,
        include: db.tag
      }]
    })
    res.json({ author: author })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

// POST /authors/:id/articles - CREATE a new article associated with an author
router.post('/:id/articles', async (req, res) => {
  try {
    const author = await db.author.findByPk(req.params.id, {include: [db.article]})
    if(!author) throw new Error('author not found')
    const article = await db.article.create({
      title: req.body.title,
      content: req.body.content,
    })
    await author.addArticle(article)
    // only create a tag if included in the req.body
    if(req.body.tag) {
      // mvp way to add tags
      // const tag = await db.tag.create({
      //   name: req.body.tag
      // }) 
      // await article.addTag(tag)
      // stretch goal -- tags in comma separated list
      // split tags at commas
      let tags = req.body.tag.split(',')
      // map promises to an array
      tags = tags.map(async tag => {
        return await article.createTag({
          name: tag.trim() // trim white space
        })
      })
      // await all promises
      await Promise.all(tags)
    }

    res.redirect(`/articles/${article.id}`)
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

module.exports = router