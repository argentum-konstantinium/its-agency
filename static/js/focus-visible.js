function FocusVisible(attribute, attributeValue, callback) {
    this.attribute = attribute;
    this.attributeValue = attributeValue;
    var _self = this;
    this.checkKey = function (event) {
        if (
            event.key === "Tab" ||
            event.key === "ArrowDown" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight"
        ) {
            return true;
        };
    };
    this.focus = function () {
        var target = document.querySelector(":focus");
        if (target) target.setAttribute(_self.attribute, _self.attributeValue || '');
    };
    this.focusVisible = function (event) {
        if (_self.checkKey(event)) {
            _self.unFocus();
            setTimeout(_self.focus);
        };
    };
    this.unFocus = function () {
        let prevTarget = document.querySelector('[' + _self.attribute + ']');
        if (prevTarget) prevTarget.removeAttribute(_self.attribute);
    };
    this.focusVisibleInit = function (callback) {
        document.addEventListener("keydown", this.focusVisible);
        document.addEventListener("click", this.unFocus);
        if (callback) callback();
    };
    this.focusVisibleDestroy = function (callback) {
        document.removeEventListener('keydown', this.focusVisibleInit);
        document.removeEventListener('click', this.unFocus);
        if (callback) callback();
    };
    this.focusVisibleInit(callback);
    return this;
};

 