import * as React from 'react';
export default function DataSorting(attr,arr){
    // Define the sorting function to be used
  const sortObjectValuesDesc = obj => {
    const sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(sortedEntries);
  };

  // Find the index of the object with "Team" value of attr
  const gpIndex = arr.findIndex(obj => obj.Team === attr);

  // Get the object at the attr index and sort its values in descending order
  const gpObj = arr[gpIndex];
  const sortedGpObj = sortObjectValuesDesc(gpObj);

  // Sort all other objects using the sorted GP object keys
  const sortedArr = arr.map(obj => {
    if (obj.Team === attr) return sortedGpObj;
    const sortedObj = {};
    Object.keys(sortedGpObj).forEach(key => {
      sortedObj[key] = obj[key];
    });
    return sortedObj;
  });
  sortedArr.columns = Object.keys(sortedArr[0]);
  return sortedArr;
}
