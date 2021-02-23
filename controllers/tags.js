const router = require("express").Router();
const db = require("../models");

// GET / tags
router.get("/:id/tags", async (req, res) => {
    try {
        const tag = await db.tag.findAll({
            where: { tagId: req.params.id },
        });
        res.json({ tag: tag });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "bad request" });
    }
})

// POST / articles/:id/tags ?
router.post("/:id/tags", async (req, res) => {
    try {
        const article = await db.article.findByPk(req.params.id);
        const newTag = await article.createTag({
            name: req.body.name,
        });
        res.redirect(`/articles/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "bad request" });
    }
});

module.exports = router;