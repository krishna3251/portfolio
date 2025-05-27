/**
 * Enhanced Portfolio JavaScript
 * Author: Krishna
 * Description: Advanced animations and interactive features for portfolio website
 */
    
// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initParticles();
  initCustomCursor();
  initCardEffects();
  initScrollAnimations();
  initTypingEffect();
  initAudioEffects();
  initDarkModeToggle(); 
  initProjectFilters();
  init3DEffects();
  initSettingsToggle();
  initSmoothScroll();
  initLoadingScreen();
  initCustomContextMenu();
  initPageTransitions();
  initMusicWidget();
});
function initParticles() {
  // Get current theme color dynamically
  function getCurrentThemeColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#ffffff';
  }
  
  particlesJS("particles-js", {
    particles: {
      number: { 
        value: 80, // Reduced for better performance
        density: { 
          enable: true, 
          value_area: 800 
        } 
      },
      color: { 
        value: getCurrentThemeColor()
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        stroke: { 
          width: 0, 
          color: "#000000" 
        },
        polygon: {
          nb_sides: 6
        }
      },
      opacity: {
        value: 0.6,
        random: true,
        anim: { 
          enable: true, 
          speed: 0.8, // Slightly slower for smoothness
          opacity_min: 0.2, 
          sync: false 
        }
      },
      size: {
        value: 3,
        random: true,
        anim: { 
          enable: true, 
          speed: 1.5, // Slower size animation
          size_min: 0.5, 
          sync: false 
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: getCurrentThemeColor(),
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "bounce",
        bounce: true
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 150,
          line_linked: {
            opacity: 0.6
          }
        },
        push: {
          particles_nb: 3
        }
      }
    },
    retina_detect: true
  });

  // Enhanced particle system with smooth animations
  setTimeout(function() {
    let canvas = document.querySelector('#particles-js canvas');
    let particlesContainer = document.querySelector('#particles-js');
    
    if (!canvas || !window.pJSDom || !window.pJSDom[0] || !particlesContainer) return;
    
    let particles = window.pJSDom[0].pJS.particles.array;
    let mouseX = 0;
    let mouseY = 0;
    let windowCenterX = window.innerWidth / 2;
    let windowCenterY = window.innerHeight / 2;
    
    // Smooth 3D rotation variables
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    
    // Add gentle depth to particles
    particles.forEach(particle => {
      particle.z = Math.random() * 100 - 50;
      particle.originalSize = particle.radius;
      particle.originalOpacity = particle.opacity;
      particle.originalX = particle.x;
      particle.originalY = particle.y;
      particle.dancePhase = Math.random() * Math.PI * 2;
    });
    
    // Theme color watcher
    function updateParticleColors() {
      const newColor = getCurrentThemeColor();
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = newColor;
        window.pJSDom[0].pJS.particles.line_linked.color = newColor;
        
        particles.forEach(particle => {
          particle.color.value = newColor;
        });
      }
    }
    
    // Watch for theme changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
          setTimeout(updateParticleColors, 100);
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    observer.observe(document.body, { attributes: true }); 
    
    // Smooth mouse tracking
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      let canvasRect = canvas.getBoundingClientRect();
      let canvasMouseX = mouseX - canvasRect.left;
      let canvasMouseY = mouseY - canvasRect.top;
      
      window.pJSDom[0].pJS.interactivity.mouse.pos_x = canvasMouseX;
      window.pJSDom[0].pJS.interactivity.mouse.pos_y = canvasMouseY;
      
      // Gentle rotation based on mouse
      let mouseXPercent = (mouseX - windowCenterX) / windowCenterX;
      let mouseYPercent = (mouseY - windowCenterY) / windowCenterY;
      
      targetRotateY = mouseXPercent * 3; // Very gentle
      targetRotateX = -mouseYPercent * 3;
    });
    
    // Smooth 3D animation
    function animate3DCamera() {
      // Very smooth interpolation
      currentRotateX += (targetRotateX - currentRotateX) * 0.02;
      currentRotateY += (targetRotateY - currentRotateY) * 0.02;
      
      // Apply smooth transform
      particlesContainer.style.transform = `
        perspective(1000px) 
        rotateX(${currentRotateX}deg) 
        rotateY(${currentRotateY}deg)
      `;
      
      requestAnimationFrame(animate3DCamera);
    }
    
    // Smooth particle animation
    function animateParticles() {
      if (!particles || particles.length === 0) return;
      
      let time = Date.now() * 0.0005; // Slower time for smoother movement
      
      particles.forEach((particle, index) => {
        // Keep particles within screen bounds
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
        }
        
        // Gentle ambient dancing
        let gentleDanceX = Math.sin(time * 2 + particle.dancePhase) * 0.5;
        let gentleDanceY = Math.cos(time * 1.5 + particle.dancePhase) * 0.3;
        
        particle.x += gentleDanceX * 0.1;
        particle.y += gentleDanceY * 0.1;
        
        // Mouse attraction (smooth)
        let canvasRect = canvas.getBoundingClientRect();
        let canvasMouseX = mouseX - canvasRect.left;
        let canvasMouseY = mouseY - canvasRect.top;
        
        let isMouseNear = (
          mouseX >= canvasRect.left - 100 && 
          mouseX <= canvasRect.right + 100 && 
          mouseY >= canvasRect.top - 100 && 
          mouseY <= canvasRect.bottom + 100
        );
        
        if (isMouseNear) {
          let dx = canvasMouseX - particle.x;
          let dy = canvasMouseY - particle.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200 && distance > 0) {
            let force = (200 - distance) / 200;
            let attraction = 0.003 * force; // Very gentle
            
            particle.vx += dx * attraction;
            particle.vy += dy * attraction;
            
            // Smooth damping
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Speed limiting
            let speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 1.5) {
              particle.vx = (particle.vx / speed) * 1.5;
              particle.vy = (particle.vy / speed) * 1.5;
            }
          }
        }
      });
      
      requestAnimationFrame(animateParticles);
    }
    
    // Start animations
    animate3DCamera();
    animateParticles();
    
    // Smooth click interactions
    document.addEventListener('click', function(e) {
      let canvasRect = canvas.getBoundingClientRect();
      let clickX = e.clientX - canvasRect.left;
      let clickY = e.clientY - canvasRect.top;
      
      if (clickX >= 0 && clickX <= canvas.width && 
          clickY >= 0 && clickY <= canvas.height) {
        
        // Create gentle burst
        for (let i = 0; i < 5; i++) {
          window.pJSDom[0].pJS.interactivity.mouse.click_pos_x = clickX + (Math.random() - 0.5) * 50;
          window.pJSDom[0].pJS.interactivity.mouse.click_pos_y = clickY + (Math.random() - 0.5) * 50;
          window.pJSDom[0].pJS.fn.modes.pushParticles(1);
          
          // Add properties to new particles
          let newParticle = particles[particles.length - 1];
          if (newParticle) {
            newParticle.z = (Math.random() - 0.5) * 100;
            newParticle.originalSize = newParticle.radius;
            newParticle.originalOpacity = newParticle.opacity;
            newParticle.dancePhase = Math.random() * Math.PI * 2;
          }
        }
      }
    });
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
      if (!window.pJSDom || !window.pJSDom[0]) return;
      
      switch(e.key) {
        case ' ':
          e.preventDefault();
          // Smooth burst
          for(let i = 0; i < 8; i++) {
            setTimeout(() => {
              window.pJSDom[0].pJS.interactivity.mouse.click_pos_x = Math.random() * canvas.width;
              window.pJSDom[0].pJS.interactivity.mouse.click_pos_y = Math.random() * canvas.height;
              window.pJSDom[0].pJS.fn.modes.pushParticles(1);
              
              let newParticle = particles[particles.length - 1];
              if (newParticle) {
                newParticle.z = (Math.random() - 0.5) * 100;
                newParticle.originalSize = newParticle.radius;
                newParticle.originalOpacity = newParticle.opacity;
                newParticle.dancePhase = Math.random() * Math.PI * 2;
              }
            }, i * 80);
          }
          break;
        case 'r':
        case 'R':
          particlesContainer.style.transform = '';
          currentRotateX = currentRotateY = 0;
          targetRotateX = targetRotateY = 0;
          window.pJSDom[0].pJS.fn.vendors.destroypJS();
          setTimeout(initParticles, 100);
          break;
        case 'c':
        case 'C':
          for(let i = 0; i < 10; i++) {
            window.pJSDom[0].pJS.fn.modes.removeParticles(1);
          }
          break;
      }
    });

    // Smooth Mouse Electricity Effect
    function addMouseElectricity() {
      const canvas = document.querySelector('#particles-js canvas');
      if (!canvas) return;
      
      const electricCanvas = document.createElement('canvas');
      const ctx = electricCanvas.getContext('2d');
      
      electricCanvas.style.position = 'absolute';
      electricCanvas.style.top = '0';
      electricCanvas.style.left = '0';
      electricCanvas.style.width = '100%';
      electricCanvas.style.height = '100%';
      electricCanvas.style.pointerEvents = 'none';
      electricCanvas.style.zIndex = '1';
      
      canvas.parentNode.appendChild(electricCanvas);
      
      let mouseX = 0, mouseY = 0;
      let lightningBolts = [];
      let mouseActive = false;
      let smoothMouseX = 0, smoothMouseY = 0;
      
      function resizeCanvas() {
        electricCanvas.width = canvas.width;
        electricCanvas.height = canvas.height;
      }
      
      class LightningBolt {
        constructor(startX, startY, endX, endY) {
          this.points = this.generateBolt(startX, startY, endX, endY);
          this.life = 0;
          this.maxLife = 6; // Consistent life for smoothness
          this.width = 0.6; // Consistent width
          this.opacity = 0.7;
        }
        
        generateBolt(x1, y1, x2, y2) {
          const points = [{x: x1, y: y1}];
          const distance = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
          const segments = Math.floor(distance / 40); // Fewer segments for smoothness
          
          for(let i = 1; i < segments; i++) {
            const progress = i / segments;
            // Minimal randomness for smooth lines
            const x = x1 + (x2 - x1) * progress + (Math.random() - 0.5) * 2;
            const y = y1 + (y2 - y1) * progress + (Math.random() - 0.5) * 2;
            points.push({x, y});
          }
          points.push({x: x2, y: y2});
          return points;
        }
        
        update() {
          this.life++;
          return this.life < this.maxLife;
        }
        
        draw() {
          const alpha = (1 - (this.life / this.maxLife)) * this.opacity;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#4dd0e1';
          ctx.lineWidth = this.width;
          
          // Minimal glow
          ctx.shadowBlur = 1;
          ctx.shadowColor = '#4dd0e1';
          
          ctx.beginPath();
          ctx.moveTo(this.points[0].x, this.points[0].y);
          for(let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
          }
          ctx.stroke();
          ctx.restore();
        }
      }
      
      function getNearbyParticles(x, y, radius) {
        if (!window.pJSDom || !window.pJSDom[0]) return [];
        const particles = window.pJSDom[0].pJS.particles.array;
        return particles.filter(p => {
          const dist = Math.sqrt((p.x - x)**2 + (p.y - y)**2);
          return dist < radius;
        });
      }
      
      document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        mouseActive = true;
        
        // Very smooth mouse movement
        smoothMouseX += (mouseX - smoothMouseX) * 0.1;
        smoothMouseY += (mouseY - smoothMouseY) * 0.1;
        
        // Create lightning less frequently for better performance
        if(Math.random() < 0.1) {
          const nearby = getNearbyParticles(smoothMouseX, smoothMouseY, 80);
          if(nearby.length > 0) {
            const target = nearby[Math.floor(Math.random() * nearby.length)];
            lightningBolts.push(new LightningBolt(smoothMouseX, smoothMouseY, target.x, target.y));
          }
        }
      });
      
      document.addEventListener('mouseleave', () => {
        mouseActive = false;
      });
      
      function animate() {
        ctx.clearRect(0, 0, electricCanvas.width, electricCanvas.height);
        
        // Update and draw lightning bolts
        lightningBolts = lightningBolts.filter(bolt => {
          bolt.draw();
          return bolt.update();
        });
        
        // Smooth mouse glow
        if(mouseActive) {
          const nearby = getNearbyParticles(smoothMouseX, smoothMouseY, 60);
          if(nearby.length > 0) {
            ctx.save();
            ctx.globalAlpha = 0.1;
            const gradient = ctx.createRadialGradient(
              smoothMouseX, smoothMouseY, 0, 
              smoothMouseX, smoothMouseY, 10
            );
            gradient.addColorStop(0, '#4dd0e1');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(smoothMouseX - 10, smoothMouseY - 10, 20, 20);
            ctx.restore();
          }
        }
        
        requestAnimationFrame(animate);
      }
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      animate();
    }

    // Initialize electricity effect
    setTimeout(addMouseElectricity, 300);

    // Reset on mouse leave
    document.addEventListener('mouseleave', function() {
      targetRotateX = targetRotateY = 0;
    });
  }, 300);
}
  
/**
 * Custom Cursor Implementation
 */
function initCustomCursor() {
  if (!document.querySelector('.custom-cursor')) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorRing = document.createElement('div');
    cursorRing.classList.add('cursor-ring');
    document.body.appendChild(cursorRing);
  }

  const cursor = document.querySelector('.custom-cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    requestAnimationFrame(() => {
      cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });

  const interactiveElements = document.querySelectorAll('a, button, .card, .cyber-button, .project-card');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
      cursor.style.background = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
      cursorRing.style.width = '60px';
      cursorRing.style.height = '60px';
      cursorRing.style.opacity = '0.2';
    });

    element.addEventListener('mouseleave', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
      cursor.style.background = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      cursorRing.style.width = '40px';
      cursorRing.style.height = '40px';
      cursorRing.style.opacity = '0.6';
    });
  });
}
/**
 * Enhanced Card Hover Effects
 */
function initCardEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      // Apply 3D rotation
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Enhance the glow effect
      const cardFront = card.querySelector('.card-front');
      const glow = cardFront.querySelector('.glow');
      
      if (glow) {
        const xPercent = Math.floor((x / rect.width) * 100);
        const yPercent = Math.floor((y / rect.height) * 100);
        
        glow.style.left = `${xPercent}%`;
        glow.style.top = `${yPercent}%`;
        glow.style.opacity = '0.35';
        glow.style.filter = 'blur(30px)';
        glow.style.width = '120px';
        glow.style.height = '120px';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset card rotation
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      // Reset glow
      const cardFront = card.querySelector('.card-front');
      const glow = cardFront.querySelector('.glow');
      
      if (glow) {
        glow.style.opacity = '0';
      }
    });
  });
}

/**
 * Scroll-based Animations
 */
function initScrollAnimations() {
  // Create observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      } else {
        entry.target.classList.remove('animate-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all section titles and cards
  const titles = document.querySelectorAll('.section-title');
  titles.forEach(title => {
    // Add initial state class
    title.classList.add('scroll-animate');
    observer.observe(title);
  });
  
  const cards = document.querySelectorAll('.card, .project-card');
  cards.forEach((card, index) => {
    // Add initial state class with staggered delay
    card.classList.add('scroll-animate');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Add scroll indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.classList.add('scroll-indicator');
  scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
  document.querySelector('.header').appendChild(scrollIndicator);
  
  // Fade out scroll indicator as user scrolls
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '1';
    }
  });
  
  // Add styles for scroll animations
  const style = document.createElement('style');
  style.textContent = `
    .scroll-animate {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .scroll-indicator {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--primary-color);
      font-size: 1.5rem;
      animation: bounce 2s infinite;
      opacity: 1;
      transition: opacity 0.3s ease;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) translateX(-50%);
      }
      40% {
        transform: translateY(-20px) translateX(-50%);
      }
      60% {
        transform: translateY(-10px) translateX(-50%);
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Typing Effect for Hero Section
 */
function initTypingEffect() {
  const subtitle = document.querySelector('.subtitle');
  const originalText = subtitle.textContent;
  
  // Hide original text
  subtitle.textContent = '';
  
  // Create typed.js like effect
  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < originalText.length) {
      subtitle.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      // Add blinking cursor at the end
      const cursor = document.createElement('span');
      cursor.classList.add('typing-cursor');
      cursor.textContent = '|';
      subtitle.appendChild(cursor);
      
      // Add styles for cursor
      const style = document.createElement('style');
      style.textContent = `
        .typing-cursor {
          animation: blink 1s infinite;
          color: var(--primary-color);
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }, 70);
}

/**
 * Audio Feedback Effects
 */

  // Background music setup

  // Background music player
// GLOBAL VARIABLES
// Audio player with animated SVG play/pause button
let audioInitialized = false;
let bgMusicInstance = null;
let isPlaying = false;

function initAudioEffects() {
  if (audioInitialized) return;
  audioInitialized = true;

  // Clean up existing audio elements
  const existingAudio = document.querySelectorAll('audio');
  existingAudio.forEach(audio => audio.remove());

  // CREATE AUDIO INSTANCE
  bgMusicInstance = document.createElement('audio');
  bgMusicInstance.src = 'assets/audio/background.mp3';
  bgMusicInstance.loop = true;

  bgMusicInstance.preload = 'auto';
  bgMusicInstance.style.display =' none'; // Hide audio element
  bgMusicInstance.volume = 0.54;
  document.body.appendChild(bgMusicInstance);

  // Add event listeners for audio state changes
  bgMusicInstance.addEventListener('ended', () => {
    isPlaying = false;
    updateButtonState();
  });

  bgMusicInstance.addEventListener('pause', () => {
    isPlaying = false;
    updateButtonState();
  });
  
  bgMusicInstance.addEventListener('play', () => {
    isPlaying = true;
    updateButtonState();

  });

  // INIT CUSTOM SVG BUTTON
  }

// CUSTOM SVG PLAY/PAUSE CONTROL


// Toggle audio playback


// Animation functions




// Update button state based on audio state


// Add CSS styles for the button


// Show audio message (for autoplay restrictions)


// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Ensure button appears early
  initAudioEffects();
});
const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter projects with smooth animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Add hover effects to project cards
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Smooth scroll animation on load
        window.addEventListener('load', () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            });

            projectCards.forEach(card => {
                observer.observe(card);
            });
        });
/**
 * 3D Parallax Effects
 */
function init3DEffects() {
  // Add parallax effect to header
  const header = document.querySelector('.header');
  
  window.addEventListener('mousemove', (e) => { 
    const xAxis = (window.innerWidth / 2 - e.pageY) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageX) / 50;
    
    header.style.transform = `perspective(1000px) rotateX(${yAxis}deg) rotateY(${xAxis}deg) scale(1.02)`;
  });
  
  header.addEventListener('mouseleave', () => {
    header.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  });
  
  // Add parallax effect to project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xAxis = (rect.width / 2 - x) / 10;
      const yAxis = (rect.height / 2 - y) / 10;
      
      card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05) translateY(-15px)`;
      
      // Move image with parallax effect
      const image = card.querySelector('.project-image');
      if (image) {
        image.style.transform = `translateZ(20px) scale(1.08) translateX(${-xAxis/3}px) translateY(${-yAxis/3}px)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      
      const image = card.querySelector('.project-image');
      if (image) {
        image.style.transform = 'translateZ(0) scale(1)';
      }
    });
  });
}

/**
 * Smooth Scroll Implementation
 */
function initSmoothScroll() {
  // Add navigation menu if it doesn't exist
  if (!document.querySelector('.nav-menu')) {
    const nav = document.createElement('nav');
    nav.classList.add('nav-menu');
    nav.innerHTML = `
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#" class="contact-btn">Contact</a></li>
      </ul>
    `;
    
    document.querySelector('.controls').insertAdjacentElement('afterend', nav);
  }
  
  // Add styles for navigation
  const style = document.createElement('style');
  style.textContent = `
    .nav-menu {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 100;
    }
    
    .nav-menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .nav-menu a {
      display: block;
      padding: 10px;
      color: var(--text-light);
      text-decoration: none;
      font-family: 'Orbitron', sans-serif;
      font-size: 0.9rem;
      background: var(--card-bg);
      backdrop-filter: blur(8px);
      border: 1px solid var(--primary-color);
      border-radius: 6px;
      transition: all 0.3s;
      width: 110px;
      text-align: center;
    }
    
    .nav-menu a:hover {
      background: var(--primary-color);
      color: #000;
      transform: translateX(5px);
    }
    
    .contact-btn {
      background: var(--primary-color) !important;
      color: #000 !important;
    }
    
    @media (max-width: 768px) {
      .nav-menu {
        top: auto;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
      
      .nav-menu ul {
        flex-direction: row;
      }
      
      .nav-menu a:hover {
        transform: translateY(-5px);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Implement smooth scrolling
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Scroll smoothly
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Handle contact button click - create modal
  const contactBtn = document.querySelector('.contact-btn');
  
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create modal if it doesn't exist
      if (!document.querySelector('#contact-modal')) {
        const modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.classList.add('modal');
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Get In Touch</h2>
            <form id="contact-form">
              <div class="form-group">
                <input type="text" id="name" placeholder="Your Name" required>
              </div>
              <div class="form-group">
                <input type="email" id="email" placeholder="Your Email" required>
              </div>
              <div class="form-group">
                <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" class="cyber-button">Send Message</button>
            </form>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('show');
        });
        
        // Close when clicking outside
        window.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('show');
          }
        });
        
        // Handle form submission
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Show success message (in a real app, you'd send this to a backend)
          form.innerHTML = `
            <div class="success-message">
              <i class="fas fa-check-circle"></i>
              <p>Thank you for your message! I'll get back to you soon.</p>
            </div>
          `;
          
          // Close modal after delay
          setTimeout(() => {
            modal.classList.remove('show');
          }, 3000);
        });
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
          .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            backdrop-filter: blur(5px);
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
          }
          
          .modal-content {
            background: var(--card-bg);
            border: 2px solid var(--primary-color);
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            position: relative;
            animation: modalIn 0.5s forwards;
          }
          
          @keyframes modalIn {
            from {
              transform: translateY(-50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--primary-color);
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 12px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--primary-color);
            color: var(--text-light);
            font-family: 'Rajdhani', sans-serif;
            font-size: 1rem;
            border-radius: 5px;
          }
          
          .success-message {
            text-align: center;
            padding: 20px;
          }
          
         .success-message i {
            font-size: 3rem;
            color: var(--primary-color);
            margin-bottom: 15px;
          }
          
          .success-message p {
            color: var(--text-light);
          }
        `;
        document.head.appendChild(style);
      }
      
      // Show modal
      const modal = document.querySelector('#contact-modal');
      modal.classList.add('show');
    });
  }
  
  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);
  
  // Update progress bar on scroll
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    progressBar.style.width = scrolled + '%';
  });
  
  // Add styles for progress bar
  const progressStyle = document.createElement('style');
  progressStyle.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--primary-color);
      width: 0%;
      z-index: 9999;
      transition: width 0.1s ease;
    }
  `;
  document.head.appendChild(progressStyle);
  
  // Highlight active section in navigation
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Loading Screen Animation
 */
function initLoadingScreen() {
  // Create loading screen
  const loadingScreen = document.createElement('div');
  loadingScreen.classList.add('loading-screen');
  loadingScreen.innerHTML = `
    <div class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
    <div class="loading-text">Loading<span class="dots">...</span></div>
  `;
  
  document.body.appendChild(loadingScreen);
  
  // Add styles for loading screen
  const style = document.createElement('style');
  style.textContent = `
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--background-dark);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    .spinner {
      width: 60px;
      height: 60px;
      position: relative;
      margin-bottom: 20px;
    }
    
    .cube1, .cube2 {
      background-color: var(--primary-color);
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0;
      left: 0;
      animation: cubemove 1.8s infinite ease-in-out;
    }
    
    .cube2 {
      animation-delay: -0.9s;
    }
    
    @keyframes cubemove {
      25% {
        transform: translateX(42px) rotate(-90deg) scale(0.5);
      }
      50% {
        transform: translateX(42px) translateY(42px) rotate(-180deg);
      }
      75% {
        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
    
    .loading-text {
      color: var(--primary-color);
      font-family: 'Orbitron', sans-serif;
      font-size: 1.2rem;
      letter-spacing: 3px;
    }
    
    .dots {
      animation: dotsAnimation 1.5s infinite;
    }
    
    @keyframes dotsAnimation {
      0% { opacity: 0.2; }
      20% { opacity: 1; }
      100% { opacity: 0.2; }
    }
  `;
  document.head.appendChild(style);
  
  // Hide loading screen when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.visibility = 'hidden';
    }, 1000);
  });
}

/**
 * Custom Context Menu
 */
function initCustomContextMenu() {
  // Create custom context menu
  const contextMenu = document.createElement('div');
  contextMenu.classList.add('custom-context-menu');
  contextMenu.innerHTML = `
    <ul>
      <li class="context-item"><i class="fas fa-home"></i> Home</li>
      <li class="context-item"><i class="fas fa-user"></i> About</li>
      <li class="context-item"><i class="fas fa-code"></i> Projects</li>
      <li class="context-item"><i class="fas fa-envelope"></i> Contact</li>
      <li class="divider"></li>
      <li class="context-item"><i class="fas fa-share-alt"></i> Share</li>
    </ul>
  `;
  
  document.body.appendChild(contextMenu);
  
  // Add styles for context menu
  const style = document.createElement('style');
  style.textContent = `
    .custom-context-menu {
      position: fixed;
      background: var(--card-bg);
      border: 1px solid var(--primary-color);
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 255, 234, 0.3);
      backdrop-filter: blur(10px);
      padding: 5px 0;
      min-width: 200px;
      z-index: 1000;
      opacity: 0;
      transform: scale(0.8);
      transform-origin: top left;
      transition: opacity 0.2s, transform 0.2s;
      display: none;
    }
    
    .custom-context-menu.active {
      opacity: 1;
      transform: scale(1);
      display: block;
    }
    
    .context-item {
      padding: 8px 15px;
      font-family: 'Rajdhani', sans-serif;
      color: var(--text-light);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s;
    }
    
    .context-item:hover {
      background: var(--primary-color);
      color: #000;
    }
    
    .context-item i {
      width: 20px;
      text-align: center;
    }
    
    .divider {
      height: 1px;
      background: var(--primary-color);
      margin: 5px 0;
      opacity: 0.5;
    }
  `;
  document.head.appendChild(style);
  
  // Show context menu on right click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    const menu = document.querySelector('.custom-context-menu');
    menu.classList.add('active');
    
    // Position the menu
    const x = e.clientX;
    const y = e.clientY;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    
    // Check if menu goes outside window
    const xPos = x + menuWidth > winWidth ? winWidth - menuWidth - 5 : x;
    const yPos = y + menuHeight > winHeight ? winHeight - menuHeight - 5 : y;
    
    menu.style.top = yPos + 'px';
    menu.style.left = xPos + 'px';
  });
  
  // Hide context menu on click outside
  document.addEventListener('click', () => {
    document.querySelector('.custom-context-menu').classList.remove('active');
  });
  
  // Add functionality to context menu items
  const contextItems = document.querySelectorAll('.context-item');
  
  contextItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Handle menu item clicks
      switch(index) {
        case 0: // Home
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 1: // About
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 2: // Projects
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 3: // Contact
          document.querySelector('.contact-btn')?.click();
          break;
        case 5: // Share
          // Create share modal
          alert('Share functionality would go here in a real app');
          break;
      }
    });
  });
}

/**
 * Add Page Transitions
 */
function initPageTransitions() {
  // Create page transition overlay
  const transitionOverlay = document.createElement('div');
  transitionOverlay.classList.add('page-transition');
  document.body.appendChild(transitionOverlay);
  
  // Add styles for transition
  const style = document.createElement('style');
  style.textContent = `
    .page-transition {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--primary-color);
      transform: translateY(100%);
      z-index: 9999;
      pointer-events: none;
    }
    
    .page-transition.active {
      animation: pageTransition 1.5s forwards;
    }
    
    @keyframes pageTransition {
      0% { transform: translateY(100%); }
      15% { transform: translateY(0); }
      85% { transform: translateY(0); }
      100% { transform: translateY(-100%); }
    }
  `;
  document.head.appendChild(style);
  
  // Add transition effect to navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Skip transition for some elements
      if (link.classList.contains('contact-btn')) return;
      
      e.preventDefault();
      const href = link.getAttribute('href');
      
      // Trigger transition
      transitionOverlay.classList.add('active');
      
      // Navigate after animation
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView();
        transitionOverlay.classList.remove('active');
      }, 750);
    });
  });
}

// Call the additional initialization functions

  // Add console message
  console.log("%c✨ Portfolio Initialized Successfully!", "color: #00ffe0; font-size: 20px; font-weight: bold;");
  console.log("%c👋 Welcome to my interactive portfolio!", "color: #00ffe0; font-size: 14px;");
;
 document.addEventListener('DOMContentLoaded', function() {
      particlesJS("particles-js", {
        particles: {
          number: { 
            value: 100,
            density: { 
              enable: true, 
              value_area: 800 
            } 
          },
          color: { 
            value: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() 
          },
          shape: {
            type: ["circle", "triangle", "edge"],
            stroke: { 
              width: 0, 
              color: "#000000" 
            },
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: { 
              enable: true, 
              speed: 1, 
              opacity_min: 0.1, 
              sync: false 
            }
          },
          size: {
            value: 4,
            random: true,
            anim: { 
              enable: true, 
              speed: 2, 
              size_min: 0.1, 
              sync: false 
            }
          },
          line_linked: {
            enable: true,
            distance: 170,
            color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { 
              enable: true, 
              rotateX: 600, 
              rotateY: 1200 
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 180,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 100,
              duration: 0.4
            },
            push: {
              particles_nb: 6
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    });

    // Toggle layout between grid and list
    function toggleLayout(type) {
      const container = document.getElementById('cards-container');
      
      if (type === 'list') {
        container.closest('.content-section').classList.add('layout-list');
      } else {
        container.closest('.content-section').classList.remove('layout-list');
      }
      
      // Add animation to cards for smooth transition
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = '';
        }, 10);
      });
    }

    // Update theme color
    function updateColor(color) {
      document.documentElement.style.setProperty('--primary-color', color);
      document.documentElement.style.setProperty('--primary-glow', color + "99");
      
      // Update particles color
      if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }
    }





/**
 * Background Music Setup (Autoplay on click)
 */
function initAudioEffects() {
  const bgMusic = document.createElement('audio');
  bgMusic.src = 'assets/audio/background.mp3';  // Ensure this file exists
  bgMusic.loop = true;
  bgMusic.autoplay = true;
  bgMusic.preload = 'auto';
  bgMusic.style.display = 'none';
  document.body.appendChild(bgMusic);

  document.addEventListener('click', () => {
    bgMusic.play().catch(err => console.warn('Audio play failed:', err));
  }, { once: true });
}
  ;
  
  // Add style for mute button
  const style = document.createElement('style');
  style.textContent = `
    .mute-button {
      background: none;
      color: var(--primary-color);
      border: none;
      padding: 8px 12px;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 8px;
    }
    
    .mute-button:hover {
      background: rgba(0, 255, 234, 0.2);
    }
  `;
  document.head.appendChild(style);


/**
 * Dark Mode Toggle
 */
function initDarkModeToggle() {
  // Create toggle button
  const darkModePanel = document.createElement('div');
  darkModePanel.classList.add('control-panel');
  
  const darkModeToggle = document.createElement('button');
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeToggle.setAttribute('title', 'Toggle Dark/Light Mode');
  darkModePanel.appendChild(darkModeToggle);
  
  document.querySelector('.controls').appendChild(darkModePanel);
  
  // Set up dark/light mode variables
  const darkModeStyles = document.createElement('style');
  darkModeStyles.textContent = `
    body.light-mode {
      --background-dark: #f0f0f8;
      --card-bg: rgba(255, 255, 255, 0.8);
      --text-light: #222232;
    }
    
    body.light-mode .card-front, 
    body.light-mode .card-back {
      background: var(--card-bg);
      color: var(--text-light);
    }
    
    body.light-mode .card-description {
      color: #555565;
    }
    
    body.light-mode .section-title {
      color: var(--primary-color);
      text-shadow: none;
    }
  `;
  document.head.appendChild(darkModeStyles);
  
  // Toggle functionality
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      
      // Update particles for light mode
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        window.pJSDom[0].pJS.particles.line_linked.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      
      // Update particles for dark mode
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        window.pJSDom[0].pJS.particles.line_linked.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }
    }
  });
}
/**
 * 3D Parallax Effects
 */
function init3DEffects() {
  // Add parallax effect to header
  const header = document.querySelector('.header');
  
  window.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    
    header.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.02)`;
  });
  
  header.addEventListener('mouseleave', () => {
    header.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  });
  
  // Add parallax effect to project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xAxis = (rect.width / 2 - x) / 10;
      const yAxis = (rect.height / 2 - y) / 10;
      
      card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05) translateY(-15px)`;
      
      // Move image with parallax effect
      const image = card.querySelector('.project-image');
      if (image) {
        image.style.transform = `translateZ(20px) scale(1.08) translateX(${-xAxis/3}px) translateY(${-yAxis/3}px)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      
      const image = card.querySelector('.project-image');
      if (image) {
        image.style.transform = 'translateZ(0) scale(1)';
      }
    });
  });
}

/**
 * Smooth Scroll Implementation
 */
function initSmoothScroll() {
  // Add navigation menu if it doesn't exist
  if (!document.querySelector('.nav-menu')) {
    const nav = document.createElement('nav');
    nav.classList.add('nav-menu');
    nav.innerHTML = `
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#" class="contact-btn">Contact</a></li>
      </ul>
    `;
    
    document.querySelector('.controls').insertAdjacentElement('afterend', nav);
  }
  
  // Add styles for navigation
  const style = document.createElement('style');
  style.textContent = `
    .nav-menu {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 100;
    }
    
    .nav-menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .nav-menu a {
      display: block;
      padding: 10px;
      color: var(--text-light);
      text-decoration: none;
      font-family: 'Orbitron', sans-serif;
      font-size: 0.9rem;
      background: var(--card-bg);
      backdrop-filter: blur(8px);
      border: 1px solid var(--primary-color);
      border-radius: 6px;
      transition: all 0.3s;
      width: 110px;
      text-align: center;
    }
    
    .nav-menu a:hover {
      background: var(--primary-color);
      color: #000;
      transform: translateX(5px);
    }
    
    .contact-btn {
      background: var(--primary-color) !important;
      color: #000 !important;
    }
    
    @media (max-width: 768px) {
      .nav-menu {
        top: auto;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
      
      .nav-menu ul {
        flex-direction: row;
      }
      
      .nav-menu a:hover {
        transform: translateY(-5px);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Implement smooth scrolling
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Scroll smoothly
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Handle contact button click - create modal
  const contactBtn = document.querySelector('.contact-btn');
  
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create modal if it doesn't exist
      if (!document.querySelector('#contact-modal')) {
        const modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.classList.add('modal');
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Get In Touch</h2>
            <form action="https://formspree.io/f/xdkgvzag" method="POST" id="contact-form">
  <div class="form-group">
    <input type="text" name="name" placeholder="Your Name" required>
  </div>
  <div class="form-group">
    <input type="email" name="email" placeholder="Your Email" required>
  </div>
  <div class="form-group">
    <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
  </div>
  <button type="submit" class="cyber-button">Send Message</button>
</form>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('show');
        });
        
        // Close when clicking outside
        window.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('show');
          }
        });
        
        // Handle form submission
        const form = document.getElementById('contact-form');      
// Discord Webhook POST on form submission
const webhookUrl = 'https://discord.com/api/webhooks/1375100749003882630/RKQ7dUR4wKS52WqmRQT3RVd3FUz-wYNL1GkdR-NLX8PFcxqjPtjX0bc8bgrL_GKNEycP';  // Replace this with your actual webhook URL

form.addEventListener('submit', () => {
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      embeds: [
        {
          title: '📨 New Portfolio Contact',
          description: `✉️ **Message from ${name}**

${message}`,
          color: 0x00ffe0,
          fields: [
            {
              name: '👤 Name',
              value: name,
              inline: true
            },
            {
              name: '📧 Email',
              value: email,
              inline: true
            }
          ],
          footer: {
            text: '🚀 From Futuristic Portfolio',
            icon_url: 'https://cdn-icons-png.flaticon.com/512/889/889192.png'
          },
          timestamp: new Date().toISOString()
        }
      ]
    })
  }).catch(console.error);
});
// Add modal styles
        const style = document.createElement('style');
        style.textContent = `
          .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            backdrop-filter: blur(5px);
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
          }
          
          .modal-content {
            background: var(--card-bg);
            border: 2px solid var(--primary-color);
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            position: relative;
            animation: modalIn 0.5s forwards;
          }
          
          @keyframes modalIn {
            from {
              transform: translateY(-50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--primary-color);
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 12px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--primary-color);
            color: var(--text-light);
            font-family: 'Rajdhani', sans-serif;
            font-size: 1rem;
            border-radius: 5px;
          }
          
          .success-message {
            text-align: center;
            padding: 20px;
          }
          
         .success-message i {
            font-size: 3rem;
            color: var(--primary-color);
            margin-bottom: 15px;
          }
          
          .success-message p {
            color: var(--text-light);
          }
        `;
        document.head.appendChild(style);
      }
      
      // Show modal
      const modal = document.querySelector('#contact-modal');
      modal.classList.add('show');
    });
  }
  
  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);
  
  // Update progress bar on scroll
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    progressBar.style.width = scrolled + '%';
  });
  
  // Add styles for progress bar
  const progressStyle = document.createElement('style');
  progressStyle.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--primary-color);
      width: 0%;
      z-index: 9999;
      transition: width 0.1s ease;
    }
  `;
  document.head.appendChild(progressStyle);
  
  // Highlight active section in navigation
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Loading Screen Animation
 */
function initLoadingScreen() {
  // Create loading screen
  const loadingScreen = document.createElement('div');
  loadingScreen.classList.add('loading-screen');
  loadingScreen.innerHTML = `
    <div class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
    <div class="loading-text">Loading<span class="dots">...</span></div>
  `;
  
  document.body.appendChild(loadingScreen);
  
  // Add styles for loading screen
  const style = document.createElement('style');
  style.textContent = `
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--background-dark);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    .spinner {
      width: 60px;
      height: 60px;
      position: relative;
      margin-bottom: 20px;
    }
    
    .cube1, .cube2 {
      background-color: var(--primary-color);
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0;
      left: 0;
      animation: cubemove 1.8s infinite ease-in-out;
    }
    
    .cube2 {
      animation-delay: -0.9s;
    }
    
    @keyframes cubemove {
      25% {
        transform: translateX(42px) rotate(-90deg) scale(0.5);
      }
      50% {
        transform: translateX(42px) translateY(42px) rotate(-180deg);
      }
      75% {
        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
    
    .loading-text {
      color: var(--primary-color);
      font-family: 'Orbitron', sans-serif;
      font-size: 1.2rem;
      letter-spacing: 3px;
    }
    
    .dots {
      animation: dotsAnimation 1.5s infinite;
    }
    
    @keyframes dotsAnimation {
      0% { opacity: 0.2; }
      20% { opacity: 1; }
      100% { opacity: 0.2; }
    }
  `;
  document.head.appendChild(style);
  
  // Hide loading screen when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.visibility = 'hidden';
    }, 1000);
  });
}

/**
 * Custom Context Menu
 */
function initCustomContextMenu() {
  // Create custom context menu
  const contextMenu = document.createElement('div');
  contextMenu.classList.add('custom-context-menu');
  contextMenu.innerHTML = `
    <ul>
      <li class="context-item"><i class="fas fa-home"></i> Home</li>
      <li class="context-item"><i class="fas fa-user"></i> About</li>
      <li class="context-item"><i class="fas fa-code"></i> Projects</li>
      <li class="context-item"><i class="fas fa-envelope"></i> Contact</li>
      <li class="divider"></li>
      <li class="context-item"><i class="fas fa-share-alt"></i> Share</li>
    </ul>
  `;
  
  document.body.appendChild(contextMenu);
  
  // Add styles for context menu
  const style = document.createElement('style');
  style.textContent = `
    .custom-context-menu {
      position: fixed;
      background: var(--card-bg);
      border: 1px solid var(--primary-color);
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 255, 234, 0.3);
      backdrop-filter: blur(10px);
      padding: 5px 0;
      min-width: 200px;
      z-index: 1000;
      opacity: 0;
      transform: scale(0.8);
      transform-origin: top left;
      transition: opacity 0.2s, transform 0.2s;
      display: none;
    }
    
    .custom-context-menu.active {
      opacity: 1;
      transform: scale(1);
      display: block;
    }
    
    .context-item {
      padding: 8px 15px;
      font-family: 'Rajdhani', sans-serif;
      color: var(--text-light);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s;
    }
    
    .context-item:hover {
      background: var(--primary-color);
      color: #000;
    }
    
    .context-item i {
      width: 20px;
      text-align: center;
    }
    
    .divider {
      height: 1px;
      background: var(--primary-color);
      margin: 5px 0;
      opacity: 0.5;
    }
  `;
  document.head.appendChild(style);
  
  // Show context menu on right click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    const menu = document.querySelector('.custom-context-menu');
    menu.classList.add('active');
    
    // Position the menu
    const x = e.clientX;
    const y = e.clientY;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    
    // Check if menu goes outside window
    const xPos = x + menuWidth > winWidth ? winWidth - menuWidth - 5 : x;
    const yPos = y + menuHeight > winHeight ? winHeight - menuHeight - 5 : y;
    
    menu.style.top = yPos + 'px';
    menu.style.left = xPos + 'px';
  });
  
  // Hide context menu on click outside
  document.addEventListener('click', () => {
    document.querySelector('.custom-context-menu').classList.remove('active');
  });
  
  // Add functionality to context menu items
  const contextItems = document.querySelectorAll('.context-item');
  
  contextItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Handle menu item clicks
      switch(index) {
        case 0: // Home
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 1: // About
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 2: // Projects
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 3: // Contact
          document.querySelector('.contact-btn')?.click();
          break;
        case 5: // Share
          // Create share modal
          alert('Share functionality would go here in a real app');
          break;
      }
    });
  });
}

/**
 * Add Page Transitions
 */
function initPageTransitions() {
  // Create page transition overlay
  const transitionOverlay = document.createElement('div');
  transitionOverlay.classList.add('page-transition');
  document.body.appendChild(transitionOverlay);
  
  // Add styles for transition
  const style = document.createElement('style');
  style.textContent = `
    .page-transition {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--primary-color);
      transform: translateY(100%);
      z-index: 9999;
      pointer-events: none;
    }
    
    .page-transition.active {
      animation: pageTransition 1.5s forwards;
    }
    
    @keyframes pageTransition {
      0% { transform: translateY(100%); }
      15% { transform: translateY(0); }
      85% { transform: translateY(0); }
      100% { transform: translateY(-100%); }
    }
  `;
  document.head.appendChild(style);
  
  // Add transition effect to navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Skip transition for some elements
      if (link.classList.contains('contact-btn')) return;
      
      e.preventDefault();
      const href = link.getAttribute('href');
      
      // Trigger transition
      transitionOverlay.classList.add('active');
      
      // Navigate after animation
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView();
        transitionOverlay.classList.remove('active');
      }, 750);
    });
  });
}

// Call the additional initialization functions
document.addEventListener('DOMContentLoaded', function() {
  // Initialize previously defined functions
  initParticles();
  initCustomCursor();
  initCardEffects();
  initScrollAnimations();
  initTypingEffect();
  initAudioEffects(); 
  init3DEffects();
  initSmoothScroll();
  // Add console message
  console.log("%c✨ Portfolio Initialized Successfully!", "color: #00ffe0; font-size: 20px; font-weight: bold;");
  console.log("%c👋 Welcome to my interactive portfolio!", "color: #00ffe0; font-size: 14px;");
});
    // Toggle layout between grid and list
    function toggleLayout(type) {
      const container = document.getElementById('cards-container');
      
      if (type === 'list') {
        container.closest('.content-section').classList.add('layout-list');
      } else {
        container.closest('.content-section').classList.remove('layout-list');
      }
      
      // Add animation to cards for smooth transition
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = '';
        }, 10);
      });
    }

    // Update theme color
    function updateColor(color) {
      document.documentElement.style.setProperty('--primary-color', color);
      document.documentElement.style.setProperty('--primary-glow', color + "99");
      
      // Update particles color
      if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }
    
  updateButtonState();
}
    
  
