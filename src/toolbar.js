import Popup from 'popup';

export default class Toolbar extends Popup {
  static plugins = [];

  constructor() {
    this.isAttached = false;
  }

  show(top, left) {
    let toolbar = this.getToolbar();

    toolbar.style.top = Math.max(top, 0);
    toolbar.style.left = Math.max(left, 0);

    if (this.isAttached) return;

    this.isAttached = true;
    document.body.appendChild(toolbar);
  }

  hide() {
    if (!this.isAttached) return;
    this.isAttached = false;
    document.removeChild(this.getToolbar());
  }

  getToolbar() {
    if (this.popup) return this.popup;

    let popup = document.createElement('div');
    popup.id = 'lezgiTr-toolbar' + String(Math.floor((1 + Math.random()) * 0x10000).toString(16));
    popup.className = 'lezgiTr lezgiTr_toolbar';

    Toolbar.plugins.forEach((plugin) => {
      let btn = document.createElement('span');
      btn.className = `lezgiTr__btn ${plugin.buttonClassName}`;
      btn.addEventListener('click', plugin.action);
      popup.appendChild(btn);
    });

    return this.popup = popup;
  }
}