// Scroll to top button and event listeners
const btnBackToTop = document.getElementById("btn-back-to-top");
window.addEventListener("scroll", scrollFunction);
btnBackToTop.addEventListener("click", backToTop);

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnBackToTop.style.display = "block";
  } else {
    btnBackToTop.style.display = "none";
  }
}

// Scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export const hideElement = (element) => {
  element.classList.remove("d-block");
  element.classList.add("d-none");
}

export const showElement = (element) => {
  element.classList.remove("d-none");
  element.classList.add("d-block");
}

export const sortByKey = (array, key) => {
  // sort by alphabetical/ascending order
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  });
};

// function that can "fetch" the sunrise/sunset times
export const getSunsetForMountain = async (lat, lng) => {
  let response = await fetch(
    `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=today`
  );
  let data = await response.json();
  let sunrise = data.results.sunrise;
  let sunset = data.results.sunset;
  return { sunrise, sunset };
};
