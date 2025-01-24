import CONFIG from "../../../config.js";

export class UMovies {
    constructor() {
        this.moviesContainer = document.querySelector(".home__movies__container");
    }

    show(selector) {
        document.querySelector(selector).style.display = "inline-block";
    }

    displayMovies(movies) {
        this.moviesContainer.innerHTML = "";
        movies.forEach((movie) => {
            const card = document.createElement("div");
            card.className = "home__movies__container__card";
            card.setAttribute("data-id", movie._id);
            const cardHeader = document.createElement("div");
            cardHeader.className = "home__movies__container__card__header";
            //title
            const title = document.createElement("p");
            title.className = "home__movies__container__card__header--name";
            title.textContent = `${movie.name}`;
            //author
            const author = document.createElement("p");
            author.className = "home__movies__container__card__header--author";
            author.textContent = `${movie.author}`;
            //img
            const cardBody = document.createElement("div");
            cardBody.className = "home__movies__container__card__body";
            const img = document.createElement("img");
            img.setAttribute("src", `${CONFIG.API_HOST}/images/${movie.imgUrl}`);

            // buttons
            const cardFooter = document.createElement("div");
            cardFooter.className = "home__movies__container__card__footer";
            const btnUpdate = document.createElement("button");
            btnUpdate.className = "home__movies__container__card__footer--update btn";
            btnUpdate.textContent = "Update";
            const btnDelete = document.createElement("button");
            btnDelete.className = "home__movies__container__card__footer--delete btn";
            btnDelete.textContent = "Delete";

            cardBody.appendChild(img);
            cardHeader.appendChild(title);
            cardHeader.appendChild(author);
            cardFooter.appendChild(btnUpdate);
            cardFooter.appendChild(btnDelete);

            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);

            this.moviesContainer.appendChild(card);
        });
    }


    getCardId(btn) {
        const card = btn.closest(".home__movies__container__card");
        const cardId = card.dataset.id;
        return cardId;
    }

    getModalId(btn) {
        const modalContainer = btn.closest("#home__formulaireUpdate--formulaire");
        const cardId = modalContainer.dataset.id;
        return cardId;
    }
}