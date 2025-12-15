// Tab navigation logic
const navLinks = document.querySelectorAll('.nav-bar a');
const sections = document.querySelectorAll('.tab-section');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash && document.querySelector(this.hash)) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            sections.forEach(sec => sec.classList.remove('active-section'));
            document.querySelector(this.hash).classList.add('active-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Countdown logic was moved to the page's reusable countdown script to support multiple
// instances. This file now only contains other page behaviors.

// Contact form (no actual backend, just animation)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    this.reset();
    alert('Thank you for contacting us!');
});

// Video visibility and black overlay on scroll
const bgVideo = document.querySelector('.bg-video');
const videoOverlay = document.getElementById('videoOverlay') || document.getElementById('blackBgOverlay');
let videoPausedByScroll = false;

function setVideoPaused(paused) {
    if (!bgVideo) return;
    try {
        if (paused) {
            if (!bgVideo.paused) { bgVideo.pause(); videoPausedByScroll = true; }
            videoOverlay && videoOverlay.classList.add('paused');
        } else {
            if (videoPausedByScroll) { bgVideo.play().catch(()=>{}); videoPausedByScroll = false; }
            videoOverlay && videoOverlay.classList.remove('paused');
        }
    } catch (e) { /* ignore autoplay or play errors */ }
}

let lastScroll = 0;
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;
    // if user scrolls past 150px, pause video and darken overlay
    if (scrollY > 150) {
        setVideoPaused(true);
    } else {
        setVideoPaused(false);
    }
    lastScroll = scrollY;
});