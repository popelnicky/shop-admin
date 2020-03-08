export default class BaseNotificationMessage {
  constructor({
    message = "Something was done",
    duration = 2000,
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.$element = document.createElement("div");
    this.$element.innerHTML = this.template;
  }

  show($parent = document.body) {
    $parent.append(this.$element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.destroy();
  }

  destroy() {
    if (this.$element) {
      this.$element.remove();
    }
    
    this.$element = null;
  }
}