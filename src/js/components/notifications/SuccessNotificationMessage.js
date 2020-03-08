import BaseNotificationMessage from "./BaseNotificationMessage";

export default class SuccessNotificationMessage extends BaseNotificationMessage {
  get template() {
    return `<div class="notification success" style="--value:${[this.duration / 1000, "s"].join("")}">
              <div class="timer"></div>
              <div class="inner-wrapper">
                <div class="notification-header">success</div>
                <div class="notification-body">${this.message}</div>
              </div>
            </div>`;
  }
}