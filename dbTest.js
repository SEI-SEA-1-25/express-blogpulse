const db = require('./models')

async function createTag() {
      try {
        const newTag = await db.tag.create({
          name: 'Pizza'
        })
        const article = await db.article.findOne()
        await article.addTag(newTag)
      } catch (error) {
        console.log(error);
      }
}
createTag()

async function findTags() {
      try {
            const article = await db.article.findByPk(1, {
                  include: [db.tag]
            })
            console.log(article)
      } catch (error) {
            console.log(error);
      }
}
findTags()