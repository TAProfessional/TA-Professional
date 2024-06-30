gsap.registerPlugin(ScrollTrigger);

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function animatePercentage(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function animateNumber(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toFixed(1);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

gsap.to(".section-title", {
    scrollTrigger: {
        trigger: ".section-title",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    onStart: function() {
        document.querySelector(".section-title").classList.add("animate");
    }
});

gsap.to(".about-content", {
    scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power3.out"
});

gsap.from(".hero-section h1", { opacity: 0, y: 50, duration: 1, delay: 0.2 });
gsap.from(".hero-section h2", { opacity: 0, y: 50, duration: 1, delay: 0.4 });
gsap.from(".hero-section h3", { opacity: 0, y: 50, duration: 1, delay: 0.6 });
gsap.from(".hero-section .tagline", { opacity: 0, y: 50, duration: 1, delay: 0.8 });
gsap.from(".hero-section .contact-info", { opacity: 0, y: 50, duration: 1, delay: 1 });
gsap.from(".hero-section .portfolio-info", { opacity: 0, y: 50, duration: 1, delay: 1.2 });
gsap.from(".hero-section .download-btn", { opacity: 0, y: 50, duration: 1, delay: 1.4 });

gsap.to(".experience-timeline", {
    scrollTrigger: {
        trigger: ".experience-timeline",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power3.out"
});

gsap.to(".contact-content", {
    scrollTrigger: {
        trigger: ".contact-content",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power3.out"
});

// Stagger animation for experience items
gsap.from(".experience-item", {
    scrollTrigger: {
        trigger: ".experience-timeline",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 0.8,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: "power3.out"
});

// Stagger animation for skills
gsap.from(".skills li", {
    scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 0.5,
    opacity: 0,
    x: -20,
    stagger: 0.1,
    ease: "power3.out"
});

gsap.to(".analytics-grid", {
    scrollTrigger: {
        trigger: ".analytics-grid",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    onStart: function() {
        document.querySelector(".analytics-grid").classList.add("animate");
        animateValue(document.getElementById("revenueValue"), 0, 60988, 2000);
        animatePercentage(document.getElementById("efficiencyValue"), 0, 1100, 2000);
        animateNumber(document.getElementById("timeToHireValue"), 0, 5.8, 2000);
    }
});

gsap.to(".performance-chart", {
    scrollTrigger: {
        trigger: ".performance-chart",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    onStart: function() {
        document.querySelector(".performance-chart").classList.add("animate");
        drawChartConnections();
    }
});

const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
    gsap.to(particle, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
    });
});

// Reveal text animation
const revealText = document.querySelector('.reveal-text');
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: revealText,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
    }
});
tl.to(revealText, {
    color: "var(--text-color)",
    duration: 2,
    ease: "power4.inOut"
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in elements
const fadeElems = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElems.forEach(elem => {
    appearOnScroll.observe(elem);
});
function drawChartConnections() {
    const canvas = document.getElementById('performanceCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes = document.querySelectorAll('.chart-node');
    const nodePositions = Array.from(nodes).map(node => {
        const rect = node.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        return {
            x: rect.left - canvasRect.left + rect.width / 2,
            y: rect.top - canvasRect.top + rect.height / 2
        };
    });

    ctx.strokeStyle = 'rgba(100, 255, 218, 0.5)';
    ctx.lineWidth = 2;

    for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
            const start = nodePositions[i];
            const end = nodePositions[j];
            const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
            gradient.addColorStop(0, 'rgba(255, 105, 180, 0.5)');
            gradient.addColorStop(1, 'rgba(100, 255, 218, 0.5)');
            
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = gradient;
            ctx.stroke();
        }
    }
}

window.addEventListener('resize', drawChartConnections);
