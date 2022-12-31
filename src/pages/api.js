export const getImage = async (search) => {
  const url = `https://lexica.art/api/v1/search?q=${search}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log('data', data);
  const images = data.images;
  return images;
};

const selectAtRandom = (array, tries) => {
  const randomImage = array[Math.floor(Math.random() * array.length)];
  if (randomImage.nsfw === true && tries < 25) {
    selectAtRandom(array, tries + 1);
  } else if (tries >= 25) {
    return getErrorImage();
  } else {
    return randomImage.src;
  }
};

export const getErrorImage = () => {
  return 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80';
};
