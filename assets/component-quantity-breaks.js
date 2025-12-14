if (!customElements.get('quantity-breaks')) {
  class QuantityBreaks extends HTMLElement {
    constructor() {
      super();
      // Select inputs by the shared name "quantity"
      this.inputs = this.querySelectorAll('input[name="quantity"]');

      this.inputs.forEach(input => {
        input.addEventListener('change', this.handleChange.bind(this));
      });
      
      // Initialize styling on load
      this.updateClasses();
    }

    handleChange(event) {
      this.updateClasses();
    }

    updateClasses() {
      // Remove 'is-selected' from all items
      this.querySelectorAll('.quantity-break-item').forEach(label => {
         label.classList.remove('is-selected');
      });

      // Add 'is-selected' to the label of the checked input
      const checkedInput = this.querySelector('input[name="quantity"]:checked');
      if (checkedInput) {
        const label = this.querySelector(`label[for="${checkedInput.id}"]`);
        if (label) label.classList.add('is-selected');
      }
    }
  }
  customElements.define('quantity-breaks', QuantityBreaks);
}