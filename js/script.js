// Custom JavaScript for Enactus UNBF website

// Update the footer year automatically
document.addEventListener('DOMContentLoaded', function () {
  // Automatically update the year in the footer to stay current
  const yearSpan = document.querySelector('footer p');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace(/\d{4}/, currentYear);
  }

  /*
   * Mobile navigation toggle
   * When the nav toggle button is clicked, expand or collapse the mobile menu.
   * Also update the aria-expanded attribute for accessibility.
   */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      navMenu.classList.toggle('open');
    });
  }

  /*
   * Modal logic
   * Open modals when trigger buttons are clicked, trap focus inside the modal,
   * and close modals on overlay click, ESC key, or close button.
   */
  const openButtons = document.querySelectorAll('[data-modal-target]');
  const closeButtons = document.querySelectorAll('[data-close]');

  // Function to open a modal
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('show');
    // Save the element that opened the modal to return focus later
    const triggerId = modal.getAttribute('id');
    const triggerButton = document.querySelector(`[data-modal-target="${triggerId}"]`);
    if (triggerButton) {
      modal.dataset.triggerButton = triggerButton.id || '';
    }
    // Set focus to the first focusable element inside the modal for accessibility
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusable = modal.querySelector(focusableSelectors);
    if (firstFocusable) {
      firstFocusable.focus();
    }
    // Listen for overlay click and ESC key to close
    modal.addEventListener('click', overlayHandler);
    document.addEventListener('keydown', escHandler);
  }

  // Function to close a modal
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('show');
    // Remove listeners
    modal.removeEventListener('click', overlayHandler);
    document.removeEventListener('keydown', escHandler);
    // Return focus to the element that triggered the modal
    const triggerId = modal.getAttribute('id');
    const triggerButton = document.querySelector(`[data-modal-target="${triggerId}"]`);
    if (triggerButton) {
      triggerButton.focus();
    }
  }

  // Event handler to close when clicking on the modal overlay (outside the content)
  function overlayHandler(event) {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target);
    }
  }
  // Event handler to close on ESC key
  function escHandler(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      const openModalElement = document.querySelector('.modal.show');
      if (openModalElement) {
        closeModal(openModalElement);
      }
    }
  }

  // Attach click handlers to open buttons
  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      openModal(modal);
    });
  });
  // Attach click handlers to close buttons
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });
});