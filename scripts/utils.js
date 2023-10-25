export const sortByKey = (array, key) => {
  // sort by alphabetical order, or least to greatest
  return array.sort((a, b) => {
      let x = a[key]; 
      let y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
