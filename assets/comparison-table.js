if (!customElements.get('comparison-table')) {
  customElements.define('comparison-table', class ComparisonTable extends HTMLElement {
    connectedCallback() {
      this.activeIndex = 0;
      this.tracks = Array.from(this.querySelectorAll('.ct__col-track'));
      this.dots = Array.from(this.querySelectorAll('.ct__dot'));
      this.firstViewport = this.querySelector('.ct__col-viewport');

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

    disconnectedCallback() {
      if (this.resizeObserver) this.resizeObserver.disconnect();
    }
  });
}
