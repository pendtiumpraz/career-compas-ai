// Register GSAP Plugins with enhanced configuration
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin);

// Global settings for smoother animations
gsap.config({
    autoSleep: 60,
    force3D: true,
    nullTargetWarn: false
});

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen after initial animations
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Add custom cursor (more elegant UI)
    initCustomCursor();
    
    // Initialize the page animations
    initPageAnimations();
    
    // Handle assessment functionality
    initAssessment();
    
    // Handle career paths section
    initCareerPaths();
    
    // Handle testimonial carousel
    initTestimonialCarousel();
    
    // Pricing toggle animation
    initPricingToggle();
    
    // Enhanced navbar functionality
    initEnhancedNavbar();
    
    // Handle mobile menu
    initMobileMenu();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize interactive elements
    initInteractiveElements();
});

// Custom cursor for more elegant UI
function initCustomCursor() {
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'cursor-outer';
    
    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Add CSS for cursors - IMPORTANT: Add pointer-events: none to ensure clicks pass through
    const style = document.createElement('style');
    style.textContent = `
        .cursor-outer, .cursor-inner {
            pointer-events: none !important;
            position: fixed;
            border-radius: 50%;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, opacity 0.2s;
            mix-blend-mode: difference;
        }
        
        .cursor-outer {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: transform 0.1s ease-out;
        }
        
        .cursor-inner {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.8);
            transition: transform 0.05s ease-out;
        }
        
        .link-hover .cursor-outer {
            width: 60px;
            height: 60px;
            background: rgba(67, 97, 238, 0.1);
            border-color: var(--primary-color);
        }
        
        .button-hover .cursor-outer {
            width: 70px;
            height: 70px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
        }
        
        .cursor-hidden {
            opacity: 0;
        }
        
        @media (max-width: 768px) {
            .cursor-outer, .cursor-inner {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mouse movement listener
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorOuter, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4,
            ease: 'expo.out'
        });
        
        gsap.to(cursorInner, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power1.out'
        });
    });
    
    // Mouse events for links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (link.tagName === 'BUTTON') {
                document.body.classList.add('button-hover');
            } else {
                document.body.classList.add('link-hover');
            }
        });
        
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('link-hover', 'button-hover');
        });
    });
    
    // Handle cursor visibility
    document.addEventListener('mouseenter', () => {
        cursorOuter.classList.remove('cursor-hidden');
        cursorInner.classList.remove('cursor-hidden');
    });
    
    document.addEventListener('mouseleave', () => {
        cursorOuter.classList.add('cursor-hidden');
        cursorInner.classList.add('cursor-hidden');
    });
    
    // Mouse down/up effects
    document.addEventListener('mousedown', () => {
        gsap.to(cursorOuter, {
            scale: 0.8,
            duration: 0.2,
            ease: 'power2.out'
        });
        
        gsap.to(cursorInner, {
            scale: 0.6,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    document.addEventListener('mouseup', () => {
        gsap.to([cursorOuter, cursorInner], {
            scale: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.3)'
        });
    });
}

// Parallax effects for more elegant visuals
function initParallaxEffects() {
    // Hero section parallax
    document.addEventListener('mousemove', (e) => {
        const xValue = e.clientX - window.innerWidth / 2;
        const yValue = e.clientY - window.innerHeight / 2;
        
        gsap.to('.floating-element.fe-1', {
            x: xValue * 0.02,
            y: yValue * 0.02,
            duration: 1,
            ease: 'power1.out'
        });
        
        gsap.to('.floating-element.fe-2', {
            x: -xValue * 0.01,
            y: -yValue * 0.01,
            duration: 1,
            ease: 'power1.out'
        });
        
        gsap.to('.floating-element.fe-3', {
            x: xValue * 0.015,
            y: yValue * 0.015,
            duration: 1,
            ease: 'power1.out'
        });
        
        gsap.to('.compass-arrow', {
            rotation: xValue * 0.01,
            duration: 1,
            ease: 'power1.out'
        });
    });
    
    // Smooth scroll parallax for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.to(section, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Interactive elements with smooth animations
function initInteractiveElements() {
    // Button click animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .category-btn, .prev-story, .next-story');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                pointer-events: none;
                width: 10px;
                height: 10px;
                left: ${x}px;
                top: ${y}px;
                transform-origin: center;
            `;
            
            this.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 10,
                opacity: 0,
                duration: 0.6,
                ease: 'power1.out',
                onComplete: () => {
                    if (ripple.parentNode === this) {
                        ripple.remove();
                    }
                }
            });
            
            // Button animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power1.out',
                onComplete: () => {
                    gsap.to(this, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.3)'
                    });
                }
            });
        });
        
        // Add pointer-events explicitly
        button.style.pointerEvents = 'auto';
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .career-path-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (centerY - mouseY) * 0.01;
            const angleY = (mouseX - centerX) * 0.01;
            
            gsap.to(this, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                ease: 'power1.out',
                duration: 0.3
            });
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (centerY - mouseY) * 0.01;
            const angleY = (mouseX - centerX) * 0.01;
            
            gsap.to(this, {
                rotationX: angleX,
                rotationY: angleY,
                ease: 'power1.out',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationX: 0,
                rotationY: 0,
                ease: 'power3.out',
                duration: 0.5
            });
        });
        
        // Add pointer-events explicitly
        card.style.pointerEvents = 'auto';
    });
}

// Main page animations
function initPageAnimations() {
    // Enhanced loading screen animation
    const loadingTimeline = gsap.timeline();
    
    loadingTimeline.from('.compass-loader', {
        scale: 0, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'back.out(1.7)'
    })
    .from('.loading-text', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
    }, '-=0.3');
    
    // Remove loading screen with enhanced animation
    setTimeout(() => {
        gsap.to('.loading-screen', {
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            onComplete: () => {
                document.querySelector('.loading-screen').style.display = 'none';
                // Start the hero entrance animation
                animateHeroEntrance();
            }
        });
    }, 2200);
    
    // Hero entrance animation
    function animateHeroEntrance() {
        const heroTl = gsap.timeline();
        
        heroTl.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
        })
        .to('.hero-image', {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.compass-outer-ring', {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.5')
        .from('.compass-inner-ring', {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)'
        }, '-=1')
        .from('.compass-center', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.compass-arrow', {
            scale: 0,
            opacity: 0,
            transformOrigin: 'bottom',
            duration: 1,
            ease: 'power3.out',
            onComplete: () => {
                // Animate the compass arrow rotation
                gsap.to('.compass-arrow', {
                    rotation: 360,
                    transformOrigin: 'bottom',
                    duration: 3,
                    ease: 'power1.inOut',
                    repeat: 1,
                    yoyo: true
                });
            }
        }, '-=0.8')
        .from('.career-orb', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .to('.floating-element', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-cta-buttons .btn', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.hero-stats', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3');
    }
    
    // Add 3D hover effect to the hero compass
    const compass = document.querySelector('.career-compass');
    if (compass) {
        // Create a more realistic 3D effect
        const compassContainer = document.querySelector('.career-compass-container');
        
        compassContainer.addEventListener('mousemove', (e) => {
            const rect = compassContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from center as percentage
            const percentX = (e.clientX - centerX) / (rect.width / 2);
            const percentY = (e.clientY - centerY) / (rect.height / 2);
            
            // Limit rotation to a natural range
            const rotationX = Math.min(Math.max(percentY * 15, -15), 15);
            const rotationY = Math.min(Math.max(-percentX * 15, -15), 15);
            
            gsap.to('.career-compass', {
                rotationX: rotationX,
                rotationY: rotationY,
                transformPerspective: 1000,
                transformOrigin: 'center center',
                ease: 'power2.out',
                duration: 0.5
            });
            
            // Add subtle movement to rings
            gsap.to('.compass-outer-ring', {
                rotationX: rotationX * 0.5,
                rotationY: rotationY * 0.5,
                transformOrigin: 'center center',
                ease: 'power2.out',
                duration: 0.8
            });
            
            gsap.to('.compass-inner-ring', {
                rotationX: rotationX * 0.7,
                rotationY: rotationY * 0.7,
                transformOrigin: 'center center',
                ease: 'power2.out',
                duration: 0.5
            });
            
            // Add more depth to career orbs
            gsap.to('.career-orbs', {
                rotationX: rotationX * 0.3,
                rotationY: rotationY * 0.3,
                transformOrigin: 'center center',
                ease: 'power2.out',
                duration: 0.7
            });
        });
        
        // Reset on mouse leave
        compassContainer.addEventListener('mouseleave', () => {
            gsap.to(['.career-compass', '.compass-outer-ring', '.compass-inner-ring', '.career-orbs'], {
                rotationX: 0,
                rotationY: 0,
                ease: 'power3.out',
                duration: 1.2
            });
        });
    }
    
    // Animate career orbs in a circular motion with enhanced speed control
    gsap.to('.career-orbs', {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center'
    });
    
    // Add subtle pulsating effect to the compass center
    gsap.to('.compass-center', {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Add glow effect to the compass
    const compassTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    compassTimeline.to('.career-compass', {
        boxShadow: '0 0 25px rgba(74, 222, 222, 0.6), 0 0 50px rgba(74, 222, 222, 0.3)',
        duration: 2,
        ease: 'sine.inOut'
    })
    .to('.career-compass', {
        boxShadow: '0 0 15px rgba(74, 222, 222, 0.4), 0 0 30px rgba(74, 222, 222, 0.2)',
        duration: 2,
        ease: 'sine.inOut'
    });
    
    // Enhanced counter animation for stats with smoother counting
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const valueDisplay = stat.textContent;
        stat.textContent = '0';
        
        const counter = { value: 0 };
        
        const countUp = gsap.to(counter, {
            value: target,
            duration: 3,
            ease: 'power2.out',
            onUpdate: function() {
                stat.textContent = Math.ceil(counter.value);
            },
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'restart none none none'
            }
        });
    });
    
    // Enhanced floating animation for job bubbles with random movement
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        // Random initial position
        gsap.set(element, {
            x: gsap.utils.random(-20, 20),
            y: gsap.utils.random(-10, 10)
        });
        
        // Create floating animation
        gsap.to(element, {
            y: '+=15',
            x: '+=5',
            rotation: gsap.utils.random(-3, 3),
            duration: gsap.utils.random(2, 4),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                scale: 1.1,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                scale: 1,
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        });
    });
    
    // Section headers animation with staggered text reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');
        
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        headerTl.to(header, {
            opacity: 1,
            duration: 0.8
        })
        .to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, '-=0.4')
        .from(subtitle, {
            opacity: 0,
            y: 20,
            duration: 0.8
        }, '-=0.4');
    });
    
    // Enhanced assessment card animation
    gsap.to('.assessment-card', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.assessment-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Animate assessment steps with enhanced staggering
    gsap.from('.step', {
        opacity: 0,
        y: 30,
        stagger: 0.3,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.assessment-steps',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Enhanced feature cards animation with 3D rotation
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        const cardTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        cardTl.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.15
        });
        
        // Add hover effect with 3D rotation
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const xRotation = 20 * ((mouseY - rect.height / 2) / rect.height);
            const yRotation = -20 * ((mouseX - rect.width / 2) / rect.width);
            
            gsap.to(this, {
                rotationX: xRotation,
                rotationY: yRotation,
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                ease: 'power1.out',
                duration: 0.5,
                transformPerspective: 1000
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                ease: 'power1.out',
                duration: 0.5
            });
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const xRotation = 20 * ((mouseY - rect.height / 2) / rect.height);
            const yRotation = -20 * ((mouseX - rect.width / 2) / rect.width);
            
            gsap.to(this, {
                rotationX: xRotation,
                rotationY: yRotation,
                ease: 'power1.out',
                duration: 0.1,
                transformPerspective: 1000
            });
        });
    });
    
    // Feature icons enhanced animation
    gsap.utils.toArray('.feature-icon').forEach((icon) => {
        gsap.from(icon, {
            rotate: 360,
            scale: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
                trigger: icon,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Enhanced career paths cards animation
    gsap.utils.toArray('.career-path-card').forEach((card, i) => {
        const cardTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.career-paths-container',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        cardTl.from(card, {
            y: 70,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.15
        });
        
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
    
    // Enhanced story cards animation with staggered entrance
    gsap.utils.toArray('.story-card').forEach((card, i) => {
        gsap.from(card, {
            x: i % 2 === 0 ? -70 : 70,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.stories-carousel',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Enhanced pricing cards animation with staggered entrance and hover effects
    gsap.utils.toArray('.pricing-card').forEach((card, i) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: i * 0.25,
            scrollTrigger: {
                trigger: '.pricing-cards',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
    
    // Enhanced AI Brain animation in CTA section
    const brainAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: '.ai-cta-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    brainAnimation
        .from('.ai-brain', {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)'
        })
        .from('.brain-nodes', {
            opacity: 0,
            scale: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.brain-connections', {
            opacity: 0,
            width: 0,
            duration: 1.8,
            ease: 'power3.out'
        }, '-=1');
    
    // Enhanced CTA Content animation with text reveal
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        const ctaTitle = ctaContent.querySelector('h2');
        const ctaText = ctaContent.querySelector('p');
        const ctaButton = ctaContent.querySelector('button');
        
        const ctaTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.ai-cta-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        ctaTl.from(ctaTitle, {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power3.out'
        })
        .from(ctaText, {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.7')
        .from(ctaButton, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'back.out(1.7)'
        }, '-=0.7');
    }
    
    // Enhanced Footer animations with staggered elements
    const footerAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
    
    footerAnimation
        .from('.footer-logo', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.footer-column', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.social-links a', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.copyright', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5');
}

// Handle assessment functionality
function initAssessment() {
    const steps = document.querySelectorAll('.step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const progressBar = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-text');
    const assessmentCard = document.querySelector('.assessment-card');
    const optionCards = document.querySelectorAll('.option-card');
    const skillTags = document.querySelectorAll('.skill-tag');
    const interestSliders = document.querySelectorAll('.interest-slider');
    const stepIndicators = document.querySelectorAll('.step');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const submitBtn = document.querySelector('.submit-assessment');
    
    let currentStepIndex = 0;
    const totalSteps = document.querySelectorAll('.question-panel').length;
    
    // Initialize with legacy step indicators
    updateStepIndicators();
    
    // Enhance option cards with selection animations
    optionCards.forEach(card => {
        // Add check icon if not present
        if (!card.querySelector('.check-icon')) {
            const checkIcon = document.createElement('span');
            checkIcon.className = 'check-icon';
            checkIcon.innerHTML = '<i class="fas fa-check"></i>';
            card.appendChild(checkIcon);
        }
        
        card.addEventListener('click', () => {
            // First, get all siblings from the same panel
            const parentPanel = card.closest('.question-panel');
            const siblings = parentPanel.querySelectorAll('.option-card');
            
            // Deselect siblings
            siblings.forEach(sibling => {
                if (sibling !== card) {
                    sibling.classList.remove('selected');
                    gsap.to(sibling, {
                        scale: 1,
                        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    const siblingCheck = sibling.querySelector('.check-icon');
                    if (siblingCheck) {
                        gsap.to(siblingCheck, {
                            scale: 0,
                            opacity: 0,
                            duration: 0.2,
                            ease: 'power2.in'
                        });
                    }
                }
            });
            
            // Toggle selection
            if (!card.classList.contains('selected')) {
                card.classList.add('selected');
                
                // Play selection animation
                gsap.timeline()
                    .to(card, {
                        scale: 1.05,
                        boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.2)',
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    })
                    .to(card.querySelector('.check-icon'), {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'elastic.out(1, 0.5)'
                    }, '-=0.1');
                
                // Add a pulse animation to the next button
                gsap.fromTo(nextBtn, 
                    { scale: 1 }, 
                    { 
                        scale: 1.1, 
                        duration: 0.3, 
                        repeat: 1, 
                        yoyo: true,
                        ease: 'power2.inOut' 
                    }
                );
            } else {
                card.classList.remove('selected');
                
                // Play deselection animation
                gsap.timeline()
                    .to(card, {
                        scale: 1,
                        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                        duration: 0.3,
                        ease: 'power2.out'
                    })
                    .to(card.querySelector('.check-icon'), {
                        scale: 0,
                        opacity: 0,
                        duration: 0.2,
                        ease: 'power2.in'
                    }, '-=0.2');
            }
        });
        
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('selected')) {
                gsap.to(card, {
                    y: -5,
                    boxShadow: '0 0.8rem 1.5rem rgba(0, 0, 0, 0.2)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('selected')) {
                gsap.to(card, {
                    y: 0,
                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Enhance skill tags with selection animations
    skillTags.forEach(tag => {
        // Add check icon if not present
        if (!tag.querySelector('.skill-check')) {
            const checkIcon = document.createElement('span');
            checkIcon.className = 'skill-check';
            checkIcon.innerHTML = '<i class="fas fa-check"></i>';
            tag.prepend(checkIcon);
        }
        
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
            
            if (tag.classList.contains('selected')) {
                // Play selection animation
                gsap.fromTo(tag, 
                    { scale: 1 }, 
                    { 
                        scale: 1.15, 
                        duration: 0.3, 
                        ease: 'back.out(1.7)',
                        onComplete: () => {
                            gsap.to(tag, { scale: 1, duration: 0.2 });
                        }
                    }
                );
                
                // Animate check icon
                const checkIcon = tag.querySelector('.skill-check');
                if (checkIcon) {
                    gsap.fromTo(checkIcon, 
                        { scale: 0, opacity: 0 }, 
                        { 
                            scale: 1, 
                            opacity: 1, 
                            duration: 0.3, 
                            ease: 'back.out(1.7)' 
                        }
                    );
                }
            } else {
                // Animate check icon removal
                const checkIcon = tag.querySelector('.skill-check');
                if (checkIcon) {
                    gsap.to(checkIcon, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.2,
                        ease: 'power2.in'
                    });
                }
            }
            
            // Count selected skills and animate the counter
            const selectedSkills = document.querySelectorAll('.skill-tag.selected');
            const skillCounter = document.querySelector('.selected-skills-count');
            
            if (skillCounter) {
                const currentCount = parseInt(skillCounter.textContent);
                const newCount = selectedSkills.length;
                
                gsap.fromTo(skillCounter, 
                    { textContent: currentCount }, 
                    {
                        textContent: newCount,
                        duration: 0.3,
                        ease: 'power2.out',
                        snap: { textContent: 1 }
                    }
                );
                
                // Pulse animation for counter
                gsap.fromTo(skillCounter,
                    { scale: 1 },
                    {
                        scale: 1.2,
                        duration: 0.3,
                        ease: 'back.out(1.7)',
                        onComplete: () => {
                            gsap.to(skillCounter, { scale: 1, duration: 0.2 });
                        }
                    }
                );
            }
        });
    });
    
    // Enhance interest sliders with animated visual feedback
    interestSliders.forEach(slider => {
        const valueDisplay = slider.querySelector('.slider-value');
        const sliderInput = slider.querySelector('.slider');
        
        // Add slider fill if not present
        if (!slider.querySelector('.slider-fill')) {
            const sliderFill = document.createElement('div');
            sliderFill.className = 'slider-fill';
            sliderInput.parentNode.insertBefore(sliderFill, sliderInput);
            
            // Set initial width based on value
            const value = sliderInput.value;
            const percentage = (value / 10) * 100;
            sliderFill.style.width = `${percentage}%`;
        }
        
        const sliderFill = slider.querySelector('.slider-fill');
        
        sliderInput.addEventListener('input', () => {
            const value = sliderInput.value;
            const percentage = (value / 10) * 100;
            
            // Update value display
            if (valueDisplay) {
                valueDisplay.textContent = value;
            }
            
            // Animate the fill
            gsap.to(sliderFill, {
                width: `${percentage}%`,
                duration: 0.2,
                ease: 'power1.out'
            });
            
            // Animate the value display
            if (valueDisplay) {
                gsap.fromTo(valueDisplay,
                    { scale: 1 },
                    {
                        scale: 1.2,
                        duration: 0.3,
                        ease: 'back.out(1.7)',
                        onComplete: () => {
                            gsap.to(valueDisplay, { scale: 1, duration: 0.2 });
                        }
                    }
                );
            }
            
            // Change color based on value
            const hue = 120 + (10 - value) * 15; // 120 for green (high), 270 for blue (low)
            const color = `hsl(${hue}, 80%, 50%)`;
            
            gsap.to(sliderFill, {
                backgroundColor: color,
                duration: 0.3
            });
        });
    });
    
    // Button clicked events
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStepIndex < totalSteps - 1) {
                navigateToStep(currentStepIndex + 1);
            } else {
                // We're on the last step - show results
                const loadingSpinner = document.querySelector('.loading-spinner');
                const resultsDisplay = document.querySelector('.results-display');
                const resultsLoading = document.querySelector('.results-loading');
                const progressBar = document.querySelector('.progress-bar');
                
                if (loadingSpinner && progressBar) {
                    // Show loading animation
                    gsap.to(loadingSpinner, { opacity: 1, duration: 0.3 });
                    gsap.to(progressBar, { width: '100%', duration: 2.5, ease: 'power2.inOut' });
                    
                    // After "loading", show results
                    setTimeout(() => {
                        if (resultsLoading && resultsDisplay) {
                            gsap.to(resultsLoading, {
                                opacity: 0,
                                duration: 0.5,
                                onComplete: () => {
                                    resultsLoading.classList.add('hide');
                                    resultsDisplay.classList.remove('hide');
                                    
                                    // Animate results
                                    gsap.from('.career-match', {
                                        y: 30,
                                        opacity: 0,
                                        stagger: 0.15,
                                        duration: 0.8,
                                        ease: 'back.out(1.5)'
                                    });
                                }
                            });
                        }
                    }, 3000);
                }
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                navigateToStep(currentStepIndex - 1);
            }
        });
    }
    
    // Helper functions for assessment
    function findStepIndex(element) {
        const step = element.closest('.step');
        return Array.from(steps).indexOf(step);
    }
    
    function validateStep(step) {
        // For demo purposes, always return true
        // In a real implementation, check for required selections
        return true;
    }
    
    function navigateToStep(index) {
        // Boundary check
        if (index < 0 || index >= totalSteps) return;
        
        // Get panels
        const panels = document.querySelectorAll('.question-panel');
        
        // Hide current panel with animation
        gsap.to(panels[currentStepIndex], {
            opacity: 0,
            x: currentStepIndex < index ? -30 : 30,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                panels[currentStepIndex].classList.remove('active-panel');
                
                // Update current step
                currentStepIndex = index;
                
                // Show new panel with animation
                panels[currentStepIndex].classList.add('active-panel');
                gsap.fromTo(panels[currentStepIndex],
                    { opacity: 0, x: currentStepIndex < index ? 30 : -30 },
                    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                );
                
                // Update step indicators and progress
                updateStepIndicators();
                updateProgress();
                
                // Update buttons
                if (currentStepIndex === 0) {
                    prevBtn.disabled = true;
                } else {
                    prevBtn.disabled = false;
                }
                
                if (currentStepIndex === totalSteps - 1) {
                    nextBtn.textContent = 'See Results';
                } else {
                    nextBtn.textContent = 'Next';
                }
            }
        });
    }
    
    function updateStepIndicators() {
        // Update legacy step indicators
        steps.forEach((step, index) => {
            // Remove all classes
            step.classList.remove('active-step', 'completed-step');
            
            // Add appropriate class
            if (index < currentStepIndex) {
                step.classList.add('completed-step');
            } else if (index === currentStepIndex) {
                step.classList.add('active-step');
            }
        });
        
        // Update step counters
        const stepsCounter = document.querySelector('.steps-counter');
        if (stepsCounter) {
            stepsCounter.textContent = `Step ${currentStepIndex + 1} of ${totalSteps}`;
        }
    }
    
    function updateProgress() {
        const progress = ((currentStepIndex) / (totalSteps - 1)) * 100;
        
        if (progressBar) {
            gsap.to(progressBar, {
                width: `${progress}%`,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
        
        if (progressText) {
            progressText.textContent = `Step ${currentStepIndex + 1} of ${totalSteps}`;
        }
    }
}

// Career Paths filter functionality
function initCareerPaths() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const careerCards = document.querySelectorAll('.career-path-card');
    
    if (!categoryBtns.length) return;
    
    categoryBtns.forEach(btn => {
        // Ensure pointer events work
        btn.style.pointerEvents = 'auto';
        btn.style.zIndex = '5';
        
        btn.addEventListener('click', () => {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            // Filter cards
            careerCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category').includes(category)) {
                    // Show card with animation
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                        display: 'block'
                    });
                } else {
                    // Hide card with animation
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.5,
                        ease: 'power3.out',
                        display: 'none'
                    });
                }
            });
        });
    });
}

// Testimonial carousel functionality
function initTestimonialCarousel() {
    const carousel = document.querySelector('.stories-carousel');
    const cards = document.querySelectorAll('.story-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.prev-story');
    const nextBtn = document.querySelector('.next-story');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cardWidth = 100; // percentage
    
    // Set up initial state
    updateCarousel();
    
    // Auto-advance carousel
    const autoAdvance = setInterval(() => {
        nextSlide();
    }, 6000);
    
    // Next slide button
    nextBtn.addEventListener('click', () => {
        clearInterval(autoAdvance);
        nextSlide();
    });
    
    // Ensure pointer events work
    nextBtn.style.pointerEvents = 'auto';
    nextBtn.style.zIndex = '5';
    
    // Previous slide button
    prevBtn.addEventListener('click', () => {
        clearInterval(autoAdvance);
        prevSlide();
    });
    
    // Ensure pointer events work
    prevBtn.style.pointerEvents = 'auto';
    prevBtn.style.zIndex = '5';
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoAdvance);
            currentIndex = index;
            updateCarousel();
        });
        
        // Ensure pointer events work
        dot.style.pointerEvents = 'auto';
        dot.style.zIndex = '5';
    });
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }
    
    function updateCarousel() {
        // Update carousel position
        gsap.to(carousel, {
            x: `-${currentIndex * cardWidth}%`,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Pricing toggle functionality
function initPricingToggle() {
    const billingToggle = document.getElementById('billing-toggle');
    const prices = document.querySelectorAll('.price');
    
    billingToggle.addEventListener('change', () => {
        prices.forEach(price => {
            const monthly = price.getAttribute('data-monthly');
            const annual = price.getAttribute('data-annual');
            
            gsap.to(price, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => {
                    if (billingToggle.checked) {
                        price.innerHTML = `${annual}<span>/month</span>`;
                    } else {
                        price.innerHTML = `${monthly}<span>/month</span>`;
                    }
                    
                    gsap.to(price, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });
                }
            });
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu button
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.appendChild(mobileMenuBtn);
    
    // Create style for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 0;
                right: -300px;
                width: 300px;
                height: 100vh;
                background-color: var(--white-color);
                flex-direction: column;
                padding: 80px 20px 30px;
                transition: right 0.3s ease;
                z-index: 999;
                box-shadow: none;
            }
            
            .nav-links.open {
                right: 0;
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
            }
            
            .nav-links a {
                padding: 15px 0;
                border-bottom: 1px solid var(--gray-200);
            }
            
            .mobile-menu-btn {
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-color);
                cursor: pointer;
            }
            
            .mobile-menu-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--gray-800);
                cursor: pointer;
            }
            
            .nav-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 998;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            
            .nav-backdrop.open {
                opacity: 1;
                pointer-events: auto;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('mobile-menu-close');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    const navLinks = document.querySelector('.nav-links');
    navLinks.appendChild(closeBtn);
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.classList.add('nav-backdrop');
    document.body.appendChild(backdrop);
    
    // Toggle menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    // Close menu
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    
    function closeMenu() {
        navLinks.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    // Close menu when link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Enhanced navbar functionality
function initEnhancedNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const logoText = document.querySelector('.logo-text');
    
    // Add ripple effect CSS to document
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Create mobile menu button with animation
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.appendChild(mobileMenuBtn);
    
    // Create close button with animation
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('mobile-menu-close');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    const navLinksContainer = document.querySelector('.nav-links');
    navLinksContainer.appendChild(closeBtn);
    
    // Create backdrop with blur effect
    const backdrop = document.createElement('div');
    backdrop.classList.add('nav-backdrop');
    document.body.appendChild(backdrop);
    
    // Add dropdowns to navbar
    createNavDropdowns();
    
    // Scroll animation for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            gsap.to(logoText, { scale: 0.9, duration: 0.4, ease: 'power2.out' });
        } else {
            navbar.classList.remove('scrolled');
            gsap.to(logoText, { scale: 1, duration: 0.4, ease: 'power2.out' });
        }
    });
    
    // Add hover animations to nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { y: -3, duration: 0.3, ease: 'power2.out' });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
        
        // Add active class when clicking
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // If we're in mobile view, close the menu
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Toggle menu with animation
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Animate the links coming in
        gsap.fromTo('.nav-links a', 
            { opacity: 0, x: 20 }, 
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.5, 
                stagger: 0.1, 
                ease: 'power3.out',
                delay: 0.2
            }
        );
        
        // Animate the close button
        gsap.fromTo(closeBtn, 
            { opacity: 0, rotate: -90 }, 
            { opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1 }
        );
    });
    
    // Close menu with animation
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    
    function closeMenu() {
        navLinksContainer.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
        
        // Animate the links going out
        gsap.to('.nav-links a', { opacity: 0, x: 20, duration: 0.3, stagger: 0.05 });
        
        // Animate the close button
        gsap.to(closeBtn, { opacity: 0, rotate: -90, duration: 0.3 });
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
            // Reset any animations
            gsap.to('.nav-links a', { clearProps: 'all' });
        }
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const circle = document.createElement('span');
            circle.classList.add('btn-ripple');
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
            
            this.appendChild(circle);
            
            setTimeout(() => {
                circle.remove();
            }, 600);
        });
    });
    
    // Create dropdown functionality
    function createNavDropdowns() {
        // Find any navigation items that should be dropdowns
        const resourcesLink = document.querySelector('.nav-links a[href="#resources"]');
        if (resourcesLink) {
            // Convert to dropdown
            const dropdownHtml = `
                <div class="nav-dropdown">
                    <div class="nav-dropdown-toggle">
                        Resources <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="nav-dropdown-menu">
                        <a href="#blog" class="nav-dropdown-item">
                            <i class="fas fa-rss"></i>
                            <span>Blog</span>
                        </a>
                        <a href="#guides" class="nav-dropdown-item">
                            <i class="fas fa-book"></i>
                            <span>Career Guides</span>
                        </a>
                        <a href="#stories" class="nav-dropdown-item">
                            <i class="fas fa-user-friends"></i>
                            <span>Success Stories</span>
                        </a>
                        <a href="#faq" class="nav-dropdown-item">
                            <i class="fas fa-question-circle"></i>
                            <span>FAQ</span>
                        </a>
                    </div>
                </div>
            `;
            
            // Replace the link with the dropdown
            const dropdownContainer = document.createElement('div');
            dropdownContainer.innerHTML = dropdownHtml;
            resourcesLink.parentNode.replaceChild(dropdownContainer.firstElementChild, resourcesLink);
            
            // Add toggle functionality
            const dropdown = document.querySelector('.nav-dropdown');
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            
            toggle.addEventListener('click', () => {
                dropdown.classList.toggle('open');
                
                // Animate the dropdown menu
                if (dropdown.classList.contains('open')) {
                    gsap.fromTo('.nav-dropdown-item', 
                        { opacity: 0, y: 10 }, 
                        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
                    );
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });
        }
    }
} 