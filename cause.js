// Reasons database - Perfectly preserved personal entries
const reasons = [
    { 
        text: "Before meeting you, I spent a lot of time feeling alone. You probably don't realize it, but many of my happiest memories in recent years started after you entered my life. Even when we're far apart, knowing you're there makes the world feel a little less lonely. 💖", 
        emoji: "🌸"
    },
    { 
        text: "I know life hasn't been easy for you. I've seen how much responsibility you carry and how tired you become. Even then, you keep moving forward. Sometimes I think you're stronger than you realize. 💕", 
        emoji: "🌟"
    },
    { 
        text: "One of my favorite things about you is the little moments we share. I love hearing your voice—no matter how stressful or tiring my day has been, hearing you talk always makes me feel happier. I love it when you tease me; even when I pretend to be annoyed, those moments always make me smile. They make our conversations feel special and uniquely ours. I love the random photos you send, the stories you tell me, and the little pieces of your day that you choose to share with me. They might seem small, but they become some of my favorite memories. Your voice, your laughter, your teasing, and the way you unknowingly make my day brighter just by being you is everything to me. 🥰", 
        emoji: "🌸"
    }
];

let currentIndex = -1;
const reasonText = document.getElementById('reason-text');
const cardEmoji = document.getElementById('card-emoji');
const currentCardNum = document.getElementById('current-card-num');
const shuffleButton = document.getElementById('shuffle-button');

function displayNewReason() {
    currentIndex++;
    
    if (currentIndex < reasons.length) {
        if (currentCardNum) {
            currentCardNum.textContent = currentIndex + 1;
        }
        
        if (currentIndex === reasons.length - 1) {
            shuffleButton.textContent = "See My Final Message 💝";
            shuffleButton.classList.add('story-mode');
        }

        const card = document.getElementById('active-card');
        gsap.to(card, {
            scale: 0.9,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                reasonText.textContent = reasons[currentIndex].text;
                cardEmoji.textContent = reasons[currentIndex].emoji;
                
                gsap.to(card, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.4,
                    ease: "back.out(1.2)"
                });
            }
        });
    } else {
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            localStorage.setItem('musicTime', bgMusic.currentTime);
        }

        // SMOOTH PAGE EXIT: Smoothly fade out the body layer before navigating to the next page
        gsap.to('body', {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
    }
}

// High-Performance Ambient Background Animation Layer for Page 2
function createBackgroundParticle() {
    const elements = ['❤️', '✨', '💖', '🌸', '⭐', '💕'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    
    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 22 + 10;
    
    element.style.left = startX + 'px';
    element.style.top = (window.innerHeight + 50) + 'px';
    element.style.fontSize = size + 'px';
    element.style.position = 'fixed';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0';
    element.style.zIndex = '0'; // Hidden structural layer behind interactive card windows
    
    document.body.appendChild(element);

    gsap.to(element, {
        y: -(window.innerHeight + 150),
        x: `+=${Math.random() * 120 - 60}`,
        opacity: Math.random() * 0.4 + 0.2,
        duration: Math.random() * 7 + 5,
        ease: "power1.out",
        onComplete: () => element.remove()
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // SMOOTH PAGE ENTRANCE: Gracefully transition page opacity into focus when loading completes
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });

    // Ultra-Fast Zero-Lag Cursor Tracker for Page 2
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");

        document.addEventListener('mousemove', (e) => {
            xSet(e.clientX);
            ySet(e.clientY);
        });
    }

    // Spawns custom ambient particles background
    setInterval(createBackgroundParticle, 450);

    // Audio persistence system layout
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
                musicToggle.classList.add('playing');
            }).catch(() => {
                localStorage.setItem('musicPlaying', 'false');
            });
        }

        setInterval(() => {
            if (!bgMusic.paused) localStorage.setItem('musicTime', bgMusic.currentTime);
        }, 1000);

        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicToggle.textContent = "⏸️ Pause Song";
                    musicToggle.classList.add('playing');
                    localStorage.setItem('musicPlaying', 'true');
                });
            } else {
                bgMusic.pause();
                musicToggle.textContent = "🎵 Play Song";
                musicToggle.classList.remove('playing');
                localStorage.setItem('musicPlaying', 'false');
            }
        });
    }
});

shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});