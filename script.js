/**
 * Víctor de las Heras Reverte - Designer Portfolio Scripts
 * Premium Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 1.1 Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const words = ["Sustainable", "Smarter", "Better", "Greener", "Resilient", "Digital"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 100;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typewriterElement) {
        type();
    }

    // 2. Navbar Scroll Effect & Scroll Spy
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Navbar scrolled state
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Scroll Spy
        let current = "";
        
        // Only highlight if we've scrolled past the hero section
        if (window.pageYOffset > 300) {
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute("id");
                }
            });
        }

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (current && link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 3. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = nav.classList.contains('scrolled') ? 60 : 90;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Parallax Effect for Hero BG Text (Subtle)
    const heroBgText = document.querySelector('.hero-bg-text');
    window.addEventListener('scroll', () => {
        if (heroBgText) {
            const scroll = window.scrollY;
            heroBgText.style.transform = `translateY(${scroll * 0.2}px)`;
        }
    });

    // 5. Project Image Hover Parallax (Subtle)
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const img = item.querySelector('.project-img');
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            if (img) {
                img.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (img) {
                img.style.transform = `scale(1) translate(0, 0)`;
            }
        });
    });

    // 6. Subtle Background Motion (Mouse Follow)
    const body = document.body;
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        body.style.backgroundPosition = `${x}px ${y}px`;
    });

    // 7. Hero Name Underline Activation
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        setTimeout(() => {
            heroName.classList.add('active');
        }, 800);
    }

    // 8. Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // 9. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .trait');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot && cursorOutline) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 10. Magnetic Effect (Subtle)
    const magneticElements = document.querySelectorAll('.nav-cta, .contact-btn, .logo');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            el.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
        });
    });

    // 11. Image Loading Experience
    const images = document.querySelectorAll('.project-img, .about-img, .profile-img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });

    // 12. Easter Egg (3 Clicks on Logo)
    const logo = document.querySelector('.logo');
    let logoClicks = 0;
    if (logo) {
        logo.addEventListener('click', (e) => {
            if (e.target.closest('.logo')) {
                logoClicks++;
                if (logoClicks === 3) {
                    logo.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    logo.style.transform = 'scale(1.2) rotate(360deg)';
                    setTimeout(() => {
                        logo.style.transform = 'scale(1) rotate(0deg)';
                        logoClicks = 0;
                    }, 1000);
                    console.log("%c Engineering Excellence %c Víctor de las Heras Reverte ", "background: #0047FF; color: #fff; padding: 5px; border-radius: 3px 0 0 3px;", "background: #121212; color: #fff; padding: 5px; border-radius: 0 3px 3px 0;");
                }
            }
        });
    }

    // 13. Developer Console Message
    console.log("%c Portfolio v2.0 %c Built with precision and care. ", "background: #0047FF; color: #fff; padding: 5px; border-radius: 3px 0 0 3px;", "background: #121212; color: #fff; padding: 5px; border-radius: 0 3px 3px 0;");
});
