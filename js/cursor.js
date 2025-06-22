class CustomCursor {
    constructor() {
        // Create cursor element
        this.cursor = document.querySelector('.cursor');
        if (!this.cursor) {
            this.cursor = document.createElement('div');
            this.cursor.className = 'cursor';
            document.body.appendChild(this.cursor);
        }

        // Initialize properties
        this.cursorPos = { x: -100, y: -100 }; // Start off-screen
        this.currentPos = { x: -100, y: -100 };
        this.visible = false;
        this.particles = [];
        this.init();
    }

    init() {
        // 전체 페이지에서 기본 커서 숨기기
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
        
        // 모든 클릭 가능한 요소에 대해 커서 스타일 적용
        const clickableElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
        clickableElements.forEach(el => {
            el.style.cursor = 'none';
        });

        // 마우스 이동 이벤트
        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX;
            this.cursorPos.y = e.clientY;
            
            if (!this.visible) {
                this.currentPos.x = this.cursorPos.x;
                this.currentPos.y = this.cursorPos.y;
                this.visible = true;
                this.cursor.style.opacity = 1;
            }

            // 스크롤 위치 고려
            const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;

            this.cursor.style.transform = `translate3d(${this.currentPos.x + scrollX}px, ${this.currentPos.y + scrollY}px, 0) translate(-50%, -50%)`;
        });

        // 페이지 스크롤 이벤트
        window.addEventListener('scroll', () => {
            const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            this.cursor.style.transform = `translate3d(${this.currentPos.x + scrollX}px, ${this.currentPos.y + scrollY}px, 0) translate(-50%, -50%)`;
        });

        // 마우스가 페이지를 벗어날 때
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = 0;
        });

        // 마우스가 페이지로 돌아올 때
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = 1;
        });

        // 호버 효과
        const interactiveElements = document.querySelectorAll('a, button, .icon-item, .promise-card, .animate-text');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.createParticleBurst(el);
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        // Start animation loop
        this.render();
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            z-index: 9998;
            transform-origin: center center;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(particle);

        // Animate and remove particle
        requestAnimationFrame(() => {
            particle.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(0)`;
            particle.style.opacity = '0';
            setTimeout(() => particle.remove(), 500);
        });
    }

    createParticleBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * 20;
            const y = centerY + Math.sin(angle) * 20;
            
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.cssText = `
                position: fixed;
                pointer-events: none;
                width: 6px;
                height: 6px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                z-index: 9998;
                transform-origin: center center;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            document.body.appendChild(particle);

            requestAnimationFrame(() => {
                const distance = 100;
                particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
                particle.style.opacity = '0';
                setTimeout(() => particle.remove(), 800);
            });
        }
    }

    render = () => {
        // 부드러운 커서 움직임
        this.currentPos.x = lerp(this.currentPos.x, this.cursorPos.x, 0.15);
        this.currentPos.y = lerp(this.currentPos.y, this.cursorPos.y, 0.15);

        // 스크롤 위치 고려
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (this.visible) {
            this.cursor.style.transform = `translate3d(${this.currentPos.x + scrollX}px, ${this.currentPos.y + scrollY}px, 0) translate(-50%, -50%)`;
        }

        // Continue animation loop
        requestAnimationFrame(this.render);
    }
}

// Helper function for smooth interpolation
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
}); 