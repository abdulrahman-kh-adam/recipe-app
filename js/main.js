/* APIs 
    www.themealdb.com/api/json/v1/1/lookup.php?i={id}
    www.themealdb.com/api/json/v1/1/filter.php?i={searchItem}
*/

// Elements
let searchBarElement = document.querySelector(".search-bar");
let searchBtnElement = document.querySelector("#search-btn");
let resultsAreaElement = document.querySelector(".results-area");
let showDetailsElement = document.querySelector(".recipe-details");


// Events
searchBtnElement.addEventListener("click", getRecipes);
resultsAreaElement.addEventListener("click", displayMealDetails);
showDetailsElement.addEventListener("click", closeDetails);

function getRecipes() {
    let searchTerm = searchBarElement.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
    fetch(apiUrl).then(res => res.json()).then(data => displayMeals(data));
}

function displayMeals(recipes) {
    resultsAreaElement.innerHTML = "";
    if(recipes.meals === null){
        resultsAreaElement.innerHTML = `No ${searchBarElement.value} recipes found!`;
    } else {
        recipes.meals.forEach(recipe => {
            resultsAreaElement.innerHTML += `
                <div class="card">
                    <div class="card-img">
                        <img src="${recipe.strMealThumb}">
                    </div>
                    <div class="card-body">
                        <h3>${recipe.strMeal}</h3>
                        <a href="#" class="recipe-btn" data-id="${recipe.idMeal}">Get Recipe</a>
                    </div>
                </div>
            `
        })
    }
}

function displayMealDetails(element) {
    let showMealDetails = element.target.classList.contains("recipe-btn") ? true : false;
    if(showMealDetails) {
        let id = element.target.getAttribute("data-id");
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(apiUrl).then(res => res.json()).then(data => showMealInstructions(data));
    }
}

function showMealInstructions(data){
    let item = data.meals[0];
    console.log(item);
    showDetailsElement.classList.remove("hide");
    showDetailsElement.innerHTML = "";
    showDetailsElement.innerHTML += `
        <i class="fas fa-times close"></i>
        <h2>${item.strMeal}</h2>
        <p>Instructions:</p>
        <p>${item.strInstructions}</p>
        <a href="${item.strYoutube}">Watch Video</a>
    `
}

function closeDetails(element) {
    if(element.target.classList.contains("close")){
        element.target.parentElement.classList.add("hide");    
    }
}