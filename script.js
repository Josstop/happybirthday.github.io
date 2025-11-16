
document.addEventListener('DOMContentLoaded', function() {
    console.log('¡Página de cumpleaños cargada! 🎉');
    
   
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
    
    
    createInitialConfetti();
    
    // Confeti al hacer clic
    document.addEventListener('click', function(e) {
        createClickConfetti(e.clientX, e.clientY);
    });
});

function createInitialConfetti() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createConfettiPiece();
        }, i * 200);
    }
}

function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = getRandomColor();
    confetti.style.animationDuration = (3 + Math.random() * 3) + 's';
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 6000);
}

function createClickConfetti(x, y) {
    for (let i = 0; i < 8; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.background = getRandomColor();
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

function getRandomColor() {
    const colors = ['#ff4081', '#4caf50', '#2196f3', '#ffeb3b', '#9c27b0', '#ff9800'];
    return colors[Math.floor(Math.random() * colors.length)];
}

