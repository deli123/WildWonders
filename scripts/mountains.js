import { mountainsData } from "./data/mountainData.js";
import * as Util from "./utils.js";

const mountainsArray = Util.sortByKey(mountainsData, "name");

const mountainsContainer = document.getElementById("mountains-container");

const populateMountains = () => {
  mountainsArray.forEach((mountain) => {
    // insert each mountain after one another
    mountainsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="col>
        <div class="card" style="width: 14rem;">
          <img src="images/mountains/${mountain.img}" class="card-img-top" alt="${mountain.name}">
          <div class="card-body">
            <h5 class="card-title">${mountain.name}</h5>
          </div>
        </div>
      </div>`
    );
  });
};

populateMountains();
