
const router = require('express').Router()
const db = require('../models')

module.exports = router;

//Posting a new article with a tag



// GET /articles/:id - READ a specific post and include its author
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
  
//post a new comment
router.post('/:id/comments', async (req, res) =>{
    try{
    const article = await db.article.findByPk(req.params.id)
    const newComment = await article.createComment({
        name: req.body.name,
        content: req.body.content
    })
    // await article.addComment(newComment)
    res.redirect(`/articles/${req.params.id}`)
    }catch(err){
        console.log(err)
    }
})

// Adding a NEW tag to an article
router.post('/:id/tags', async (req, res) =>{
    try{
      const article = await db.article.findByPk(req.params.id)
      const newTag = await article.createTag({
          name: req.body.name
      })
      res.redirect(`/articles/${req.params.id}`)
      console.log(newTag)
    }catch(err){
     console.log(err)
    }
})


//Add an existing tag to an exising article 
router.post ('/:id', async (req, res) => {
    try{
        const article = await db.article.findByPk(req.params.id)
        const existingTag = await db.tag.findOne({
            where: {id: req.params.id},
            include: [db.article]
        })
        await article.addTag(existingTag)
        res.redirect(`/articles/${req.params.id}`)
    }catch(err){
        console.log(err)
    }    
})


//Seeing one specific tag and all the articles displayed with it
router.get('/:id/tags/:id', async (req, res) =>{
    try{
        const tag = await db.tag.findOne({
            where: {id: req.params.id}, 
            include: [db.article]
        })
        res.json({tag: tag})
    }catch(err){
    console.log(err)
    }
})
