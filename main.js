var path_before = "models/tema_1"

var straight_lines = [
{
	"name": "zag_pol",
	"title": "Пряма загального положення",
	"text": "Жодна з проекцій не паралельна осям.",
},
{
	"name": "gor_level",
	"title": "Пряма горизонтального рівня",
	"text": "Фронтальна та профільна проекції паралельні осям, горизонтальна проекція дорівнює самому відрізку.",
},
{
	"name": "front_level",
	"title": "Пряма фронтального рівня",
	"text": "Пряма фронтального рівня. Фронтальна та профільна проекції паралельні осям, горизонтальна проекція дорівнює самому відрізку.",
},
{
	"name": "prof_level",
	"title": "Пряма профільного рівня",
	"text": "Пряма профільного рівня. Фронтальна та профільна проекції паралельні осям, горизонтальна проекція дорівнює самому відрізку.",
},
{
	"name": "gor_proj",
	"title": "Горизонтально-проектуюча пряма",
	"text": "Горизонтально-проектуюча пряма. Фронтальна та профільна проекції паралельні осям, горизонтальна проекція дорівнює самому відрізку.",
},
{
	"name": "front_proj",
	"title": "Фронтально-проектуюча пряма",
	"text": "Фронтально-проектуюча пряма. Фронтальна та профільна проекції паралельні осям, горизонтальна проекція дорівнює самому відрізку.",
},
{
	"name": "prof_proj",
	"title": "Профільно-проектуюча пряма",
	"text": "Профільно-проектуюча пряма. Фронтальна та профільна проекції паралельні осям, горизонтальна проекція дорівнює самому відрізку.",
}
]

var description_vis=false;
var mode_3d = true;

var current_straight_line = "zag_pol";
var current_title = straight_lines.find(current_title => current_title.name === current_straight_line).title;
var current_text = straight_lines.find(current_text => current_text.name === current_straight_line).text;

function update_current(name){
	current_straight_line = name;
	current_title = straight_lines.find(current_title => current_title.name === current_straight_line).title;
	current_text = straight_lines.find(current_text => current_text.name === current_straight_line).text;
}


function check(a){
	if (document.getElementById(`${a}_checkbox`).checked) {
		document
		.getElementById(`${a}`)
		.setAttribute("gltf-model", `${path_before}/${current_straight_line}/${a}.glb`); 
	}
	else {
		document
		.getElementById(`${a}`)
		.removeAttribute("gltf-model");
	}
}

function to_2d(){
	// В 2D режим можно перейти, только если в данный момент включен 3D режим
	if(mode_3d){
		// удаляем модель
		document
		.getElementById("model")
		.removeAttribute("gltf-model");
		// удаляем вспомогательные линии
		document
		.getElementById("lines")
		.removeAttribute("gltf-model");
		// очищаем анимейшен миксер
		document
		.getElementById("planes")
		.removeAttribute("animation-mixer"); 
		// назначаем новый анимейшен миксер
		document
		.getElementById("planes")
		.setAttribute("animation-mixer", "clip: p*; timeScale: 1; clampWhenFinished: true; repetitions:1");

		// Чекбоксы должны ВЫКЛЮЧИТЬСЯ (то есть если они нажаты, то осуществить имитацию нажатия)
		if(document.getElementById("model_checkbox").checked){
			document.getElementById("model_checkbox").click();
		}
		if(document.getElementById("lines_checkbox").checked){
			document.getElementById("lines_checkbox").click();
		}
		mode_3d = false;
	}
}

function to_3d(){
	// В 3D режим можно перейти, только если в данный момент включен 2D режим, то есть mode_3d=false
	if(!mode_3d){
		// очищаем анимейшен миксер
		document
		.getElementById("planes")
		.removeAttribute("animation-mixer"); 
		// назначаем новый анимейшен миксер
		document
		.getElementById("planes")
		.setAttribute("animation-mixer", "clip: p*; timeScale: -1; clampWhenFinished: true; repetitions:1");

		setTimeout(function() { 
			// делаем модель видимой
			document
			.getElementById("model")
			.setAttribute("gltf-model", `${path_before}/${current_straight_line}/model.glb`);
			// делаем линии видимыми
			document
			.getElementById("lines")
			.setAttribute("gltf-model", `${path_before}/${current_straight_line}/lines.glb`);

			// Чекбоксы должны ВКЛЮЧИТЬСЯ (то есть если они НЕ нажаты, то осуществить имитацию нажатия)
			if(!document.getElementById("model_checkbox").checked){
				document.getElementById("model_checkbox").click();
			}
			if(!document.getElementById("lines_checkbox").checked){
				document.getElementById("lines_checkbox").click();
			}

		}, 5000);
		mode_3d = true;
	}	
	
}

window.onload = function () {
	document.getElementById("title").innerHTML=(current_title);
	document.getElementById("theory_text").innerHTML=(current_text);
	// Сначала появляются плоскости, потом модель, потом линии
	document
	.getElementById("planes")
	.setAttribute("gltf-model", `${path_before}/${current_straight_line}/planes.glb`);
	document
	.getElementById("model")
	.setAttribute("gltf-model", `${path_before}/${current_straight_line}/model.glb`);
	document
	.getElementById("lines")
	.setAttribute("gltf-model", `${path_before}/${current_straight_line}/lines.glb`);

	// Показать/спрятать теоретический текст
	document
	.getElementById("info_btn")
	.addEventListener("click", function () {
		if(description_vis){
			document
			.getElementById("theory_text")
			.setAttribute("style", "display: none;");
			description_vis=false;
		}
		else{
			document
			.getElementById("theory_text")
			.setAttribute("style", "display: block;");
			description_vis=true;
		}
	});

	// Изменение прямой
	document
	.getElementById('menu_optipns')
	.addEventListener('click', function(e) {
		if (e.target.tagName === 'LI'){
	// Обновляем текущую прямую
	update_current(e.target.id);
	// Меняем заголовок и описание
	document.getElementById("title").innerHTML=(current_title);
	document.getElementById("theory_text").innerHTML=(current_text);
	// Сначала появляются плоскости, потом модель, потом линии
	document
	.getElementById("planes")
	.setAttribute("gltf-model", `${path_before}/${current_straight_line}/planes.glb`);
	document
	.getElementById("model")
	.setAttribute("gltf-model", `${path_before}/${current_straight_line}/model.glb`);
	document
	.getElementById("lines")
	.setAttribute("gltf-model", `${path_before}/${current_straight_line}/lines.glb`);

	// Чекбоксы должны ВКЛЮЧИТЬСЯ, так как появиться все (то есть если они нажаты, то осуществить имитацию нажатия)
	if(!document.getElementById("model_checkbox").checked){
		document.getElementById("model_checkbox").click();
	}
	if(!document.getElementById("lines_checkbox").checked){
		document.getElementById("lines_checkbox").click();
	}
	if(!document.getElementById("to_3d_radio").checked){
		document.getElementById("to_3d_radio").click();
	}
	mode_3d = true;
	}
});
}