if (!customElements.get('benefit-showcase')) {
  customElements.define('benefit-showcase', class BenefitShowcase extends HTMLElement {
    connectedCallback() {
      this._handlers = []
      this.pills = Array.from(this.querySelectorAll('.ibs__pill'))
      this.panels = Array.from(this.querySelectorAll('.ibs__panel-content'))
      this.mobileCards = Array.from(this.querySelectorAll('.ibs__mobile-card'))
      this.prevArrow = this.querySelector('.ibs__arrow--prev')
      this.nextArrow = this.querySelector('.ibs__arrow--next')
      this.currentIndex = 0

      this.pills.forEach((pill, i) => {
        const handler = () => this.activate(i)
        pill.addEventListener('click', handler)
        this._handlers.push({ el: pill, type: 'click', fn: handler })
      })

      if (this.prevArrow) {
        const handler = () => this.activate((this.currentIndex - 1 + this.pills.length) % this.pills.length)
        this.prevArrow.addEventListener('click', handler)
        this._handlers.push({ el: this.prevArrow, type: 'click', fn: handler })
      }

      if (this.nextArrow) {
        const handler = () => this.activate((this.currentIndex + 1) % this.pills.length)
        this.nextArrow.addEventListener('click', handler)
        this._handlers.push({ el: this.nextArrow, type: 'click', fn: handler })
      }
    }

    activate(index) {
      const prev = this.currentIndex
      this.currentIndex = index

      this.pills[prev]?.classList.remove('ibs__pill--active')
      this.panels[prev]?.classList.remove('ibs__panel-content--active')
      this.mobileCards[prev]?.classList.remove('ibs__mobile-card--active')
      this.querySelector(`.ibs__image[data-index="${prev}"]`)?.classList.remove('ibs__image--active')

      this.pills[index]?.classList.add('ibs__pill--active')
      this.panels[index]?.classList.add('ibs__panel-content--active')
      this.mobileCards[index]?.classList.add('ibs__mobile-card--active')
      this.querySelector(`.ibs__image[data-index="${index}"]`)?.classList.add('ibs__image--active')

      this.pills.forEach((pill, i) => {
        pill.setAttribute('aria-selected', i === index ? 'true' : 'false')
      })
    }

    disconnectedCallback() {
      this._handlers?.forEach(({ el, type, fn }) => el.removeEventListener(type, fn))
    }
  })
}
