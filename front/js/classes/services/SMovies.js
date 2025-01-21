import CONFIG from "../../../config.js";

export class SMovies {
    constructor() {

    }

    async addMovie(data, token) {
        try {
            const preRes = await fetch(`${CONFIG.API_HOST}/api/movie`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: data,
            });
            
            const res = await preRes.json();
            return res;
        } catch (err) {
            console.error("Erreur dans addMovie:", err.message);
            throw err;
        }
    }
}