export class Modal {
    constructor(selector, domManipulator) {
        this.element = domManipulator.getElement(selector);

        if (!this.element) {
            throw new Error(`Element not found: ${selector}`);
        }

        this.domManipulator = domManipulator;
    }

    open() {
        this.domManipulator.show(this.element);
    }

    close() {
        this.domManipulator.hide(this.element);
    }
}