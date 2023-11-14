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

export const sortByKey = (array, key) => {
  // sort by alphabetical/ascending order
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};
