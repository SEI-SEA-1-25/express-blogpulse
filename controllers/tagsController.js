const router = require("express").Router();
const db = require("../models");

/**
 * /tags routes
 */

// post a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await db.tag.create({
      name: req.body.name,
    });
    res.redirect(`/tags/${newTag.id}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

// GET /tags/:id - READ a specific tag and inlcude tags articles
router.get("/:id", async (req, res) => {
  try {
    const tag = await db.tag.findOne({
      where: { id: req.params.id },
      include: [db.article],
    });
    res.json({ tag: tag });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

// read all tags

router.get("/", async (req, res) => {
  try {
    const tags = await db.tag.findAll();
    res.json({ tags: tags });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

module.exports = router;
