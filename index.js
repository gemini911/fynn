/* ============================================
   TYPING ANIMATION
   ============================================ */
class TypingEffect {
  constructor(element, words, options = {}) {
    this.el = element;
    this.words = words;
    this.typeSpeed = options.typeSpeed || 120;
    this.deleteSpeed = options.deleteSpeed || 80;
    this.pauseAfterType = options.pauseAfterType || 2000;
    this.pauseAfterDelete = options.pauseAfterDelete || 500;
    this.currentWord = 0;
    this.currentChar = 0;
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    const word = this.words[this.currentWord];

    if (this.isDeleting) {
      this.currentChar--;
      this.el.textContent = word.substring(0, this.currentChar);
    } else {
      this.currentChar++;
      this.el.textContent = word.substring(0, this.currentChar);
    }

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentChar === word.length) {
      delay = this.pauseAfterType;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentChar === 0) {
      this.isDeleting = false;
      this.currentWord = (this.currentWord + 1) % this.words.length;
      delay = this.pauseAfterDelete;
    }

    setTimeout(() => this.tick(), delay);
  }
}

/* ============================================
   3D INTERACTIVE OBJECT (Pure CSS/JS, no lib)
   ============================================ */
class InteractiveObject {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mouse = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.particles = [];
    this.time = 0;
    this.resize();
    this.initParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 500);
    this.canvas.width = size * 2;
    this.canvas.height = size * 2;
    this.canvas.style.width = size + 'px';
    this.canvas.style.height = size + 'px';
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
  }

  initParticles() {
    this.particles = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 140 + Math.random() * 20;
      this.particles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        r: 1.5 + Math.random() * 2,
        baseR: r,
        phi,
        theta,
        speed: 0.002 + Math.random() * 0.003,
      });
    }
  }

  bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      this.target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.target.x = 0;
      this.target.y = 0;
    });

    window.addEventListener('resize', () => this.resize());
  }

  project(x, y, z) {
    const fov = 600;
    const scale = fov / (fov + z);
    return {
      x: this.cx + x * scale,
      y: this.cy + y * scale,
      scale,
    };
  }

  rotateX(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      ...p,
      y: p.y * cos - p.z * sin,
      z: p.y * sin + p.z * cos,
    };
  }

  rotateY(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      ...p,
      x: p.x * cos + p.z * sin,
      z: -p.x * sin + p.z * cos,
    };
  }

  drawConnections(projected) {
    const maxDist = 100;
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15 * projected[i].scale * projected[j].scale;
          this.ctx.strokeStyle = `rgba(200, 149, 108, ${alpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(projected[i].x, projected[i].y);
          this.ctx.lineTo(projected[j].x, projected[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.time += 0.005;
    this.mouse.x += (this.target.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.target.y - this.mouse.y) * 0.05;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw glow ring
    const gradient = this.ctx.createRadialGradient(this.cx, this.cy, 100, this.cx, this.cy, 250);
    gradient.addColorStop(0, 'rgba(200, 149, 108, 0.03)');
    gradient.addColorStop(0.5, 'rgba(200, 149, 108, 0.01)');
    gradient.addColorStop(1, 'transparent');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const rotX = this.mouse.y * 0.5 + this.time * 0.3;
    const rotY = this.mouse.x * 0.5 + this.time * 0.5;

    const projected = [];

    this.particles.forEach((p) => {
      p.theta += p.speed;
      const x = p.baseR * Math.sin(p.phi) * Math.cos(p.theta);
      const y = p.baseR * Math.sin(p.phi) * Math.sin(p.theta);
      const z = p.baseR * Math.cos(p.phi);

      let point = { x, y, z };
      point = this.rotateX(point, rotX);
      point = this.rotateY(point, rotY);

      const proj = this.project(point.x, point.y, point.z);
      projected.push(proj);

      const alpha = 0.3 + proj.scale * 0.7;
      const size = p.r * proj.scale;

      this.ctx.beginPath();
      this.ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(200, 149, 108, ${alpha * 0.8})`;
      this.ctx.fill();
    });

    this.drawConnections(projected);

    requestAnimationFrame(() => this.animate());
  }
}

/* ============================================
   CARD LIGHT FOLLOW
   ============================================ */
function initCardLightEffect() {
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   NAV SCROLL
   ============================================ */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ============================================
   MARQUEE INFINITE LOOP
   ============================================ */
function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    const items = Array.from(track.children);
    items.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
  });
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Typing animation
  const typingEl = document.getElementById('typing-word');
  if (typingEl) {
    new TypingEffect(typingEl, ['人生', '工作', '生活'], {
      typeSpeed: 150,
      deleteSpeed: 100,
      pauseAfterType: 2200,
      pauseAfterDelete: 400,
    });
  }

  // 3D object
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    new InteractiveObject(canvas);
  }

  // Card effects
  initCardLightEffect();

  // Marquee
  initMarquee();

  // Scroll reveal
  initScrollReveal();

  // Nav scroll
  initNavScroll();
});

