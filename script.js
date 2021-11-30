// GLOBAL VARIABLES

var randomMealBtn = document.querySelector('#meal-btn');
var randomDrinkBtn = document.querySelector('#drink-btn');
var MEAL = 1;
var DRINK = 2;
var curModal = 0;
var savedMeals = {}; // {itemName: itemDict}
var savedDrinks = {}; // {itemName: itemDict}
var curRecipe = {}; // {itemName: itemDict}
var favMealBtn = document.querySelector('#fav-meal-btn');
var favDrinkBtn = document.querySelector('#fav-drink-btn');

// GLOBAL VARIABLES END


// ------------------------FUCNTIONS-------------------------------

// function to display saved meals
function displayFavMeal() {
  $(".fav-meal-modal").show();
  hideFavDrink()
  savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
  $("#meal-col-1").html("");
  var mealID = 0;
  for (let k in savedMeals) {
    mealID++;
    var elementID = "meal-" + mealID
    // create delete button
    var deleteButton = $(`<button class='dlt-btn delete' id='${k}'>`)
    deleteButton.text("X")
    deleteButton.click(function (event) {
      event.preventDefault()
      console.log(event.target.id)
      removeMeal(event.target.id)
    })
    $("#meal-col-1").append(`<div id='${elementID}id'> <button class="button is-primary m-1" id=${elementID}>${k}</button> </div>`);
    // append delete button too div with button to view recipe
    $("#" + elementID + "id").append(deleteButton)
    $("#" + elementID).click(function () {
      console.log(1);
      displayMeal(savedMeals[k]);
      hideFavMeal()
    });
  };
}
// -----------end----------

// function to display saved drinks
function displayFavDrink() {
  $(".fav-drink-modal").show();
  hideFavMeal()
  savedDrinks = JSON.parse(localStorage.getItem("savedDrinks"));
  $("#drink-col-1").html("");
  var drinkID = 0;
  for (let k in savedDrinks) {
    drinkID++;
    var elementID = "drink-" + drinkID;
    // create a delete button
    var deleteButton = $(`<button class='dlt-btn delete' id='${k}'>`)
    deleteButton.text("X")
    deleteButton.click(function (event) {
      event.preventDefault()
      console.log(event.target.id)
      removeDrink(event.target.id)
    })
    $("#drink-col-1").append(`<div id='${elementID}id'> <button class="button is-primary m-1" id=${elementID}>${k}</button> </div>`);
    // append delete button too div with button to view recipe
    $("#" + elementID + "id").append(deleteButton)
    $("#" + elementID).click(function () {
      console.log(1);
      displayDrink(savedDrinks[k]);
      hideFavDrink()
    });
  }
}
// -----------end----------

// Load from local storage to savedMeal and savedDrink
function loadRecipes() {
  savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
  savedDrinks = JSON.parse(localStorage.getItem("savedDrinks"));
  // if nothing in localStorage, make it empty dict
  if (!savedMeals) {
    savedMeals = {};
  }
  if (!savedDrinks) {
    savedDrinks = {};
  }
  console.log(savedMeals);
  console.log(savedDrinks);
};
// -----------end----------

// helper function to save item to localStorage
function saveCurRecipe() {
  if (curModal === MEAL) {
    if (Object.keys(curRecipe)[0] in savedMeals) {
      $(".pop-up").html('<div class="notification is-warning">Meal Already Saved in the Favorite Recipes</div>');
      return;
    }
    Object.assign(savedMeals, curRecipe);
    localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
    // console.log(JSON.parse(localStorage.getItem("savedMeals")));
    $(".pop-up").html('<div class="notification is-success">Successfully Saved the Meal to Favorites</div>');
  } else if (curModal === DRINK) {
    if (Object.keys(curRecipe)[0] in savedDrinks) {
      $(".pop-up").html('<div class="notification is-warning">Drink Already Saved in the Favorite Recipes</div>');
      return;
    }
    Object.assign(savedDrinks, curRecipe);
    localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks));
    // console.log(JSON.parse(localStorage.getItem("savedDrinks")));
    $(".pop-up").html('<div class="notification is-success">Successfully Saved the Drink to Favorites</div>');
  }
}
// -----------end----------

// function to delete saved meal
function removeMeal(itemName) {
  delete savedMeals[itemName];
  localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
  // need update table after remove
  displayFavMeal()
}
// -----------end----------

// function to delete saved drink
function removeDrink(itemName) {
  delete savedDrinks[itemName];
  localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks));
  // need update table after remove
  displayFavDrink()
}
// -----------end----------


// function to switch between tabs
function tabsWithContent() {
  let tabs = document.querySelectorAll('.tabs li');
  let tabsContent = document.querySelectorAll('.tab-content');

  let deactvateAllTabs = function () {
    tabs.forEach(function (tab) {
      tab.classList.remove('is-active');
    });
  };

  let hideTabsContent = function () {
    tabsContent.forEach(function (tabContent) {
      tabContent.classList.remove('is-active');
    });
  };

  let activateTabsContent = function (tab) {
    tabsContent[getIndex(tab)].classList.add('is-active');
  };

  let getIndex = function (el) {
    return [...el.parentElement.children].indexOf(el);
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      deactvateAllTabs();
      hideTabsContent();
      tab.classList.add('is-active');
      activateTabsContent(tab);
    });
  })

  tabs[0].click();
};
// -----------end----------


// function to retrieve random meal recipe data
function getRandomMeal() {
  var mealUrl = "https://themealdb.com/api/json/v1/1/random.php";

  fetch(mealUrl).then(function (response) {
    if (response.ok) {
      //console.log(response);
      response.json().then(function (data) {
        displayMeal(data['meals'][0]);
      });
    } else {
      alert("Error");
    }
  });
}
// -----------end----------


// function to retrieve random cocktail recipe data
function getRandomDrink() {
  var drinkUrl = "https://thecocktaildb.com/api/json/v1/1/random.php"

  fetch(drinkUrl).then(function (response) {
    if (response.ok) {
      // console.log(response)
      response.json().then(function (data) {
        displayDrink(data['drinks'][0])
      });
    } else {
      alert("Error")
    }
  });
}
// -----------end----------


// helper function for display tabs
function updateTabs(itemDict) {
  console.log('INGREDIENTS:');
  // build up ingredients tab
  var ingredients = {};
  $("#ingredients-content").html('<table class="table"><thead><tr><th>Ingredients</th><th>Measurements</th></tr></thead><tbody></tbody></table>');
  for (let i = 1; i < 21; i++) {
    var ingredient = itemDict['strIngredient' + i];
    var measure = itemDict['strMeasure' + i];
    if (!ingredient) {
      break;
    }
    if (!measure) {
      measure = "Personal Preference";
    }
    ingredients[ingredient] = measure;
    var line = ingredient + ': ' + measure;
    console.log(line);
    $("#ingredients-content tbody").append(`<tr><td>${ingredient}</td><td>${measure}</td></tr>`);
  }

  var instructions = itemDict['strInstructions'];
  $("#instruction-content").html("<span>" + instructions + "</span>");
  console.log(instructions);

  tabsWithContent();
}
// -----------end----------


// function to display random meal
function displayMeal(mealDict) {
  curModal = MEAL;
  if (curModal = MEAL) {
    $("#fav-drink-2").hide()
    $("#fav-meal-2").show()
  }
  console.log(mealDict);

  var mealImg = mealDict['strMealThumb'];
  var meal = mealDict['strMeal'];
  var category = mealDict['strCategory'];

  $('.card-image img').attr("src", mealImg).attr("alt", "Picture of " + meal);
  $('.card-content .title').text(meal);
  $('.card-content .subtitle').text(category);

  console.log('MEAL:', meal);
  updateTabs(mealDict);

  // var youtube = mealDict['strYoutube'];
  curRecipe = {};
  curRecipe[meal] = mealDict;
  $(".recipe-modal").show();
}
// -----------end----------


// function to display random drink
function displayDrink(drinkDict) {
  curModal = DRINK;
  if (curModal = DRINK) {
    $("#fav-meal-2").hide()
    $("#fav-drink-2").show()
  }
  console.log(drinkDict);

  var drinkImg = drinkDict['strDrinkThumb'];
  var drink = drinkDict['strDrink'];
  var category = drinkDict['strCategory'];

  $('.card-image img').attr("src", drinkImg).attr("alt", "Picture of " + drink);
  $('.card-content .title').text(drink);
  $('.card-content .subtitle').text(category);

  console.log('DRINK:', drink);
  updateTabs(drinkDict);

  curRecipe = {};
  curRecipe[drink] = drinkDict;
  $(".recipe-modal").show();
}
// -----------end----------

// function that hides favorite drinks modal
function hideFavDrink() {
  $(".fav-drink-modal").hide();
}
// -----------end----------

// function that hides favorite drinks modal
function hideFavMeal() {
  $(".fav-meal-modal").hide();
}
// -----------end----------


// ------------------------FUCNTIONS END-------------------------------


// EVENT LISTENERS

randomMealBtn.addEventListener("click", function () {
  console.log("random meal clicked");
  getRandomMeal();
});

randomDrinkBtn.addEventListener("click", function () {
  console.log("random drink clicked");
  getRandomDrink();
});

favDrinkBtn.addEventListener("click", function () {
  displayFavDrink()
});

favMealBtn.addEventListener("click", function () {
  displayFavMeal()
});

$('.modal-card-head .delete').click(function () {
  $(".modal").hide();
});

$('.fav-drink-modal-card-head .delete').click(function () {
  hideFavDrink()
});

$('.fav-meal-modal-card-head .delete').click(function () {
  hideFavMeal()
});

$('#try-another-btn').click(function () {
  if (curModal === MEAL) {
    getRandomMeal();
  } else if (curModal === DRINK) {
    getRandomDrink();
  }
});

$('#save-btn').click(function () {
  saveCurRecipe();
});

$('.saved-meal').click(function () {
  displayMeal()
});

$('.saved-drink').click(function () {
  displayDrink()
});

$("#fav-meal-2").click(function () {
  displayFavMeal()
})

$("#fav-drink-2").click(function () {
  displayFavDrink()
})


// EVENT LISTENERS END

hideFavDrink()
hideFavMeal()
loadRecipes();