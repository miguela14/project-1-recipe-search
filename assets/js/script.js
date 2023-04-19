const apiKey = "598f4d12a33a4490989c278b47f90d0f";
const weatherApiKey = "f0be9251af5eee648cd019d6c492648b";
const searchButton = document.getElementById("search-input");
const input = document.getElementById("recipe-input");

//fetching recipe data using spoonacular API
async function fetchRecipeData(recipe) {
  const recipesResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&apiKey=${apiKey}`).then(response => response.json());
  
  console.log(recipesResponse)
  let arrayOfRecipes = recipesResponse.results
  console.log(arrayOfRecipes)

  for(let i = 0; i < arrayOfRecipes.length; i++) {
    const currentRecipe = arrayOfRecipes[i]
    renderRecipeCard(currentRecipe)
  }
  
  // localStorage.setItem("recipes", JSON.stringify(recipesResponse))
  // storageData();
};

// Fetching weather data using openWeatherMap API
async function fetchWeatherData(location, ) {
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}`).then(response => response.json());
    
    console.log(weatherResponse)
    
    localStorage.setItem("weather", JSON.stringify(weatherResponse))
  };
  
  //
  searchButton.addEventListener("click", function(event) {
    let searchText = input.value;
    event.preventDefault();
    console.log(searchText);
    fetchRecipeData(searchText)
  });
  
  function renderRecipeCard (recipeObject) {
    

  }
  

  // function storageData() {
  //   const recipes = JSON.parse(localStorage.getItem("recipes"));
  //   const recipeForm = document.getElementById("recipe-form")


  // }
  // make another funtion that runs out and sets data from local storage
  //append card elements to html to set storage data