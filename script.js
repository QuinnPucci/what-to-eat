// GLOBAL VARIABLES

var randomMealBtn = document.querySelector('#meal-btn');
var randomDrinkBtn = document.querySelector('#drink-btn');
// GLOBAL VARIABLES END

// ------------------------FUCNTIONS-------------------------------

// function to restrieve random recipe data
function getRandomMeal () {
    var mealUrl = "https://themealdb.com/api/json/v1/1/random.php";
    
    fetch(mealUrl).then(function(response) {
        if (response.ok) {
            //console.log(response);
          response.json().then(function(data) {
            displayRandomMeal(data['meals'][0]);
          });
        } else {
          alert("Error");
        }
      });
}
// -----------end----------

// function to retrieve random cocktail data
function getRandomDrink () {
    var drinkUrl = "https://thecocktaildb.com/api/json/v1/1/random.php"

    fetch(drinkUrl).then(function(response) {
        if (response.ok) {
            // console.log(response)
          response.json().then(function(data) {
            displayRandomDrink(data['drinks'][0])
            // call display function HERE
          });
        } else {
          alert("Error")
        }
      });
}
// -----------end----------

// function to display random meal
function displayRandomMeal (mealDict) {
  console.log(mealDict);
  
  var area = mealDict['strArea'];
  var category = mealDict['strCategory'];
  var instructions = mealDict['strInstructions'];
  var meal = mealDict['strMeal'];
  var mealThumb = mealDict['strMealThumb'];
  var tags = mealDict['strTags'];
  var youtube = mealDict['strYoutube'];

  console.log('MEAL:', meal);
  console.log('INGREDIENTS:');
  var ingredients = {};
  for (let i = 1; i < 21; i++) {
    var ingredient = mealDict['strIngredient' + i];
    var measure = mealDict['strMeasure' + i];
    if (ingredient === "") {
      break;
    }
    console.log(ingredient + ':', measure);
    ingredients[ingredient] = measure;
  }
}
// -----------end----------

// function to display random meal
function displayRandomDrink(drink) {
  console.log(drink);
}
// -----------end----------


// ------------------------FUCNTIONS END-------------------------------

// EVENT LISTENERS

randomMealBtn.addEventListener("click", function() {
  console.log("random meal clicked")
  getRandomMeal();
});

randomDrinkBtn.addEventListener("click", function() {
  console.log("random drink clicked")
  getRandomDrink()
});


// EVENT LISTENERS END