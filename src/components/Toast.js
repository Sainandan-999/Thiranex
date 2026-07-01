/* Toast.js */

export class Toast {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    this.container = container;

    // Listen for custom events
    this.toastHandler = (e) => {
      const { message, type } = e.detail;
      this.show(message, type);
    };

    window.addEventListener('chronos-toast', this.toastHandler);
  }

  show(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Choose icon
    let icon = 'ℹ️';
    if (type === 'success') icon = '✨';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <span>${icon}</span>
      <div>${message}</div>
    `;

    this.container.appendChild(toast);

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      toast.style.animation = 'slide-in-toast 0.3s ease-in reverse forwards';
      toast.style.opacity = '0';
      
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

  destroy() {
    window.removeEventListener('chronos-toast', this.toastHandler);
  }
}
export default Toast;
