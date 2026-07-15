document.addEventListener('DOMContentLoaded', () => {
    const ambientToggle = document.getElementById('ambient-toggle');
    const glow = document.getElementById('glow');
    const subject = document.getElementById('subject');

    // 1. Interactive Ambient Switch
    ambientToggle.addEventListener('change', () => {
        if (ambientToggle.checked) {
            document.body.classList.add('alt-ambient');
        } else {
            document.body.classList.remove('alt-ambient');
        }
    });

    // 2. Parallax / Mouse Move Lighting Effect
    // Moves the background glow subtly following the user's cursor
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate translation relative to screen center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (mouseX - centerX) * 0.05;
        const moveY = (mouseY - centerY) * 0.05;

        // Smoothly offset the ambient light background
        glow.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        
        // Minor counter-movement on the main character cutout for 3D depth
        if (subject) {
            const subjectMoveX = (mouseX - centerX) * 0.015;
            subject.style.transform = `translateX(calc(-0% + ${subjectMoveX}px)) scale(1.02)`;
        }
    });

    // Reset subject transformation when mouse leaves window
    document.addEventListener('mouseleave', () => {
        if (subject) {
            subject.style.transform = 'translateX(0) scale(1)';
        }
    });
});
