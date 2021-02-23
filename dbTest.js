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

// dbTest()

// As a user, I would like to assign a tag when I create a new article
// As a user, I would like to add tags to articles
// As a user, I would like to see tags displayed on articles
// As a user, I would like to see one specific tag and all the articles that have been tagged with it
// As a user, I would like to assign a tag when I create a new article
async function createTag() {
    try {
        const newTag = await db.tag.create({
            name: "Pizza",
        })
        const article = await db.article.findOne()
        await article.addTag(newTag)
        
    } catch (err) {
        console.log(err);
    }
}
createTag()



// async function findTags() {
//     try {
//         const article = await db.article.findByPk(1, {
//             include: [db.tag]
//         })
        
//         console.log(article);

//     } catch (err) {
//         console.log(err);
//     }
// }