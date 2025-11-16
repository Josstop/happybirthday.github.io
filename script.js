// Esperar a que la página cargue
document.addEventListener('DOMContentLoaded', function() {
    console.log('¡Página de cumpleaños cargada! 🎉');
    
    // Elementos de audio
    const birthdaySong = document.getElementById('birthdaySong');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    
    // Control de música
    playButton.addEventListener('click', function() {
        // Usar un enlace directo de audio
        birthdaySong.src = 'https://www.soundjay.com/misc/sounds/fart-with-echo.mp3'; // Reemplaza con enlace real
        birthdaySong.play().catch(e => {
            console.log('Error reproduciendo audio:', e);
            alert('Haz clic en cualquier parte de la página primero para activar el audio');
        });
    });
    
    pauseButton.addEventListener('click', function() {
        birthdaySong.pause();
    });
    
    // Reproducir automáticamente después de interacción del usuario
    document.addEventListener('click', function initAudio() {
        // Solo intentar reproducir una vez
        document.removeEventListener('click', initAudio);
        
        // Usar un enlace de música genérica
        birthdaySong.src = 'https://www.soundjay.com/misc/sounds/fart-with-echo.mp3'; // Reemplaza con tu enlace
        birthdaySong.volume = 0.5;
        
        birthdaySong.play().catch(e => {
            console.log('Auto-play bloqueado:', e);
        });
    });
    
    // Crear confeti inicial
    createInitialConfetti();
    
    // Confeti al hacer clic
    document.addEventListener('click', function(e) {
        createClickConfetti(e.clientX, e.clientY);
    });
});

function createInitialConfetti() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createConfettiPiece();
        }, i * 150);
    }
}

function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = getRandomRedColor();
    confetti.style.animationDuration = (3 + Math.random() * 3) + 's';
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 6000);
}

function createClickConfetti(x, y) {
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.background = getRandomRedColor();
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

function getRandomRedColor() {
    const colors = ['#ff0000', '#8b0000', '#dc143c', '#b22222', '#ff4444', '#ff6666'];
    return colors[Math.floor(Math.random() * colors.length)];
}
