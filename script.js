function getRandomRecipe () {
    var recipeUrl = "https://themealdb.com/api/json/v1/1/random.php"

    fetch(recipeUrl).then(function(response) {
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

getRandomRecipe()