import { IndexCtrl } from "./IndexCtrl.js";


export class AuthCtrl extends IndexCtrl{
    constructor(mAuth, sAuth) {
        super();
        this.mAuth = mAuth;
        this.sAuth = sAuth;
        this.init();
    }

    init() {
        this.bindEvents(); 
    }

    bindEvents() {
        document.querySelector("#auth__signUp--form").addEventListener("submit", this.handleFormSignUp.bind(this));
        document.querySelector("#auth__logIn--form").addEventListener("submit", this.handleFormLogIn.bind(this));
    }



    async handleFormSignUp(e) {
        e.preventDefault();
        const form = e.target;
        const signUpFields = this.mAuth.getSignUpFields(form);
        const res = await this.sAuth.signUp(signUpFields);
        console.log(res);
    }

    async handleFormLogIn(e) {
        e.preventDefault();
        const form = e.target;
        const logInFields = this.mAuth.getLoginFields(form);
        const res = await this.sAuth.logIn(logInFields);
        console.log(res);
        sessionStorage.setItem("tokenCrudExercicesNodes",JSON.stringify(res.token));
    }

}