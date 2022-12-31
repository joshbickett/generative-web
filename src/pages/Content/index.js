import { printLine } from './modules/print';
import ReactDOM from 'react-dom';

console.log('Content script works! It should only load on Google.');

const App = () => {
  return <div id="extension-ui"></div>;
};

setTimeout(() => {
  const root = document.createElement('div');
  root.id = 'generative-web';

  document.body.appendChild(root);
  ReactDOM.render(<App />, root);
}, 500);
