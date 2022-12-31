import { printLine } from './modules/print';
import ReactDOM from 'react-dom';
import React from 'react';

console.log('Content script works! It should only load on Google.');

const App = () => {
  React.useEffect(() => {
    updateButton();
  }, []);

  return <div id="extension-ui"></div>;
};

setTimeout(() => {
  const root = document.createElement('div');
  root.id = 'generative-web';

  document.body.appendChild(root);
  ReactDOM.render(<App />, root);
}, 500);

const updateButton = () => {
  const button = document.querySelectorAll(
    '[aria-label="I\'m Feeling Lucky"]'
  )[1];
  console.log('Button found!', button);
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
  });
};
