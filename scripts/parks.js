import { locationsArray } from "./data/locationData.js";
import { nationalParksArray } from "./data/nationalParkData.js";
import { parkTypesArray } from "./data/parkTypeData.js";

const locationSelect = document.getElementById("park-location");
const typeSelect = document.getElementById("park-type");
const viewAllBtn = document.getElementById("view-all-btn");
const parksContainer = document.getElementById("parks-container");

const populateLocations = () => {
  locationsArray.forEach((e) => {
    return (locationSelect.innerHTML += `<option value="${e}">${e}</option>`);
  });
};

const populateTypes = () => {
  parkTypesArray.forEach((e) => {
    return (typeSelect.innerHTML += `<option value="${e}">${e}</option>`);
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
      parksContainer.innerHTML += generatePark(park);
    }
  });
};

const populateParksByType = () => {
  parksContainer.innerHTML = "";
  nationalParksArray.forEach((park) => {
    if (
      park.LocationName.toLowerCase().includes(typeSelect.value.toLowerCase())
    ) {
      parksContainer.innerHTML += generatePark(park);
    }
  });
};

const populateAllParks = () => {
  parksContainer.innerHTML = "";
  nationalParksArray.forEach((park) => {
    parksContainer.innerHTML += generatePark(park);
  });
};

populateLocations();
populateTypes();
locationSelect.addEventListener("change", populateParksByLocation);
typeSelect.addEventListener("change", populateParksByType);
viewAllBtn.addEventListener("click", populateAllParks);
