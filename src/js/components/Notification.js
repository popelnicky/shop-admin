class Notification {
    constructor(data = {
        status: "error",
        message: "Something went wrong"
    }) {
        this.$element = document.createElement("div");
        this.$element.innerHTML = `<div class="notification ${data.status}" style="--value:3s">
                                        <div class="timer"></div>
                                        <div class="inner-wrapper">
                                        <div class="notification-header">${data.status}</div>
                                        <div class="notification-body">${data.message}</div>
                                        </div>
                                    </div>`;
        
        setTimeout(() => {
            if(this.$element) {
                this.remove();
            }
        }, 2900);

        return this.$element;
    }

    remove() {
        this.$element.style.display = "none";
        this.destroy();
    }

    destroy() {
        this.$element.remove();
        this.$element = null;
    }
}