
import os
import glob
import re

new_nav = """    <!-- Floating Bottom Navigation Start -->
    <nav class="floating-bottom-nav" aria-label="Primary navigation">
        <div class="floating-bottom-nav__bar">
            <a href="index.html" class="floating-bottom-nav__item" data-nav="index.html" aria-label="Home">
                <span class="floating-bottom-nav__icon"><i class="fa-solid fa-house" aria-hidden="true"></i></span>
            </a>
            <a href="about.html" class="floating-bottom-nav__item" data-nav="about.html" aria-label="About">
                <span class="floating-bottom-nav__icon"><i class="fa-solid fa-seedling" aria-hidden="true"></i></span>
            </a>
            <a href="#" class="floating-bottom-nav__item floating-bottom-nav__item--center" id="scanner-trigger" aria-label="Scanner">
                <span class="floating-bottom-nav__fab">
                    <i class="fa-solid fa-qrcode" aria-hidden="true"></i>
                </span>
            </a>
            <a href="pricing.html" class="floating-bottom-nav__item" data-nav="pricing.html" aria-label="Pricing">
                <span class="floating-bottom-nav__icon"><i class="fa-solid fa-tags" aria-hidden="true"></i></span>
            </a>
            <a href="contact.html" class="floating-bottom-nav__item" data-nav="contact.html" aria-label="Contact">
                <span class="floating-bottom-nav__icon"><i class="fa-solid fa-phone" aria-hidden="true"></i></span>
            </a>
        </div>
    </nav>
    <!-- Floating Bottom Navigation End -->

    <!-- Scanner Modal Start -->
    <div class="scanner-overlay" id="scanner-modal">
        <div class="scanner-container">
            <button class="scanner-close-btn" id="scanner-close" aria-label="Close Scanner">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="scanner-header">
                <h3>Plant Scanner</h3>
                <p>Point your camera at a plant to scan</p>
            </div>
            <div class="scanner-viewfinder">
                <div class="scanner-frame">
                    <div class="scanner-corner top-left"></div>
                    <div class="scanner-corner top-right"></div>
                    <div class="scanner-corner bottom-left"></div>
                    <div class="scanner-corner bottom-right"></div>
                    <div class="scanner-scanline"></div>
                </div>
            </div>
            <div class="scanner-actions">
                <button class="scanner-action-btn"><i class="fa-solid fa-image"></i></button>
                <button class="scanner-action-btn primary"><i class="fa-solid fa-camera"></i></button>
                <button class="scanner-action-btn"><i class="fa-solid fa-bolt"></i></button>
            </div>
        </div>
    </div>
    <!-- Scanner Modal End -->"""

regex_pattern = re.compile(r"    <!-- Floating Bottom Navigation Start -->.*?<!-- Floating Bottom Navigation End -->", re.DOTALL)

for file in glob.glob("*.html"):
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = regex_pattern.sub(new_nav, content)
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(new_content)
print("Updated all HTML files")

