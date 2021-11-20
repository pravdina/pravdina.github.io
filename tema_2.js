/* eslint-disable no-shadow */
const pathBefore = 'models/tema_2';
const helicoidalSurfaces = [
  {
    name: 'cycloida',
    title: 'Гвинтова поверхня з твірною кривою у вигляді циклоїди',
    text: 'Поверхня, утворена циклоїдою, що обертається навколо осі та одночасно рівномірно рухається у напрямі цієї осі, при чому швидкості цих рухів пропорційні.',
  },
  {
    name: 'dini',
    title: 'Гелікоїд Діні',
    text: 'Поверхня, утворена трактрисою, що обертається навколо осі та одночасно рівномірно рухається у напрямі цієї осі, при чому швидкості цих рухів пропорційні.',
  },
  {
    name: 'elips',
    title: 'Гвинтова поверхня з твірним еліпсом',
    text: 'Поверхня, утворена еліпсом, що обертається навколо осі та одночасно рівномірно рухається у напрямі цієї осі, при чому швидкості цих рухів пропорційні.',
  },
  {
    name: 'evolventa',
    title:
      'Гвинтова поверхня з твірною кривою у вигляді евольвенти кола',
    text: 'Поверхня, утворена евольвентою кола, що обертається навколо осі та одночасно рівномірно рухається у напрямі цієї осі, при чому швидкості цих рухів пропорційні.',
  },
  {
    name: 'hyperbola',
    title: 'Гвинтова поверхня з твірною кривою у вигляді гіперболи',
    text: 'Поверхня, утворена гіперболою, що обертається навколо осі та одночасно рівномірно рухається у напрямі цієї осі, при чому швидкості цих рухів пропорційні.',
  },
  {
    name: 'parabola',
    title:
      'Гвинтова поверхня з параболічною твірною загального положення',
    text: 'Поверхня, утворена параболою загального положення, що обертається навколо осі та одночасно рівномірно рухається у напрямі цієї осі, при чому швидкості цих рухів пропорційні.',
  },
  {
    name: 'sinysoida',
    title: 'Гвинтова поверхня із синусоїдальною твірною',
    text: 'Поверхня, утворена синусоїдою, що обертається навколо осі та одночасно рівномірно рухається у напрямі цієї осі, при чому швидкості цих рухів пропорційні.',
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
};
