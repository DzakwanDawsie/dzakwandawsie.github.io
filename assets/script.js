// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.skill-card, .experience-card, .volunteer-card, .award-card, .project-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = 'var(--accent-blue)';
        }
    });
});

// Screenshot Modal Functionality
const modal = document.getElementById('screenshotModal');
const modalTitle = document.getElementById('modalTitle');
const screenshotGallery = document.getElementById('screenshotGallery');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = modal.querySelector('.modal-overlay');
const currentImageSpan = document.getElementById('currentImage');
const totalImagesSpan = document.getElementById('totalImages');

let currentScreenshots = [];
let currentProjectTitle = '';

// Open modal with screenshots
function openScreenshotModal(screenshots, projectTitle) {
    currentScreenshots = screenshots;
    currentProjectTitle = projectTitle;
    modalTitle.textContent = `${projectTitle} - Snapshots`;
    
    // Clear previous content
    screenshotGallery.innerHTML = '';
    
    // Update counter
    totalImagesSpan.textContent = screenshots.length;
    currentImageSpan.textContent = screenshots.length;
    
    // Create screenshot items
    screenshots.forEach((screenshot, index) => {
        const screenshotItem = document.createElement('div');
        screenshotItem.className = 'screenshot-item';
        screenshotItem.innerHTML = `
            <img src="${screenshot}" alt="${projectTitle} screenshot ${index + 1}" loading="lazy">
            <div class="screenshot-number">${index + 1}</div>
        `;
        
        // Add click handler for fullscreen view
        screenshotItem.addEventListener('click', () => {
            openFullscreenViewer(screenshot);
        });
        
        screenshotGallery.appendChild(screenshotItem);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeScreenshotModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for modal
closeModalBtn.addEventListener('click', closeScreenshotModal);
modalOverlay.addEventListener('click', closeScreenshotModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeScreenshotModal();
    }
});

// Add event listeners to all snapshot buttons
document.addEventListener('DOMContentLoaded', () => {
    const snapshotButtons = document.querySelectorAll('.snapshot-btn');
    
    snapshotButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.project-card');
            const screenshots = JSON.parse(projectCard.dataset.screenshots);
            const projectTitle = projectCard.querySelector('h3').textContent;
            
            openScreenshotModal(screenshots, projectTitle);
        });
    });
});

// Fullscreen Image Viewer
let fullscreenViewer = null;

function createFullscreenViewer() {
    fullscreenViewer = document.createElement('div');
    fullscreenViewer.className = 'fullscreen-viewer';
    fullscreenViewer.innerHTML = `
        <button class="fullscreen-close" id="fullscreenClose" aria-label="Close fullscreen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
        <img id="fullscreenImage" src="" alt="Fullscreen view">
    `;
    document.body.appendChild(fullscreenViewer);
    
    // Close fullscreen
    const closeBtn = fullscreenViewer.querySelector('#fullscreenClose');
    closeBtn.addEventListener('click', closeFullscreenViewer);
    
    fullscreenViewer.addEventListener('click', (e) => {
        if (e.target === fullscreenViewer) {
            closeFullscreenViewer();
        }
    });
}

function openFullscreenViewer(imageSrc) {
    if (!fullscreenViewer) {
        createFullscreenViewer();
    }
    
    const img = fullscreenViewer.querySelector('#fullscreenImage');
    img.src = imageSrc;
    fullscreenViewer.classList.add('active');
}

function closeFullscreenViewer() {
    if (fullscreenViewer) {
        fullscreenViewer.classList.remove('active');
    }
}

const downloadCVButton = document.getElementById('download-cv-btn');

downloadCVButton.addEventListener('click', function() {
  window.open('assets/Dzakwan Dawsie - Software Engineer - Resume.pdf', '_blank');
});

// Console message
console.log('%c👋 Hello! ', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #06b6d4; font-size: 14px;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'color: #6b7280; font-size: 12px;');