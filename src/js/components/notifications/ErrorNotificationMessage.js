import BaseNotificationMessage from "./BaseNotificationMessage";

export default class ErrorNotificationMessage extends BaseNotificationMessage {
  constructor(data) {
    super(data);

    this.initEventListeners();
  }
    
  get template() {
    return `<div class="notification error">
              <div class="inner-wrapper">
                <div class="notification-header">Error: <span class="close">&times;</span></div>
                <div class="notification-body">
                    ${this.message}
                </div>
              </div>
            </div>`;
  }

  initEventListeners() {
    const closeBtn = this.$element.querySelector(".close");

    closeBtn.addEventListener("onpointerdown", () => {
      this.remove();
    });
  }

  show($parent = document.body) {
    $parent.append(this.$element);
  }
}