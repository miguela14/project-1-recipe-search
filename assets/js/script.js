const apiKey = "f3583b1d835a43cbafe20f0b027af62d";
const weatherApiKey = "f0be9251af5eee648cd019d6c492648b";
const searchButton = document.getElementById("search-input");
const input = document.getElementById("recipe-input");
const recipeForm = document.getElementById("recipe-form");


// https://api.spoonacular.com/recipes/716429/information?includeNutrition=false

//fetching recipe data using spoonacular API

async function fetchRecipeData(search) {
  search = search.toLowerCase()
  var localStoragePrep = []
  let cuisineObject = {
    name:"",
    image:"",
    recipe: []
  }
  var recipes = JSON.parse(localStorage.getItem(search))

  if (recipes) {
    console.log("we found the recipes")
    if (!recipes[0].recipe || recipes[0].vegetarian){
      console.log("Cleaning data")
      for (let i = 0; i < recipes.length; i++) {
        cuisineObject = {
          name: recipes[i].title,
          image: recipes[i].image,
          recipe: []
        }
  
        recipes[i].extendedIngredients.forEach((element)=> {
        cuisineObject.recipe.push(element.original)
        })
        localStoragePrep.push(cuisineObject)
      }
      localStorage.setItem(search,JSON.stringify(localStoragePrep))
    }
    renderRecipeCard(recipes)
  } else {
console.log("making fetch request")
  
  const cuisineInfoResponse = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${apiKey}`
    ).then((response) => response.json());
    
    let arrayOfIds = []
    
    
    let arrayOfCuisines = cuisineInfoResponse.results;
    console.log(arrayOfCuisines);
    
    arrayOfCuisines.forEach(element => {
      arrayOfIds.push(element.id)
    });
    arrayOfIds = (arrayOfIds.toString())
    var recipeInfo = await fetch(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${arrayOfIds}&apiKey=${apiKey}`
      
      
      ).then((response) => response.json())
      console.log("Setting Initial Data")
      localStorage.setItem(search, JSON.stringify(recipeInfo))
      recipes = JSON.parse(localStorage.getItem(search))
      for (let i = 0; i < recipes.length; i++) {
        cuisineObject = {
          name: recipes[i].title,
          image: recipes[i].image,
          recipe: []
        }
  
        recipes[i].extendedIngredients.forEach((element)=> {
        cuisineObject.recipe.push(element.original)
        })
        localStoragePrep.push(cuisineObject)
      }
      console.log("CLeaning Data")
      localStorage.setItem(search,JSON.stringify(localStoragePrep))
      renderRecipeCard(JSON.parse(localStorage.getItem(search)))
    }
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

function renderRecipeCard(recipeList) {
  const ul = document.createElement("ul")
  ul.setAttribute('id', 'myUl');
  var myUl = document.getElementById("ul")
  for (let i = 0; i < recipeList.length; i++) {
recipeList[i].recipe.forEach(function(item) {
  var li = document.createElement("li");
  var text = document.createTextNode(item);
  li.appendChild(text);
  ul.appendChild(li);
});
      var column = document.createElement('div')
        var card = document.createElement("div");
        card.innerHTML = `
        <div class="card">
        <header class="card-header">
    <p class="card-header-title">
      ${recipeList[i].name}
    </p> </header>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src=${recipeList[i].image} alt="${recipeList[i].name}">
          </figure>
        </div>
        <div class="card-content">
          <div class="content" id="list-container">
          </div>
        </div>
      </div>`
     var listContainer = document.querySelector('#list-container')
     console.log(ul)
     console.log(listContainer)
    // listContainer.appendChild(ul)
      // saveButton.addEventListener("click", function(event) {
      //   event.preventDefault();
      //   savedRecipies.push(recipeList);
      //   localStorage.setItem("recipes", JSON.stringify(savedRecipies));
      // });
      // column.append
      recipeForm.append(card);
      
    };

}
//finish

  function displaySavedRecipes() {
    const savedRecipies = JSON.parse(localStorage.getItem("recipes")) || [];
    savedRecipies.forEach(function(recipeList) {
      renderRecipeCard(recipeList);
    });
  }

// function storageData() {
//   const recipes = JSON.parse(localStorage.getItem("recipes"));
//   const recipeForm = document.getElementById("recipe-form")

// }
// make another funtion that runs out and sets data from local storage
//append card elements to html to set storage data