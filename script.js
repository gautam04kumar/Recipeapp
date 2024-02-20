const SearchBox = document.querySelector(".searchBox");
const SearchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipeContainer");
const recipeDetailsContent = document.querySelector(".recipe-Details-content");
const recipeCloseBtn = document.querySelector(".recipe-Close-Btn");

// get recipe 
const fetchRcipe = async (query) => {
    recipeContainer.innerHTML = "Fetching recipes...";
    try {
        
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = ""
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
     <img src="${meal.strMealThumb}">
     <h3>${meal.strMeal}</h3>
     <p><span>${meal.strArea}</span> Dish</p>
     <p>Belongs to <span>${meal.strCategory}</span> Category</p>
     `

        const button = document.createElement('button')
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button)

        //  Adding EventListner
        button.addEventListener("click", () => {
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv)
    });
} 
catch (error) {
    recipeContainer.innerHTML = "Error in Fetching recipes...";   
}

}
// functoin fetch Ingrediant
const fetchIngrediants = (meal) => {
    let Ingredentslist = "";
    for (let i = 1; i <= 20; i++) {
        const Ingrediant = meal[`strIngredient${i}`];
        if (Ingrediant) {
            const measure = meal[`strMeasure${i}`];
            Ingredentslist += `<li>${measure} ${Ingrediant}</li>`
        }
        else {
            break
        }
    }
    return Ingredentslist;
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
       <h2 class="recipeName">${meal.strMeal}</h2>
       <h3>Ingredents:</h3>
       <ul class="ingrediantList">${fetchIngrediants(meal)}</ul>
       <div>
            <h3>Insrtruction:</h3>
            <p class="recipeInstruction">${meal.strInstructions}</p>
       </div>

       `

    recipeDetailsContent.parentElement.style.display = "block"
}
 recipeCloseBtn.addEventListener('click',()=>{
      recipeDetailsContent.parentElement.style.display="none"
 });
SearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = SearchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2> Type the meal in  the srach box</h2>`;
        return;
    }
    fetchRcipe(searchInput);
})