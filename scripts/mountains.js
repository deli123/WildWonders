import { mountainsData } from "./data/mountainData.js";
import * as Util from "./utils.js";

const mountainsArray = Util.sortByKey(mountainsData, "name");

const mountainsContainer = document.getElementById("mountains-container");

const createMountainCard = (mountain) => {
  const card = `
  <div class="card mountain col-3 mx-auto my-3" style="width: 18rem;">
    <img src="images/mountains/${mountain.img}" class="card-img-top" alt="${mountain.name}">
    <div class="card-body">
      <h5 class="card-title text-center">${mountain.name}</h5>
    </div>
  </div>`;
  return card;
};

const createMountainModal = (mountain) => {
  const modal = `
  <div class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">${mountain.name}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;
  return modal;
};

const populateMountains = () => {
  mountainsArray.forEach((mountain) => {
    // insert each mountain after one another
    mountainsContainer.insertAdjacentHTML(
      "beforeend",
      createMountainCard(mountain)
    );
  });

  const mountains = Array.from(document.querySelectorAll('.mountain'));
  mountains.forEach((mountain) => {

  })
};

populateMountains();
