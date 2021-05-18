Hood.instanceMethod.rerender = function (argv) {
    document.querySelector(`[hood-fd="${this.__fd}"]`).outerHTML = this.render();
};
