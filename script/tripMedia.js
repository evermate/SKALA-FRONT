const tripVideo = document.querySelector(".trip-card-video video");

if (tripVideo) {
  tripVideo.addEventListener("mouseenter", () => {
    tripVideo.muted = true;
    tripVideo.play();
  });
  tripVideo.addEventListener("mouseleave", () => {
    tripVideo.pause();
  });
  tripVideo.addEventListener("click", () => {
    tripVideo.muted = false;
  });
}
