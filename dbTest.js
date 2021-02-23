const db = require('./models')

async function dbTest() {
  const article = await db.article.findOne()
  const comment = await db.comment.create({
    name: 'Paul Allen',
    content: 'This is really neat! Thanks for posting.',
    articleId: article.id
  })
  console.log(comment)
}
// const db = require('./models')

async function test() {
  const article = await db.article.findOne({
    where: { id: 1 },
    include: [db.comment]
  })
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
}
//test()
//dbTest()

async function createTag(){
  try{
    const newTag = await db.tag.create({
      name: 'pizza'
    })
    const article = await db.article.findOne()
    await article.addTag(newTag)
    console.log
  }catch(err){
    console.log(err)
  }
}
createTag()