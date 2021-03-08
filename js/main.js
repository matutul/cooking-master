const mealIds = [];
const foodsPerPage = 12;

function loadMeal() {
  return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => storeMealId(data));
}
function storeMealId(data) {
  const mealId = parseInt(data.meals[0].idMeal);
  if (mealIds.length == 0) {
    displayFood(data, mealId);
  }
  else {
    for (let i = 0; i < mealIds.length; i++) {
      if (mealId == mealIds[i]) {
        return 0;
      }
    }
    displayFood(data, mealId);
  }
}

function displayFood(data, mealId) {
  let mealThumb = data.meals[0].strMealThumb;
  let mealName = data.meals[0].strMeal;
  const itemDiv = document.createElement('div');
  itemDiv.innerHTML = `
    <div class="item" onclick="fetchForModal(${mealId})">
          <div class="food-pic">
            <img src="${mealThumb}" alt="Picture of ${mealName}">
          </div>
          <div class="food-title">
            <h2>${mealName}</h2>
          </div>
        </div>
    `;
  document.getElementById('foods').appendChild(itemDiv);
}

while (mealIds.length < foodsPerPage) {
  let mealId = loadMeal();
  if (mealId != 0) {
    mealIds.push(mealId);
  }
}

function showDetails(data) {
  const mealThumb = data.meals[0].strMealThumb;
  const mealName = data.meals[0].strMeal;
  const ingredientsWithMeasure = [];
  let ingredientList = "";
  for (let i = 1; i < 21; i++) {
    let ingredient = eval(`data.meals[0].strIngredient${i}`);
    let measure = eval(`data.meals[0].strMeasure${i}`);
    if (ingredient != "" && ingredient != null) {
      let ingredientPlusMeasure = measure + " " + ingredient;
      ingredientsWithMeasure.push(ingredientPlusMeasure);
    }
  }
  for (let i = 0; i < ingredientsWithMeasure.length; i++) {
    ingredientList += `<li>${ingredientsWithMeasure[i]}</li>`;
  }
  console.log(ingredientsWithMeasure);
  document.getElementById("details").innerHTML = `
  <div id="close-btn" onclick="closeModal()"><p>X</p></div>
  <div class="details">
  <div class="thumb">
    <img src="${mealThumb}" alt="" srcset="">
  </div>
  <div class="info">
    <h2>${mealName}</h2>
    <p class="list-title">Ingredients</p>
    <ul class="ingredients">
      ${ingredientList}
    </ul>
  </div>
</div>
  `;
}


function fetchForModal(id) {
  document.getElementById('modal').style.display = 'flex';
  document.getElementById("foodDisplay").style.opacity = .5;
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => showDetails(data));
}


function closeModal(){
  document.getElementById("modal").style.display = 'none';
  document.getElementById("foodDisplay").style.opacity = 1;
}
 // console.log(meals);
    // let mealThumb = meal.meals[0].strMealThumb;
    // let mealName = meal.meals[0].strMeal;
    // const itemDiv = document.createElement('div');
    // itemDiv.innerHTML = `
    // <div class="item">
    //       <div class="food-pic">
    //         <img src="${mealThumb}" alt="Picture of ${mealName}">
    //       </div>
    //       <div class="food-title">
    //         <h2>${mealName}</h2>
    //       </div>
    //     </div>
    // `;
    // document.getElementById('foods').appendChild(itemDiv);






// function loadAllFood() {
//   for (let i = 0; i < mealIds.length; i++) {
//     const itemId = mealIds[i];
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
//       .then(res => res.json())
//       .then(data => )

//   }
// }
