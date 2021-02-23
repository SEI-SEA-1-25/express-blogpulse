const db = require("./models");

async function dbTest() {
  const article = await db.article.findOne();
  const comment = await db.comment.create({
    name: "Paul Allen",
    comment: "This is really neat! Thanks for posting.",
    articleId: article.id,
  });
  console.log(comment);
}
// dbTest();

async function createTag() {
  try {
    const newTag = await db.tag.create({
      name: "pizza",
    });
    const article = await db.article.findOne();
    await article.addTag(newTag);
  } catch (err) {
    console.log("🌍 🌍 🌍", err);
  }
}
createTag();
