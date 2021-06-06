var description_vis=true;

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
	// Показать/спрятать теоретический текст
	document
	.getElementById("info_btn")
	.addEventListener("click", function () {
		if(description_vis){
			document
			.getElementById("theory_text")
			.setAttribute("style", "display: block;");
			description_vis=false;
		}
		else{
			document
			.getElementById("theory_text")
			.setAttribute("style", "display: none;");
			description_vis=true;
		}
	});

	// var rad=document.getElementsByName('options');
	// alert(rad[0])
}