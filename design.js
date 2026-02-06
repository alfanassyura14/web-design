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

// KPI Card Counter Animation
function animateCounter(element, target, duration = 2000) {
	const hasPlus = element.textContent.includes('+');
	const startTime = performance.now();
	const startValue = 0;
	
	function update(currentTime) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		
		// Easing function for smooth animation
		const easeOutQuart = 1 - Math.pow(1 - progress, 4);
		const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
		
		element.textContent = hasPlus ? current + '+' : current;
		
		if (progress < 1) {
			requestAnimationFrame(update);
		}
	}
	
	requestAnimationFrame(update);
}

// Observe KPI cards and trigger animation when visible
const kpiCards = document.querySelectorAll('.kpi-card span');
if (kpiCards.length > 0) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting && !entry.target.dataset.animated) {
				const text = entry.target.textContent;
				const target = parseInt(text.replace('+', ''));
				
				if (!isNaN(target)) {
					entry.target.dataset.animated = 'true';
					animateCounter(entry.target, target);
				}
			}
		});
	}, {
		threshold: 0.5
	});
	
	kpiCards.forEach(card => observer.observe(card));
}