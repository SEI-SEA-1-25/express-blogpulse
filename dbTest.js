const db = require("./models");

async function dbTest() {
  const article = await db.article.findOne();
  const comment = await db.comment.create({
    name: "Allen Gary",
    content: "Great stuff.",
    articleId: article.id,
  });
  console.log(comment);
}

dbTest();
