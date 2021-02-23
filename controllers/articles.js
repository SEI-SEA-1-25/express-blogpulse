const router = require("express").Router();
const db = require("../models");
/**
 * /articles routes
 */


// GET / - READ all articles and include authors
router.get("/", async (req, res) => {
    try {
        const articles = await db.article.findAll({ include: [db.author] });
        res.json({ articles: articles });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "bad request" });
    }
});



// GET /articles/:id - READ a specific post and include its author
router.get("/:id", async (req, res) => {
    try {
        const article = await db.article.findOne({
            where: { id: req.params.id },
            include: [db.author, db.comment],
        });
        res.json({ article: article });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "bad request" });
    }
});


// POST /articles/:id/comments - CREATE a new comment
router.post("/:id/comments", async (req, res) => {
    try {
        const article = await db.article.findByPk(req.params.id);
        const newComment = await article.createComment({
            name: req.body.name,
            comment: req.body.comment,
        });
        res.redirect(`/articles/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "bad request" });
    }
});

// GET / comments of a specific article
router.get("/:id/comments", async (req, res) => {
    try {
        const comment = await db.comment.findAll({
            where: { articleId: req.params.id },
        });
        res.json({ comment: comment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "bad request" });
    }
})


module.exports = router;