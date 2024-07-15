
let sName = document.getElementById('sName');
let sFirstL = document.getElementById('sFirstL');
let dataOfRow = document.getElementById('dataOfRow');
let mainContainer = document.getElementById('mainContainer');

fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=b`)
function closeNav() {
    $('.nav').animate({ left: `-${$('.w-85').innerWidth()}` }, (1000));
    $('.open').toggleClass('d-none');
    $('.close').toggleClass('d-none');
    $("ul li").animate({
        top: 300
    }, 1000)
}

function openNav() {
    $('.nav').animate({ left: `0` }, (1000));
    $('.open').toggleClass('d-none');
    $('.close').toggleClass('d-none');

    for (let i = 0; i < 5; i++) {
        $("ul li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

$(function () {
    $('.loading').fadeOut(1000)
})

sName.addEventListener('keypress', function () {
    $('.loading').fadeIn(300)
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`
    fetchMeals(url)
    $('.loading').fadeOut(300)
})

sFirstL.addEventListener('keypress', function () {
    $('.loading').fadeIn(300)
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${this.value}`
    fetchMeals(url)
    $('.loading').fadeOut(300)
})

async function fetchMeals(item) {

    let x = await fetch(item)
    let data = await x.json()

    data.meals ? displaylistmeal(data.meals) : displaylistmeal([])
    displaylistmeal(data.meals)
}
async function searchById(searchedID) {

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchedID}`)
    let data = await x.json()
    displayMealDetails(data.meals[0])

}

function displaylistmeal(arrOfData) {

    let dispdata = ' '

    if (arrOfData.length != null) {
        for (let i = 0; i < arrOfData.length; i++) {
            dispdata += ` <div onclick="searchById(${arrOfData[i].idMeal})"  class="p-3  col-md-3 ">
                             <div class=" p-0 border-0 meal rounded-3  position-relative parent">
                                        <img class="border-0 rounded-3" src="${arrOfData[i].strMealThumb}" width="100%" >
                                        <div class="overlaydes bg-white  border-0 rounded-3 opacity-50">
                                        <h1>${arrOfData[i].strMeal}</h1>
                                        </div>
                                    </div>
                </div>`


        }
    }
    dataOfRow.innerHTML = dispdata;




}

function displayMealDetails(meal) {
    $('.loading').fadeIn(300)

    mainContainer.classList.add("d-none")


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let container = `
    <div class="col-md-4">
                <img class="w-100 rounded-3 text-white" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    dataOfRow.innerHTML = container
    $('.loading').fadeOut(300)
}

function ShowSearchInputs() {
    $('.loading').fadeIn(300)
    mainContainer.classList.remove("d-none");
    dataOfRow.innerHTML = " "
    $('.loading').fadeOut(300)
}

//Categories
function ShowCategories() {
    $('.loading').fadeIn(300)
    let url = `https://www.themealdb.com/api/json/v1/1/categories.php`
    CategoriesFetch(url)
    $('.loading').fadeOut(300)

}

async function CategoriesFetch(url) {
    let x = await fetch(url)
    let data = await x.json()
    displayCategories(data.categories)


}

function displayCategories(data) {

    mainContainer.classList.add("d-none");
    dataOfRow.innerHTML = " "

    let container = ''
    for (let i = 0; i < data.length; i++) {
        container += `<div class="col-md-3">
                <div onclick="displayCategoriesMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>`
    }
    dataOfRow.innerHTML = container;


}

function displayCategoriesMeals(data) {
    $('.loading').fadeIn(300)

    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`
    fetchMeals(url)
    $('.loading').fadeOut(300)

}
//Area
function ShowArea() {
    $('.loading').fadeIn(300)

    let url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    AreaFetch(url)
    $('.loading').fadeOut(300)
}
async function AreaFetch(url) {


    let x = await fetch(url)
    let data = await x.json()
    displayArea(data.meals)


}
function displayArea(data) {


    mainContainer.classList.add("d-none");
    dataOfRow.innerHTML = " "

    let container = "";

    for (let i = 0; i < data.length; i++) {
        container += `
        <div class="col-md-3 text-white">
                <div onclick="filterByArea('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `

    }

    dataOfRow.innerHTML = container
}
async function filterByArea(Area) {
    $('.loading').fadeIn(300)

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    let data = await x.json()
    $('.loading').fadeOut(300)
    displaylistmeal(data.meals)
}
//Ingrident
function ShowIngrident() {
    $('.loading').fadeIn(300)
    let url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    IngridentFetch(url)
    $('.loading').fadeOut(300)
}
async function IngridentFetch(url) {
    let x = await fetch(url)
    let data = await x.json()
    displayIngrident(data.meals)



}
function displayIngrident(data) {
    mainContainer.classList.add("d-none");
    dataOfRow.innerHTML = " "

    let container = "";

    for (let i = 0; i < data.length; i++) {
        container += `
       <div class="col-md-3 text-white">
                <div onclick="filterByIngrident('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription ? data[i].strDescription.split(' ').slice(0, 20).join(' ') : []}</p>
                </div>
        </div>
        `

    }

    dataOfRow.innerHTML = container
}
async function filterByIngrident(Ingrident) {
    $('.loading').fadeIn(300)

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingrident}`)
    let data = await x.json()
    $('.loading').fadeOut(300)
    displaylistmeal(data.meals)
}

function contact() {

    mainContainer.classList.add("d-none");
    dataOfRow.innerHTML = " "
    let data = " ";

    data += `
             
      <div class="row my-5 py-5 ms-md-5 ms-sm-5">
        <div class="col-md-6 py-3">
          <input id="cName" class="form-control " type="text" placeholder="Enter Your Name"
            aria-label="Enter Your Name example">
          <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
            write lettRal only
          </div>
        </div>
        <div class="col-md-6 py-3">
          <input id="cEmail" class="form-control " type="email  " placeholder="Enter Your Email"
            aria-label="Enter Your Email example">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid E-mail
            </div>
        </div>
        <div class="col-md-6 py-3">
          <input id="cPhone" class="form-control " type="number" placeholder="Enter Your Phone"
            aria-label="Enter Your Phone example">
            <div id="PhoneAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter Valid Number
            </div>
        </div>
        <div class="col-md-6 py-3">
          <input id="cAge" class="form-control " type="number" placeholder="Enter Your Age"
            aria-label="Enter Your Age example">
          <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid age
          </div>
        </div>
        <div class="col-md-6 py-3">
          <input id="cPass" class="form-control " type="password" placeholder="Enter Your Password"
            aria-label="Enter Your Password example">
            <div id="password" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Pass
            </div>
        </div>
        <div class="col-md-6  py-3">
          <input id="rePass" class="form-control " type="password" placeholder="Repassword"
            aria-label="Repassword example">
            <div id="repassword" class="alert alert-danger w-100 mt-2 d-none">
                Not matched pass
            </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button id="btnSummit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
      </div>
    
    `

    dataOfRow.innerHTML = data

    let btnSummit = document.getElementById('btnSummit');
let cName = document.getElementById('cName');
let cNameRegex = /^[a-zA-Z]+$/;
let cEmail = document.getElementById('cEmail');
let cEmailRegex = /^[a-zA-Z0-9]+[@](.com)$/;
let cPhone = document.getElementById('cPhone');
let cPhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let cAge = document.getElementById('cAge');
let cAgeRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
let cPass = document.getElementById('cPass');
let cPassRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
let rePass = document.getElementById('rePass');

cName.addEventListener('keyup', () => {
    enableBtn()
    if (cNameRegex.test(cName.value) != true) {
        document.getElementById("nameAlert").classList.replace("d-none", "d-block")
    }
    else {
        document.getElementById("nameAlert").classList.replace("d-block", "d-none")

    }
})
cEmail.addEventListener('keyup', () => {
    enableBtn()
    if (cEmailRegex.test(cEmail.value) != true) {
        document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    }
    else {
        document.getElementById("emailAlert").classList.replace("d-block", "d-none")

    }
})
cPhone.addEventListener('keyup', () => {
    enableBtn()
    if (cPhoneRegex.test(cPhone.value) != true) {
        document.getElementById("PhoneAlert").classList.replace("d-none", "d-block")
    }
    else {
        document.getElementById("PhoneAlert").classList.replace("d-block", "d-none")

    }
})
cAge.addEventListener('keyup', () => {
    enableBtn()
    if (cAgeRegex.test(cAge.value) != true) {
        document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    }
    else {
        document.getElementById("ageAlert").classList.replace("d-block", "d-none")

    }
})
cPass.addEventListener('keyup', () => {
    enableBtn()
    if (cPassRegex.test(cPass.value) != true) {
        document.getElementById("password").classList.replace("d-none", "d-block")
    }
    else {
        document.getElementById("password").classList.replace("d-block", "d-none")

    }
})
rePass.addEventListener('keyup', () => {
    enableBtn()
    if (cPassRegex.test(rePass.value) != true && rePass.value != cPass.value) {
        document.getElementById("repassword").classList.replace("d-none", "d-block")

    }
    else {
        document.getElementById("repassword").classList.replace("d-block", "d-none")

    }
})

function enableBtn() {
    if (cNameRegex.test(cName.value) == true &&
        cEmailRegex.test(cEmail.value) == true &&
        cPhoneRegex.test(cPhone.value) == true &&
        cAgeRegex.test(cAge.value) == true &&
        cPassRegex.test(cPass.value) == true &&
        cPassRegex.test(rePass.value) == true) {
        btnSummit.removeAttribute("disabled")
    }
    else
        btnSummit.setAttribute("disabled", true)
}
}

