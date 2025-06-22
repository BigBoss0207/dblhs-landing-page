console.log('Modal script loaded');

// Simple Modal Handler
const Modal = {
    init() {
        // 기본 요소
        this.modal = document.getElementById('phoneModal');
        this.contactSection = document.getElementById('contact');
        this.openButtons = document.querySelectorAll('.contact-btn');
        this.closeButton = this.modal.querySelector('.close-modal');

        // 이벤트 바인딩
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // 버튼이 contact 섹션 내에 있는지 확인
                if (this.contactSection.contains(e.target)) {
                    this.open();
                }
            });
        });

        this.closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.close();
        });

        // 모달 외부 클릭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // ESC 키
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.close();
            }
        });
    },

    open() {
        // 현재 스크롤 위치 유지를 위해 모달을 현재 뷰포트에 맞춤
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        this.modal.style.display = 'flex';
        this.modal.style.height = `${viewportHeight}px`;
        this.modal.style.top = `${scrollTop}px`;
        
        // 애니메이션을 위한 지연
        requestAnimationFrame(() => {
            this.modal.classList.add('show');
        });
    },

    close() {
        this.modal.classList.remove('show');
        setTimeout(() => {
            this.modal.style.display = 'none';
            // 모달 위치 초기화
            this.modal.style.top = '0';
        }, 300);
    }
};

// 초기화
document.addEventListener('DOMContentLoaded', () => Modal.init()); 