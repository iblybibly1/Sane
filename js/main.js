/* ===== NAVBAR HAMBURGER ===== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target))
      navLinks.classList.remove('open');
  });
}

/* ===== HERO VIDEO SPEED =====
   To change speed: edit  data-speed="0.75"  on the <video> tag in index.html
   0.5 = half speed (slow/cinematic)
   0.75 = slightly slower than normal  ← default
   1.0 = normal speed
   1.5 = 50% faster
=============================== */
function initHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;
  const speed = parseFloat(video.dataset.speed) || 1.0;
  video.playbackRate = speed;
  video.addEventListener('canplay', () => { video.playbackRate = speed; });
}
initHeroVideo();

/* ===== GALLERY SLIDESHOW ===== */
function initGallery(containerEl) {
  if (!containerEl) return;
  const slides = containerEl.querySelectorAll('.gallery-slide');
  const thumbsContainer = containerEl.parentElement.querySelector('.gallery-thumbs');
  const prevBtn = containerEl.querySelector('.gallery-btn.prev');
  const nextBtn = containerEl.querySelector('.gallery-btn.next');
  if (!slides.length) return;

  let current = 0;
  const thumbs = [];

  slides.forEach((slide, i) => {
    const img = slide.querySelector('img');
    if (thumbsContainer && img) {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
      const tImg = document.createElement('img');
      tImg.src = img.src; tImg.alt = img.alt;
      thumb.appendChild(tImg);
      thumb.addEventListener('click', () => goTo(i));
      thumbsContainer.appendChild(thumb);
      thumbs.push(thumb);
    }
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    thumbs[current] && thumbs[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    thumbs[current] && thumbs[current].classList.add('active');
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));
  setInterval(() => goTo(current + 1), 4000);
}
document.querySelectorAll('.gallery-slideshow').forEach(initGallery);

/* ===== BASKET ===== */
let basket = [];

const basketToggle = document.querySelector('.basket-toggle');
const basketPanel = document.querySelector('.basket-panel');
const basketOverlay = document.querySelector('.basket-overlay');
const basketClose = document.querySelector('.basket-close');
const basketItemsEl = document.querySelector('.basket-items');
const basketBadge = document.querySelector('.basket-badge');
const basketTotalEl = document.getElementById('basket-total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

function openBasket() {
  basketPanel && basketPanel.classList.add('open');
  basketOverlay && basketOverlay.classList.add('open');
}
function closeBasket() {
  basketPanel && basketPanel.classList.remove('open');
  basketOverlay && basketOverlay.classList.remove('open');
}

basketToggle && basketToggle.addEventListener('click', openBasket);
basketClose && basketClose.addEventListener('click', closeBasket);
basketOverlay && basketOverlay.addEventListener('click', closeBasket);

function renderBasket() {
  if (!basketItemsEl) return;
  basketItemsEl.innerHTML = '';
  if (basket.length === 0) {
    basketItemsEl.innerHTML = '<div class="basket-empty">🛒<br>Your basket is empty</div>';
  } else {
    basket.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'basket-item';
      div.innerHTML = `
        <img class="basket-item-thumb" src="${item.img}" alt="${item.title}">
        <div class="basket-item-info">
          <h4>${item.title}</h4>
          <p>${item.price} €</p>
        </div>
        <button class="basket-item-remove" data-idx="${idx}" aria-label="Remove">✕</button>
      `;
      basketItemsEl.appendChild(div);
    });
  }
  const total = basket.reduce((s, i) => s + i.priceNum, 0);
  if (basketTotalEl) basketTotalEl.textContent = total.toFixed(2) + ' €';
  if (basketBadge) {
    basketBadge.textContent = basket.length;
    basketBadge.style.display = basket.length ? 'flex' : 'none';
  }
  basketItemsEl.querySelectorAll('.basket-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      basket.splice(Number(btn.dataset.idx), 1);
      renderBasket();
    });
  });
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-basket')) {
    const card = e.target.closest('.photo-item');
    const title = card.dataset.title || 'Photo';
    const priceNum = parseFloat(card.dataset.price || '20');
    const img = card.querySelector('img').src;
    basket.push({ title, priceNum, img });
    renderBasket();
    openBasket();
    showToast('Added to basket!');
  }
});

/* Checkout: opens mailto to ronya@sane.fi with order details */
checkoutBtn && checkoutBtn.addEventListener('click', () => {
  const nameEl = document.getElementById('buyer-name');
  const emailEl = document.getElementById('buyer-email');
  const noteEl = document.getElementById('buyer-note');
  if (!nameEl || !emailEl) return;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const note = noteEl ? noteEl.value.trim() : '';

  if (!name || !email) { showToast('Please fill in your name and email'); return; }
  if (basket.length === 0) { showToast('Your basket is empty'); return; }

  const lines = basket.map((p, i) => `${i + 1}. ${p.title} — ${p.priceNum.toFixed(2)} €`).join('\n');
  const total = basket.reduce((s, i) => s + i.priceNum, 0).toFixed(2);
  const subject = encodeURIComponent('Photo Purchase Request — RonyaSane');
  const bodyText = `Hi Ronya,\n\nI would like to purchase the following photos:\n\n${lines}\n\nTotal: ${total} €\n\nBuyer name: ${name}\nBuyer email: ${email}\nNote: ${note}\n\nPlease send me payment instructions. Thank you!`;
  window.location.href = `mailto:ronya@sane.fi?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

  const modal = document.querySelector('.modal-overlay');
  if (modal) modal.classList.add('open');
  basket = [];
  renderBasket();
  if (nameEl) nameEl.value = '';
  if (emailEl) emailEl.value = '';
  if (noteEl) noteEl.value = '';
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-close')) {
    e.target.closest('.modal-overlay').classList.remove('open');
  }
});

renderBasket();

/* ===== TOAST ===== */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ===== PREVENT RIGHT-CLICK / DRAG ON WATERMARKED PHOTOS ===== */
document.querySelectorAll('.photo-item img').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
  img.addEventListener('dragstart', e => e.preventDefault());
});
