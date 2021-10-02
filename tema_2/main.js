const path_before = 'models/tema_1';

const straight_lines = [
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

let description_vis = false;
let mode_3d = true;

let current_straight_line = 'zag_pol';
let current_title = straight_lines.find((current_title) => current_title.name === current_straight_line).title;
let current_text = straight_lines.find((current_text) => current_text.name === current_straight_line).text;

function update_current(name) {
  current_straight_line = name;
  current_title = straight_lines.find((current_title) => current_title.name === current_straight_line).title;
  current_text = straight_lines.find((current_text) => current_text.name === current_straight_line).text;
}

function check(a) {
  if (document.getElementById(`${a}_checkbox`).checked) {
    document
      .getElementById(`${a}`)
      .setAttribute('gltf-model', `${path_before}/${current_straight_line}/${a}.glb`);
  } else {
    document
      .getElementById(`${a}`)
      .removeAttribute('gltf-model');
  }
}

function to_2d() {
  // В 2D режим можно перейти, только если в данный момент включен 3D режим
  if (mode_3d) {
    // удаляем модель
    document
      .getElementById('model')
      .removeAttribute('gltf-model');
    // удаляем вспомогательные линии
    document
      .getElementById('lines')
      .removeAttribute('gltf-model');
    // очищаем анимейшен миксер
    document
      .getElementById('planes')
      .removeAttribute('animation-mixer');
    // назначаем новый анимейшен миксер
    document
      .getElementById('planes')
      .setAttribute('animation-mixer', 'clip: p*; timeScale: 1; clampWhenFinished: true; repetitions:1');

    // Чекбоксы должны ВЫКЛЮЧИТЬСЯ (то есть если они нажаты, то осуществить имитацию нажатия)
    if (document.getElementById('model_checkbox').checked) {
      document.getElementById('model_checkbox').click();
    }
    if (document.getElementById('lines_checkbox').checked) {
      document.getElementById('lines_checkbox').click();
    }
    mode_3d = false;
  }
}

function to_3d() {
  // В 3D режим можно перейти, только если в данный момент включен 2D режим, то есть mode_3d=false
  if (!mode_3d) {
    // очищаем анимейшен миксер
    document
      .getElementById('planes')
      .removeAttribute('animation-mixer');
    // назначаем новый анимейшен миксер
    document
      .getElementById('planes')
      .setAttribute('animation-mixer', 'clip: p*; timeScale: -1; clampWhenFinished: true; repetitions:1');

    setTimeout(() => {
      // делаем модель видимой
      document
        .getElementById('model')
        .setAttribute('gltf-model', `${path_before}/${current_straight_line}/model.glb`);
      // делаем линии видимыми
      document
        .getElementById('lines')
        .setAttribute('gltf-model', `${path_before}/${current_straight_line}/lines.glb`);

      // Чекбоксы должны ВКЛЮЧИТЬСЯ (то есть если они НЕ нажаты, то осуществить имитацию нажатия)
      if (!document.getElementById('model_checkbox').checked) {
        document.getElementById('model_checkbox').click();
      }
      if (!document.getElementById('lines_checkbox').checked) {
        document.getElementById('lines_checkbox').click();
      }
    }, 5000);
    		mode_3d = true;
  }
}

window.onload = function () {
  document.getElementById('title').innerHTML = (current_title);
  document.getElementById('theory_text').innerHTML = (current_text);
  // Сначала появляются плоскости, потом модель, потом линии
  document
    .getElementById('planes')
    .setAttribute('gltf-model', `${path_before}/${current_straight_line}/planes.glb`);
  document
    .getElementById('model')
    .setAttribute('gltf-model', `${path_before}/${current_straight_line}/model.glb`);
  document
    .getElementById('lines')
    .setAttribute('gltf-model', `${path_before}/${current_straight_line}/lines.glb`);

  // Показать/спрятать теоретический текст
  document
    .getElementById('info_btn')
    .addEventListener('click', () => {
      if (description_vis) {
        document
          .getElementById('theory_text')
          .setAttribute('style', 'display: none;');
        description_vis = false;
      } else {
        document
          .getElementById('theory_text')
          .setAttribute('style', 'display: block;');
        description_vis = true;
      }
    });

  // Изменение прямой
  document
    .getElementById('menu_optipns')
    .addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        // Обновляем текущую прямую
        update_current(e.target.id);
        // Меняем заголовок и описание
        document.getElementById('title').innerHTML = (current_title);
        document.getElementById('theory_text').innerHTML = (current_text);

        // Сначала появляются плоскости, потом модель, потом линии
        // просто выводим все без анимации
        document
          .getElementById('planes')
          .setAttribute('gltf-model', `${path_before}/${current_straight_line}/planes.glb`);
        document
          .getElementById('model')
          .setAttribute('gltf-model', `${path_before}/${current_straight_line}/model.glb`);
        document
          .getElementById('lines')
          .setAttribute('gltf-model', `${path_before}/${current_straight_line}/lines.glb`);

        // Чекбоксы должны ВКЛЮЧИТЬСЯ, так как появиться все (то есть если они не нажаты, то осуществить имитацию нажатия)
        if (!document.getElementById('model_checkbox').checked) {
          document.getElementById('model_checkbox').click();
        }
        if (!document.getElementById('lines_checkbox').checked) {
          document.getElementById('lines_checkbox').click();
        }

        mode_3d = true;
        // делаем анимацию не доступной из выбора меню прямой
        // animation_to_3d_boolean=false;
        // if(!document.getElementById("to_3d_radio").checked){
        // 	document.getElementById("to_3d_radio").click();
        // }
      }
    });
};
