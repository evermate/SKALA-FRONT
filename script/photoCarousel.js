const carousel = document.querySelector(".photo-carousel");
const track = document.querySelector(".photo-track");
const slides = track ? [...track.children] : [];
const dots = [...document.querySelectorAll(".photo-dot")];
const fraction = document.querySelector(".photo-fraction");
const caption = document.querySelector(".photo-caption");
const prevBtn = document.querySelector(".photo-nav.prev");
const nextBtn = document.querySelector(".photo-nav.next");
const playPauseBtn = document.querySelector(".photo-playpause");
const AUTOPLAY_MS = 3000;
let index = 0;
let timer = null;
let syncing = false;
let userPaused = false;

function goTo(next) {
  index = (next + slides.length) % slides.length;
  syncing = true;
  slides[index].scrollIntoView({ behavior: "smooth", inline: "start" });
  updateIndicators();
}

function updateIndicators() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    dot.setAttribute("aria-current", i === index ? "true" : "false");
  });
  if (fraction) fraction.textContent = `${index + 1} / ${slides.length}`;
  if (caption) caption.textContent = slides[index].dataset.caption ?? "";
}

function startAutoplay() {
  stopAutoplay();
  if (userPaused) return;
  timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
}

function stopAutoplay() {
  if (timer) clearInterval(timer);
  timer = null;
}

function setPlayPauseUI() {
  if (!playPauseBtn) return;
  playPauseBtn.innerHTML = userPaused ? "&#9654;" : "&#9208;";
  playPauseBtn.setAttribute("aria-pressed", userPaused ? "true" : "false");
  playPauseBtn.setAttribute(
    "aria-label",
    userPaused ? "자동 재생 시작" : "자동 재생 정지",
  );
}

if (carousel && track && slides.length) {
  prevBtn?.addEventListener("click", () => {
    goTo(index - 1);
    startAutoplay();
  });
  nextBtn?.addEventListener("click", () => {
    goTo(index + 1);
    startAutoplay();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      startAutoplay();
    });
  });
  playPauseBtn?.addEventListener("click", () => {
    userPaused = !userPaused;
    setPlayPauseUI();
    if (userPaused) stopAutoplay();
    else startAutoplay();
  });
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  let scrollTimeout = null;
  track.addEventListener("scroll", () => {
    if (syncing) {
      syncing = false;
      return;
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const width = track.clientWidth;
      index = Math.round(track.scrollLeft / width) % slides.length;
      updateIndicators();
    }, 120);
  });

  updateIndicators();
  startAutoplay();
}
