"use strict";

import { mountainsData } from "./data/mountainData.js";
import { sortByKey, getSunsetForMountain } from "./utils.js";

const mountainSelect = document.getElementById("mountain-select");
const mountainsArray = sortByKey(mountainsData, "name");
const mountainsContainer = document.getElementById("mountains-container");

const createMountainCard = (mountain, index) => {
  const card = `
  <div class="card col-3 mx-auto my-3 card-mountain border-light-subtle border-5"
    id="mountain-${index}" style="width: 18rem;">
    <img src="assets/images/mountains/${mountain.img}" class="card-img-top" alt="${mountain.name}">
    <div class="card-body bg-dark">
      <h5 class="card-title text-center text-light">${mountain.name}</h5>
    </div>
  </div>`;
  return card;
};

const createMountainModal = (mountain, index) => {
  // since mountain names can have two words separated by a space (eg. Mt. Washington), join them with a hypen
  // this ensures that the #id for each mountain is a single word
  const mountainLabel = mountain.name.split(" ").join("-");
  const modal = `
  <div class="modal fade" id="mountain-${index}-modal" tabindex="-1" aria-labelledby="${mountainLabel}" aria-hidden="true"
    data-lng=${mountain.coords.lng} data-lat=${mountain.coords.lat}>
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-3 border-light">
        <div class="modal-header d-flex flex-column justify-content-center">
          <img src="assets/images/mountains/${mountain.img}" class="card-img-top" alt="${mountain.name}">
          <h1 class="modal-title fs-5 mt-3" id="${mountainLabel}">${mountain.name}</h1>
        </div>
        <div class="modal-body text-center" id="mountain-${index}-body">
          <p class="text-start">${mountain.desc}</p>
          <p class="m-0"><span class="fw-bold">Elevation: </span>${mountain.elevation} ft.</p>
          <p class="m-0"><span class="fw-bold">Effort: </span>${mountain.effort}</p>
          <p class="m-0"><span class="fw-bold">Latitude: </span>${mountain.coords.lat}</p>
          <p class="m-0"><span class="fw-bold">Longitude: </span>${mountain.coords.lng}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" 
          data-bs-dismiss="modal" aria-label="Close">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  return modal;
};

const showMountainModal = (selectedMountain) => {
  // selectedMountain is a string in the form "mountain-#"
  // extract the # from the selectedMountain value
  const index = selectedMountain.split("-")[1];
  const mountain = mountainsArray[index];
  if (mountain) {
    // first, check if a modal for the mountain already exists
    let mountainModalElement = document.getElementById(
      `${selectedMountain}-modal`
    );
    if (!mountainModalElement) {
      // if the mountain modal doesn't exist, then create a new one and add it to the HTML
      const mountainModal = createMountainModal(mountain, index);
      mountainsContainer.insertAdjacentHTML("beforeend", mountainModal);
      mountainModalElement = document.getElementById(
        `${selectedMountain}-modal`
      );
    }

    displaySunsetTimes(selectedMountain);
    const modal = new bootstrap.Modal(mountainModalElement);
    modal.show();
  }
};

const createSunsetText = (sunsetData) => {
  const sunrise = `<p class="m-0"><span class="fw-bold">Sunrise: </span>${sunsetData.sunrise} UTC</p>`;
  const sunset = `<p class="m-0"><span class="fw-bold">Sunset: </span>${sunsetData.sunset} UTC</p>`;
  return sunrise + sunset;
};

const displaySunsetTimes = async (mountainID) => {
  const mountainBody = document.querySelector(`#${mountainID}-body`);

  // Every mountainBody is guaranteed to have 5 or 7 (with sunrise/sunset) children
  // If it does not have 5 children, then sunrise/sunset times have already been fetched
  // and added as child nodes to mountainBody
  if (mountainBody.children.length != 5) {
    return;
  }

  const mountain = document.querySelector(`#${mountainID}-modal`);
  const coords = {
    lat: mountain.getAttribute("data-lat"),
    lng: mountain.getAttribute("data-lng"),
  };

  const sunsetData = await getSunsetForMountain(coords.lat, coords.lng);
  mountainBody.insertAdjacentHTML("beforeend", createSunsetText(sunsetData));
};

// create a card and modal for each mountain
const populateMountains = () => {
  mountainsArray.forEach((mountain, index) => {
    const mountainOption = new Option(mountain.name, `mountain-${index}`);
    mountainSelect.appendChild(mountainOption);
    // 'beforeend' inserts each mountain one after another
    mountainsContainer.insertAdjacentHTML(
      "beforeend",
      createMountainCard(mountain, index)
    );
  });
};

/**
 * Execute the following code when the DOM is ready
 */

populateMountains();

/**
 * The 2 event listeners, "mouseup" and "blur" on the select element
 * work in tandem to allow the same option to be selected
 * This allows the user to re-open the same mountain without having to select a different one first
 * When the select menu is initially opened, isMountainSelected will turn True
 * This will then allow the If statement to run when an option is selected
 */
let isMountainSelected = false;
mountainSelect.addEventListener("mouseup", () => {
  // Since the 'else' statement has already set isMountainSelected to true,
  // selecting an option will trigger the 'if' statement
  if (isMountainSelected) {
    showMountainModal(mountainSelect.value);
  } else {
    // set to True when the select menu is opened
    isMountainSelected = true;
  }
});

/**
 * The Blur event will reset isMountainSelected to false,
 * signalling that the select menu is not opened
 */
mountainSelect.addEventListener("blur", () => {
  isMountainSelected = false;
});

/**
 * Instead of fetching all sunrise/sunset times for all mountains at once,
 * only fetch one time for the corresponding mountain that is picked
 */
const allMountainCards = document.querySelectorAll(".card-mountain");
allMountainCards.forEach((card) => {
  card.addEventListener("click", () => {
    showMountainModal(card.id);
  });
});
