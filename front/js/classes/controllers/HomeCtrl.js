import { IndexCtrl } from "./IndexCtrl.js";

export class HomeCtrl extends IndexCtrl {
    constructor(mMovies, uMovies, sMovies, sAuth, mAuth) {
        super();
        this.mMovies = mMovies;
        this.uMovies = uMovies;
        this.sMovies = sMovies;
        this.sAuth = sAuth;
        this.mAuth = mAuth;

        this.init();
    }

    init() {
        this.isUserAdmin();
        this.bindEvents();
    }

    async isUserAdmin() { 
        this.mAuth.isUserAdmin(this.sAuth, this.uMovies);
    }

    bindEvents() {
        document.querySelector("#home__formulaireAdd--formulaire").addEventListener("submit", this.handleFormAdd.bind(this));
    }

    async handleFormAdd(e) {
        e.preventDefault();
        const form = e.target;
        const data = this.mMovies.getAddMoviesFields(form);
        form.reset();
        const token = await JSON.parse(sessionStorage.getItem("tokenCrudExercicesNodes"));
        await this.sMovies.addMovie(data, token);   
    }
}