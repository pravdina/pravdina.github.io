/* eslint-disable no-shadow */
const pathBefore = '../models/tema_2';
const helicoidalSurfaces = [
  {
    name: 'cycloida',
    title: 'cycloida',
    text: 'cycloida',
  },
  {
    name: 'dini',
    title: 'Гелікоїд Діні',
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
let currentObject = 'cycloida';
let currentTitle = helicoidalSurfaces.find(
  (currentTitle) => currentTitle.name === currentObject,
).title;
let currentText = helicoidalSurfaces.find(
  (currentText) => currentText.name === currentObject,
).text;

// Functions
const updateCurrentLine = (name) => {
  currentObject = name;
  currentTitle = helicoidalSurfaces.find(
    (currentTitle) => currentTitle.name === currentObject,
  ).title;
  currentText = helicoidalSurfaces.find(
    (currentText) => currentText.name === currentObject,
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
    .setAttribute('gltf-model', `${pathBefore}/${currentObject}.glb`);
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
