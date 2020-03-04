import BaseNotificationMessage from "./BaseNotificationMessage";

export default class SuccessNotificationMessage extends BaseNotificationMessage {
  constructor(message, delay = 2000) {
    super(message, delay);
  }

  getTemplate() {
    return `<div class="notification success" style="--value:${[this.delay / 1000, "s"].join("")}">
                <div class="timer"></div>
                <div class="inner-wrapper">
                <div class="notification-header">Success</div>
                <div class="notification-body">${this.message}</div>
                </div>
            </div>`;
  }
}