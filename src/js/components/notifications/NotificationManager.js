import SuccessNotificationMessage from "./SuccessNotificationMessage";
import ErrorNotificationMessage from "./ErrorNotificationMessage";
import WarningNotificationMassege from "./WarningNotificationMessage";

export default class NotificationManager {
  constructor(parent = document.body, stackLength = 3) {
    this.$parent = parent;
    this.stack = [];
    this.stackLength = stackLength;
  }

  show(data) {
    const { type } = data;
    const NotificationClass = this.getNotificationClass(type);
    const message = new NotificationClass(data);

    if (type !== "error") {
      this.addMessage(message);
    }

    message.show(this.$parent);
  }

  addMessage(message) {
    if (this.stack.length >= this.stackLength) {
      const first = this.stack.shift();

      first.remove();
    }
        
    this.stack.push(message);
  }

  getNotificationClass(type) {
    switch (type) {
    case "success": return SuccessNotificationMessage;
    case "error": return ErrorNotificationMessage;
    default: return WarningNotificationMassege;
    }
  }
}