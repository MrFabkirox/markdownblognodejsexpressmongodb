const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override')
const app = express();

require('dotenv').config()

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
//     dbname: 'tigernodesandreact',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndexes: true
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB atlas connected");
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
//   const articles = [{
//     title: 'Test Article',
//     // createdAt: Date.now(),
//     createdAt: new Date,
//     description: 'Some test description'
//   }]
  const articles = await Article.find().sort({
    createAt: 'desc'
  });
 res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(5000);
