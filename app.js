//display all food(if found)
const displayFood = foods => {
    let parentDiv = document.getElementById('allFoods');
    parentDiv.innerHTML = " ";
    foods.forEach(food => {

        const singleDiv = document.createElement('div');
        singleDiv.className = 'col rounded'
        const singleFood = `
                <div onclick="showDetails(${food.idMeal})" class="card cursor h-100">
                    <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">${food.strMeal}</h6>
                    </div>
                </div>  
        `;
        singleDiv.innerHTML = singleFood;
        parentDiv.appendChild(singleDiv);

    });
};


//Search food for user input
const searchFood = (event) => {

    let input = document.getElementById('userInput');

    if (input.value === "") {

        input.style.border = "1px solid red";

    } else {

        input.style.border = "1px solid green";

        document.getElementById('singleFood').innerHTML = ""; 

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(res => res.json())
            .then(data => {
                const foodArray = data.meals;
                displayFood(foodArray);
                input.value = "";
            })
            .catch(error => {
                console.log(error);
                let misingFood = input.value;
                document.getElementById('allFoods').innerHTML = `
                    <div class="col d-flex flex-column justify-content-center align-items-center mt-5">
                        <img class="error" src="images/icon.png" alt="">
                        <h2 class="mt-3 error-msg">Sorry! "${misingFood} "Not found</h2>
                    </div>
                `;
                input.value = "";
                document.getElementById('singleFood').innerHTML = "";
            });
    }


};


//Shows details of clicked food 
const showDetails = id => {
    const singleFoodApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(singleFoodApi)
        .then(res => res.json())
        .then(data => {

            let singleFood = document.getElementById('singleFood');
            const meal = data.meals[0];
            const detailElement = `
                <div class="card">
                <button onclick="hide()" class="btn btn-success close">X</button>
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3 class="card-title mt-2">${meal.strMeal}</h3>
                        <h4 class="mt-2">Ingredients</h4>
                        <ul class="mt-1">
                            <li><span>${meal.strMeasure1}</span> <span>${meal.strIngredient1}</span></li>
                            <li><span>${meal.strMeasure2}</span> <span>${meal.strIngredient2}</span></li>
                            <li><span>${meal.strMeasure3}</span> <span>${meal.strIngredient3}</span></li>
                            <li><span>${meal.strMeasure4}</span> <span>${meal.strIngredient4}</span></li>
                            <li><span>${meal.strMeasure5}</span> <span>${meal.strIngredient5}</span></li>
                            <li><span>${meal.strMeasure6}</span> <span>${meal.strIngredient6}</span></li>
                            <li><span>${meal.strMeasure7}</span> <span>${meal.strIngredient7}</span></li>
                    

                        </ul>
                    </div>
                </div>
            `;
            singleFood.innerHTML = detailElement;
        })
        .catch(error => {
            console.log(error);
            singleFood.innerHTML = `
                    <div class="col d-flex flex-column justify-content-center align-items-center mt-5">
                        <img class="error" src="images/icon.png" alt="">
                        <h2 class="mt-3 error-msg">Sorry! "${meal.strMeal} " Details Not found</h2>
                    </div>
                `;

        })
};





//Close the single food details div
const hide = () => {
    document.getElementById('singleFood').innerHTML = "";
};
