// ===== MODERN PORTFOLIO JS 2026 =====

document.addEventListener('DOMContentLoaded', () => {
	// Set current year
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	// Mobile nav toggle
	const navToggle = document.querySelector('.nav-toggle');
	const navList = document.querySelector('.nav-list');
	if (navToggle && navList) {
		navToggle.addEventListener('click', () => navList.classList.toggle('open'));
		navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));
	}

	// Initialize all features
	initCustomCursor();
	initThemeToggle();
	initScrollProgress();
	initTypingAnimation();
	initParticles();
	initSkillBars();
	initCountUp();
	initContactForm();
	initEasterEgg();
	loadProjects();
	setupScrollReveal();
	setupBackToTop();
	initMagneticButtons();

	// Keep page at top on reload
	try {
		const nav = performance.getEntriesByType('navigation')[0];
		const isReload = nav ? nav.type === 'reload' : performance.navigation && performance.navigation.type === 1;
		if (isReload) {
			if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
			setTimeout(() => window.scrollTo(0, 0), 0);
		}
	} catch (e) { /* no-op */ }

	// Hide loader
	const loader = document.getElementById('loader');
	if (loader) {
		setTimeout(() => loader.classList.add('hidden'), 1500);
	}
});

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
	const cursor = document.getElementById('cursor');
	const follower = document.getElementById('cursor-follower');
	if (!cursor || !follower) return;

	let mouseX = 0, mouseY = 0;
	let cursorX = 0, cursorY = 0;
	let followerX = 0, followerY = 0;

	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// Smooth animation loop
	function animate() {
		cursorX += (mouseX - cursorX) * 0.2;
		cursorY += (mouseY - cursorY) * 0.2;
		followerX += (mouseX - followerX) * 0.1;
		followerY += (mouseY - followerY) * 0.1;

		cursor.style.left = cursorX + 'px';
		cursor.style.top = cursorY + 'px';
		follower.style.left = followerX + 'px';
		follower.style.top = followerY + 'px';

		requestAnimationFrame(animate);
	}
	animate();

	// Hover effects
	const hoverElements = document.querySelectorAll('a, button, input, textarea, [data-magnetic]');
	hoverElements.forEach(el => {
		el.addEventListener('mouseenter', () => {
			cursor.classList.add('hover');
			follower.classList.add('hover');
		});
		el.addEventListener('mouseleave', () => {
			cursor.classList.remove('hover');
			follower.classList.remove('hover');
		});
	});
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
	const toggle = document.getElementById('theme-toggle');
	if (!toggle) return;

	// Load saved theme
	const savedTheme = localStorage.getItem('theme') || 'dark';
	document.documentElement.setAttribute('data-theme', savedTheme);

	toggle.addEventListener('click', () => {
		const current = document.documentElement.getAttribute('data-theme');
		const next = current === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
		showToast(`Switched to ${next} mode`);
	});
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
	const progress = document.getElementById('scroll-progress');
	if (!progress) return;

	window.addEventListener('scroll', () => {
		const scrollTop = window.scrollY;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrollPercent = scrollTop / docHeight;
		progress.style.transform = `scaleX(${scrollPercent})`;
	}, { passive: true });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
	const typingEl = document.getElementById('typing-text');
	if (!typingEl) return;

	const phrases = [
		'Event Shooting',
		'Video Editing',
		'Wedding Films',
		'Corporate Events',
		'Drone Coverage'
	];

	let phraseIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typingSpeed = 100;

	function type() {
		const currentPhrase = phrases[phraseIndex];

		if (isDeleting) {
			typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
			charIndex--;
			typingSpeed = 50;
		} else {
			typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
			charIndex++;
			typingSpeed = 100;
		}

		if (!isDeleting && charIndex === currentPhrase.length) {
			isDeleting = true;
			typingSpeed = 2000; // Pause before deleting
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			phraseIndex = (phraseIndex + 1) % phrases.length;
			typingSpeed = 500; // Pause before typing next
		}

		setTimeout(type, typingSpeed);
	}

	type();
}

// ===== PARTICLES =====
function initParticles() {
	const canvas = document.getElementById('particles-canvas');
	if (!canvas) return;

	const ctx = canvas.getContext('2d');
	let particles = [];
	let animationId;

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resize();
	window.addEventListener('resize', resize);

	class Particle {
		constructor() {
			this.reset();
		}

		reset() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.size = Math.random() * 2 + 0.5;
			this.speedX = (Math.random() - 0.5) * 0.5;
			this.speedY = (Math.random() - 0.5) * 0.5;
			this.opacity = Math.random() * 0.5 + 0.2;
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;

			if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
			if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
		}

		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
			ctx.fill();
		}
	}

	// Create particles
	for (let i = 0; i < 50; i++) {
		particles.push(new Particle());
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		particles.forEach(particle => {
			particle.update();
			particle.draw();
		});

		// Draw connections
		particles.forEach((p1, i) => {
			particles.slice(i + 1).forEach(p2 => {
				const dx = p1.x - p2.x;
				const dy = p1.y - p2.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 150) {
					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - dist / 150)})`;
					ctx.stroke();
				}
			});
		});

		animationId = requestAnimationFrame(animate);
	}

	animate();
}

// ===== SKILL BARS =====
function initSkillBars() {
	const skillBars = document.querySelectorAll('.skill-bar');

	skillBars.forEach(bar => {
		const skill = bar.getAttribute('data-skill');
		const level = bar.getAttribute('data-level');

		// Create HTML structure
		bar.innerHTML = `
			<div class="skill-info">
				<span>${skill}</span>
				<span>${level}%</span>
			</div>
			<div class="bar">
				<div class="bar-fill" style="--level: ${level}%"></div>
			</div>
		`;
	});

	// Animate on scroll
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
				const fill = entry.target.querySelector('.bar-fill');
				if (fill) {
					fill.style.transform = `scaleX(${entry.target.getAttribute('data-level') / 100})`;
				}
			}
		});
	}, { threshold: 0.3 });

	skillBars.forEach(bar => observer.observe(bar));
}

// ===== COUNT UP ANIMATION =====
function initCountUp() {
	const stats = document.querySelectorAll('.stat-number');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const target = parseInt(entry.target.getAttribute('data-count'));
				animateCount(entry.target, target);
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });

	stats.forEach(stat => observer.observe(stat));
}

function animateCount(element, target) {
	let current = 0;
	const increment = target / 50;
	const duration = 1500;
	const stepTime = duration / 50;

	const timer = setInterval(() => {
		current += increment;
		if (current >= target) {
			current = target;
			clearInterval(timer);
		}
		element.textContent = Math.floor(current);
	}, stepTime);
}

// ===== CONTACT FORM =====
function initContactForm() {
	const form = document.getElementById('contact-form');
	if (!form) return;

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const status = document.getElementById('form-status');
		const submitBtn = form.querySelector('button[type="submit"]');

		// Disable button
		submitBtn.disabled = true;
		submitBtn.innerHTML = '<span>Sending...</span>';

		// Simulate form submission (replace with actual endpoint)
		await new Promise(resolve => setTimeout(resolve, 1500));

		// Show success
		status.textContent = '✓ Message sent successfully!';
		status.className = 'form-status success';
		showToast('Message sent! I\'ll get back to you soon.', 'success');

		// Reset form
		form.reset();
		submitBtn.disabled = false;
		submitBtn.innerHTML = `
			<span>Send Message</span>
			<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
		`;

		setTimeout(() => {
			status.textContent = '';
		}, 5000);
	});
}

// ===== EASTER EGG (Konami Code) =====
function initEasterEgg() {
	const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
	let konamiIndex = 0;

	document.addEventListener('keydown', (e) => {
		if (e.code === konamiCode[konamiIndex]) {
			konamiIndex++;
			if (konamiIndex === konamiCode.length) {
				activatePartyMode();
				konamiIndex = 0;
			}
		} else {
			konamiIndex = 0;
		}
	});
}

function activatePartyMode() {
	document.body.classList.add('party-mode');
	showToast('🎉 Party Mode Activated! 🎉');

	// Create confetti
	for (let i = 0; i < 100; i++) {
		createConfetti();
	}

	setTimeout(() => {
		document.body.classList.remove('party-mode');
	}, 5000);
}

function createConfetti() {
	const confetti = document.createElement('div');
	confetti.style.cssText = `
		position: fixed;
		width: 10px;
		height: 10px;
		background: hsl(${Math.random() * 360}, 80%, 60%);
		left: ${Math.random() * 100}%;
		top: -10px;
		border-radius: 50%;
		pointer-events: none;
		z-index: 10004;
		animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
	`;
	document.body.appendChild(confetti);

	setTimeout(() => confetti.remove(), 4000);
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
	@keyframes confettiFall {
		to {
			transform: translateY(100vh) rotate(720deg);
			opacity: 0;
		}
	}
`;
document.head.appendChild(style);

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
	const magneticElements = document.querySelectorAll('[data-magnetic]');

	magneticElements.forEach(el => {
		el.addEventListener('mousemove', (e) => {
			const rect = el.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;

			el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
		});

		el.addEventListener('mouseleave', () => {
			el.style.transform = 'translate(0, 0)';
		});
	});
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = '') {
	const toast = document.getElementById('toast');
	if (!toast) return;

	toast.textContent = message;
	toast.className = 'toast show ' + type;

	setTimeout(() => {
		toast.classList.remove('show');
	}, 3000);
}

// ===== PROJECTS =====
async function loadProjects() {
	const grid = document.getElementById('projects-grid');
	if (!grid) return;

	try {
		grid.innerHTML = createSkeletonHtml();
		const response = await fetch('data/projects.json', { cache: 'no-store' });
		if (!response.ok) throw new Error('Failed to load projects');
		const projects = await response.json();
		grid.innerHTML = projects.map(createProjectCardHtml).join('');

		// Stagger animation
		const cards = grid.querySelectorAll('.card');
		cards.forEach((card, i) => {
			setTimeout(() => card.classList.add('card-in'), i * 100);
		});

		// Re-init cursor hover for new elements
		initCustomCursor();
	} catch (error) {
		grid.innerHTML = '<p style="color:var(--muted);text-align:center;grid-column:1/-1">Unable to load projects right now.</p>';
		console.error(error);
	}
}

function createProjectCardHtml(project) {
	const image = project.image || 'assets/img/placeholder.png';
	const tags = (project.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
	const links = [
		project.demo && `<a class="btn" href="${escapeAttr(project.demo)}" target="_blank" rel="noopener"><span>Live</span></a>`,
		project.source && `<a class="btn" href="${escapeAttr(project.source)}" target="_blank" rel="noopener"><span>Code</span></a>`,
		project.figma && `<a class="btn" href="${escapeAttr(project.figma)}" target="_blank" rel="noopener"><span>Figma</span></a>`,
		project.behance && `<a class="btn" href="${escapeAttr(project.behance)}" target="_blank" rel="noopener"><span>Behance</span></a>`,
		project.dribbble && `<a class="btn" href="${escapeAttr(project.dribbble)}" target="_blank" rel="noopener"><span>Dribbble</span></a>`,
		project.caseStudy && `<a class="btn" href="${escapeAttr(project.caseStudy)}" target="_blank" rel="noopener"><span>Case Study</span></a>`
	].filter(Boolean).join('');

	return `
		<article class="card" data-tilt data-tilt-max="8" data-tilt-speed="400">
			<div style="overflow:hidden">
				<img class="card-media" src="${escapeAttr(image)}" alt="${escapeAttr(project.title)}" loading="lazy" />
			</div>
			<div class="card-body">
				<h3 class="card-title">${escapeHtml(project.title)}</h3>
				<p class="card-text">${escapeHtml(project.description)}</p>
				<div class="card-tags">${tags}</div>
				<div class="card-actions">${links}</div>
			</div>
		</article>
	`;
}

function createSkeletonHtml() {
	const item = `
		<div class="skeleton-card">
			<div class="skeleton-media s-shimmer"></div>
			<div class="skeleton-body">
				<div class="s-line"></div>
				<div class="s-line mid s-shimmer"></div>
				<div class="s-line mid"></div>
				<div class="s-line short s-shimmer"></div>
			</div>
		</div>
	`;
	return `<div class="skeleton-grid">${item.repeat(6)}</div>`;
}

function escapeHtml(str) {
	return String(str)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function escapeAttr(str) {
	return escapeHtml(str).replaceAll('"', '&quot;');
}

// ===== SCROLL REVEAL =====
function setupScrollReveal() {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1 });

	document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ===== BACK TO TOP =====
function setupBackToTop() {
	const btn = document.createElement('button');
	btn.className = 'back-to-top';
	btn.setAttribute('aria-label', 'Back to top');
	btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>`;
	document.body.appendChild(btn);

	const toggle = () => {
		const show = window.scrollY > 400;
		btn.style.opacity = show ? '1' : '0';
		btn.style.pointerEvents = show ? 'auto' : 'none';
	};
	window.addEventListener('scroll', toggle, { passive: true });
	toggle();

	btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

