const slider = document.getElementById("projectsSlider");

if (slider) {
	let isDown = false;
	let startX = 0;
	let scrollLeft = 0;

	slider.addEventListener("mousedown", (event) => {
		isDown = true;
		startX = event.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});

	slider.addEventListener("mouseleave", () => {
		isDown = false;
	});

	slider.addEventListener("mouseup", () => {
		isDown = false;
	});

	slider.addEventListener("mousemove", (event) => {
		if (!isDown) return;
		event.preventDefault();
		const x = event.pageX - slider.offsetLeft;
		const walk = (x - startX) * 1.2;
		slider.scrollLeft = scrollLeft - walk;
	});

	slider.addEventListener("touchstart", (event) => {
		isDown = true;
		startX = event.touches[0].pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});

	slider.addEventListener("touchend", () => {
		isDown = false;
	});

	slider.addEventListener("touchmove", (event) => {
		if (!isDown) return;
		const x = event.touches[0].pageX - slider.offsetLeft;
		const walk = (x - startX) * 1.2;
		slider.scrollLeft = scrollLeft - walk;
	});
}