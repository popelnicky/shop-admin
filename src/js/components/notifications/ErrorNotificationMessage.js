import BaseNotificationMessage from "./BaseNotificationMessage";

export default class SuccessNotificationMessage extends BaseNotificationMessage {
  constructor(message) {
    super(message);

    this.closeBtn = null;
  }

  getTemplate() {
    return `<div class="notification error">
                <div class="inner-wrapper">
                <div class="notification-header">Error: <span class="close">&times;</span></div>
                <div class="notification-body">
                    ${this.message}
                </div>
                </div>
            </div>`;
  }

  addEventListener() {
    this.closeBtn = this.$component.querySelector(".close");
    this.closeBtn.addEventListener("click", () => {
      this.remove();
    });
  }

  remove() {
    this.closeBtn = null;
      super.remove();
  }
}