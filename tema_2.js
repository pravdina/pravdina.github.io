/* eslint-disable no-shadow */
const pathBefore = 'models/tema_2';
const straightLines = [
  {
    name: 'dini',
    title: 'Поверхня Діні',
    text: 'Поверхня Діні Поверхня Діні Поверхня Діні',
  },
  {
    name: 'paraboloid',
    title: 'Параболоид',
    text: 'Параболоид Параболоид Параболоид',
  },
];
// Start value
let isDescriptionVisible = false;
let mode3D = true;
let currentStraightLine = 'dini';
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
    // изменить радиобаттон!!!
  }
};
function check(a) {
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
}

function to2D() {
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
}

function to3D() {
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
}

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
