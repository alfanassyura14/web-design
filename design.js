const slider = document.getElementById("projectsSlider");
const sliderControls = document.querySelector(".slider-controls");

if (slider && sliderControls) {
	const getScrollAmount = () => {
		const card = slider.querySelector(".project-card");
		if (!card) return 300;
		const gap = parseFloat(getComputedStyle(slider).gap || "0");
		return card.getBoundingClientRect().width + gap;
	};

	sliderControls.addEventListener("click", (event) => {
		const button = event.target.closest(".slider-btn");
		if (!button) return;
		const direction = button.dataset.direction === "next" ? 1 : -1;
		slider.scrollBy({ left: getScrollAmount() * direction, behavior: "smooth" });
	});
}