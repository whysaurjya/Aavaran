/**
 * PRAHARI - Features Section Interactivity
 * Handles modal previews, micro-interactions, and visual storytelling
 */
document.addEventListener('DOMContentLoaded', function () {
    // Feature Modal Elements
    const modalBackdrop = document.getElementById('feature-modal-backdrop');
    const modalDialogs = document.querySelectorAll('.feature-modal-dialog-box, .feature-modal-dialog');
    const closeButtons = document.querySelectorAll('.feature-modal-close-btn, .feature-modal-close-action');

    // Open Modal by Target ID
    function openFeatureModal(modalId) {
        const targetModal = document.getElementById(modalId);
        if (!targetModal || !modalBackdrop) return;

        // Hide all other modals first
        modalDialogs.forEach(dialog => {
            dialog.classList.remove('active');
            dialog.classList.remove('is-active');
        });

        // Activate backdrop and target dialog
        modalBackdrop.classList.add('active');
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close all modals
    function closeAllModals() {
        if (modalBackdrop) modalBackdrop.classList.remove('active');
        modalDialogs.forEach(dialog => {
            dialog.classList.remove('active');
            dialog.classList.remove('is-active');
        });
        document.body.style.overflow = '';
    }

    // Attach click triggers on feature cards / CTAs
    document.querySelectorAll('[data-feature-modal]').forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-feature-modal');
            openFeatureModal(modalId);
        });
    });

    // Close on backdrop click
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeAllModals);
    }

    // Close on close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            closeAllModals();
        });
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
});
