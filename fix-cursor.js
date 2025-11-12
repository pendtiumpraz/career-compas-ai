// Emergency fix for buttons not being clickable
document.addEventListener('DOMContentLoaded', function() {
    console.log("Running button clickability fix...");
    
    // Fix for all buttons and interactive elements
    const clickableElements = document.querySelectorAll(
        'button, .btn-primary, .btn-secondary, .btn-outline, .category-btn, ' + 
        '.carousel-dots .dot, .prev-story, .next-story, .option-card, .skill-tag, ' +
        '.feature-card, .career-path-card, .pricing-card, .mobile-menu-btn, .mobile-menu-close, ' +
        '.nav-links a, .nav-dropdown-toggle, .nav-dropdown-item'
    );
    
    clickableElements.forEach(element => {
        // Ensure elements have proper pointer events and z-index
        element.style.position = 'relative';
        element.style.pointerEvents = 'auto';
        element.style.zIndex = '10';
        
        // Add click handler to debug any issues
        element.addEventListener('click', function(e) {
            console.log('Element clicked:', this);
            
            // Add ripple effect for visual feedback
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                width: 10px;
                height: 10px;
                left: ${x}px;
                top: ${y}px;
                transform-origin: center;
                pointer-events: none;
                z-index: -1;
            `;
            
            this.appendChild(ripple);
            
            // Animate ripple
            const animation = ripple.animate(
                [
                    { transform: 'scale(1)', opacity: 1 },
                    { transform: 'scale(15)', opacity: 0 }
                ],
                {
                    duration: 600,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            );
            
            animation.onfinish = () => {
                if (ripple.parentNode === this) {
                    this.removeChild(ripple);
                }
            };
        });
    });
    
    // Fix floating elements to not block clicks
    const floatingElements = document.querySelectorAll('.floating-elements, .floating-element, .brain-nodes, .brain-connections');
    floatingElements.forEach(element => {
        element.style.pointerEvents = 'none';
    });
    
    // Ensure custom cursor doesn't block clicks
    const cursorElements = document.querySelectorAll('.cursor-outer, .cursor-inner');
    cursorElements.forEach(element => {
        element.style.pointerEvents = 'none';
    });
    
    console.log("Button clickability fix complete.");
});
