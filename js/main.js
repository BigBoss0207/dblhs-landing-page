// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add click event to each link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get nav height
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                
                // Calculate target position
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Wait for all other scripts to load
window.addEventListener('load', function() {
    // Get nav height
    const nav = document.querySelector('.main-nav');
    const navHeight = nav.offsetHeight;

    // Add padding to body
    document.body.style.paddingTop = navHeight + 'px';

    // Smooth scroll
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Elements
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Update active section on scroll
    function updateActiveSection() {
        const navHeight = nav.offsetHeight;
        const fromTop = window.scrollY + navHeight + 1;

        sections.forEach(section => {
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                const targetLink = document.querySelector(`a[href="#${section.id}"]`);
                if (targetLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }

    // Throttle scroll event
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // Initial check
    updateActiveSection();
});

// Contact buttons and modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // 모달 관련 요소
    const modal = document.getElementById('phoneModal');
    const closeBtn = document.querySelector('.close-modal');
    const contactBtns = document.querySelectorAll('.contact-btn');
    
    // 모바일 체크
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 모달 열기
    function openModal() {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // 모달 닫기
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // 버튼 클릭 이벤트
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (isMobile) {
                window.location.href = this.dataset.mobileHref;
            } else {
                openModal();
            }
        });
    });

    // 모달 닫기 버튼 클릭
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // 모달 외부 클릭시 닫기
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}); 