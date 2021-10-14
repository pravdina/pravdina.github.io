/* eslint-disable no-shadow */
const pathBefore = 'models/tema_2';
const straightLines = [
  {
    name: 'cycloida',
    title: 'cycloida',
    text: 'cycloida',
  },
  {
    name: 'dini',
    title: 'dini',
    text: 'dini',
  },
  {
    name: 'elips',
    title: 'elips',
    text: 'elips',
  },
  {
    name: 'evolventa',
    title: 'evolventa',
    text: 'evolventa',
  },
  {
    name: 'hyperbola',
    title: 'hyperbola',
    text: 'hyperbola',
  },
  {
    name: 'parabola',
    title: 'parabola',
    text: 'parabola',
  },
  {
    name: 'sinysoida',
    title: 'sinysoida',
    text: 'sinysoida',
  },
];
// Start value
let isDescriptionVisible = false;
// let mode3D = true;
let currentStraightLine = 'cycloida';
let currentTitle = straightLines.find(
  (currentTitle) => currentTitle.name === currentStraightLine,
).title;
let currentText = straightLines.find(
  (currentText) => currentText.name === currentStraightLine,
).text;

// Functions
const updateCurrentLine = (name) => {
  currentStraightLine = name;
  currentTitle = straightLines.find(
    (currentTitle) => currentTitle.name === currentStraightLine,
  ).title;
  currentText = straightLines.find(
    (currentText) => currentText.name === currentStraightLine,
  ).text;
};
const setTitle = (title) => {
  document.getElementById('title').innerHTML = title;
};
const setTheoryText = (theoryText) => {
  document.getElementById('theory_text').innerHTML = theoryText;
};

const showModel = () => {
  document
    .getElementById('model')
    .setAttribute(
      'gltf-model',
      `${pathBefore}/${currentStraightLine}.glb`,
    );
};

const toggleTheoryText = () => {
  document
    .getElementById('theory_text')
    .setAttribute(
      'style',
      `display: ${isDescriptionVisible ? 'none' : 'block'};`,
    );
  isDescriptionVisible = !isDescriptionVisible;
};
const handleLineChange = (e) => {
  if (e.target.tagName === 'LI') {
    updateCurrentLine(e.target.id);
    setTitle(currentTitle);
    setTheoryText(currentText);
    showModel();
  }
};

window.onload = () => {
  setTitle(currentTitle);
  setTheoryText(currentText);
  showModel();
  // Показать/спрятать теоретический текст
  document
    .getElementById('info_btn')
    .addEventListener('click', () => toggleTheoryText());
  // Изменение прямой
  document
    .getElementById('menu_options')
    .addEventListener('click', (e) => handleLineChange(e));
};
