export class DomManipulator {

    getElement(selector) {
        return document.querySelector(selector);
    }

    show(element) {
        element.style.display = "flex";
    }

    hide(element) {
        element.style.display = "none";
    }

    // updateText(element) {
    //     const text = element.querySelector("input[type='text']");
    //     return text.value;
    // }

    // createModalUpdate(element) {
    //     console.log(element);
    // }

}