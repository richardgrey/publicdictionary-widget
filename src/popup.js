export default class Popup {

  constructor() {
    this.isAttached = false;
  }

  show() {
    if (this.isAttached) return;

    let p = this.popup;
    // Set to display property defined in styles
    p.style.display = 'block';
    document.body.appendChild(p);
    this.isAttached = true;
  }

  hide() {
    if (!this.isAttached) return;

    let p = this.popup;
    p.style.display = 'none';
    document.body.removeChild(p);
    this.isAttached = false;
  }

  setPositionTo(el, align = 'top center') {
    if (!el || !el.getBoundingClientRect) {
      console.error('To set position of popup you need to provide node element');
      return;
    }

    if (!this.isVisible()) {
      this.getInvisiblePosition();
      this.show();
    }

    let elRect = el.getBoundingClientRect();
    let pRect = this.popup.getBoundingClientRect();
    let winRect = {
      top: window.scrollY || window.pageYOffset,
      left: window.scrollX || window.pageXOffset,
      height: window.innerHeight,
      width: window.innerWidth
    };
    winRect.bottom = winRect.top + winRect.height;
    winRect.right = winRect.left + winRect.width;

    let alignments = align.split(' ');
    let left = 0;
    let top = 0;

    // Vertical alignment
    switch (alignments[0]) {
      case 'center':
        top = winRect.top + elRect.top - ((elRect.height - pRect.height) / 2);
        break;
      case 'bottom':
        top = winRect.top + elRect.top + elRect.height;
        if (top + pRect.height > winRect.bottom) {
          top = winRect.top + elRect.top - pRect.height;
        }
        break;
      default:
        // Position 'top' is default
        top = winRect.top + elRect.top - pRect.height;
        if (top < winRect.top) {
          top = winRect.top + elRect.top + elRect.height;
        }
    }

    // Horizontal alignment
    switch (alignments[1]) {
      case 'left':
        left =  winRect.left + elRect.left - pRect.width;
        if (left < winRect.left) {
          left = winRect.left + elRect.left + elRect.width;
        }
        break;
      case 'right':
        left = winRect.left + elRect.left + elRect.width;
        if (left + pRect.width > winRect.right) {
          left = winRect.left + elRect.left - pRect.width;
        }
        break;
      default:
        // Position 'center' is default
        left = winRect.left + elRect.left + ((elRect.width - pRect.width) / 2);
    }

    // Do not allow to show popup outside of the visible screen
    top = Math.min(Math.max(top, winRect.top), winRect.bottom - pRect.height);
    left = Math.min(Math.max(left, winRect.left), winRect.right - pRect.width);

    this.setPositionXY(top, left);
  }

  getInvisiblePosition() {
    this.setPositionXY(0, -10000);
  }

  setPositionXY(top, left) {
    let p = this.popup;
    p.style.top = top+ 'px';
    p.style.left = left + 'px';
  }

  isVisible() {
    let p = this.popup;
    return !!(p.offsetWidth || p.offsetHeight || p.getClientRects().length);
  }

}