import BaseNotificationMessage from "./BaseNotificationMessage";

export default class WarningNotificationMessage extends BaseNotificationMessage {
  get template() {
    return `<div class="notification warning" style="--value:${[this.duration / 1000, "s"].join("")}">
              <div class="timer"></div>
              <div class="inner-wrapper">
                <div class="notification-header">warning</div>
                <div class="notification-body">${this.message}</div>
              </div>
            </div>`;
  }
}