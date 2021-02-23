
const router = require('express').Router()
const db = require ('../models')

module.exports= router 

router.get ('/', async (req, res) => {
    try{
     const comments = await db.comment.findAll({
         include: [db.article]
     })
     res.send(comments)
    }catch(err){
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    try{
        const comment = await db.comment.findByPk({
            include: [db.article]
        })
    }catch(err){
        res.send(comment)
        console.log(err)
    }
})



//post a comment

