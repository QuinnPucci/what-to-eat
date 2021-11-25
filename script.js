// GLOBAL VARIABLES

var randomMealBtn = document.querySelector('#meal-btn');
var randomDrinkBtn = document.querySelector('#drink-btn');
// GLOBAL VARIABLES END

// ------------------------FUCNTIONS-------------------------------

// function to switch between tabs. NOTICE! REQUIRE modification with style.css
function tabsWithContent () {
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
// ------function end-------

// function to retrieve random cocktail data
function getRandomDrink() {
    var drinkUrl = "https://thecocktaildb.com/api/json/v1/1/random.php"

    fetch(drinkUrl).then(function(response) {
        if (response.ok) {
            // console.log(response)
          response.json().then(function(data) {
            displayRandomDrink(data['drinks'][0])
          });
        } else {
            alert("Error")
        }
    });
}

// helper function for display tabs
function updateTabs(itemDict) {
  console.log('INGREDIENTS:');
  // build up ingredients tab
  var ingredients = {};
  $("#ingredients-content").html('<table class="table"><thead><tr><th>Ingredient</th><th>Measure</th></tr></thead><tbody></tbody></table>');
  for (let i = 1; i < 21; i++) {
    var ingredient = itemDict['strIngredient' + i];
    var measure = itemDict['strMeasure' + i];
    if (!ingredient) {
      break;
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
// ------function end-------


// function to display random meal
function displayRandomMeal (mealDict) {
  console.log(mealDict);

  var mealImg = mealDict['strMealThumb'];
  var meal = mealDict['strMeal'];
  var category = mealDict['strCategory'];

  $('.card-image img').attr("src", mealImg).attr("alt", "Picture of " + meal);
  $('.card-content .title').text(meal);
  $('.card-content .subtitle').text(category);

  var youtube = mealDict['strYoutube'];

  console.log('MEAL:', meal);
  updateTabs(mealDict);

  $(".modal").show();
}
// -----------end----------

// function to display random drink
function displayRandomDrink (drinkDict) {
  console.log(drinkDict);

  var drinkImg = drinkDict['strDrinkThumb'];
  var drink = drinkDict['strDrink'];
  var category = drinkDict['strCategory'];

  $('.card-image img').attr("src", drinkImg).attr("alt", "Picture of " + drink);
  $('.card-content .title').text(drink);
  $('.card-content .subtitle').text(category);

  console.log('DRINK:', drink);
  updateTabs(drinkDict);

  $(".modal").show();
  
}
// -----------end----------


// ------------------------FUCNTIONS END-------------------------------

// EVENT LISTENERS

randomMealBtn.addEventListener("click", function() {
  console.log("random meal clicked");
  getRandomMeal();
});

randomDrinkBtn.addEventListener("click", function() {
    console.log("random drink clicked");
    getRandomDrink();
    // modal.removeAttribute("id");
});


$('.modal-card-head .delete').click(function () {
  $(".modal").hide();
})


// EVENT LISTENERS END