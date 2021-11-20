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
let mode3D = true;
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

const showPlanes = () => {
  document
    .getElementById('planes')
    .setAttribute(
      'gltf-model',
      `${pathBefore}/${currentStraightLine}/planes.glb`,
    );
};
const showModel = () => {
  document
    .getElementById('model')
    .setAttribute(
      'gltf-model',
      `${pathBefore}/${currentStraightLine}/model.glb`,
    );
};
const hideModel = () => {
  document.getElementById('model').removeAttribute('gltf-model');
};
const showLines = () => {
  document
    .getElementById('lines')
    .setAttribute(
      'gltf-model',
      `${pathBefore}/${currentStraightLine}/lines.glb`,
    );
};
const hideLines = () => {
  document.getElementById('lines').removeAttribute('gltf-model');
};
const showAll = () => {
  showPlanes();
  showModel();
  showLines();
};
const checkboxFakeCheck = (checkboxId) => {
  if (!document.getElementById(checkboxId).checked) {
    document.getElementById(checkboxId).click();
  }
};
const checkboxFakeUncheck = (checkboxId) => {
  if (document.getElementById(checkboxId).checked) {
    document.getElementById(checkboxId).click();
  }
};
const playAnimation = (direction) => {
  let timeScale = 1;
  if (direction === 'backward') {
    timeScale = -1;
  }
  // очищаем анимейшен миксер
  document
    .getElementById('planes')
    .removeAttribute('animation-mixer');
  // назначаем новый анимейшен миксер
  document
    .getElementById('planes')
    .setAttribute(
      'animation-mixer',
      `clip: p*; timeScale: ${timeScale}; clampWhenFinished: true; repetitions:1`,
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
    showAll();
    checkboxFakeCheck('model_checkbox');
    checkboxFakeCheck('lines_checkbox');
    mode3D = true;
  }
};
const check = (a) => {
  if (document.getElementById(`${a}_checkbox`).checked) {
    document
      .getElementById(`${a}`)
      .setAttribute(
        'gltf-model',
        `${pathBefore}/${currentStraightLine}/${a}.glb`,
      );
  } else {
    document.getElementById(`${a}`).removeAttribute('gltf-model');
  }
};

const to2D = () => {
  // В 2D режим можно перейти, только если в данный момент включен 3D режим
  if (mode3D) {
    hideModel();
    hideLines();
    // очищаем анимейшен миксер
    playAnimation('forward');
    // Чекбоксы должны ВЫКЛЮЧИТЬСЯ (то есть если они нажаты, то осуществить имитацию нажатия)
    checkboxFakeUncheck('model_checkbox');
    checkboxFakeUncheck('lines_checkbox');
    mode3D = false;
  }
};

const to3D = () => {
  // В 3D режим можно перейти, только если в данный момент включен 2D режим, то есть mode3D=false
  if (!mode3D) {
    playAnimation('backward');
    setTimeout(() => {
      showModel();
      showLines();
      // Чекбоксы должны ВКЛЮЧИТЬСЯ (то есть если они НЕ нажаты, то осуществить имитацию нажатия)
      checkboxFakeCheck('model_checkbox');
      checkboxFakeCheck('lines_checkbox');
      // }
    }, 5000);
    mode3D = true;
  }
};

window.onload = () => {
  setTitle(currentTitle);
  setTheoryText(currentText);
  showAll();
  document
    .getElementById('home_btn')
    .addEventListener('click', () => {
      // eslint-disable-next-line no-restricted-globals
      location.href = 'index.html';
    });
  // Показать/спрятать теоретический текст
  document
    .getElementById('info_btn')
    .addEventListener('click', () => toggleTheoryText());
  // Изменение прямой
  document
    .getElementById('menu_options')
    .addEventListener('click', (e) => handleLineChange(e));
  // Раскладывание в 2д режим
  document
    .getElementById('to_2d_radio')
    .addEventListener('click', () => to2D());
  // Собирание в 3д режим
  document
    .getElementById('to_3d_radio')
    .addEventListener('click', () => to3D());
  // checkbox listeners
  document
    .getElementById('model_checkbox')
    .addEventListener('change', () => check('model'));
  document
    .getElementById('lines_checkbox')
    .addEventListener('change', () => check('lines'));
};
