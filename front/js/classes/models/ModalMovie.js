import { Modal } from "./Modal.js";

export class ModalMovie extends Modal {
    constructor(selector, domManipulator) {
        super(selector, domManipulator);
    }

    createModalUpdate(cardId){
        this.element.innerHTML = `
        <h2>Modifier le film</h2>
           <form id="home__formulaireUpdate--formulaire" action="#" enctype='multipart/form-data' data-id=${cardId}>
                <div>
                    <label for="home__formulaireUpdate--name">Name:</label>
                    <input type="text" name="name" id="home__formulaireUpdate--name" placeholder="Name" />
                </div>
                <div>
                    <label for="home__formulaireUpdate--author">Author:</label>
                    <input type="text" name="author" id="home__formulaireUpdate--author" placeholder="Author" />
                </div>
                <div>
                    <label for="home__formulaireUpdate--img">Img:</label>
                    <input type="file" name="img" id="home__formulaireUpdate--img" />
                </div>
                <button type="submit">Submit</button>
            </form>
        `;
    }

    close(){
        this.element.innerHTML = "";
    }


    // update() {
    //     const text = this.domManipulator.updateText(this.element);
    //     return text;
    // }

    // delete() { }

    // createModalUpdate(){
    //     this.domManipulator.createModal(this.element);
    // }
}