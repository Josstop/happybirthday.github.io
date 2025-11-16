// Funcionalidad para cargar fotos
document.addEventListener('DOMContentLoaded', function() {
    const photoInputs = document.querySelectorAll('.photo-input');
    
    photoInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const placeholder = input.parentElement;
                    placeholder.innerHTML = '';
                    placeholder.style.backgroundImage = `url(${event.target.result})`;
                    placeholder.style.backgroundSize = 'cover';
                    placeholder.style.backgroundPosition = 'center';
                }
                reader.readAsDataURL(file);
            }
        });
    });
    
    // Efecto de confeti adicional al hacer clic
    document.addEventListener('click', function(e) {
        createClickConfetti(e.clientX, e.clientY);
    });
    
    function createClickConfetti(x, y) {
        for (let i = 0; i < 10; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            confetti.style.background = getRandomColor();
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    function getRandomColor() {
        const colors = ['#ff4081', '#4caf50', '#2196f3', '#ffeb3b', '#9c27b0', '#ff9800'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Reproducir música de feliz cumpleaños
    const happyBirthdayNotes = [
        261.63, 261.63, 293.66, 261.63, 349.23, 329.63,
        261.63, 261.63, 293.66, 261.63, 392.00, 349.23,
        261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66,
        466.16, 466.16, 440.00, 349.23, 392.00, 349.23
    ];
    
    const noteDurations = [
        0.5, 0.5, 1, 1, 1, 2,
        0.5, 0.5, 1, 1, 1, 2,
        0.5, 0.5, 1, 1, 1, 1, 2,
        0.5, 0.5, 1, 1, 1, 2
    ];
    
    // Función para tocar la melodía (se activa con interacción del usuario)
    document.addEventListener('click', function playBirthdaySong() {
        // Solo reproducir una vez
        document.removeEventListener('click', playBirthdaySong);
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let startTime = audioContext.currentTime;
        
        happyBirthdayNotes.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + noteDurations[index] * 0.8);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + noteDurations[index] * 0.8);
            
            startTime += noteDurations[index] * 0.8;
        });
    }, { once: true });
});
