import { mountainsData } from "./data/mountainData.js";
import * as Util from "./utils.js";

const mountainsArray = Util.sortByKey(mountainsData, "name");

const mountainsContainer = document.getElementById("mountains-container");

const createMountainCard = (mountain, index) => {
  const card = `
  <div class="card col-3 mx-auto my-3" id="mountain-${index}" data-bs-toggle="modal" data-bs-target="#mountain-${index}-modal" style="width: 18rem;">
    <img src="images/mountains/${mountain.img}" class="card-img-top" alt="${mountain.name}">
    <div class="card-body">
      <h5 class="card-title text-center">${mountain.name}</h5>
    </div>
  </div>`;
  return card;
};

const createMountainModal = (mountain, index) => {
  // since mountain names can have two words separated by a space (eg. Mt. Washington), join them with a hypen
  // this ensures that the id for each mountain is a single word
  const mountainLabel = mountain.name.split(" ").join("-");
  const modal = `
  <div class="modal fade" id="mountain-${index}-modal" tabindex="-1" aria-labelledby="${mountainLabel}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex flex-column justify-content-center">
          <img src="images/mountains/${mountain.img}" class="card-img-top" alt="${mountain.name}">
          <h1 class="modal-title fs-5" id="${mountainLabel}">${mountain.name}</h1>
        </div>
        <div class="modal-body text-center">
          <p class="text-start">${mountain.desc}</p>
          <p><span class="fw-bold">Elevation: </span>${mountain.elevation}</p>
          <p><span class="fw-bold">Effort: </span>${mountain.effort}</p>
          <p><span class="fw-bold">Latitude: </span>${mountain.coords.lat}</p>
          <p><span class="fw-bold">Longitude: </span>${mountain.coords.lng}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  return modal;
};

// create a card and modal for each mountain
const populateMountains = () => {
  mountainsArray.forEach((mountain, index) => {
    // 'beforeend' inserts each mountain one after another
    mountainsContainer.insertAdjacentHTML(
      "beforeend",
      createMountainCard(mountain, index) + createMountainModal(mountain, index)
    );
  });
};

populateMountains();
