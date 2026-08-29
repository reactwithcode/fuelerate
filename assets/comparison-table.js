if (!customElements.get('comparison-table')) {
  customElements.define('comparison-table', class ComparisonTable extends HTMLElement {
    connectedCallback() {
      this.activeIndex = 0;
      this.tracks = Array.from(this.querySelectorAll('.ct__col-track'));
      this.dots = Array.from(this.querySelectorAll('.ct__dot'));
      this.firstViewport = this.querySelector('.ct__col-viewport');
      this.ctaBtn = this.querySelector('.ct__btn[data-variant-id]');

      this.dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
          this.goTo(parseInt(e.currentTarget.dataset.index, 10));
        });
      });

      // Swipe support
      let startX = 0;
      this.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      this.addEventListener('touchend', (e) => {
        const delta = startX - e.changedTouches[0].clientX;
        if (Math.abs(delta) < 40) return;
        const next = delta > 0
          ? Math.min(this.activeIndex + 1, this.dots.length - 1)
          : Math.max(this.activeIndex - 1, 0);
        this.goTo(next);
      });

      // Recalculate offset on resize (viewport width may change)
      if (this.firstViewport && window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => this.updateOffset());
        this.resizeObserver.observe(this.firstViewport);
      }

      if (this.ctaBtn) {
        this._cartClick = this.handleCartClick.bind(this);
        this.ctaBtn.addEventListener('click', this._cartClick);
      }
    }

    goTo(index) {
      this.activeIndex = index;
      this.updateOffset();
      this.dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    }

    updateOffset() {
      if (!this.firstViewport) return;
      // Only apply transforms when the viewport is a real box (mobile).
      // On desktop, display: contents makes offsetWidth === 0.
      if (getComputedStyle(this.firstViewport).display === 'contents') return;
      const w = this.firstViewport.offsetWidth;
      this.tracks.forEach((track) => {
        track.style.transform = `translateX(${-(this.activeIndex * w)}px)`;
      });
    }

    async handleCartClick() {
      const variantId = parseInt(this.ctaBtn.dataset.variantId);
      if (!variantId) return;

      this.ctaBtn.disabled = true;

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
        });

        if (!response.ok) throw new Error('Cart error');

        const cartData = await response.json();
        publish(PUB_SUB_EVENTS.cartUpdate, { source: 'product-form', cartData });

      } catch {
        this.showCartError();
      } finally {
        this.ctaBtn.disabled = false;
      }
    }

    showCartError() {
      let error = this.querySelector('.ct__cart-error');
      if (!error) {
        error = document.createElement('p');
        error.className = 'ct__cart-error';
        error.textContent = 'Something went wrong, please try again.';
        this.ctaBtn.insertAdjacentElement('afterend', error);
      }
      error.hidden = false;
      setTimeout(() => { error.hidden = true; }, 4000);
    }

    disconnectedCallback() {
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.ctaBtn && this._cartClick) {
        this.ctaBtn.removeEventListener('click', this._cartClick);
      }
    }
  });
}
