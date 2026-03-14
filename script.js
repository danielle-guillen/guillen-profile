/* ============================================
   RETRO 90s WEB - FLAT 2D INTERACTIVITY
   ============================================ */

/**
 * Initialize the page on load
 */
document.addEventListener('DOMContentLoaded', function() {
    initializePointerAnimation();
    initializeWindowControls();
    initializeSocialLinks();
    initializeFormSubmission();
    initializeRetroMp3Player();
    initializeToolbarButtons();
    addCursorEffects();
});

function initializeRetroMp3Player() {
    const lcd = document.getElementById('mp3Lcd');
    const playBtn = document.getElementById('mp3Play');
    const pauseBtn = document.getElementById('mp3Pause');
    const stopBtn = document.getElementById('mp3Stop');
    const audio = document.getElementById('retroAudio');

    if (!lcd || !playBtn || !pauseBtn || !stopBtn) {
        return;
    }

    let elapsed = 0;
    let timerId = null;
    let state = 'STOP';

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    };

    const refreshLcd = () => {
        lcd.textContent = 'TRACK 01 | ' + formatTime(elapsed) + ' | ' + state;
    };

    const startFakePlayback = () => {
        if (timerId) return;
        timerId = setInterval(() => {
            elapsed += 1;
            refreshLcd();
        }, 1000);
    };

    const stopFakePlayback = () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    };

    playBtn.addEventListener('click', () => {
        state = 'PLAY';
        startFakePlayback();
        if (audio) {
            audio.play().catch(() => {
                // Keep retro simulation running even without a valid audio source.
            });
        }
        refreshLcd();
    });

    pauseBtn.addEventListener('click', () => {
        state = 'PAUSE';
        stopFakePlayback();
        if (audio) {
            audio.pause();
        }
        refreshLcd();
    });

    stopBtn.addEventListener('click', () => {
        state = 'STOP';
        stopFakePlayback();
        elapsed = 0;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        refreshLcd();
    });

    refreshLcd();
}

/**
 * Enhanced pointing hand animation
 */
function initializePointerAnimation() {
    const handPointer = document.querySelector('.hand-pointer');
    const socialLinks = document.querySelectorAll('.social-links li a');
    
    if (handPointer) {
        // Make hand pointer interactive
        handPointer.style.cursor = 'pointer';
        handPointer.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Add hover effects to social links
    socialLinks.forEach((link) => {
        link.addEventListener('mouseenter', function() {
            if (handPointer) {
                handPointer.style.fontSize = '28px';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (handPointer) {
                handPointer.style.fontSize = '24px';
            }
        });
    });
}

/**
 * Make window control buttons functional
 */
function initializeWindowControls() {
    const minimizeBtn = document.querySelector('.minimize');
    const maximizeBtn = document.querySelector('.maximize');
    const closeBtn = document.querySelector('.close');
    const window98 = document.querySelector('.win98-window');
    
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
            window98.style.opacity = '0.3';
            setTimeout(() => {
                window98.style.opacity = '1';
            }, 500);
        });
    }
    
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', function() {
            if (window98.classList.contains('maximized')) {
                window98.classList.remove('maximized');
            } else {
                window98.classList.add('maximized');
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (confirm('¿Deseas cerrar esta ventana?')) {
                document.body.style.opacity = '0';
                setTimeout(() => {
                    alert('¡Gracias por visitar mi Rincón Web!');
                }, 300);
            }
        });
    }
}

/**
 * Initialize contact form submission with Formspree
 */
function initializeFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    
    if (!submitBtn || !nameInput || !emailInput || !messageInput) {
        console.error('Form elements not found');
        return;
    }
    
    // Validation function wrapper
    const validateForm = () => {
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();
        
        // Check if all fields are filled
        let isValid = Boolean(nameValue && emailValue && messageValue);
        
        // Email validation
        if (isValid && emailValue) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(emailValue);
        }
        
        submitBtn.disabled = !isValid;
    };
    
    // Initial validation
    validateForm();
    
    // Add listeners for real-time validation
    nameInput.addEventListener('input', validateForm);
    nameInput.addEventListener('change', validateForm);
    nameInput.addEventListener('keyup', validateForm);
    
    emailInput.addEventListener('input', validateForm);
    emailInput.addEventListener('change', validateForm);
    emailInput.addEventListener('keyup', validateForm);
    
    messageInput.addEventListener('input', validateForm);
    messageInput.addEventListener('change', validateForm);
    messageInput.addEventListener('keyup', validateForm);
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmit(e);
    });
}

let contactMessageTimer = null;

function showContactStatus(messageLabel, text, tone) {
    if (!messageLabel) return;

    if (contactMessageTimer) {
        clearTimeout(contactMessageTimer);
    }

    messageLabel.textContent = text;
    messageLabel.className = 'contact-message ' + tone;

    contactMessageTimer = setTimeout(() => {
        messageLabel.textContent = '';
        messageLabel.className = 'contact-message';
    }, 10000);
}

/**
 * Handle contact form submission with Formspree (background, no redirect)
 */
function handleContactSubmit(event) {
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const messageLabel = document.getElementById('contactMessage');
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    
    // Disable button while sending
    submitBtn.disabled = true;
    showContactStatus(messageLabel, 'Enviando...', 'sending');
    
    // Send data to Formspree using fetch (no redirect)
    fetch('https://formspree.io/f/xjgaozzp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok || data.status === 'ok') {
            showContactStatus(messageLabel, '\u2713 Mensaje enviado con \u00e9xito', 'success');
            form.reset();
            submitBtn.disabled = true; // Keep disabled until form is filled again
        } else {
            showContactStatus(messageLabel, '\u2717 Error al enviar mensaje \u00a1vuelve a intentarlo!', 'error');
            submitBtn.disabled = false; // Re-enable to try again
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showContactStatus(messageLabel, '\u2717 Error al enviar mensaje \u00a1vuelve a intentarlo!', 'error');
        submitBtn.disabled = false; // Re-enable to try again
    });
}

/**
 * Social link click handlers
 */
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links li a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const handle = this.textContent;
            console.log('Navegando a: ' + handle);
            showRetroAlert('Navegaría a:\n\n' + handle);
        });
    });
}



/**
 * Create retro-style alert dialog
 */
function showRetroAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #c0c0c0;
        border: 3px solid;
        border-color: #dfdfdf #0a0a0a #0a0a0a #dfdfdf;
        padding: 20px;
        z-index: 10000;
        width: 400px;
        max-width: 90vw;
        box-shadow: 
            inset 1px 1px 0 #ffffff,
            inset -1px -1px 0 #0a0a0a,
            0 0 30px rgba(0, 0, 0, 0.5);
        font-family: 'MS Sans Serif', Arial, sans-serif;
        font-size: 12px;
        animation: popIn 0.3s ease-out;
    `;
    
    alertBox.innerHTML = `
        <div style="
            background: linear-gradient(90deg, #000080, #1084d7);
            color: white;
            padding: 4px 6px;
            margin: -20px -20px 12px -20px;
            font-weight: bold;
            user-select: none;
        ">
            Microsoft Internet Explorer
        </div>
        <div style="margin: 12px 0; line-height: 1.6; white-space: pre-wrap;">
            ${escapeHtml(message)}
        </div>
        <div style="text-align: right; margin-top: 16px;">
            <button id="alert-ok" style="
                background: #c0c0c0;
                border: 2px solid;
                border-color: #dfdfdf #808080 #808080 #dfdfdf;
                padding: 4px 16px;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
                font-family: 'MS Sans Serif', Arial, sans-serif;
            ">Aceptar</button>
        </div>
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 9999;
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(alertBox);
    
    const okButton = alertBox.querySelector('#alert-ok');
    okButton.addEventListener('click', function() {
        alertBox.remove();
        overlay.remove();
    });
    
    okButton.focus();
    okButton.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alertBox.remove();
            overlay.remove();
        }
    });
}

/**
 * Initialize toolbar buttons
 */
function initializeToolbarButtons() {
    const backBtn = document.querySelector('.toolbar-btn:nth-of-type(1)');
    const forwardBtn = document.querySelector('.toolbar-btn:nth-of-type(2)');
    const stopBtn = document.querySelector('.toolbar-btn:nth-of-type(3)');
    const refreshBtn = document.querySelector('.toolbar-btn:nth-of-type(4)');
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.history.back();
        });
    }
    
    if (forwardBtn) {
        forwardBtn.addEventListener('click', function() {
            window.history.forward();
        });
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', function() {
            window.stop();
            showRetroAlert('Carga detenida.');
        });
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            window.location.reload();
        });
    }
}

/**
 * Add custom cursor effects
 */
function addCursorEffects() {
    // Change cursor to pointer on interactive elements
    document.querySelectorAll('a, button, .social-links li a').forEach(element => {
        element.style.cursor = 'pointer';
    });
    
    // Animate frequency bars in player
    const frequencyBars = document.querySelectorAll('.freq-bars .bar');
    if (frequencyBars.length > 0) {
        setInterval(() => {
            frequencyBars.forEach(bar => {
                const randomHeight = Math.random();
                bar.style.height = (30 + randomHeight * 70) + '%';
            });
        }, 150);
    }
}

/**
 * Utility function to escape HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Add CSS animation definitions
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
        70% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log("%c¡Bienvenido a N's Rincón Web!", 
    'font-size: 16px; font-weight: bold; color: #00ff00; text-shadow: 0 0 10px #00aa00; font-family: Courier New;');
console.log('%c⭐ Especialista en web retro y nostalgia digital ⭐', 
    'font-size: 12px; color: #00aa00; font-family: Courier New;');
