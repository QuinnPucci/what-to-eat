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

function getRandomDrink () {
    var drinkUrl = "https://thecocktaildb.com/api/json/v1/1/random.php"

    fetch(drinkUrl).then(function(response) {
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

getRandomMeal()
getRandomDrink()