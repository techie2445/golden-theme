if (!customElements.get('quantity-breaks')) {
  class QuantityBreaks extends HTMLElement {
    constructor() {
      super();
      this.inputs = this.querySelectorAll('input[name="quantity-break-selection"]');
      this.mainInput = this.querySelector('input[name="quantity"]');
      this.productForm = document.getElementById(this.dataset.formId);

      this.inputs.forEach(input => {
        input.addEventListener('change', this.handleChange.bind(this));
      });
    }

    handleChange(event) {
      const selectedQty = event.target.value;
      if (this.mainInput) {
        this.mainInput.value = selectedQty;
      }
      
      // Update styling states
      this.querySelectorAll('.quantity-break-item').forEach(label => {
         label.classList.remove('is-selected');
      });
      event.target.nextElementSibling.classList.add('is-selected');
    }
  }
  customElements.define('quantity-breaks', QuantityBreaks);
}