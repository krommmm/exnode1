import { IndexCtrl } from "./IndexCtrl.js";

export class HomeCtrl extends IndexCtrl {
    constructor(mMovies, uMovies, sMovies, sAuth, mAuth, modalMovie) {
        super();
        this.mMovies = mMovies;
        this.uMovies = uMovies;
        this.sMovies = sMovies;
        this.sAuth = sAuth;
        this.mAuth = mAuth;
        this.modalMovie = modalMovie;
        this.movies = [];

        this.init();
    }

    async init() {
        this.isUserAdmin();
        await this.getMovies();
        await this.displayMovies();
        this.bindEvents();
    }

    async isUserAdmin() {
        this.mAuth.isUserAdmin(this.sAuth, this.uMovies);
    }

    bindEvents() {
        document.querySelector("#home__formulaireAdd--formulaire").addEventListener("submit", this.handleFormAdd.bind(this));
        const formUpdate = document.querySelector("#home__formulaireUpdate--formulaire");
        if (formUpdate) {
            document.querySelector("#home__formulaireUpdate--formulaire").addEventListener("submit", this.handleFormUpdate.bind(this));
        }
        document.querySelector(".home__movies__container").addEventListener("click", this.handleModalMovieClick.bind(this));
    }

    async handleModalMovieClick(e) {
        e.preventDefault();
        if (e.target.classList.contains("home__movies__container__card__footer--update")) {
            const btn = e.target;
            const cardId = this.uMovies.getCardId(btn);
            this.modalMovie.createModalUpdate(cardId);
            this.bindEvents();
        } else if (e.target.classList.contains("home__movies__container__card__footer--delete")) {
            const token = await JSON.parse(sessionStorage.getItem("tokenCrudExercicesNodes"));
            const btn = e.target;
            const cardId = this.uMovies.getCardId(btn);
            const answer = await this.sMovies.deleteMovie(cardId, token);
            this.movies = this.movies.filter((movie) => movie._id !== cardId);
            this.uMovies.displayMovies(this.movies);
        }
    }

    async handleFormAdd(e) {
        e.preventDefault();
        const form = e.target;
        const data = this.mMovies.getAddMoviesFields(form);
        form.reset();
        const token = await JSON.parse(sessionStorage.getItem("tokenCrudExercicesNodes"));
        const answer = await this.sMovies.addMovie(data, token);
        this.movies.push(answer.movie);
        this.uMovies.displayMovies(this.movies);
    }

    async handleFormUpdate(e) {
        e.preventDefault();
        const form = e.target;
        const data = this.mMovies.getUpdateMoviesFields(form);
        form.reset();
        const token = await JSON.parse(sessionStorage.getItem("tokenCrudExercicesNodes"));
        const btn = e.target;
        const cardId = this.uMovies.getModalId(btn);
        const answer = await this.sMovies.updateMovie(data, token, cardId);
        const indexLastMovie = this.movies.findIndex((movie) => movie._id === answer.updatedMovie._id);
        this.movies.splice(indexLastMovie, 1, answer.updatedMovie);


        this.modalMovie.close();
        this.uMovies.displayMovies(this.movies);
    }

    async getMovies() {
        const data = await this.sMovies.getMovies();
        this.movies = data.movies;
        console.log(this.movies);
    }

    async displayMovies() {
        this.uMovies.displayMovies(this.movies);
    }
}