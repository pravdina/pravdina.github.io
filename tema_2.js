/* eslint-disable no-shadow */
const pathBefore = 'models/tema_1';
const straightLines = [
  {
    name: 'zag_pol',
    title: 'Пряма загального положення',
    text: 'Пряма довільно похила до всіх трьох площин проекцій, жодна з проекцій не паралельна осям.',
  },
  {
    name: 'gor_level',
    title: 'Пряма горизонтального рівня',
    text: 'Пряма паралельна площині π<sub>1</sub>. Фронтальна та профільна проекції паралельні осям, горизонтальна проекція дорівнює самому відрізку: A<sub>1</sub>B<sub>1</sub> = AB.',
  },
  {
    name: 'front_level',
    title: 'Пряма фронтального рівня',
    text: 'Пряма паралельна площині π<sub>2</sub>. Горизонтальна та профільна проекції паралельні осям, фронтальна проекція дорівнює самому відрізку: A<sub>2</sub>B<sub>2</sub> = AB.',
  },
  {
    name: 'prof_level',
    title: 'Пряма профільного рівня',
    text: 'Пряма паралельна площині π<sub>3</sub>. Горизонтальна та фронтальна проекції паралельні осям, профільна проекція дорівнює самому відрізку: A<sub>3</sub>B<sub>3</sub> = AB.',
  },
  {
    name: 'gor_proj',
    title: 'Горизонтально-проєкцююча пряма',
    text: 'Пряма перпендикулярна площині π<sub>1</sub>, паралельна площинам π<sub>2</sub> та π<sub>3</sub>. Проекція на площині π<sub>1</sub> представить собою точку, фронтальна та профільна проекції дорівнюють самому відрізку.',
  },
  {
    name: 'front_proj',
    title: 'Фронтально-проєкцююча пряма',
    text: 'Пряма перпендикулярна площині π<sub>2</sub>, паралельна площинам π<sub>1</sub> та π<sub>3</sub>. Проекція на площині π<sub>2</sub> представить собою точку, горизонтальна та профільна проекції дорівнюють самому відрізку.',
  },
  {
    name: 'prof_proj',
    title: 'Профільно-проєкцююча пряма',
    text: 'Пряма перпендикулярна площині π<sub>3</sub>, паралельна площинам π<sub>1</sub> та π<sub>2</sub>. Проекція на площині π<sub>3</sub> представить собою точку, горизонтальна та фронтальна проекції дорівнюють самому відрізку.',
  },
];
// Start value
let isDescriptionVisible = false;
// let mode3D = true;
let currentStraightLine = 'zag_pol';
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
      `${pathBefore}/${currentStraightLine}/model.glb`,
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
