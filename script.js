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
    initializeToolbarButtons();
    addCursorEffects();
});

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
 * Handle contact form submission
 */
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    const data = {};
    
    inputs.forEach(input => {
        data[input.placeholder || input.name] = input.value;
    });
    
    console.log('Contact Form Data:', data);
    
    showRetroAlert('¡Tu mensaje ha sido enviado!' + 
        '\n\nNombre: ' + data['Tu nombre'] + 
        '\nEmail: ' + data['Tu email'] + 
        '\nMensaje: ' + data['Tu mensaje']);
    
    form.reset();
    return false;
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
    document.querySelectorAll('a, button, input, textarea, .social-links li a').forEach(element => {
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
    
    button:focus {
        outline: 2px dashed #000080;
        outline-offset: -2px;
    }
    
    input:focus,
    textarea:focus {
        outline: 2px solid #000080;
    }
`;
document.head.appendChild(style);

console.log('%c¡Bienvenido a N\\'s Rincón Web!', 
    'font-size: 16px; font-weight: bold; color: #00ff00; text-shadow: 0 0 10px #00aa00; font-family: Courier New;');
console.log('%c⭐ Especialista en web retro y nostalgia digital ⭐', 
    'font-size: 12px; color: #00aa00; font-family: Courier New;');
