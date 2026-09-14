const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'printable_slides_tasteful_orange.html'), 'utf8');

const interactiveAdditions = `
<style>
    body { overflow: hidden; }
    .slide { display: none; margin: 0 auto; height: 100vh; max-height: 1080px; width: 100vw; max-width: 1920px; }
    .slide.active { display: flex; animation: slideFade 0.3s ease; }
    @keyframes slideFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .nav-bar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(18, 24, 38, 0.95);
        border: 1.5px solid #FF6B00;
        border-radius: 30px;
        padding: 8px 24px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        z-index: 1000;
        backdrop-filter: blur(12px);
    }
    .nav-btn {
        background: rgba(255, 107, 0, 0.15);
        border: 1.5px solid #FF6B00;
        color: #FFFFFF;
        font-weight: 700;
        font-size: 13px;
        padding: 6px 16px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s;
    }
    .nav-btn:hover {
        background: #FF6B00;
        color: #000000;
    }
    .nav-counter {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        font-size: 14px;
        color: #FFA726;
    }
</style>

<div class="nav-bar">
    <button class="nav-btn" onclick="prevSlide()">◀ Previous</button>
    <span class="nav-counter" id="slide-counter">Slide 1 / 24</span>
    <button class="nav-btn" onclick="nextSlide()">Next ▶</button>
    <button class="nav-btn" onclick="toggleFullScreen()" style="background: #0284C7; color: #FFF; border-color: #38BDF8;">⛶ Fullscreen</button>
</div>

<script>
    let currentSlide = 1;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(n) {
        slides.forEach(s => s.classList.remove('active'));
        if (n > totalSlides) currentSlide = 1;
        if (n < 1) currentSlide = totalSlides;
        slides[currentSlide - 1].classList.add('active');
        document.getElementById('slide-counter').innerText = 'Slide ' + currentSlide + ' / ' + totalSlides;
    }

    function nextSlide() { currentSlide++; showSlide(currentSlide); }
    function prevSlide() { currentSlide--; showSlide(currentSlide); }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'f' || e.key === 'F') toggleFullScreen();
    });

    showSlide(1);
</script>
</body>
</html>
`;

content = content.replace('</body>\n</html>', interactiveAdditions);
fs.writeFileSync(path.join(__dirname, 'WELLORA_Slide_Deck.html'), content);
console.log('SUCCESS: Updated WELLORA_Slide_Deck.html with Tasteful Orange Accents & Dark Slate Background.');
