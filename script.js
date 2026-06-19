// Optimized Instant Cursor following effect for Page 1
const cursor = document.querySelector('.cursor');
if (cursor) {
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    document.addEventListener('mousemove', (e) => {
        xSet(e.clientX);
        ySet(e.clientY);
    });
}

// Romantic Greeting Text
const greetingText = "Hey, you know what? Of all the paths my life could have taken, I’m most grateful that it led me to you. ❤️";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (greetingElement && charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// High-Performance Ambient Background Animation Layer
function createBackgroundParticle() {
    const particles = ['❤️', '✨', '💖', '🌸', '💕'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = particles[Math.floor(Math.random() * particles.length)];
    
    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 20 + 12;
    
    element.style.left = startX + 'px';
    element.style.top = (window.innerHeight + 50) + 'px'; 
    element.style.fontSize = size + 'px';
    element.style.position = 'fixed';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0';
    element.style.zIndex = '0';
    
    document.body.appendChild(element);

    gsap.to(element, {
        y: -(window.innerHeight + 150),
        x: `+=${Math.random() * 100 - 50}`,
        opacity: Math.random() * 0.4 + 0.15,  
        duration: Math.random() * 6 + 6,     
        ease: "power1.out",
        onComplete: () => element.remove()   
    });
}

// Initialize animations on asset load
window.addEventListener('load', () => {
    // SMOOTH PAGE ENTRANCE: Fade in the entire body cleanly
    gsap.to('body', { opacity: 1, duration: 1.2, ease: "power2.out" });
    gsap.to('h1', { opacity: 1, duration: 1, y: 20, ease: "bounce.out" });
    gsap.to('.cta-button', { opacity: 1, duration: 1, y: -20, ease: "back.out" });
    
    typeGreeting();
    setInterval(createBackgroundParticle, 450);
    
    gsap.to('h1', {
        y: '+=8',
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
    });

    // Handle Page 1 Music Player Logic
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    if (musicToggle && bgMusic) {
        bgMusic.volume = 0.35;
        const musicState = localStorage.getItem('musicPlaying');
        const savedTime = localStorage.getItem('musicTime');

        if (savedTime) bgMusic.currentTime = parseFloat(savedTime);
        if (musicState === 'true') {
            bgMusic.play().then(() => {
                musicToggle.textContent = "⏸️ Pause Song";
            }).catch(() => localStorage.setItem('musicPlaying', 'false'));
        }

        setInterval(() => {
            if (!bgMusic.paused) localStorage.setItem('musicTime', bgMusic.currentTime);
        }, 1000);

        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicToggle.textContent = "⏸️ Pause Song";
                    localStorage.setItem('musicPlaying', 'true');
                });
            } else {
                bgMusic.pause();
                musicToggle.textContent = "🎵 Play Song";
                localStorage.setItem('musicPlaying', 'false');
            }
        });
    }
});

// Button interactions & transitions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // SMOOTH PAGE EXIT: Fade out entirely before jumping pages
        gsap.to('body', {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                window.location.href = 'cause.html';
            }
        });
    });
});