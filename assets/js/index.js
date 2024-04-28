

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading").fadeOut(2000)
        $("body").css("overflow", "visible")
    })
})

//------------------------------------------------------ Close Navbar------------------------------------------------------//
function closeNav() {
    let navWidth = $(".nav_bar").outerWidth();
    $(".nav").animate({ left: -navWidth }, 500)
    $("#nav_btn").addClass("fa-bars");
    $("#nav_btn").removeClass("fa-x");
    $(".nav_links ul li").animate({
        top: "300px"
    }, 500)
}

//------------------------------------------------------ Open Navbar------------------------------------------------------//
function openNav() {
    $(".nav").animate({ left: 0 }, 500)
    $("#nav_btn").addClass("fa-x");
    $("#nav_btn").removeClass("fa-bars");
    for (let i = 0; i < 5; i++) {
        $(".nav_links li").eq(i).animate({
            top: "0px"
        }, (i + 3) * 100)
    }
}

//------------------------------------------------------ Open and Close Navbar------------------------------------------------------//
$("#nav_btn").on("click", () => {
    if ($(".nav").css("left") == "0px") {
        closeNav()
        console.log("yes")
    } else {
        openNav()
        console.log("No")
    }
})

//------------------------------------------------------ Display Meals------------------------------------------------------//
function displayMeals(array) {
    let content = "";
    for (let i = 0; i < array.length; i++) {
        content += `
        <div class="col-md-3 overflow-hidden cursor_pointer" onclick="getMealDetails('${array[i].idMeal}')">
        <div class="inner overflow-hidden position-relative rounded-2" ">
            <img src="${array[i].strMealThumb}" class="d-block w-100" alt="">
            <div class="layer position-absolute top-0 start-0 bottom-0 end-0 bg-white bg-opacity-75 d-flex align-items-center ps-2">
                <h3>${array[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    }
    $("#rowData").html(content)
}

//------------------------------------------------------ Show Search Page------------------------------------------------------//
$("#search_link").on("click", () => {
    closeNav()
    $("#rowData").html("")
    $("#searchMeals").html(`<div class="container p-5">
    <div class="inputs py-5 d-flex gap-4">
        <input type="text" id="searchByName" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" placeholder="Search By Name">
        <input type="text" id="searchByLetter" onkeyup="searchByLetter(this.value)" class="form-control bg-transparent text-white"
            placeholder="Search By First Letter">
    </div></div>`)
});

//------------------------------------------------------ Search By Name------------------------------------------------------//
async function searchByName(term) {
    closeNav()
    $("#rowData").html("")
    $(".loading").fadeIn(500);
    console.log($("#loading"))
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading").fadeOut(500);
}

//------------------------------------------------------ Search By First Letter------------------------------------------------------//
async function searchByLetter(term) {
    closeNav()
    $("#rowData").html("")
    $(".loading").fadeIn(500);
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading").fadeOut(500);
}


//------------------------------------------------------ Getting Categories Data------------------------------------------------------//
async function getCategories() {
    $(".loading").fadeIn(500);
    $("#rowData").html("")
    $("#searchMeals").html("")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
    $(".loading").fadeOut(500);
}

//------------------------------------------------------ Display Categories Data------------------------------------------------------//
function displayCategories(array) {
    let content = "";
    for (let i = 0; i < array.length; i++) {
        content += `
            <div class="col-md-3 overflow-hidden">
                <div class="inner overflow-hidden position-relative rounded-2 cursor_pointer" onclick="getCategoryMeals('${array[i].strCategory}')">
                    <img src="${array[i].strCategoryThumb}" class="d-block w-100" alt="">
                    <div class="layer text-center position-absolute top-0 start-0 bottom-0 end-0 bg-white bg-opacity-75 d-flex align-items-center p-2 flex-column">
                    <h3>${array[i].strCategory}</h3>
                    <p>${array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p></div>
                </div>
            </div>
        `;
    }
    $("#rowData").html(content);
}

//------------------------------------------------------ Getting Area Meals------------------------------------------------------//
async function getArea() {
    $("#rowData").html("")
    $(".loading").fadeIn(300)
    $("#searchMeals").html("")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    displayArea(response.meals)
    $(".loading").fadeOut(300)
}

//------------------------------------------------------ Display Area------------------------------------------------------//
function displayArea(array) {
    let content = "";
    for (let i = 0; i < array.length; i++) {
        content += `
        <div class="col-md-3 overflow-hidden" onclick="getAreaMeals('${array[i].strArea}')">
        <div class="rounded-2 text-center text-white cursor_pointer">
                        <i class=" fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${array[i].strArea}</h3>
                </div>
        </div>
        `
    }
    $("#rowData").html(content);
}

//------------------------------------------------------ Getting Ingredients Data ------------------------------------------------------//
async function getIngredients() {
    $("#rowData").html("")
    $(".loading").fadeIn(300)
    $("#searchMeals").html("")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    console.log(response.meals);
    displayIngredients(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)
}

//------------------------------------------------------ Display Ingredients ------------------------------------------------------//
function displayIngredients(array) {
    closeNav()
    let content = "";
    for (let i = 0; i < array.length; i++) {
        content += `
        <div class="col-md-3 text-white">
                <div class="rounded-2 text-center cursor_pointer" onclick="getIngredientsMeals('${array[i].strIngredient}')">
                        <i class="fa-solid fa-drumstick-bite fs-1 mb-2"></i>
                        <h3>${array[i].strIngredient}</h3>
                        <p>${array[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    $("#rowData").html(content);
}

//------------------------------------------------------ Display Contact Use ------------------------------------------------------//
function showContactUs() {
    $("#rowData").html(`
    <div class="custom_width d-flex align-items-center justify-content-center vh-100 mx-auto text-white">
    <div class="container">
        <div class="row g-3">
            <div class="col-md-6">
                <input type="text" onKeyup="checkValidation()" class="form-control bg-transparent text-white" id="nameInput" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 my-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input type="mail" onKeyup="checkValidation()" class="form-control bg-transparent text-white" id="mailInput"
                    placeholder="Enter Your Email">
                <div id="mailAlert" class="alert alert-danger w-100 my-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input type="number" onKeyup="checkValidation()" class="form-control bg-transparent text-white" id="numInput"
                    placeholder="Enter Your Phone Number">
                <div id="phoneAlert" class="alert alert-danger w-100 my-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input type="number" onKeyup="checkValidation()" class="form-control bg-transparent text-white" id="ageInput"
                    placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 my-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input type="password" onKeyup="checkValidation()" class="form-control bg-transparent text-white" id="passInput"
                    placeholder="Enter Your Password">
                <div id="passAlert" class="alert alert-danger w-100 my-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input type="password" onKeyup="checkValidation()" class="form-control bg-transparent text-white" id="rePassword"
                    placeholder="Enter Re-Password">
                <div id="rePassAlert" class="alert alert-danger w-100 my-2 d-none">
                    Enter valid repassword
                </div>
            </div>
            </div>
            <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-outline-danger mt-3" id="submitBtn" disabled>Submit</button>
            </div>
    </div>
</div>
    `)
    $("#nameInput").on("focus", () => {
        nameFocused = true;
    })
    $("#mailInput").on("focus", () => {
        mailFocused = true;
    })
    $("#numInput").on("focus", () => {
        phoneFocused = true;
    })
    $("#ageInput").on("focus", () => {
        ageFocused = true;
    })
    $("#passInput").on("focus", () => {
        passFocused = true;
    })
    $("#rePassword").on("focus", () => {
        rePassFocused = true;
    })
}

//------------------------------------------------------ Getting Categories Meals------------------------------------------------------//
async function getCategoryMeals(cat) {
    $(".loading").fadeIn(500);
    $("#rowData").html("")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(500);
}

//------------------------------------------------------ Getting Area Meals------------------------------------------------------//
async function getAreaMeals(area) {
    $(".loading").fadeIn(500);
    $("#rowData").html("")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(500);
}

//------------------------------------------------------ Getting Ingredients Meals------------------------------------------------------//
async function getIngredientsMeals(ingr) {
    $(".loading").fadeIn(500);
    $("#rowData").html("")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".loading").fadeOut(500);
}

//------------------------------------------------------ Getting Meals Details Data ------------------------------------------------------//
async function getMealDetails(id) {
    $("#rowData").html("")
    $(".loading").fadeIn(300)
    $("#searchMeals").html("")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    console.log(response.meals[0]);
    displayMealDetails(response.meals[0])
    $(".loading").fadeOut(300)
}

//------------------------------------------------------ Display Meals Details Data ------------------------------------------------------//
function displayMealDetails(meal) {
    $("#searchMeals").html("")
    $(".loading").fadeIn(300)
    let recipes = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class=" d-inline-block py-2 px-3 bg-white text-primary rounded-3 m-1 fs-5">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsString = ''
    for (let i = 0; i < tags.length; i++) {
        tagsString += `
        <li class="d-inline-block py-2 px-3 bg-white text-primary rounded-3 m-1 fs-6">${tags[i]}</li>`
    }
    let content = "";
    content += `
    <div class="col-md-4 text-white">
        <img src="${meal.strMealThumb}" class="d-block w-100" alt="">
        <h3>${meal.strMeal}</h3>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h4><span class="fw-bold">Area :</span> ${meal.strArea}</h4>
        <h4><span class="fw-bold">Category:</span> ${meal.strCategory}</h4>
        <h4><span class="fw-bold">Recipes:</span>
            <ul class="list-unstyled my-3">
            ${recipes}
            </ul>
        </h4>
        <h4><span class="fw-bold">Tags:</span>
            <ul class="list-unstyled my-3">
            ${tagsString}
            </ul>
        </h4>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
    `
    $(".loading").fadeOut(300)
    $("#rowData").html(content);
}

//------------------------------------------------------ Links Events------------------------------------------------------//
// Event For Display Categories
$("#cat_link").on("click", () => {
    closeNav()
    getCategories();
});

// Event For Display Areas
$("#area_link").on("click", () => {
    closeNav()
    getArea()
});

// Event For Display Ingredients
$("#ingredients_link").on("click", () => {
    closeNav()
    getIngredients()
});

// Event For Display Contacts
$("#contact_link").on("click", () => {
    closeNav()
    showContactUs()
});

//------------------------------------------------------ Validate Inputs------------------------------------------------------//
function nameValidate() {
    let re = /^[A-Za-z]{10,}$/;
    return (re.test(document.getElementById("nameInput").value));
}

function emailValidate() {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return (re.test(document.getElementById("mailInput").value));
}

function phoneValidate() {
    let re = /^(011|010|012|015)\d{8,}$/;
    return (re.test(document.getElementById("numInput").value));
}

function ageValidate() {
    let re = /^(1[8-9]|[2-9][0-9]|100)$/;
    return (re.test(document.getElementById("ageInput").value));
}

function PasswordValidate() {
    let re = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>?,./\\|~-])[A-Za-z\d!@#$%^&*()_+={}\[\]:;<>?,./\\|~-]{8,}$/;
    return (re.test(document.getElementById("passInput").value));
}

function rePasswordValidate() {
    return document.getElementById("rePassword").value === document.getElementById("passInput").value;
}

//------------------------------------------------------ Apply Validation------------------------------------------------------//
let nameFocused = false;
let mailFocused = false;
let phoneFocused = false;
let ageFocused = false;
let passFocused = false;
let rePassFocused = false;
function checkValidation() {
    if (nameFocused) {
        if (nameValidate() !== true) {
            $("#nameAlert").removeClass("d-none").addClass("d-block");
        } else {
            $("#nameAlert").removeClass("d-block").addClass("d-none");
        }
    }
    if (mailFocused) {
        if (emailValidate() !== true) {
            $("#mailAlert").removeClass("d-none").addClass("d-block");
        } else {
            $("#mailAlert").removeClass("d-block").addClass("d-none");
        }
    }
    if (phoneFocused) {
        if (phoneValidate() !== true) {
            $("#phoneAlert").removeClass("d-none").addClass("d-block");
        } else {
            $("#phoneAlert").removeClass("d-block").addClass("d-none");
        }
    }
    if (ageFocused) {
        if (ageValidate() !== true) {
            $("#ageAlert").removeClass("d-none").addClass("d-block");
        } else {
            $("#ageAlert").removeClass("d-block").addClass("d-none");
        }
    }
    if (passFocused) {
        if (PasswordValidate() !== true) {
            $("#passAlert").removeClass("d-none").addClass("d-block");
        } else {
            $("#passAlert").removeClass("d-block").addClass("d-none");
        }
    }
    if (rePassFocused) {
        if (rePasswordValidate() !== true) {
            $("#rePassAlert").removeClass("d-none").addClass("d-block");
        } else {
            $("#rePassAlert").removeClass("d-block").addClass("d-none");
        }
    }
    if (nameValidate() && emailValidate() && phoneValidate() && ageValidate() && PasswordValidate() && rePasswordValidate()) {
        document.getElementById("submitBtn").removeAttribute("disabled")
    } else {
        document.getElementById("submitBtn").setAttribute("disabled", true)
    }
}