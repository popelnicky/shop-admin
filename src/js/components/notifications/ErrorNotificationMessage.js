export default class ErrorNotificationMessage {
  constructor({ message = "Everything is well" } = {}) {
    this.$component = document.createElement("div");
    this.$component.innerHTML = `<div class="notification error">
                                    <div class="inner-wrapper">
                                    <div class="notification-header">Error: <span class="close">&times;</span></div>
                                    <div class="notification-body">
                                        ${message}
                                    </div>
                                    </div>
                                </div>`;
  }
    
  get $element() {
    return this.$component;
  }

  addEventListener() {
    const closeBtn = this.$component.querySelector(".close");

    closeBtn.addEventListener("click", () => {
      this.remove();
    });
  }
    
  remove() {
    this.destroy();
  }
    
  destroy() {
    this.$component.remove();
    this.$component = null;
    this.listeners = null;
  }
}