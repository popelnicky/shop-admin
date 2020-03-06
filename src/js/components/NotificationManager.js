import NotificationMessage from "./NotificationMessage";

export default class NotificationManager {
  constructor(container = document.body, stackLength = 3) {
    this.container = container;
    this.stack = [];
    this.stackLength = stackLength;
  }

  show(data) {
    const notification = new NotificationMessage(data);

    notification.addListener(this.removeFromStack, this);
    this.addToStack(notification);
    this.container.append(notification.$element);
  }

  addToStack(notification) {
    if (this.stack.length === this.stackLength) {
      const first = this.stack.shift();

      first.remove();
    }
        
    this.stack.push(notification);
  }

  removeFromStack(notification) {
    const old = this.stack;

    this.stack = [];

    for (let item of old) {
      if (item !== notification) {
        this.stack.push(item);
      } else {
        item.remove();
      }
    }
  }
}