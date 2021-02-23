// requried modules
const express = require('express')
const db = require('./models')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
const authorsController = require('./controllers/authorsController')
const articlesController = require('./controllers/articlesController')
const commentsController = require('./controllers/commentsController')

// config express app
const app = express()
const PORT = 3000
const rowdyResults = rowdy.begin(app)

// express middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use('/authors', authorsController)
app.use('/articles', articlesController)
app.use('/comments', commentsController)

/**
 * home route
 */

// GET / - READ all articles and include authors
app.get('/', async (req, res) => {
  try {
    const articles = await db.article.findAll({ include: [db.author] })
    res.json({ articles: articles })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

/**
 * /authors routes
 */



/**
 * /articles routes
 */


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  rowdyResults.print()
})