const router = require('express').Router()
const db = require("../models")

// GET /articles/:id - READ a specific post and include its author
router.get('/:id', async (req, res) => {
    try {
      const article = await db.article.findOne({
        where: { 
          id: req.params.id 
        },
        // include: [db.author]
      })
      res.json({ article: article })
    } catch(error) {
      console.log(error)
      res.status(400).json({ message: 'bad request' })
    }
  })

// POST /articles/:id/comments - CREATE new comment
router.post('/:id/comments', async (req, res) => {
    try {
      const article = await db.article.findOne({
        where: {
          id: req.params.id
        }
       })
      await db.comment.create({
        name: req.body.name,
        content: req.body.content,
        articleId: article.id
      })
      res.redirect(`/articles/${article.id}`)
    } catch(error) {
      console.log(error)
      res.status(400).json({ messgae: 'OH NO! 💩 something isnt right'})
    }
  })


/*----------------------HOME WORK----------------*/


// As a user, I would like to assign a tag when I create a new article
router.post('/:id/tags', async (req, res) => {
  try {
    const newTag = await db.tag.create({
      name: req.body.name
    })
    const article = await db.article.findByPk(req.params.id)
    await article.addTag(newTag)
    res.send("yooo hooo 👋🏼")
  } catch (err) {
    console.log(err);
    res.status(400).json({ messgae: 'OH NO! 💩 something isnt right'})
  }
})

// As a user, I would like to add existing tags to articles
router.put('/:id/existing_tag', async (req, res) => {
  try {
    const article = await db.article.findByPk(req.params.id)
    const tempTags = await db.tag.findOne({
      where: {
        id: req.body.id
      }
    })
    await article.addTag(tempTags)
    res.send('success')
  } catch (err) {
    console.log(err);
    res.status(400).json({ messgae: 'OH NO! 💩 💩 💩 💩 '})
  }
})


// As a user, I would like to see tags displayed on articles
// display ---- one ariticle with one tag
//user article 3 -> tag 5 (apple)
router.get('/:id/getTag', async (req, res) => {
  try {
    const temp = await db.articles_tags.findOne({
      where: {
        articleId: req.params.id
      }
    })  
    const temp1 = await db.tag.findOne({
      where: {
        id: temp.tagId
      }
    })
    res.send(temp1.name)
  } catch(err) {
    console.log(err);
    res.status(400).json({ messgae: 'OH NO! 💩 💩 💩 💩 '})
  }
})




// As a user, I would like to see one specific tag and 
// all the articles that have been tagged with it

// articles/tags/:id
// req.params.id -> tagID
// articleId from articles_tags table
// get article from article table
router.get('/tags/:id/temp', async (req, res) => {
  try {
    const userChoiceTag = await db.tag.findByPk(req.params.id)
    // 5 --- grabbed apple tag
    const articles = await db.articles_tags.findAll({
      where: {
        tagId: userChoiceTag.id
      }
    })
    res.send(articles)

  } catch (err) {
    console.log(err);
  }
})  

module.exports = router;