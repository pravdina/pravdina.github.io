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
		.setAttribute("gltf-model", `#${a}_glb`); 
	}
	else {
		document
		.getElementById(`${a}`)
		.removeAttribute("gltf-model");
	}
}

function to_2d(){
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
}

function to_3d(){
	// делаем модель видимой
	document
	.getElementById("model")
	.setAttribute("gltf-model", "#model_glb");
	// делаем линии видимыми
	document
	.getElementById("lines")
	.setAttribute("gltf-model", "#lines_glb");
	// очищаем анимейшен миксер
	document
	.getElementById("planes")
	.removeAttribute("animation-mixer"); 
	// назначаем новый анимейшен миксер
	document
	.getElementById("planes")
	.setAttribute("animation-mixer", "clip: p*; timeScale: -1; clampWhenFinished: true; repetitions:1");
}

window.onload = function () {
	console.log(current_title);
	console.log(current_text);
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
	        update_current(e.target.id)
	        document.getElementById("title").innerHTML=(current_title);
	        document.getElementById("theory_text").innerHTML=(current_text);
	    }
	});
}