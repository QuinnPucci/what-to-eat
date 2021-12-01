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
  $("#recipe-modal").show();
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
  $("#recipe-modal").show();
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


// function to display saved meals
function displayFavModal(type) {
  var savedItems = savedDrinks;
  var typePrefix = "drink-";
  var title = "Saved Drink Recipes";
  var displayRecipes = displayDrink;
  if (type === MEAL) {
    savedItems = savedMeals;
    typePrefix = "meal-";
    title = "Saved Meal Recipes";
    displayRecipes = displayMeal;
  }
  $("#fav-modal-title").text(title);

  $("#fav-col-1").html("");
  var itemID = 0;
  for (let item in savedItems) {
    itemID++;
    var elementID = typePrefix + itemID;
    // create delete button
    var deleteButton = $(`<button class='dlt-btn delete dlt-rec-btn' id='${item}'>`);
    deleteButton.click(function (event) {
      event.preventDefault();
      console.log(event.target.id);
      removefavRecipe(type, event.target.id);
    })
    $("#fav-col-1").append(`<div id='${elementID}id'> <button class="button is-primary m-1" id=${elementID}>${item}</button> </div>`);
    // append delete button too div with button to view recipe
    $("#" + elementID + "id").append(deleteButton)
    $("#" + elementID).click(function () {
      console.log(1);
      displayRecipes(savedItems[item]);
      $("#fav-modal").hide();
    });
  };
  $("#fav-modal").show();
}
// -----------end----------


// function to delete saved meal/drink
function removefavRecipe(type, itemName) {
  if (type === MEAL) {
    delete savedMeals[itemName];
    localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
  } else if (type === DRINK) {
    delete savedDrinks[itemName];
    localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks));
  }
  // need update table after remove
  displayFavModal(type);
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

favMealBtn.addEventListener("click", function () {
  displayFavModal(MEAL);
});

favDrinkBtn.addEventListener("click", function () {
  displayFavModal(DRINK);
});

$('#save-btn').click(function () {
  saveCurRecipe();
});

$('#try-another-btn').click(function () {
  if (curModal === MEAL) {
    getRandomMeal();
  } else if (curModal === DRINK) {
    getRandomDrink();
  }
});

$('#recipe-modal .delete').click(function () {
  $("#recipe-modal").hide();
});

$('#fav-modal .delete').click(function () {
  $("#fav-modal").hide();
});

$("#fav-meal-2").click(function () {
  displayFavModal(MEAL);
})

$("#fav-drink-2").click(function () {
  displayFavModal(DRINK);
})

// EVENT LISTENERS END
loadRecipes();