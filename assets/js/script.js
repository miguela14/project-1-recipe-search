const apiKey = "5c81980514314937942326079c02a9ee";
const weatherApiKey = "f0be9251af5eee648cd019d6c492648b";
const searchButton = document.getElementById("search-input");
const input = document.getElementById("recipe-input");
const recipeForm = document.getElementById("recipe-form");


// https://api.spoonacular.com/recipes/716429/information?includeNutrition=false

//fetching recipe data using spoonacular API
async function fetchRecipeData(recipe) {
  const cuisineInfoResponse = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&apiKey=${apiKey}`
  ).then((response) => response.json());

  
  let arrayOfCuisines = cuisineInfoResponse.results;
  console.log(arrayOfCuisines);
  
  let arrayOfRecipes = []
    
  let cuisineObject = {
    name:"",
    image:"",
    recipe: []
  }

  for (let i = 0; i < arrayOfCuisines.length; i++) {
    
    cuisineObject = {
      name:arrayOfCuisines[i].title,
      image:arrayOfCuisines[i].image,
      recipe: []
    }

    let cuisineResults = await fetch(
      `https://api.spoonacular.com/recipes/${arrayOfCuisines[i].id}/information?includeNutrition=false&apiKey=${apiKey}`
      ).then((response) => response.json());
      
      cuisineResults.extendedIngredients.forEach(function (element) {
        cuisineObject.recipe.push(element.original)
      });
    //fetch("some.json", {cache: "force-cache"})
    //https://spoonacular.com/food-api/docs#Get-Recipe-Information-Bulk
      arrayOfRecipes.push(cuisineObject)

      
    }
    console.log(arrayOfRecipes)
    for (let i = 0; i < arrayOfCuisines.length; i++) {
      const currentRecipe = arrayOfCuisines[i];
      renderRecipeCard(currentRecipe);
    }

    localStorage.setItem("recipes", JSON.stringify(arrayOfRecipes))
  // storageData();
}

// Fetching weather data using openWeatherMap API
async function fetchWeatherData(location) {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}`
  ).then((response) => response.json());

  console.log(weatherResponse);

  localStorage.setItem("weather", JSON.stringify(weatherResponse));
}

//
searchButton.addEventListener("click", function (event) {
  let searchText = input.value;
  event.preventDefault();
  console.log(searchText);
  fetchRecipeData(searchText);
});

function renderRecipeCard(recipeObject) {
  var title = recipeObject.title;
  console.log(title);
  var recipeImageUrl = recipeObject.image;
  console.log(recipeImageUrl)
  var column = document.createElement('div')
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var recipeImage = document.createElement("img");
    var recipeTitle = document.createElement("h3");

      var saveButton = document.createElement("button");
      var savedRecipies = JSON.parse(localStorage.getItem("recipes")) || [];

    card.setAttribute("class", "card");
    cardBody.setAttribute("class", "card-body");
    card.append(cardBody);
    recipeTitle.setAttribute("class", "h3 card-title");
    recipeTitle.textContent = `${title}`;
    recipeImage.setAttribute("src", recipeImageUrl);
    recipeImage.setAttribute("class", "recipe-image");

      saveButton.setAttribute("class", "btn btn-primary save-button");
      saveButton.textContent = "Save Recipe";

    cardBody.append(recipeImage, recipeTitle, saveButton);
    
  saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    savedRecipies.push(recipeObject);
    localStorage.setItem("recipes", JSON.stringify(savedRecipies));
  });
  // column.append
  recipeForm.append(card);
}

  function displaySavedRecipes() {
    const savedRecipies = JSON.parse(localStorage.getItem("recipes")) || [];
    savedRecipies.forEach(function(recipeObject) {
      renderRecipeCard(recipeObject);
    });
  }

// function storageData() {
//   const recipes = JSON.parse(localStorage.getItem("recipes"));
//   const recipeForm = document.getElementById("recipe-form")

// }
// make another funtion that runs out and sets data from local storage
//append card elements to html to set storage data
