/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */
// Your final submission should have much more data than this, and 
// you should use more than just an array of strings to store it all.

import planetData from './planetData/planets.JSON' assert { type: 'json' };

//create copies of the planetData 
//overall is the reference for adding planets
//planets keeps track of the current planets without filter
//filtered keeps track of current planets with filter
const overallPlanets = [...planetData.planets]; 
let planets = [...planetData.planets]; 
let filteredPlanets = [...planetData.planets];
//boolean to keep track of if exoPlanet filter is on or not
var exoPlanetFilter = true; 

// On initial load, remove a planet to allow "addPlanet" to be used
planets.pop();
// This function adds cards the page to display the data in the array
function showCards(planetData) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    for (let i = 0; i < planetData.length; i++) {
        const planet = planetData[i];
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, planet); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, planet) {
    card.style.display = "block";
    //fill name
    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = planet.name;
    //fill image
    const cardImage = card.querySelector("img");
    cardImage.src = planet.imgurl;
    cardImage.alt = planet.name + " Poster";

    const cardContent = card.querySelector("ul")
    //create bullet points
    const density = document.createElement("li");
    density.textContent = "Density: " + planet.density + "g/cm³";
    const mass = document.createElement("li");
    mass.textContent = "Mass: " + planet.mass + "kg";
    const temperature = document.createElement("li");
    temperature.textContent = "Avg Temperature: " + planet.temperature + "C°";
    const distanceFromSun = document.createElement("li");
    distanceFromSun.textContent = "Distance From Sun: " + planet.distanceFromSun + "km";
    const diameter = document.createElement("li");
    diameter.textContent = "Diameter: " + planet.diameter + "km";
    //bullet points add to card
    cardContent.appendChild(diameter);
    cardContent.appendChild(distanceFromSun);
    cardContent.appendChild(density); 
    cardContent.appendChild(mass); 
    cardContent.appendChild(temperature); 

    // You can use console.log to help you debug!
    // View the output by right clicking on your website,
    // select "Inspect", then click on the "Console" tab    
    console.log("new card:", planet.name, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
function updateButtons(exoPlanet = false) {
    const removeButton = document.getElementById("removePlanetButton");
    const addButton = document.getElementById("addPlanetButton");

    if (planets.length === 0 || filteredPlanets.length === 0) {
        removeButton.classList.add("deactivated-button");
    } else {
        removeButton.classList.remove("deactivated-button");
    }
    //if the filter is turned on and all the solar system planets are there, disable button
    //if exoPlanet is being added, it means that all solar system planets already added
    if (exoPlanet && exoPlanetFilter == false){
        addButton.classList.add("deactivated-button");
    } else if (planets.length >= overallPlanets.length) {
        addButton.classList.add("deactivated-button");
    } else {
        addButton.classList.remove("deactivated-button");
    }

    
}
//updates button UI
//updates if exo planets are to be displayed
//updates the cards shown on screen 
function updateUI(exoPlanet = false){
    filteredPlanets = filterExo();
    updateButtons(exoPlanet);
    showCards(filteredPlanets);
}


//filter removes planets
function removeLastCard() {
    //need to remove the right element from planets with the filter on
    if (exoPlanetFilter == false){
        //get last element from filteredPlanets
        planets.splice(exoPlanetFilter.length ,1); 
        updateUI();
    }
    //if no filter remove last el
    else if (planets.length > 0){
        planets.pop();
        updateUI();
    }
}
//adding needs to search for next availible planet to be dynamic 
function addCard() {
    //when adding a planet it isn't dynamically sorted, so update UI to show no sort pattern
    const sortLabel = document.getElementById("sort-method");
     

    //find next availible planet to add
    const planetToAdd = overallPlanets.find(planet => !planets.includes(planet));
    if (exoPlanetFilter == false && planetToAdd.exoPlanet == true){
        updateUI(planetToAdd.exoPlanet);
        sortLabel.innerText = "None"; 
    }

    // If such a planet exists, add it to planets and update the UI
    else if (planetToAdd) {
        planets.push(planetToAdd);
        updateUI();
        sortLabel.innerText = "None";
    }
}

//sort the planets 
function sortPlanets(method) {
    const sortLabel=  document.getElementById("sort-method");
    // Sort based on the method provided (diameter, temperature, distance)
    if (method === 'diameter') {
        planets.sort((a, b) => Number(a.diameter) - Number(b.diameter));
        sortLabel.innerText = "Diameter";
    } else if (method === 'temperature') {
        planets.sort((a, b) => Number(a.temperature) - Number(b.temperature));
        sortLabel.innerText = "Temperature";
    } else if (method === 'distance') {
        planets.sort((a, b) => Number(a.distanceFromSun) - Number(b.distanceFromSun));
        sortLabel.innerText = "Distance from sun";
    }
    updateUI();
}

//update boolean everytime change detected
//switching the switch on essentially hides the exoplanets so they cannot be editted by remove or add Planet functionality
//by switching the switch to show exoplanets, they are brought back in their previous state before hiding
function toggleExoPlanets(){
    exoPlanetFilter = !exoPlanetFilter; 
    updateUI();
}

//filter the exoPlanets from solar system planets
function filterExo(){
    if (exoPlanetFilter == false){
        return planets.filter(planet => !planet.exoPlanet)
    } else {
        return planets; 
    }
}
//handle pageload and also button clicks or checkboxes
document.addEventListener('DOMContentLoaded', () => {
    showCards(planets);
    const addPlanetButton = document.getElementById('addPlanetButton'); // Ensure your button has this ID
    if (addPlanetButton){
        addPlanetButton.addEventListener('click', () => addCard());
    }
    const removeButton = document.getElementById('removePlanetButton'); // Ensure your button has this ID
    if (removeButton) {
        removeButton.addEventListener('click', () => removeLastCard(planets)); 
    }

    const sortDiameterButton = document.getElementById('diameterSort');
    sortDiameterButton.addEventListener('click', () => sortPlanets('diameter')); 
    

    const sortTemperatureButton = document.getElementById('temperatureSort');
    sortTemperatureButton.addEventListener('click', () => sortPlanets('temperature')); 
    

    const sortDistanceButton = document.getElementById('distanceSort');
    sortDistanceButton.addEventListener('click', () => sortPlanets('distance')); 
    
    const exoToggle = document.getElementById('exoToggle');
    exoToggle.addEventListener('change', ()=> toggleExoPlanets());

});






