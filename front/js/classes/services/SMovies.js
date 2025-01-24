import CONFIG from "../../../config.js";

export class SMovies {
    constructor() {

    }

    async getMovies() {
        try {
            const preRes = await fetch(`${CONFIG.API_HOST}/api/movie`);
            const res = await preRes.json();
            return res;
        } catch (err) {
            console.error(err);
        }
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

    async updateMovie(data, token, movieId) {
        try {
            const preRes = await fetch(`${CONFIG.API_HOST}/api/movie/${movieId}`, {
                method: "PUT",
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


    async deleteMovie(movieId, token) {
        try {
            const preRes = await fetch(`${CONFIG.API_HOST}/api/movie/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `BEARER ${token}`
                },
            });
            const res = await preRes.json();
            return res;
        } catch (err) {
            throw new Error({ msg: "Problem with deleteMovie request", err: err })
        }
    }
}