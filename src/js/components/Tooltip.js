export default class Tooltip {
  constructor() {
    this.show = event => {
      const $target = event.target.closest("[data-tooltip]");

      if ($target) {
        this.$target = $target;
        this.$target.parentElement.classList.toggle("has-hovered");
        this.$target.classList.toggle("is-hovered");

        this.showTooltip($target.dataset.tooltip);
        
        document.addEventListener("pointermove", this.move);
      }
    };
  
    this.hide = event => {
      const $target = event.target.closest('[data-tooltip]');

      if ($target && this.$target === $target) {
        this.hideTooltip();

        this.$target.parentElement.classList.toggle("has-hovered");
        this.$target.classList.toggle("is-hovered");
        this.$target = null;
      
        document.removeEventListener("pointermove", this.move);
      }
    };
  
    this.move = event => {
      this.moveTooltip(event);
    };

    this.$element = null;

    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("pointerover", this.show);
    document.addEventListener("pointerout", this.hide);
  }

  removeEventListeners() {
    document.removeEventListener("pointerover", this.show);
    document.removeEventListener("pointerout", this.hide);
  }

  showTooltip(html) {
    this.$element = document.createElement("div");
    this.$element.classList.add("tooltip");
    this.$element.innerHTML = html;

    document.body.append(this.$element);
  }

  hideTooltip() {
    this.$element.remove();
  }

  moveTooltip(event) {
    const elemRightX = event.clientX + this.$element.clientWidth + 10;
    const elemBottomY = event.clientY + this.$element.clientHeight + 10;
    const left = elemRightX < document.body.clientWidth ? event.clientX + 10 : event.clientX - this.$element.clientWidth - 10;
    const top = elemBottomY < document.body.clientHeight ? event.clientY + 10 : event.clientY - this.$element.clientHeight - 10;

    this.$element.style.left = left + 'px';
    this.$element.style.top = top + 'px';
  }

  destroy() {
    this.removeEventListeners();

    this.$target = null;
    this.$element = null;
  }
}
