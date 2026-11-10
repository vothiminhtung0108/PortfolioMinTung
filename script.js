// Mô hình bong bóng nền: tạo hiệu ứng ánh sáng bay nhẹ nhàng từ dưới lên trên
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const bubbles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createBubble() {
  const radius = randomBetween(2, 12);
  const x = randomBetween(radius, canvas.width - radius);
  const y = canvas.height + radius;
  const speed = randomBetween(0.3, 1.0);
  const opacity = randomBetween(0.18, 0.6);

  bubbles.push({
    x,
    y,
    radius,
    speed,
    opacity,
    drift: randomBetween(-0.4, 0.4)
  });
}

function drawBubble(bubble) {
  ctx.beginPath();
  ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(bubble.x - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 1.4})`;
  ctx.fill();
}

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  while (bubbles.length < 26) {
    createBubble();
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    const bubble = bubbles[i];
    bubble.y -= bubble.speed;
    bubble.x += bubble.drift;

    if (bubble.y + bubble.radius < 0) {
      bubbles.splice(i, 1);
      continue;
    }

    if (bubble.x < -bubble.radius || bubble.x > canvas.width + bubble.radius) {
      bubble.drift *= -1;
    }

    drawBubble(bubble);
  }

  requestAnimationFrame(animateBubbles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateBubbles();

// Logic phát/tạm dừng nhạc nền
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const musicLabel = musicToggle.querySelector('.music-label');

musicToggle.addEventListener('click', async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicToggle.classList.add('is-playing');
      musicLabel.textContent = 'Pause';
      musicToggle.setAttribute('aria-label', 'Tạm dừng nhạc nền');
    } catch (error) {
      console.warn('Không thể phát nhạc nền tự động:', error);
    }
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('is-playing');
    musicLabel.textContent = 'Play';
    musicToggle.setAttribute('aria-label', 'Phát nhạc nền');
  }
});

// Logic form giả lập gửi tin nhắn
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const originalText = submitButton.textContent;
  submitButton.textContent = 'Đã gửi!';
  submitButton.disabled = true;
  submitButton.style.opacity = '0.8';

  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
    contactForm.reset();
  }, 1600);
});
