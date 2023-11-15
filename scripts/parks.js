"use strict";

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

const createParkCard = (park, index) => {
  const card = `
  <div class="col my-3">
    <div class="card col mx-auto my-3 card-park h-100" 
      data-bs-toggle="modal" data-bs-target="#park-${index}-modal"
      id="park-${index}" style="max-width: 18rem;">
      <div class="card-body">
        <h5 class="card-title h-50">${park.LocationName}</h5>
        <p class="card-text">${park.City}, ${park.State}</p>
      </div>
    </div>
  </div>`;

  return card;
};

const createParkModal = (park, index) => {
  // since park names can have two words separated by a space (eg. Mt. Washington), join them with a hypen
  // this ensures that the #id for each park is a single word
  const parkLabel = park.LocationName.split(" ").join("-");

  // Pad 0's in front of valid Zip Codes that are not at least 5 numbers
  if (park.ZipCode !== 0 && park.ZipCode.toString().length < 5) {
    const newZipCode = park.ZipCode.toString().padStart(5, "0");
    park.ZipCode = newZipCode;
  }

  const parkAddress = park.Address
    ? `<p class="m-0"><span class="fw-bold">Address: </span>${park.Address}</p>`
    : "";
  const parkZipcode = park.ZipCode
    ? `<p class="m-0"><span class="fw-bold">Zip Code: </span>${park.ZipCode}</p>`
    : "";
  const parkPhone = park.Phone
    ? `<p class="m-0"><span class="fw-bold">Phone: </span>${park.Phone}</p>`
    : "";
  const parkFax = park.Fax
    ? `<p class="m-0"><span class="fw-bold">Fax: </span>${park.Fax}</p>`
    : "";
  const parkVisit = park.Visit
    ? `<p class="m-0"><span class="fw-bold">Visit: </span>
            <a href=${park.Visit} target="_blank">${park.Visit}</a>
          </p>`
    : "";

  const modal = `
  <div class="modal fade" id="park-${index}-modal" tabindex="-1"
    aria-labelledby="${parkLabel}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex flex-column justify-content-center">
          <h1 class="modal-title fs-5 mt-3 text-center" 
            id="${parkLabel}">${park.LocationName}</h1>
        </div>
        <div class="modal-body text-start" id="park-${index}-body">
          ${parkAddress}
          <p class="m-0"><span class="fw-bold">City: </span>${park.City}</p>
          <p class="m-0"><span class="fw-bold">State: </span>${park.State}</p>
          ${parkZipcode}
          ${parkPhone}
          ${parkFax}
          ${parkVisit}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" 
          data-bs-dismiss="modal" aria-label="Close">Close</button>
        </div>
      </div>
    </div>
  </div>`;

  // const parkDetails = `<p class='m-0'>${park.LocationName}</p>
  //   <p class='m-0'>${park.Address ? park.Address + ", " : ""}
  //   ${park.City}, ${park.State}
  //   ${park.ZipCode ? ", " + park.ZipCode : ""}</p>
  //   ${
  //     park.Visit
  //       ? `<p><a href=${park.Visit} target="_blank">${park.Visit}</a></p>`
  //       : ""
  //   }`;

  return modal;
};

const populateParksByLocation = () => {
  showElement(document.getElementById("spinner"));
  parksContainer.innerHTML = "";

  setTimeout(() => {
    nationalParksArray.forEach((park, index) => {
      if (park.State === locationSelect.value) {
        parksContainer.insertAdjacentHTML(
          "beforeend",
          createParkCard(park, index) + createParkModal(park, index)
        );
      }
    });

    if (parksContainer.children.length === 0) {
      parksContainer.insertAdjacentHTML("beforeend", "<h1>No results</h1>");
    }
    hideElement(document.getElementById("spinner"));
  }, 0);
};

const populateParksByType = () => {
  showElement(document.getElementById("spinner"));
  parksContainer.innerHTML = "";

  setTimeout(() => {
    nationalParksArray.forEach((park, index) => {
      if (
        park.LocationName.toLowerCase().includes(typeSelect.value.toLowerCase())
      ) {
        parksContainer.insertAdjacentHTML(
          "beforeend",
          createParkCard(park, index) + createParkModal(park, index)
        );
      }
    });

    if (parksContainer.children.length === 0) {
      parksContainer.insertAdjacentHTML("beforeend", "<h1>No results</h1>");
    }
    hideElement(document.getElementById("spinner"));
  }, 0);
};

const populateAllParks = () => {
  // Since there are 359 parks, waiting for all parks to load at once can freeze the page
  // Thus, utilizing a spinner to signal that the results are loading can improve the user experience
  showElement(document.getElementById("spinner"));
  parksContainer.innerHTML = "";

  setTimeout(() => {
    nationalParksArray.forEach((park, index) => {
      parksContainer.insertAdjacentHTML(
        "beforeend",
        createParkCard(park, index) + createParkModal(park, index)
      );
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
