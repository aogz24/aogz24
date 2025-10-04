// ========================
// Global Variables & State
// ========================
let isLoading = true;
let currentSkillFilter = "all";
let currentProjectFilter = "all";
let typingText = [
  "Data Scientist",
  "Full Stack Developer",
  "Statistisi",
  "Python Developer",
];
let currentTextIndex = 0;
let isTyping = true;

// ========================
// DOM Content Loaded
// ========================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize loading screen
  initializeLoadingScreen();

  // Initialize navigation
  initializeNavigation();

  // Initialize typing effect
  initializeTypingEffect();

  // Populate content from config
  populateContentFromConfig();

  // Initialize scroll animations
  initializeScrollAnimations();

  // Initialize filters
  initializeFilters();

  // Initialize contact form
  initializeContactForm();

  // Initialize skill bars animation
  initializeSkillBars();

  // Initialize smooth scrolling
  initializeSmoothScrolling();

  // Initialize scroll effects
  initializeScrollEffects();
});

// ========================
// Loading Screen
// ========================
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById("loading");
  const progressBar = document.querySelector(".loading-progress");

  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        isLoading = false;

        // Remove loading screen after animation
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }, 500);
    }
    progressBar.style.width = progress + "%";
  }, 200);
}

// ========================
// Navigation
// ========================
function initializeNavigation() {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  // Set initial active link
  updateActiveNavLink();
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

// ========================
// Typing Effect
// ========================
function initializeTypingEffect() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = typingText[currentTextIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typingText.length;
      typeSpeed = 500; // Pause before typing new text
    }

    setTimeout(typeText, typeSpeed);
  }

  // Start typing effect after page loads
  setTimeout(typeText, 1000);
}

// ========================
// Content Population from Config
// ========================
function populateContentFromConfig() {
  if (typeof CONFIG === "undefined") {
    console.warn("CONFIG not found. Make sure config.js is loaded.");
    return;
  }

  // Update hero name and roles
  const heroName = document.getElementById("hero-name");
  if (heroName) {
    heroName.textContent = CONFIG.nama;
  }

  // Update typing text with job titles
  if (CONFIG.jabatan && CONFIG.jabatan.length > 0) {
    typingText = CONFIG.jabatan;
  }

  // Update social links
  updateSocialLinks();

  // Populate roles
  populateRoles();

  // Populate skills
  populateSkills();

  // Populate projects
  populateProjects();

  // Update contact information
  updateContactInfo();

  // Update statistics
  updateStatistics();
}

function updateSocialLinks() {
  const githubLinks = document.querySelectorAll("#github-link, #footer-github");
  const linkedinLinks = document.querySelectorAll(
    "#linkedin-link, #footer-linkedin"
  );
  const emailLinks = document.querySelectorAll("#email-link, #footer-email");

  githubLinks.forEach((link) => {
    link.href = `https://github.com/${CONFIG.github}`;
  });

  linkedinLinks.forEach((link) => {
    link.href = `https://linkedin.com/in/${CONFIG.linkedin}`;
  });

  emailLinks.forEach((link) => {
    link.href = `mailto:${CONFIG.email}`;
  });
}

function populateRoles() {
  const rolesList = document.getElementById("roles-list");
  if (!rolesList || !CONFIG.jabatan) return;

  rolesList.innerHTML = "";

  CONFIG.jabatan.forEach((role, index) => {
    const roleElement = document.createElement("div");
    roleElement.className = "role-item fade-in-up";
    roleElement.style.animationDelay = `${index * 0.1}s`;
    roleElement.textContent = role;
    rolesList.appendChild(roleElement);
  });
}

function populateSkills() {
  const skillsGrid = document.getElementById("skills-grid");
  if (!skillsGrid || !CONFIG.keahlian) return;

  skillsGrid.innerHTML = "";

  // Group skills by category
  const skillsByCategory = {};
  CONFIG.keahlian.forEach((skill) => {
    if (!skillsByCategory[skill.kategori]) {
      skillsByCategory[skill.kategori] = [];
    }
    skillsByCategory[skill.kategori].push(skill);
  });

  // Create skill category elements
  Object.keys(skillsByCategory).forEach((category) => {
    const categoryElement = createSkillCategory(
      category,
      skillsByCategory[category]
    );
    skillsGrid.appendChild(categoryElement);
  });
}

function createSkillCategory(categoryName, skills) {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "skill-category fade-in-up";
  categoryDiv.dataset.category = categoryName;

  const categoryIcon = getCategoryIcon(categoryName);

  categoryDiv.innerHTML = `
        <h3>
            <i class="${categoryIcon}"></i>
            ${categoryName}
        </h3>
        <div class="skills-list">
            ${skills
              .map(
                (skill) => `
                <div class="skill-item">
                    <div class="skill-header">
                        <span class="skill-name">${skill.nama}</span>
                        <span class="skill-percentage">${skill.tingkat}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="${skill.tingkat}"></div>
                    </div>
                </div>
            `
              )
              .join("")}
        </div>
    `;

  return categoryDiv;
}

function getCategoryIcon(category) {
  const icons = {
    Frontend: "fas fa-paint-brush",
    Backend: "fas fa-server",
    Database: "fas fa-database",
    Tools: "fas fa-tools",
    Cloud: "fas fa-cloud",
    Mobile: "fas fa-mobile-alt",
    Desktop: "fas fa-desktop",
  };
  return icons[category] || "fas fa-code";
}

function populateProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid || !CONFIG.proyek) return;

  projectsGrid.innerHTML = "";

  CONFIG.proyek.forEach((project, index) => {
    const projectElement = createProjectCard(project, index);
    projectsGrid.appendChild(projectElement);
  });
}

function createProjectCard(project, index) {
  const projectDiv = document.createElement("div");
  projectDiv.className = `project-card fade-in-up ${
    project.unggulan ? "featured" : ""
  }`;
  projectDiv.style.animationDelay = `${index * 0.1}s`;

  // Set data attributes for filtering
  if (Array.isArray(project.kategori)) {
    project.kategori.forEach((cat) => {
      projectDiv.dataset[cat.toLowerCase().replace(/\s+/g, "")] = "true";
    });
  } else if (project.kategori) {
    projectDiv.dataset[project.kategori.toLowerCase().replace(/\s+/g, "")] =
      "true";
  }

  // Create technologies array
  let technologies = [];
  if (Array.isArray(project.teknologi)) {
    technologies = project.teknologi;
  } else if (typeof project.teknologi === "string") {
    technologies = [project.teknologi];
  }

  // Create project image
  const projectImage =
    project.tangkapan_layar && project.tangkapan_layar.length > 0
      ? `<div class="project-image">
             <img src="${project.tangkapan_layar[0]}" alt="${project.nama}" 
                  onerror="this.style.display='none';">
           </div>`
      : `<div class="project-image">
             <div style="display: flex; align-items: center; justify-content: center; height: 100%; 
                         background: var(--gradient-primary); color: white; font-size: 3rem;">
               <i class="fas fa-code"></i>
             </div>
           </div>`;

  // Create project links
  const projectLinks = [];
  if (project.url) {
    projectLinks.push(`
            <a href="${project.url}" class="project-link primary" target="_blank" rel="noopener">
                <i class="fas fa-external-link-alt"></i>
                Live Demo
            </a>
        `);
  }
  if (project.github) {
    projectLinks.push(`
            <a href="${project.github}" class="project-link secondary" target="_blank" rel="noopener">
                <i class="fab fa-github"></i>
                GitHub
            </a>
        `);
  }
  if (project.dokumentasi) {
    projectLinks.push(`
            <a href="${project.dokumentasi}" class="project-link secondary" target="_blank" rel="noopener">
                <i class="fas fa-book"></i>
                Docs
            </a>
        `);
  }

  projectDiv.innerHTML = `
        ${projectImage}
        <div class="project-content">
            <h3 class="project-title">${project.nama}</h3>
            <p class="project-description">${project.deskripsi}</p>
            <div class="project-technologies">
                ${technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
            </div>
            <div class="project-links">
                ${projectLinks.join("")}
            </div>
        </div>
    `;

  return projectDiv;
}

function updateContactInfo() {
  const contactEmail = document.getElementById("contact-email");
  const contactGithub = document.getElementById("contact-github");
  const contactLinkedin = document.getElementById("contact-linkedin");

  if (contactEmail) contactEmail.textContent = CONFIG.email;
  if (contactGithub) contactGithub.textContent = CONFIG.github;
  if (contactLinkedin) contactLinkedin.textContent = CONFIG.linkedin;
}

function updateStatistics() {
  const projectsCount = document.getElementById("projects-count");
  const skillsCount = document.getElementById("skills-count");

  if (projectsCount && CONFIG.proyek) {
    animateCounter(projectsCount, CONFIG.proyek.length, "+");
  }

  if (skillsCount && CONFIG.keahlian) {
    animateCounter(skillsCount, CONFIG.keahlian.length, "+");
  }
}

function animateCounter(element, target, suffix = "") {
  let current = 0;
  const increment = target / 30;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 50);
}

// ========================
// Scroll Animations
// ========================
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in classes
  document
    .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
    .forEach((el) => {
      observer.observe(el);
    });
}

// ========================
// Filters
// ========================
function initializeFilters() {
  initializeSkillFilters();
  initializeProjectFilters();
}

function initializeSkillFilters() {
  const filterButtons = document.querySelectorAll(".skills-filter .filter-btn");
  const skillCategories = document.querySelectorAll(".skill-category");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter categories
      skillCategories.forEach((category) => {
        if (filter === "all" || category.dataset.category === filter) {
          category.style.display = "block";
          category.classList.add("fade-in-up");
        } else {
          category.style.display = "none";
        }
      });

      currentSkillFilter = filter;
    });
  });
}

function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll(
    ".projects-filter .filter-btn"
  );
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects
      projectCards.forEach((card) => {
        const shouldShow =
          filter === "all" ||
          card.dataset[filter.toLowerCase().replace(/\s+/g, "")] === "true";

        if (shouldShow) {
          card.style.display = "flex";
          card.classList.add("fade-in-up");
        } else {
          card.style.display = "none";
        }
      });

      currentProjectFilter = filter;
    });
  });
}

// ========================
// Skill Bars Animation
// ========================
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.dataset.width;

          setTimeout(() => {
            skillBar.style.width = width + "%";
          }, 200);

          observer.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// ========================
// Contact Form
// ========================
function initializeContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Create mailto link
    const mailtoLink = `mailto:${CONFIG.email}?subject=${encodeURIComponent(
      data.subject
    )}&body=${encodeURIComponent(
      `Nama: ${data.name}\nEmail: ${data.email}\n\nPesan:\n${data.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    showNotification(
      "Aplikasi email Anda akan terbuka untuk mengirim pesan.",
      "info"
    );

    // Reset form
    form.reset();
  });
}

function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "var(--gradient-accent)"
            : "var(--gradient-secondary)"
        };
        color: white;
        padding: 16px 24px;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow-lg);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform var(--transition-normal);
        max-width: 300px;
        font-weight: var(--font-weight-medium);
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// ========================
// Smooth Scrolling
// ========================
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Account for fixed header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ========================
// Scroll Effects
// ========================
function initializeScrollEffects() {
  let ticking = false;

  function updateScrollEffects() {
    const scrollY = window.scrollY;

    // Parallax effect for hero section
    const hero = document.querySelector(".hero");
    if (hero) {
      const heroHeight = hero.offsetHeight;
      if (scrollY < heroHeight) {
        const parallaxValue = scrollY * 0.5;
        hero.style.transform = `translateY(${parallaxValue}px)`;
      }
    }

    // Update scroll indicator opacity
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      const opacity = Math.max(0, 1 - scrollY / 300);
      scrollIndicator.style.opacity = opacity;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
}

// ========================
// Utility Functions
// ========================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// ========================
// Performance Optimizations
// ========================
// Lazy load images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading after DOM content loaded
document.addEventListener("DOMContentLoaded", initializeLazyLoading);

// ========================
// Keyboard Navigation
// ========================
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navMenu.classList.contains("active")) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }
});

// ========================
// Accessibility Improvements
// ========================
function initializeAccessibility() {
  // Add skip link for keyboard navigation
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.className = "skip-link";
  skipLink.textContent = "Skip to main content";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add aria-labels for better screen reader support
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    if (link.href.includes("github")) {
      link.setAttribute("aria-label", "GitHub Profile");
    } else if (link.href.includes("linkedin")) {
      link.setAttribute("aria-label", "LinkedIn Profile");
    } else if (link.href.includes("mailto")) {
      link.setAttribute("aria-label", "Send Email");
    }
  });
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", initializeAccessibility);

// ========================
// Dark/Light Theme Toggle
// ========================
function initializeThemeToggle() {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.setAttribute("aria-label", "Toggle theme");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';

  document.body.appendChild(themeToggle);

  // Check for saved theme preference or default to dark mode
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }

  // Theme toggle click handler
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");

    // Update icon with animation
    themeToggle.style.transform = "rotate(360deg)";
    setTimeout(() => {
      if (isLightMode) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
        localStorage.setItem("theme", "light");
      } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute("aria-label", "Switch to light mode");
        localStorage.setItem("theme", "dark");
      }
      themeToggle.style.transform = "rotate(0deg)";
    }, 150);
  });
}

// Initialize theme toggle
document.addEventListener("DOMContentLoaded", initializeThemeToggle);

// ========================
// Error Handling
// ========================
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error);
  // Could implement user-friendly error reporting here
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason);
  // Could implement user-friendly error reporting here
});

// ========================
// Performance Monitoring
// ========================
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log("Page Load Time:", pageLoadTime + "ms");
    }, 0);
  });
}

// ========================
// Service Worker (for future PWA implementation)
// ========================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Service worker registration would go here for PWA functionality
    // navigator.serviceWorker.register('/sw.js');
  });
}
