class Notification {
    constructor(data = {
        serial: 1,
        delay: 3000,
        status: "error",
        message: "Something went wrong"
    }) {
        this.listeners = [];
        this.component = document.createElement("div");
        this.component.innerHTML = `<div class="notification ${data.status}" style="--value:${[data.delay / 1000, "s"].join("")}">
                                        <div class="timer"></div>
                                        <div class="inner-wrapper">
                                        <div class="notification-header">${data.status}</div>
                                        <div class="notification-body">${[data.serial, data.message].join(" ")}</div>
                                        </div>
                                    </div>`;
        
        this.timeout = setTimeout(() => {
            if(this.component) {
                this.dispatch();
            }
        }, data.delay - 10);
    }

    get $element() {
        return this.component;
    }

    addListener(handler, context) {
        this.listeners.push({handler, context});
    }

    dispatch() {
        for(let {handler, context} of this.listeners) {
            handler.call(context, this);
        }
    }

    remove() {
        clearTimeout(this.timeout);
        this.destroy();
    }

    destroy() {
        this.component.style.display = "none";
        this.component.remove();
        this.component = null;
        this.listeners = null;
    }
}