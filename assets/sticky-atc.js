(function () {
  const sticky = document.getElementById('StickyATC');
  const stickyBtn = document.getElementById('StickyATCButton');
  if (!sticky || !stickyBtn) return;

  // MAIN product form (matches your HTML)
  const productFormEl =
    document.querySelector('product-form[data-section-id*="__main"]') ||
    document.querySelector('product-form.product-form');

  if (!productFormEl) return;

  const mainAtcBtn =
    productFormEl.querySelector('button[name="add"].product-form__submit') ||
    productFormEl.querySelector('button[name="add"]');

  if (!mainAtcBtn) return;

  // Try to find footer (common Shopify/Golden selectors)
  const footerEl =
    document.querySelector('footer') ||
    document.getElementById('shopify-section-footer') ||
    document.querySelector('[id*="shopify-section-"][id*="footer"]');

  // Keep sticky button text + disabled state in sync with the main button
  const syncState = () => {
    const label = (mainAtcBtn.innerText || '').replace(/\s+/g, ' ').trim();
    stickyBtn.textContent = label || 'Add to cart';
    stickyBtn.disabled = mainAtcBtn.hasAttribute('disabled') || mainAtcBtn.disabled;
    stickyBtn.setAttribute('aria-disabled', stickyBtn.disabled ? 'true' : 'false');
  };

  syncState();

  const mo = new MutationObserver(syncState);
  mo.observe(mainAtcBtn, { attributes: true, childList: true, subtree: true });

  // Default: hidden until footer is visible
  sticky.hidden = true;

  if (footerEl && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        // Show ONLY when footer is visible
        sticky.hidden = !entries[0].isIntersecting;
      },
      { root: null, threshold: 0.01 }
    );

    io.observe(footerEl);
  } else {
    // Fallback: show only when extremely near bottom (in case footer selector fails)
    const SHOW_WITHIN_PX_OF_BOTTOM = 20;

    const isNearBottom = () => {
      const doc = document.documentElement;
      const scrollTop = window.pageYOffset || doc.scrollTop || 0;
      const viewportH = window.innerHeight || doc.clientHeight || 0;
      const fullH = Math.max(doc.scrollHeight, document.body.scrollHeight);
      return scrollTop + viewportH >= fullH - SHOW_WITHIN_PX_OF_BOTTOM;
    };

    const update = () => { sticky.hidden = !isNearBottom(); };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  stickyBtn.addEventListener('click', function () {
    syncState();

    if (stickyBtn.disabled) {
      productFormEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    mainAtcBtn.click();
  });
})();