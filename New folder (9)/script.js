// ===== State =====
let currentStep = 1;
let selectedMood = null;

// ===== Mood Gradient Map =====
const moodGradients = {
    "Gothic Grunge": ["#2d1b4e", "#5b2c6f", "#8e44ad", "#c39bd3"],
    "Cozy Lo-Fi": ["#7dcea0", "#a9dfbf", "#f9e79f", "#fdebd0"],
    "Electric Energy": ["#f39c12", "#e67e22", "#e74c3c", "#f1c40f"],
    "Dreamy Synthwave": ["#8e44ad", "#9b59b6", "#e91e8c", "#ff6ec7"],
    "Chill R&B": ["#9b59b6", "#bb8fce", "#d7bde2", "#f4ecf7"],
    "Indie Folk": ["#b7950b", "#d4ac0d", "#f0b27a", "#fdebd0"],
    "Hype Hip-Hop": ["#e74c3c", "#c0392b", "#f39c12", "#f1c40f"],
    "Peaceful Classical": ["#5dade2", "#85c1e9", "#aed6f1", "#d6eaf8"]
};

// ===== TYPING ANIMATION =====
const phrases = [
    "Your Music. Your Vibe.",
    "Create Your Identity Card.",
    "Discover Your Sound.",
    "Express Your Mood."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== PARTICLE ANIMATION =====
const particleCanvas = document.getElementById("particleCanvas");
const pCtx = particleCanvas.getContext("2d");
let particles = [];

function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
resizeParticleCanvas();
window.addEventListener("resize", resizeParticleCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = Math.random() > 0.5 ? "124, 58, 237" : "6, 182, 212";
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > particleCanvas.width || this.y < 0 || this.y > particleCanvas.height) {
            this.reset();
        }
    }
    draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        pCtx.fill();
    }
}

for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                pCtx.beginPath();
                pCtx.strokeStyle = `rgba(124, 58, 237, ${0.05 * (1 - dist / 120)})`;
                pCtx.lineWidth = 0.5;
                pCtx.moveTo(particles[i].x, particles[i].y);
                pCtx.lineTo(particles[j].x, particles[j].y);
                pCtx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== CONFETTI ANIMATION =====
const confettiCanvas = document.getElementById("confettiCanvas");
const cCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];
let confettiActive = false;

function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeConfetti();
window.addEventListener("resize", resizeConfetti);

class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.color = ["#7c3aed", "#06b6d4", "#f59e0b", "#ec4899", "#10b981"][Math.floor(Math.random() * 5)];
        this.shape = Math.random() > 0.5 ? "rect" : "circle";
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.speedX *= 0.99;
    }
    draw() {
        cCtx.save();
        cCtx.translate(this.x, this.y);
        cCtx.rotate((this.rotation * Math.PI) / 180);
        cCtx.fillStyle = this.color;
        if (this.shape === "rect") {
            cCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        } else {
            cCtx.beginPath();
            cCtx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            cCtx.fill();
        }
        cCtx.restore();
    }
}

function launchConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 150; i++) {
        confettiPieces.push(new Confetti());
    }
    confettiActive = true;
    animateConfetti();
}

function animateConfetti() {
    if (!confettiActive) return;
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(c => {
        c.update();
        c.draw();
    });
    confettiPieces = confettiPieces.filter(c => c.y < confettiCanvas.height + 20);
    if (confettiPieces.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiActive = false;
        cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll(".stat-number").forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + (target === 100 ? "%" : "+");
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Trigger counter animation when stats are visible
            if (entry.target.classList.contains("stats")) {
                animateCounters();
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".feature-card, .stats").forEach(el => observer.observe(el));

// Stagger feature cards
document.querySelectorAll(".feature-card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

// ===== NAVIGATION =====
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("open");
}

function scrollToForm() {
    document.getElementById("formSection").scrollIntoView({ behavior: "smooth" });
}

function scrollToHow() {
    document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" });
}

// ===== FORM NAVIGATION =====
function nextStep(from) {
    if (from === 1) {
        const a1 = document.getElementById("artist1").value.trim();
        const a2 = document.getElementById("artist2").value.trim();
        const a3 = document.getElementById("artist3").value.trim();
        if (!a1 || !a2 || !a3) {
            shakeElement(document.getElementById("step1"));
            return;
        }
    }
    if (from === 2) {
        const track = document.getElementById("trackName").value.trim();
        const artist = document.getElementById("trackArtist").value.trim();
        if (!track || !artist) {
            shakeElement(document.getElementById("step2"));
            return;
        }
    }

    document.getElementById("step" + from).classList.remove("active");
    document.getElementById("step" + (from + 1)).classList.add("active");
    updateProgress(from + 1);
    currentStep = from + 1;
}

function prevStep(from) {
    document.getElementById("step" + from).classList.remove("active");
    document.getElementById("step" + (from - 1)).classList.add("active");
    updateProgress(from - 1);
    currentStep = from - 1;
}

function shakeElement(el) {
    el.style.animation = "none";
    setTimeout(() => {
        el.style.animation = "shake 0.5s ease";
    }, 10);
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

function updateProgress(step) {
    document.querySelectorAll(".progress-step").forEach((el, i) => {
        el.classList.remove("active", "done");
        if (i + 1 < step) el.classList.add("done");
        if (i + 1 === step) el.classList.add("active");
    });
}

// ===== MOOD SELECTION =====
function selectMood(el) {
    document.querySelectorAll(".mood-card").forEach(c => c.classList.remove("selected"));
    el.classList.add("selected");
    selectedMood = el.dataset.mood;

    // Add ripple effect
    el.style.transform = "scale(0.95)";
    setTimeout(() => {
        el.style.transform = "scale(1.03)";
    }, 150);
}

// ===== GENERATE CARD =====
function generateCard() {
    if (!selectedMood) {
        const grid = document.querySelector(".mood-grid");
        grid.style.animation = "shake 0.5s ease";
        setTimeout(() => grid.style.animation = "", 500);
        return;
    }

    const artist1 = document.getElementById("artist1").value.trim();
    const artist2 = document.getElementById("artist2").value.trim();
    const artist3 = document.getElementById("artist3").value.trim();
    const trackName = document.getElementById("trackName").value.trim();
    const trackArtist = document.getElementById("trackArtist").value.trim();

    const canvas = document.getElementById("musicCard");
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const colors = moodGradients[selectedMood];

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, colors[0]);
    bgGrad.addColorStop(0.5, colors[1]);
    bgGrad.addColorStop(1, colors[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Decorative circles
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.arc(W - 60, 80, 120, 0, Math.PI * 2);
    ctx.fillStyle = colors[3];
    ctx.fill();
    ctx.beginPath();
    ctx.arc(40, H - 100, 90, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Top accent line
    ctx.fillStyle = colors[3];
    ctx.fillRect(0, 0, W, 5);

    // Header
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🎧  MOODIFY", W / 2, 55);

    ctx.font = "12px 'Segoe UI', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("Visual Music Identity Card", W / 2, 78);

    // Divider
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 95);
    ctx.lineTo(W - 40, 95);
    ctx.stroke();

    // Mood Badge
    ctx.fillStyle = colors[3];
    roundRect(ctx, W / 2 - 100, 110, 200, 34, 17);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px 'Segoe UI', sans-serif";
    ctx.fillText(selectedMood, W / 2, 132);

    // Section: Top Artists
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "11px 'Segoe UI', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("TOP ARTISTS", 40, 180);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px 'Segoe UI', sans-serif";
    ctx.fillText("1. " + artist1, 40, 208);
    ctx.fillText("2. " + artist2, 40, 234);
    ctx.fillText("3. " + artist3, 40, 260);

    // Divider
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.moveTo(40, 285);
    ctx.lineTo(W - 40, 285);
    ctx.stroke();

    // Section: Now Playing
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "11px 'Segoe UI', sans-serif";
    ctx.fillText("NOW PLAYING", 40, 315);

    // Track box
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    roundRect(ctx, 40, 330, W - 80, 70, 12);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 17px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("♪ " + trackName, W / 2, 362);
    ctx.font = "13px 'Segoe UI', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(trackArtist, W / 2, 387);

    // Divider
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.moveTo(40, 425);
    ctx.lineTo(W - 40, 425);
    ctx.stroke();

    // Vibe Meter
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "11px 'Segoe UI', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("VIBE METER", 40, 455);

    const vibeLabels = ["Chill", "Groovy", "Energetic", "Intense"];
    const vibeValues = [0.7, 0.85, 0.6, 0.9];
    const barColors = ["#06b6d4", "#7c3aed", "#f59e0b", colors[3]];

    vibeLabels.forEach((label, i) => {
        const y = 475 + i * 35;
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "12px 'Segoe UI', sans-serif";
        ctx.fillText(label, 40, y);

        ctx.fillStyle = "rgba(255,255,255,0.15)";
        roundRect(ctx, 130, y - 12, W - 180, 14, 7);
        ctx.fill();

        ctx.fillStyle = barColors[i];
        roundRect(ctx, 130, y - 12, (W - 180) * vibeValues[i], 14, 7);
        ctx.fill();
    });

    // Footer of card
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.moveTo(40, H - 90);
    ctx.lineTo(W - 40, H - 90);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "10px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Generated by Moodify", W / 2, H - 65);

    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric"
    });
    ctx.fillText(dateStr, W / 2, H - 48);

    // Show card section
    document.getElementById("step3").classList.remove("active");
    document.querySelector(".progress-bar").style.display = "none";
    document.getElementById("cardSection").classList.add("active");

    // Launch confetti!
    launchConfetti();

    // Scroll to card
    setTimeout(() => {
        document.getElementById("cardSection").scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
}

// ===== Helper: Rounded Rectangle =====
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// ===== Download Card =====
function downloadCard() {
    const canvas = document.getElementById("musicCard");
    const link = document.createElement("a");
    link.download = "moodify-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    // Small confetti burst on download
    for (let i = 0; i < 30; i++) {
        confettiPieces.push(new Confetti());
    }
    if (!confettiActive) {
        confettiActive = true;
        animateConfetti();
    }
}

// ===== Restart =====
function restartForm() {
    document.getElementById("cardSection").classList.remove("active");
    document.querySelector(".progress-bar").style.display = "flex";
    document.getElementById("step1").classList.add("active");
    updateProgress(1);
    currentStep = 1;
    selectedMood = null;
    document.querySelectorAll(".mood-card").forEach(c => c.classList.remove("selected"));
    document.querySelectorAll("input").forEach(i => i.value = "");

    document.getElementById("formSection").scrollIntoView({ behavior: "smooth" });
}

// ===== MOUSE TRAIL EFFECT =====
document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div");
    trail.style.position = "fixed";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
    trail.style.width = "6px";
    trail.style.height = "6px";
    trail.style.borderRadius = "50%";
    trail.style.background = "rgba(124, 58, 237, 0.3)";
    trail.style.pointerEvents = "none";
    trail.style.zIndex = "9998";
    trail.style.transition = "all 0.5s ease";
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.style.opacity = "0";
        trail.style.transform = "scale(0)";
    }, 50);

    setTimeout(() => trail.remove(), 500);
});