// GLOBAL VARIABLES

var randomMealBtn = document.querySelector('#meal-btn')
var randomDrinkBtn = document.querySelector('#drink-btn')
var modal = document.querySelector('.modal')

// GLOBAL VARIABLES END

// ------------------------FUCNTIONS-------------------------------

// function to restrieve random recipe data
function getRandomMeal () {
    var mealUrl = "https://themealdb.com/api/json/v1/1/random.php"

    fetch(mealUrl).then(function(response) {
        if (response.ok) {
            console.log(response)
          response.json().then(function(data) {
            console.log(data)
          });
        } else {
          alert("Error")
        }
      });
}
// ------function end-------

// function to retrieve random cocktail data
function getRandomDrink () {
    var drinkUrl = "https://thecocktaildb.com/api/json/v1/1/random.php"

    fetch(drinkUrl).then(function(response) {
        if (response.ok) {
            console.log(response)
          response.json().then(function(data) {
            console.log(data)
            // call display function HERE
          });
        } else {
          alert("Error")
        }
      });
}
// ------function end-------

// function to display random meal
function displayRandomMeal () {


  for (var i = 0; i < meals.length; i++) {
  
  }

}
// ------function end-------

// ------------------------FUCNTIONS END-------------------------------

// EVENT LISTENERS

randomMealBtn.addEventListener("click", function() {
  console.log("random meal clicked")
  getRandomMeal()
  modal.removeAttribute("id")

});

randomDrinkBtn.addEventListener("click", function() {
  console.log("random drink clicked")
  getRandomDrink()
});


// EVENT LISTENERS END