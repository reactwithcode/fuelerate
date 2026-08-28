if (!customElements.get('cpi-product')) {
  customElements.define(
    'cpi-product',
    class CpiProduct extends HTMLElement {
      connectedCallback() {
        this._sectionId = this.dataset.sectionId;
        this._currencyCode = this.querySelector(`#variant-selects-${this._sectionId}`)?.dataset.currencyCode || 'USD';
        this._variants = JSON.parse(
          this.querySelector(`#cpi-variants-${this._sectionId}`)?.textContent || '[]'
        );
        this._unsubscribe = subscribe(
          PUB_SUB_EVENTS.optionValueSelectionChange,
          this._onVariantChange.bind(this)
        );
      }

      disconnectedCallback() {
        this._unsubscribe?.();
      }

      _onVariantChange({ data: { event } }) {
        const selects = this.querySelector(`#variant-selects-${this._sectionId}`);
        if (!selects || !selects.contains(event.target)) return;

        const selectedValues = Array.from(
          selects.querySelectorAll('input:checked, select option[selected]')
        ).map((el) => el.value);

        const variant = this._variants.find(
          (v) => v.options.every((opt, i) => opt === selectedValues[i])
        );

        this._updatePrice(variant);
        this._updateFormInput(variant);
        this._updateButton(variant);
      }

      _formatMoney(cents) {
        return new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: this._currencyCode,
          minimumFractionDigits: 2,
        }).format(cents / 100);
      }

      _updatePrice(variant) {
        const row = this.querySelector(`#cpi-price-${this._sectionId}`);
        if (!row || !variant) return;

        if (variant.compare_at_price > variant.price) {
          const pct = Math.round(
            ((variant.compare_at_price - variant.price) * 100) / variant.compare_at_price
          );
          row.innerHTML = `
            <s class="cpi__price cpi__price--original">${this._formatMoney(variant.compare_at_price)}</s>
            <span class="cpi__price cpi__price--sale">${this._formatMoney(variant.price)}</span>
            <span class="cpi__discount-badge">Save ${pct}% OFF</span>
          `;
        } else {
          row.innerHTML = `<span class="cpi__price cpi__price--sale">${this._formatMoney(variant.price)}</span>`;
        }
      }

      _updateFormInput(variant) {
        const input = this.querySelector('.product-variant-id');
        if (!input || !variant) return;
        input.value = variant.id;
        input.disabled = !variant.available;
      }

      _updateButton(variant) {
        const btn = this.querySelector(`#cpi-submit-${this._sectionId}`);
        const text = btn?.querySelector('.cpi__btn-text');
        if (!btn || !text) return;

        const soldOut = !variant?.available;
        btn.disabled = soldOut;
        text.textContent = soldOut
          ? (window.theme?.strings?.soldOut || 'Sold out')
          : (this.dataset.buttonText || 'ADD TO CART');
      }
    }
  );
}

if (!customElements.get('product-info-tabs')) {
  customElements.define(
    'product-info-tabs',
    class ProductInfoTabs extends HTMLElement {
      connectedCallback() {
        this._items = Array.from(this.querySelectorAll('.cpi__tab-item'));

        this._navEl = document.createElement('div');
        this._navEl.className = 'cpi__tabs-desktop-nav';
        this._navEl.setAttribute('role', 'tablist');

        this._items.forEach((item, i) => {
          const summary = item.querySelector('.cpi__tab-summary');
          const panel = item.querySelector('.cpi__tab-panel');
          const label = summary?.childNodes[0]?.textContent.trim() || `Tab ${i + 1}`;

          const btn = document.createElement('button');
          btn.className = 'cpi__tabs-btn';
          btn.type = 'button';
          btn.setAttribute('role', 'tab');
          btn.setAttribute('aria-controls', panel?.id || '');
          btn.setAttribute('id', `cpi-deskbtn-${item.id}`);
          btn.textContent = label;
          btn.addEventListener('click', () => this._activate(i));
          this._navEl.appendChild(btn);
        });

        this.prepend(this._navEl);
        this._activate(0);
      }

      disconnectedCallback() {
        this._navEl?.remove();
      }

      _activate(activeIndex) {
        const navBtns = Array.from(this._navEl.querySelectorAll('.cpi__tabs-btn'));

        this._items.forEach((item, i) => {
          const panel = item.querySelector('.cpi__tab-panel');
          const isActive = i === activeIndex;
          panel?.classList.toggle('is-active', isActive);
          navBtns[i]?.classList.toggle('is-active', isActive);
          navBtns[i]?.setAttribute('aria-selected', String(isActive));
          item.open = isActive;
        });
      }
    }
  );
}
