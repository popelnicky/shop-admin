class NotificationManager {
    constructor(container = document.body) {
        this.container = container;
        this.stack = [];
        this.total = 0;
    }

    show(data) {
        data.serial = ++this.total;
        const notification = new Notification(data);

        notification.addListener(this.removeFromStack, this);
        
        this.addToStack(notification);
        
        this.container.append(notification.$elem);
    }

    addToStack(notification) {
        if(this.stack.length === 5) {
            const first = this.stack.shift();

            first.remove();
        }
        
        this.stack.push(notification);
    }

    removeFromStack(notification) {
        const old = this.stack;

        this.stack = [];

        for(let item of old) {
            if(item !== notification) {
                this.stack.push(item);
            } else {
                item.remove();
            }
        }
    }
}