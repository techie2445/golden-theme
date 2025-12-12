class ComparisonSlider extends HTMLElement {
  constructor() {
    super();
    this.sliderOverlay = this.querySelector('.comparison-slider__overlay');
    this.sliderLine = this.querySelector('.comparison-slider__line');
    this.sliderInput = this.querySelector('.comparison-slider__input');
    
    // Bind the event listener
    this.sliderInput.addEventListener('input', this.handleChange.bind(this));
  }

  handleChange(e) {
    const value = e.currentTarget.value;
    // Update the width of the before-image container
    this.sliderOverlay.style.width = `${value}%`;
    this.sliderOverlay.style.setProperty('--percent', value);
    
    // Update the position of the slider handle/line
    this.sliderLine.style.left = `${value}%`;
    
    // Fix image squishing by counter-scaling the image inside the clipping container
    const img = this.sliderOverlay.querySelector('img');
    if (img) {
        img.style.width = `calc(100% * (100 / ${value}))`;
    }
  }
}

customElements.define('comparison-slider', ComparisonSlider);