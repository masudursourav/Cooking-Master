//Getting Items By ID

const getFullRecipe = (id)=>{
  console.log(id);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i= ${id}`
  fetch(url)
  .then(response => response.json())
  .then(data => showTheFullRecipes(data));

   
}

//Showing Full Recipes of clicked Item

const showTheFullRecipes = (data)=>{
  document.getElementById('full-recipe').innerHTML="";
  const recipe=data.meals[0];
  console.log(recipe);
  const displayFullRecipe = document.getElementById('full-recipe');
    const fullRecipe = document.createElement('div');
    fullRecipe.className='card mb-3 new-card';
    fullRecipe.innerHTML=`
    <img src="${recipe.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
     <h5 class="card-title">${recipe.strMeal}</h5>
     <p>You Need : </p>
     <ul>
     <li>${recipe.strIngredient1}</li>
     <li>${recipe.strIngredient2}</li>
     <li>${recipe.strIngredient3}</li>
     <h4>How to Make It :</h4>
     <p class="card-text">${recipe.strInstructions}</p>
   </div>
    ` 
    displayFullRecipe.appendChild(fullRecipe);
}

//Showing Items

const showTheRecipes = (data)=>{
    const recipes = data.meals;
    recipes.forEach(recipe => {
      const recipesDisplay = document.getElementById('racipe-names');
      const singleRecipe = document.createElement('div');
      singleRecipe.className = 'card text-center';
      singleRecipe.style='width: 18rem;';
      singleRecipe.innerHTML = 
      `<img src="${recipe.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${recipe.strMeal}</h5>
        <a onclick="getFullRecipe(${recipe.idMeal})" class="btn btn-primary">Get Full Recipe</a>
      </div>`
      recipesDisplay.appendChild(singleRecipe);
    });
}

//getting Items by name

const findRecipe = () => {
    const searchValue = document.getElementById('value').value; 
    document.getElementById('racipe-names').innerHTML ="";
    document.getElementById('full-recipe').innerHTML="";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${searchValue}`
    fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.meals==null){
      alert("OOPS !! Items No Found try aging");
      document.getElementById('value').value = "";

    }
    else{
      document.getElementById('value').value = "";
      showTheRecipes(data);
    }
  })
}
document.getElementById('search-btn').addEventListener('click',findRecipe);

//search via pressing enter

document.querySelector("#value").addEventListener('keyup',(e)=>{
 if(e.which === 13) {
  const searchValue = document.getElementById('value').value; 
  document.getElementById('racipe-names').innerHTML ="";
  document.getElementById('full-recipe').innerHTML="";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${searchValue}`
  fetch(url)
.then(response => response.json())
.then(data => {
  if(data.meals==null){
    alert("OOPS !! Items No Found try aging");
    document.getElementById('value').value = "";

  }
  else{
    document.getElementById('value').value = "";
    showTheRecipes(data);
  }
})
 }

});



