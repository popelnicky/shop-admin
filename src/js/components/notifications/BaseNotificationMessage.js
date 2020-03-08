export default class BaseNotificationMessage {
  constructor({
    message = "Something was done",
    duration = 2000,
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.$component = document.createElement("div");
    this.$component.innerHTML = this.template;
  }

  show($parent = document.body) {
    $parent.append(this.$component);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.destroy();
  }

  destroy() {
    if (this.$component) {
      this.$component.remove();
    }
    
    this.$component = null;
  }
}