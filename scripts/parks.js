"use strict";

import { locationsArray } from "./data/locationData.js";
import { nationalParksArray } from "./data/nationalParkData.js";
import { parkTypesArray } from "./data/parkTypeData.js";
import { hideElement, showElement } from "./utils.js";

const locationSelect = document.getElementById("park-location");
const typeSelect = document.getElementById("park-type");
const allParkSelect = document.getElementById("park-all");
const viewAllBtn = document.getElementById("view-all-btn");
const parksContainer = document.getElementById("parks-container");

const populateAllParkOptions = () => {
  // nationalParksArray.forEach((park, index) => {
  //   const option = new Option(park.LocationName, `park-${index}`);
  //   allParkSelect.appendChild(option);
  // });
  nationalParksArray.forEach((park, index) => {
    const option = `<li class="park-option" data-park="park-${index}"><a class="dropdown-item" href="#">${park.LocationName}</a></li>`;
    allParkSelect.insertAdjacentHTML("beforeend", option);
  });
};

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
          <p class="m-0"><span class="fw-bold">Latitude: </span>${park.Latitude}</p>
          <p class="m-0"><span class="fw-bold">Longitude: </span>${park.Longitude}</p>
          ${parkVisit}
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

const showParkModal = (selectedPark) => {
  // selectedPark is a string in the form "park-#"
  // extract the # from the selectedPark value
  const index = selectedPark.split("-")[1];
  const park = nationalParksArray[index];
  if (park) {
    // first, check if a modal for the park already exists
    let parkModalElement = document.getElementById(`${selectedPark}-modal`);
    if (!parkModalElement) {
      // if the park modal doesn't exist, then create a new one and add it to the HTML
      const parkModal = createParkModal(nationalParksArray[index], index);
      parksContainer.insertAdjacentHTML("beforeend", parkModal);
      parkModalElement = document.getElementById(`${selectedPark}-modal`);
    }

    const modal = new bootstrap.Modal(parkModalElement);
    modal.show();
  }
};

const populateParksByLocation = () => {
  showElement(document.getElementById("spinner"));
  resetSelection("type");
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
  resetSelection("location");
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
  resetSelection("all");
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

const resetSelection = (category) => {
  if (category === "location" || category === "all") {
    locationSelect.selectedIndex = 0;
  }
  if (category === "type" || category === "all") {
    typeSelect.selectedIndex = 0;
  }
};

const parkSearchFunction = () => {
  const input = parkSearchInput.value.trim().toLowerCase();
  const parkOptions = document.getElementsByClassName("park-option");

  // Convert the HTMLCollection to an array for easier manipulation
  const parkOptionsArray = Array.from(parkOptions);

  parkOptionsArray.forEach((option) => {
    const parkName = option.innerText.toLowerCase();
    option.style.display = parkName.includes(input) ? "block" : "none";
  });
};

/**
 * Execute the following code when the DOM is ready
 */

populateAllParkOptions();
populateLocations();
populateTypes();
locationSelect.addEventListener("change", populateParksByLocation);
typeSelect.addEventListener("change", populateParksByType);
viewAllBtn.addEventListener("click", populateAllParks);

// start at index 2 because index 0 is text, index 1 is the search input
for (let i = 2; i < allParkSelect.childNodes.length; i++) {
  const item = allParkSelect.childNodes[i];
  item.addEventListener("click", () => {
    const selectedPark = item.getAttribute("data-park");
    showParkModal(selectedPark);
  });
}

const parkSearchInput = document.getElementById("park-search");
parkSearchInput.addEventListener("input", parkSearchFunction);
