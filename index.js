const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipe-app', {useNewUrlParser: true, useUnifiedTopology: true})

.then(() => {
  console.log('yay database connected')
  ///delete database
mongoose.connection.dropDatabase();
})
.catch(() =>{
   console.log('database not connected')
})
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    const recipe = Recipe.create({
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"]
    })
  const recipeArray = Recipe.insertMany(data)
  Promise.all( [ recipe , recipeArray ] )
  .then(() => {
    console.log('Promises working')
  
    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration : 100 } ,{new : true})
    .then(() =>{
      console.log('Its working')
    })
    .catch(() =>{
      console.log('Its not working')
    })
    const delCake = Recipe.deleteOne({ title: 'Carrot Cake' })
    .then(() => {
     console.log('deleting recipe')
     })
     .catch(() =>{
       console.log('deleting not recipe')
     })
  })
  .catch(() => {
    console.log('Promises not working')
  })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
 .catch(() => {
   console.log("something went wrong")
 })
 mongoose.connection.close();