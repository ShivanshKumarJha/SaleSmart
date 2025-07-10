export const useLocalStorage = () => {
  const updateLocalStorage = (storageKey, nestedKey, updatedData) => {
    const existingData = JSON.parse(localStorage.getItem(storageKey)) || {};
    // console.log(`Local storage existingData : ${JSON.stringify(existingData)}`);

    const mergedData = {
      ...existingData,
      [nestedKey]: {
        ...existingData[nestedKey],
        ...updatedData,
      },
    };
    // console.log(`mergedData : ${JSON.stringify(mergedData)}`);

    localStorage.setItem(storageKey, JSON.stringify(mergedData));
  };

  return { updateLocalStorage };
};
