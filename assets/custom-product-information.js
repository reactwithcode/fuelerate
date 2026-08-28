if (!customElements.get('product-info-tabs')) {
  customElements.define(
    'product-info-tabs',
    class ProductInfoTabs extends HTMLElement {
      connectedCallback() {
        this._buttons = Array.from(this.querySelectorAll('.cpi__tabs-btn'));
        this._panels = Array.from(this.querySelectorAll('.cpi__tab-panel'));
        this._onClick = this._onTabClick.bind(this);
        this._buttons.forEach((btn) => btn.addEventListener('click', this._onClick));
      }

      disconnectedCallback() {
        this._buttons.forEach((btn) => btn.removeEventListener('click', this._onClick));
      }

      _onTabClick(e) {
        const btn = e.currentTarget;
        const panelId = btn.getAttribute('aria-controls');

        this._buttons.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });

        this._panels.forEach((p) => p.classList.add('is-hidden'));

        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const panel = this.querySelector(`#${panelId}`);
        if (panel) panel.classList.remove('is-hidden');
      }
    }
  );
}
