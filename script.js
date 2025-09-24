document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('music-player');
    const progressBar = document.getElementById('progress-bar');
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    // Card switching elements
    const profileCard = document.getElementById('profile-card');
    const aboutCard = document.getElementById('about-card');
    const expandBtn = document.getElementById('expand-btn');
    const collapseBtn = document.getElementById('collapse-btn');

    // NEW: Gallery card elements
    const galleryCard = document.getElementById('gallery-card');
    const galleryBtn = document.getElementById('gallery-btn');
    const galleryCollapseBtn = document.getElementById('gallery-collapse-btn');


    // Particle effect setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    const particleSettings = {
        count: 150,
        maxSize: 3,
        minSize: 1,
        speed: 0.5,
        color: 'white'
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (particleSettings.maxSize - particleSettings.minSize) + particleSettings.minSize;
            this.speed = Math.random() * particleSettings.speed + 0.1;
        }
        draw() {
            ctx.fillStyle = particleSettings.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            if (this.y > canvas.height) {
                this.y = 0 - this.size;
                this.x = Math.random() * canvas.width;
            }
            this.y += this.speed;
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < particleSettings.count; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Intro screen click event
    introScreen.addEventListener('click', () => {
        // Attempt to play music
        music.play().then(() => {
            console.log("Audio is playing.");
        }).catch(error => {
            console.error("Audio playback failed:", error);
            // In many browsers, audio can't play until a user interaction on the page.
            // This click on the intro screen counts as that interaction.
        });
        
        introScreen.style.opacity = '0';
        mainContent.classList.remove('hidden');
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.style.opacity = '1';
        }, 1000); // Match CSS transition duration
    });

    // Music progress bar update
    music.addEventListener('timeupdate', () => {
        const progress = (music.currentTime / music.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });
    
    // --- Card Switching Logic ---
    expandBtn.addEventListener('click', () => {
        profileCard.classList.add('hidden');
        setTimeout(() => {
            aboutCard.classList.remove('hidden');
            aboutCard.classList.add('visible');
        }, 100); // A small delay for a smoother transition
    });

    collapseBtn.addEventListener('click', () => {
        aboutCard.classList.remove('visible');
        aboutCard.classList.add('hidden');
        setTimeout(() => {
             profileCard.classList.remove('hidden');
        }, 100);
    });

    // NEW: Logic to switch to the Gallery card
    galleryBtn.addEventListener('click', () => {
        aboutCard.classList.remove('visible');
        aboutCard.classList.add('hidden');
        setTimeout(() => {
            galleryCard.classList.remove('hidden');
            galleryCard.classList.add('visible');
        }, 100);
    });

    // NEW: Logic for the gallery's collapse button to return to the first card
    galleryCollapseBtn.addEventListener('click', () => {
        galleryCard.classList.remove('visible');
        galleryCard.classList.add('hidden');
        setTimeout(() => {
            profileCard.classList.remove('hidden');
        }, 100);
    });

});