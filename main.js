function showHideDiv() {
    let searchCriteria = document.getElementById('search')
    let whatsInFridge = document.getElementById('whatsInFridge')
    let typeOfMeal = document.getElementById('typeOfMeal')
    let cuisineType = document.getElementById('cuisineType')
    let generatebutton = document.getElementById('generate')
    let bottomDiv = document.getElementById('bottom-display')
    

    if (searchCriteria.value == 'main') {
        whatsInFridge.style.display = 'flex'
        typeOfMeal.style.display = 'none'
        cuisineType.style.display = 'none'
        generatebutton.style.display = 'flex'
        generatebutton.style.display = 'flex'
        bottomDiv.style.display = 'flex'

    } else if (searchCriteria.value == 'meal') {
        whatsInFridge.style.display = 'none'
        typeOfMeal.style.display = 'flex'
        cuisineType.style.display = 'none'
        generatebutton.style.display = 'flex'
        bottomDiv.style.display = 'flex'

    } else if (searchCriteria.value == 'cuisine') {
        whatsInFridge.style.display = 'none'
        typeOfMeal.style.display = 'none'
        cuisineType.style.display = 'flex'
        generatebutton.style.display = 'flex'
        bottomDiv.style.display = 'flex'

    } else if (searchCriteria.value == 'choose') {
        whatsInFridge.style.display = 'none'
        typeOfMeal.style.display = 'none'
        cuisineType.style.display = 'none'
        bottomDiv.style.display = 'flex'
    } 

}


document.getElementById('generate').addEventListener('click', getMeals)

document.getElementById('generate').addEventListener('click', showRecipeButton)

function showRecipeButton() {
    let recipebutton = document.getElementById('get-recipe')
    recipebutton.style.display = "flex"
}

function getMeals() {

    let ingredient = document.getElementById('main-ingredient').value
    let whichMeal = document.getElementById('which-meal').value
    let cuisine = document.getElementById('cuisine').value
    let mealID;
    let randomMeal = Math.floor(Math.random() * 10)


    let fetchSearch;
    if (ingredient.length > 0) {
        fetchSearch = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    } else if (whichMeal.length > 0) {
        fetchSearch = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c${whichMeal}`)
    } else if (cuisine.length > 0) {
        fetchSearch = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
    }


    fetch(fetchSearch)
        .then(res => res.json())
        .then(data => {
            
            document.getElementById('meal-name').innerText = data.meals[randomMeal].strMeal

            document.getElementById('meal-pic').src = data.meals[randomMeal].strMealThumb

            mealID = data.meals[randomMeal].idMeal

            document.getElementById('get-recipe').addEventListener('click', getRecipe)


            function getRecipe() {
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
                    .then(res => res.json())
                    .then(data => {

                        let ingredientList = []
                        let measureList = []
                        let fullList = {}
                        let youTube;
                        
                        for (const i in data.meals[0]) {
                            if (i.includes('strIngredient')) {
                                ingredientList.push(data.meals[0][i])
                            } else if (i.includes('strMeasure')) {
                                measureList.push(data.meals[0][i])
                            } else if (i.includes('strYoutube') && data.meals[0][i] !== '') {
                                youTube = data.meals[0][i].replace('watch?v=', 'embed/')

                            }
                        }
                        ingredientList = ingredientList.filter(val => val !== '')


                        measureList = measureList.filter(val => val !== '')
     

                        measureList.forEach((item, i) => fullList[item] = ingredientList[i])

                        fullList = Object.entries(fullList)

                        let instructions = document.getElementById("myList");

                        fullList.forEach((item)=>{
                            let li = document.createElement("li");
                            li.innerText = item.join(' ');
                            instructions.appendChild(li);
                          })



                        document.getElementById('instructions').innerText = data.meals[0].strInstructions

                        document.querySelector('iframe').style.display = 'flex'

                        document.querySelector('iframe').src = youTube
                    })

                    .catch(err => {
                        console.log(`error ${err}`)
                    });
            };

        })
}