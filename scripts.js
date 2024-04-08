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
/**
 * TODO: 
 *  - Get DataSet of Planets
 *  - Create a plan for the design
 *  - Create card design for the planets
 *  - sort by temperature, by density, by mass... 
 *  - implement
 */
// static 

//Pass in planets array and popualte planets initially with static data

//navBar needed and add/ remove planet 
import planetData from './planetData/planets.JSON' assert { type: 'json' };

const planets = planetData; 


const FRESH_PRINCE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0ecbLBszB2NTkK0ofZnm0wMWUtzkWh90_g&s";
const CURB_POSTER_URL = "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
const EAST_LOS_HIGH_POSTER_URL = "https://i.pinimg.com/736x/4f/d9/94/4fd994c3e084d26f9e5df370a59506b6.jpg";
// This is an array of strings (TV show titles)
let titles = [
    "Fresh Prince of Bel Air",
    "Curb Your Enthusiasm",
    "East Los High"
];


// Your final submission should have much more data than this, and 
// you should use more than just an array of strings to store it all.


// This function adds cards the page to display the data in the array
function showCards(planetData) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    for (let i = 0; i < planetData.planets.length; i++) {
        const planet = planetData.planets[i];
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, planet); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, planet) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = planet.name;;

    const cardImage = card.querySelector("img");
    cardImage.src = planet.imgurl;
    cardImage.alt = planet.name + " Poster";

    const cardContent = card.querySelector("ul")

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
function quoteAlert() {
    console.log("Button Clicked!")
    alert("I guess I can kiss heaven goodbye, because it got to be a sin to look this good!");
}

function removeLastCard() {
    planets.planets.pop(); // Remove last item in titles array
    showCards(planets); // Call showCards again to refresh
}

function sortDiameter() {
    // Assuming planetData.planets is the array you want to sort
    planetData.planets.sort((a, b) => {
        // Convert diameters to numbers if they're not already (just in case)
        const diameterA = Number(a.diameter);
        const diameterB = Number(b.diameter);

        // Compare the diameters for sorting
        return diameterA - diameterB;
    });

    // After sorting, you might want to display the sorted cards
    showCards(planetData);
}

function sortTemperature() {
    // Assuming planetData.planets is the array you want to sort
    planetData.planets.sort((a, b) => {
        // Convert diameters to numbers if they're not already (just in case)
        const tempA = Number(a.temperature);
        const tempB = Number(b.temperature);

        // Compare the diameters for sorting
        return tempA - tempB;
 
    });
    showCards(planetData);
}

function sortDistance(){
    planetData.planets.sort((a, b) => {
        // Convert diameters to numbers if they're not already (just in case)
        const distanceA = Number(a.distanceFromSun);
        const distanceB = Number(b.distanceFromSun);

        // Compare the diameters for sorting
        return distanceA - distanceB;
 
    });
    showCards(planetData);
}
document.addEventListener("DOMContentLoaded", showCards(planets));
//handle button clicks and dropdown
document.addEventListener('DOMContentLoaded', () => {
    const quoteButton = document.getElementById('quote-button'); // Ensure your button has this ID
    if (quoteButton) {
        quoteButton.addEventListener('click', quoteAlert);
    }

    const removeButton = document.getElementById('remove-button'); // Ensure your button has this ID
    if (removeButton) {
        removeButton.addEventListener('click', () => removeLastCard(planets)); // Assuming planets is accessible here
    }

    const sortDiameterButton = document.getElementById('diameterSort');
    if (sortDiameter) {
        sortDiameterButton.addEventListener('click', () => sortDiameter()); // Assuming planets is accessible here
    }

    const sortTemperatureButton = document.getElementById('temperatureSort');
    if (sortTemperature) {
        sortTemperatureButton.addEventListener('click', () => sortTemperature()); // Assuming planets is accessible here
    }

    const sortDistanceButton = document.getElementById('distanceSort');
    if (sortDistance) {
        sortDistanceButton.addEventListener('click', () => sortDistance()); // Assuming planets is accessible here
    }
});






