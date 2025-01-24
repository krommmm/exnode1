import CONFIG from "../../../config.js";

export class SAuth {

    constructor() {

    }

    async signUp(data) {
        try {
            const preRes = await fetch(`${CONFIG.API_HOST}/api/auth/signUP`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, body: JSON.stringify(data)
            });
            const res = await preRes.json();
            return res;
        } catch (err) {
            throw new Error({ msg: "Problem with signUP request", err: err })
        }
    }

    async logIn(data) {
        try {
            const preRes = await fetch(`${CONFIG.API_HOST}/api/auth/logIn`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, body: JSON.stringify(data)
            });
            const res = await preRes.json();
            return res;
        } catch (err) {
            throw new Error({ msg: "Problem with logIn request", err: err })
        }
    }

    async isUserAdmin(token) {
        try {
            const preRes = await fetch(`${CONFIG.API_HOST}/api/auth/isUserAdmin`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `BEARER ${token}`
                },
            });
            const res = await preRes.json();
            return res;
        } catch (err) {
            throw new Error({ msg: "Problem with logIn request", err: err })
        }
    }





}