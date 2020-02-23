class Notification {
    constructor(data = {
        serial: 1,
        delay: 3000,
        status: "error",
        message: "Something went wrong"
    }) {
        this.listeners = [];
        this.$element = document.createElement("div");
        this.$element.innerHTML = `<div class="notification ${data.status}" style="--value:${[data.delay / 1000, "s"].join("")}">
                                        <div class="timer"></div>
                                        <div class="inner-wrapper">
                                        <div class="notification-header">${data.status}</div>
                                        <div class="notification-body">${[data.serial, data.message].join(" ")}</div>
                                        </div>
                                    </div>`;
        
        this.timeout = setTimeout(() => {
            if(this.$element) {
                this.dispatch();
            }
        }, data.delay - 10);
    }

    get $elem() {
        return this.$element;
    }

    addListener(handler, context) {
        this.listeners.push({handler, context});
    }

    dispatch() {
        for(let {context, handler} of this.listeners) {
            handler.call(context, this);
        }
    }

    remove() {
        clearTimeout(this.timeout);
        
        this.$element.style.display = "none";
        this.destroy();
    }

    destroy() {
        this.$element.remove();
        this.$element = null;
        this.listeners = null;
    }
}