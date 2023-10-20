import { locationsArray } from "./data/locationData.js";
import { nationalParksArray } from "./data/nationalParkData.js";
import { parkTypesArray } from "./data/parkTypeData.js";

// populate park locations
const locationSelect = document.getElementById("park-location");
const typeSelect = document.getElementById("park-type");
const parksContainer = document.getElementById("parks-container");

const populateLocations = () => {
  locationsArray.forEach((e) => {
    return (locationSelect.innerHTML += `<option value="${e}">${e}</option>`);
  });
};

const populateParksByLocation = () => {
  parksContainer.innerHTML = "";
  nationalParksArray.forEach((park) => {
    if (park.State === locationSelect.value) {
      parksContainer.innerHTML += `<p class='m-0'>${park.LocationName}</p>
      <p class='m-0'>${park.Address ? park.Address + ", " : ""}
      ${park.City}, ${park.State}
      ${park.ZipCode ? ", " + park.ZipCode : ""}</p>
      <p>${
        park.Visit
          ? `<a href=${park.Visit} target="_blank">${park.Visit}</a>`
          : ""
      }</p>`;
    }
  });
};

const populateTypes = () => {
  parkTypesArray.forEach((e) => {
    return (typeSelect.innerHTML += `<option value="${e}">${e}</option>`);
  });
};

const populateParksByType = () => {
  parksContainer.innerHTML = "";
  nationalParksArray.forEach((park) => {
    if (
      park.LocationName.toLowerCase().includes(typeSelect.value.toLowerCase())
    ) {
      parksContainer.innerHTML += `<p class='m-0'>${park.LocationName}</p>
      <p>${park.Address ? park.Address + ", " : ""}
      ${park.City}, ${park.State}
      ${park.ZipCode ? ", " + park.ZipCode : ""}</p>`;
    }
  });
};

populateLocations();
populateTypes();
locationSelect.addEventListener("change", populateParksByLocation);
typeSelect.addEventListener("change", populateParksByType);
