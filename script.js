// GLOBAL VARIABLES

var randomMealBtn = document.querySelector('#meal-btn');
var randomDrinkBtn = document.querySelector('#drink-btn');
var MEAL = 1;
var DRINK = 2;
var curModal = 0;
var savedMeals = {}; // {itemName: itemDict}
var savedDrinks = {}; // {itemName: itemDict}
var curRecipe = {}; // {itemName: itemDict}
// GLOBAL VARIABLES END

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

loadRecipes();

// ------------------------FUCNTIONS-------------------------------

// helper function to save item to localStorage
function saveCurRecipe() {
  if (curModal === MEAL) {
    Object.assign(savedMeals, curRecipe);
    localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
    console.log(JSON.parse(localStorage.getItem("savedMeals")));
  } else if (curModal === DRINK) {
    Object.assign(savedDrinks, curRecipe);
    localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks));
    console.log(JSON.parse(localStorage.getItem("savedDrinks")));
  }
}

function removeMeal(itemName) {
  delete savedMeals[itemName];
  localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
  // need update table after remove
}

function removeDrink(itemName) {
  delete savedDrinks[itemName];
  localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks));
  // need update table after remove
}


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
  curRecipe[meal] = mealDict;
  $(".modal").show();
}
// -----------end----------


// function to display random drink
function displayDrink(drinkDict) {
  curModal = DRINK;
  console.log(drinkDict);

  var drinkImg = drinkDict['strDrinkThumb'];
  var drink = drinkDict['strDrink'];
  var category = drinkDict['strCategory'];

  $('.card-image img').attr("src", drinkImg).attr("alt", "Picture of " + drink);
  $('.card-content .title').text(drink);
  $('.card-content .subtitle').text(category);

  console.log('DRINK:', drink);
  updateTabs(drinkDict);

  curRecipe[drink] = drinkDict;
  $(".modal").show();
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

$('.modal-card-head .delete').click(function () {
  $(".modal").hide();
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
// EVENT LISTENERS END