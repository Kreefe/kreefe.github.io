document.addEventListener('DOMContentLoaded', () => {
    
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        
        card.addEventListener('mousemove', (e) => {
            
            // Mouse glow tracking
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // 3D Tilt effect
            // Calculate mouse position relative to the center of the card
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Adjust these values to increase/decrease the tilt amount
            const rotateX = (mouseY / (rect.height / 2)) * -5; // Max 5deg tilt
            const rotateY = (mouseX / (rect.width / 2)) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset the tilt
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
        
        // Smooth transition when entering/leaving
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease';
        });
    });

});
