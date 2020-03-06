export default class NotificationMessage {
  constructor({
    duration = 3000,
    type = "error",
    message = "Something went wrong"
  } = {}) {
    this.listeners = [];
    this.$component = document.createElement("div");
    this.$component.innerHTML = `<div class="notification ${type}" style="--value:${[duration / 1000, "s"].join("")}">
                                    <div class="timer"></div>
                                    <div class="inner-wrapper">
                                    <div class="notification-header">${type}</div>
                                    <div class="notification-body">${message}</div>
                                    </div>
                                </div>`;
        
    this.timeout = setTimeout(() => {
      if (this.$component) {
        this.dispatch();
      }
    }, duration);
  }

  get $element() {
    return this.$component;
  }

  addListener(handler, context) {
    this.listeners.push({handler, context});
  }

  dispatch() {
    for (let {handler, context} of this.listeners) {
      handler.call(context, this);
    }
  }

  remove() {
    clearTimeout(this.timeout);
    this.destroy();
  }

  destroy() {
    this.$component.remove();
    this.$component = null;
    this.listeners = null;
  }
}