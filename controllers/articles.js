const router = require("express").Router();
const db = require("../models");

// GET /articles/:id - READ a specific article and include its author
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

// POST /articles/:id/comments - CREATE new comment
router.post("/:id/comments", async (req, res) => {
  try {
    const article = await db.article.findOne({
      where: {
        id: req.params.id,
      },
    });
    await db.comment.create({
      name: req.body.name,
      content: req.body.content,
      articleId: article.id,
    });
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ messgae: "OH NO! 💩 something isnt right" });
  }
});
//post articles CREATE NEW COMMENT

router.post("/:id/comments", async (req, res) => {
  try {
    const article = await db.article.findByPk(req.params.id);
    const newComment = await article.createComment({
      name: req.body,
      comment: req.body.comment,
    });
    res.redirect(`/articles/${req.params.id}`);
  } catch (err) {
    console.log("💩 💩 💩", err);
  }
});

module.exports = router;
