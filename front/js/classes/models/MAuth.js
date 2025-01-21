export class MAuth {
    constructor() {
    }


    getSignUpFields(form) {
        const formData = new FormData(form);
        return {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }
    }

    getLoginFields(form) {
        const formData = new FormData(form);
        return {
            email: formData.get("email"),
            password: formData.get("password")
        }
    }

    async isUserAdmin(sAuth, uMovies) {
        const token = JSON.parse(sessionStorage.getItem("tokenCrudExercicesNodes"));
        if (token) {
            const isAdmin = await sAuth.isUserAdmin(token);
            console.log(isAdmin);
            uMovies.show(".home__formulaireAdd");

        }
    }
}