import { locationsArray } from "./data/locationData.js";
import { nationalParksArray } from "./data/nationalParkData.js";
import { parkTypesArray } from "./data/parkTypeData.js";
import { hideElement, showElement } from "./utils.js";

const locationSelect = document.getElementById("park-location");
const typeSelect = document.getElementById("park-type");
const viewAllBtn = document.getElementById("view-all-btn");
const parksContainer = document.getElementById("parks-container");

const populateLocations = () => {
  locationsArray.forEach((location) => {
    const option = new Option(location, location);
    locationSelect.appendChild(option);
  });
};

const populateTypes = () => {
  parkTypesArray.forEach((type) => {
    const option = new Option(type, type);
    typeSelect.appendChild(option);
  });
};

const generatePark = (park) => {
  const parkDetails = `<p class='m-0'>${park.LocationName}</p>
    <p class='m-0'>${park.Address ? park.Address + ", " : ""}
    ${park.City}, ${park.State}
    ${park.ZipCode ? ", " + park.ZipCode : ""}</p>
    ${
      park.Visit
        ? `<p><a href=${park.Visit} target="_blank">${park.Visit}</a></p>`
        : ""
    }`;

  return parkDetails;
};

const populateParksByLocation = () => {
  parksContainer.innerHTML = "";
  nationalParksArray.forEach((park) => {
    if (park.State === locationSelect.value) {
      parksContainer.insertAdjacentHTML("beforeend", generatePark(park));
    }
  });

  if (parksContainer.children.length === 0) {
    parksContainer.insertAdjacentHTML("beforeend", "<h1>No results</h1>");
  }
};

const populateParksByType = () => {
  parksContainer.innerHTML = "";
  nationalParksArray.forEach((park) => {
    if (
      park.LocationName.toLowerCase().includes(typeSelect.value.toLowerCase())
    ) {
      parksContainer.insertAdjacentHTML("beforeend", generatePark(park));
    }
  });

  if (parksContainer.children.length === 0) {
    parksContainer.insertAdjacentHTML("beforeend", "<h1>No results</h1>");
  }
};

const populateAllParks = () => {
  // Since there are 359 parks, waiting for all parks to load at once can freeze the page
  // Thus, utilizing a spinner to signal that the results are loading can improve the user experience
  showElement(document.getElementById("spinner"));
  parksContainer.innerHTML = "";

  setTimeout(() => {
    nationalParksArray.forEach((park) => {
      parksContainer.insertAdjacentHTML("beforeend", generatePark(park));
    });
    hideElement(document.getElementById("spinner"));
  }, 100);
};

/**
 * Execute the following code whent the DOM is ready
 */

populateLocations();
populateTypes();
locationSelect.addEventListener("change", populateParksByLocation);
typeSelect.addEventListener("change", populateParksByType);
viewAllBtn.addEventListener("click", populateAllParks);
