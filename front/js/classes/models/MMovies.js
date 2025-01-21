export class MMovies {
    constructor() {

    }

    getAddMoviesFields(form) {
        const formData1 = new FormData(form);
        const formData2 = new FormData();
        formData2.append("name",formData1.get("name"));
        formData2.append("author",formData1.get("author"));
        formData2.append("imgUrl",form.querySelector("#home__formulaireAdd--img").files[0]);
        return formData2;
    }
}