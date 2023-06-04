const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('strictQuery', false);

// Connection to the database "recipe-app"
mongoose
  .connect('mongodb://127.0.0.1:27017/recipe-app')
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(
        {
          title: "pizza",
          level: "Easy Peasy",
          ingredients: [
            "2 ½ cups warm water(600 mL)",
            "1 teaspoon sugar",
            '2 teaspoons active dry yeast',
            '7 cups all-purpose flour(875 g), plus more for dusting',
            '6 tablespoons extra virgin olive oil, plus more for greasing',
            '1 ½ teaspoons kosher salt',
            '¼ cup semolina flour(30 g)',
          ],
          cuisine: "Italian",
          dishType: "main_course",
          image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
          duration: 15,
          creator: "Raffaele Esposito"
        })
        .then ((recipe) => console.log(recipe.title))
        })
  .then(() => {
    return Recipe.insertMany(data)
    .then (() => console.log('Added following recipes: '));
  })
  .then(() => {
    return Recipe.updateOne({
      title: 'Rigatoni alla Genovese'
    },{
      duration: 100
    })
    .then (() => console.log('Duration updated'));
  })
  .then(() => {
    return Recipe.deleteOne({
      title: 'Carrot Cake'
    })
    .then (() => console.log('Recipe deleted!'))
  })
        .catch(error => {
          console.error('Error connecting to the database', error);
        });

mongoose
        .connection.close()
        .then(() => {
                      console.log('Database connection closed');
                    })
        .catch(error => {
          console.log('Error closing database connection:', error);
        });