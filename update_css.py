
import re

new_css = """/************************************/

/***   Floating bottom navigation ***/

/************************************/

body {
    padding-bottom: calc(120px + env(safe-area-inset-bottom, 0px));
}

.floating-bottom-nav {
    position: fixed;
    left: 50%;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
    z-index: 999;
    width: min(720px, calc(100% - 48px));
    transform: translateX(-50%);
    pointer-events: none;
}

.floating-bottom-nav__bar {
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    padding: 10px 28px;
    background: rgba(240, 255, 240, 0.92);
    border: 1px solid var(--divider-color);
    border-radius: 100px;
    box-shadow: 0 18px 50px rgba(11, 61, 44, 0.18), 0 4px 16px rgba(11, 61, 44, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}

.floating-bottom-nav__item {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 0;
    padding: 8px 6px;
    color: var(--primary-color);
    text-decoration: none;
    isolation: isolate;
    transition: color 0.25s ease-in-out, transform 0.25s ease-in-out;
    background: transparent;
    border: none;
    outline: none;
}

.floating-bottom-nav__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    color: var(--primary-color);
    opacity: 0.55;
    font-size: 20px;
    line-height: 1;
    border-radius: 50%;
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out, color 0.25s ease-in-out, box-shadow 0.25s ease-in-out, background-color 0.25s ease-in-out;
}

.floating-bottom-nav__item::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -4px;
    width: 18px;
    height: 3px;
    border-radius: 100px;
    background-color: var(--accent-color);
    transform: translateX(-50%) scaleX(0);
    opacity: 0;
    transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
}

.floating-bottom-nav__item:hover .floating-bottom-nav__icon,
.floating-bottom-nav__item:focus-visible .floating-bottom-nav__icon {
    opacity: 0.9;
    transform: translateY(-2px);
}

.floating-bottom-nav__item.is-active {
    color: var(--accent-color);
}

.floating-bottom-nav__item.is-active .floating-bottom-nav__icon {
    opacity: 1;
    color: var(--accent-color);
    transform: translateY(-3px);
    background-color: rgba(42, 125, 46, 0.1);
    box-shadow: 0 0 18px rgba(42, 125, 46, 0.28);
}

.floating-bottom-nav__item.is-active::after {
    opacity: 1;
    transform: translateX(-50%) scaleX(1);
}

.floating-bottom-nav__item--center {
    justify-content: center;
    padding: 0;
}

.floating-bottom-nav__item--center::after {
    bottom: -10px;
}

.floating-bottom-nav__fab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-top: -36px;
    color: var(--white-color);
    font-size: 26px;
    background-color: var(--accent-color);
    border-radius: 50%;
    box-shadow: 0 12px 28px rgba(42, 125, 46, 0.42), 0 0 0 6px rgba(240, 255, 240, 0.95);
    animation: floating-nav-fab 3s ease-in-out infinite;
    transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out, background-color 0.25s ease-in-out;
}

.floating-bottom-nav__item--center:hover .floating-bottom-nav__fab,
.floating-bottom-nav__item--center:focus-visible .floating-bottom-nav__fab {
    animation: none;
    background-color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 16px 32px rgba(11, 61, 44, 0.38), 0 0 0 6px rgba(240, 255, 240, 0.95), 0 0 24px rgba(42, 125, 46, 0.35);
}

@keyframes floating-nav-fab {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-4px);
    }
}

@media (hover: hover) {
    .floating-bottom-nav__item:hover .floating-bottom-nav__icon {
        background-color: rgba(11, 61, 44, 0.06);
    }
}

@media only screen and (max-width: 991px) {
    .floating-bottom-nav {
        width: min(560px, calc(100% - 28px));
        bottom: calc(16px + env(safe-area-inset-bottom, 0px));
    }

    .floating-bottom-nav__bar {
        min-height: 64px;
        padding: 8px 16px;
        border-radius: 40px;
        gap: 0;
    }

    .floating-bottom-nav__fab {
        width: 56px;
        height: 56px;
        margin-top: -28px;
        font-size: 22px;
        box-shadow: 0 10px 22px rgba(42, 125, 46, 0.42), 0 0 0 5px rgba(240, 255, 240, 0.95);
    }

    .floating-bottom-nav__icon {
        width: 36px;
        height: 36px;
        font-size: 18px;
    }
}

@media only screen and (max-width: 575px) {
    body {
        padding-bottom: calc(100px + env(safe-area-inset-bottom, 0px));
    }

    .floating-bottom-nav {
        width: calc(100% - 20px);
        bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    }

    .floating-bottom-nav__bar {
        min-height: 60px;
        padding: 6px 10px;
        border-radius: 30px;
    }

    .floating-bottom-nav__item {
        padding: 6px 2px;
    }

    .floating-bottom-nav__fab {
        width: 52px;
        height: 52px;
        margin-top: -24px;
        font-size: 20px;
    }
}

/* Scanner Modal CSS */
.scanner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(11, 61, 44, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.scanner-overlay.is-active {
    opacity: 1;
    visibility: visible;
}

.scanner-container {
    position: relative;
    width: 100%;
    max-width: 480px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    transform: translateY(20px) scale(0.95);
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-in-out;
    transition-delay: 0.1s;
}

.scanner-overlay.is-active .scanner-container {
    transform: translateY(0) scale(1);
    opacity: 1;
}

.scanner-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: var(--white-color);
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background 0.2s, transform 0.2s;
}

.scanner-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

.scanner-header {
    text-align: center;
    color: var(--white-color);
    margin-bottom: auto;
    padding-top: 40px;
}

.scanner-header h3 {
    color: var(--white-color);
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
}

.scanner-header p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
}

.scanner-viewfinder {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    max-height: 60vh;
    margin: 0 auto;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.4);
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.scanner-frame {
    position: absolute;
    top: 5%;
    left: 5%;
    right: 5%;
    bottom: 5%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
}

.scanner-corner {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 4px solid var(--accent-color);
}

.scanner-corner.top-left {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
    border-top-left-radius: 16px;
}

.scanner-corner.top-right {
    top: -2px;
    right: -2px;
    border-left: none;
    border-bottom: none;
    border-top-right-radius: 16px;
}

.scanner-corner.bottom-left {
    bottom: -2px;
    left: -2px;
    border-right: none;
    border-top: none;
    border-bottom-left-radius: 16px;
}

.scanner-corner.bottom-right {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
    border-bottom-right-radius: 16px;
}

.scanner-scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent-color);
    box-shadow: 0 0 10px 2px var(--accent-color);
    animation: scanline 2.5s infinite linear;
}

@keyframes scanline {
    0% { top: 0; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
}

.scanner-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-top: auto;
    padding-bottom: 20px;
}

.scanner-action-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--white-color);
    font-size: 20px;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.scanner-action-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
}

.scanner-action-btn.primary {
    width: 72px;
    height: 72px;
    background: var(--white-color);
    color: var(--primary-color);
    font-size: 28px;
    border: 4px solid rgba(255, 255, 255, 0.5);
    background-clip: padding-box;
}

.scanner-action-btn.primary:hover {
    background: var(--secondary-color);
    transform: scale(1.05);
}
"""

with open("css/custom.css", "r", encoding="utf-8") as f:
    content = f.read()

# Replace everything from "/***   Floating bottom navigation ***/" to the end of file
new_content = re.sub(r"/\*\*\*   Floating bottom navigation \*\*\*/.*", new_css, content, flags=re.DOTALL)

with open("css/custom.css", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated css/custom.css")

