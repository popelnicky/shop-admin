export default class BaseNotificationMessage {
  constructor(message, delay = -1) {
    this.message = message;
    this.delay = delay;
    this.$component = document.createElement("div");
  }

  
}