import { printLine } from './modules/print';
import ReactDOM from 'react-dom';
import React from 'react';
import { getImage } from './api';

console.log('Content script works! It should only load on Google.');

let lastSearch = '';

const App = () => {
  React.useEffect(() => {
    addGenerationButton();
    updateImages();
  }, []);

  return <div id="extension-ui"></div>;
};
const container = document.querySelector('#main');
if (container) {
  container.style.display = 'none';
}

setTimeout(() => {
  const root = document.createElement('div');
  root.id = 'generative-web';

  document.body.appendChild(root);
  ReactDOM.render(<App />, root);
}, 100);

const addGenerationButton = () => {
  const button = document.querySelectorAll(
    '[aria-label="I\'m Feeling Lucky"]'
  )[1];
  console.log('Button found!', button);
  if (!button) return;
  button.value = 'Generate!';
  // prevent default on all mouse over, hover, etc. and console log on the event
  button.addEventListener('mouseover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Mouse over button!');
  });

  button.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button mouse down!');
  });
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked!');

    // navigate to the new location
    const generationInput = document.querySelector('[class="gLFyf"]');
    /// reformat for search
    const search = generationInput.value.replace(' ', '+');
    console.log('Search query:', search);
    const url = 'https://www.google.com/search?q=' + search;

    window.location.href = url;
  });
};

const updateImages = async () => {
  // wait for images to load
  console.log('Waiting for images to load...');
  console.log('Checking for images...');
  let images = document.querySelector('[jscontroller="fhcUyb"]').children[0]
    .children;
  const imageTitle = document.querySelector('.GmE3X');
  const barThing = document.querySelector('g-expandable-content');

  if (!images) return;
  if (!imageTitle) return;
  if (!barThing) return;
  barThing.style.display = 'none';

  // save the get parameters
  const params = new URLSearchParams(window.location.search);
  // get the search query
  const search = params.get('q');
  console.log('Search query:', search);
  imageTitle.textContent = 'AI Generated ' + search;
  // turn the HTML collection into an array
  images = Array.from(images);
  // loop through the images and add the src to the image
  // images.forEach((image) => {
  //   // image.style.display = 'none';
  // });

  const newImages = await getImage(search);
  console.log('New images:', newImages);
  // loop through the images and add the src to the image
  images.forEach((image) => {
    // image.querySelector('img').src = newImages[0];
    const randomImage = selectAtRandom(newImages, 0);
    image.querySelector('img').src = randomImage;
    // image.style.display = 'inline-block';
  });
  container.style.display = 'block';
};

const selectAtRandom = (array) => {
  const randomImage = array[Math.floor(Math.random() * array.length)];

  const index = array.indexOf(randomImage);
  if (index > -1) {
    array.splice(index, 1);
  }
  return randomImage?.src;
};
