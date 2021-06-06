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
}