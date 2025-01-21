import { HomeCtrl } from "./classes/controllers/HomeCtrl.js";
import { AuthCtrl } from "./classes/controllers/AuthCtrl.js";
import { MAuth } from "./classes/models/MAuth.js";
import { SAuth } from "./classes/services/SAuth.js";
import { MMovies } from "./classes/models/MMovies.js";
import { UMovies } from "./classes/ui/UMovies.js";
import { SMovies } from "./classes/services/SMovies.js";

const mAuth = new MAuth();
const sAuth = new SAuth();
const mMovies = new MMovies();
const uMovies = new UMovies();
const sMovies = new SMovies();

const str = window.location.href;
const url = new URL(str);

function findPageNameFromUrl(url) {
    const pathnameArr = url.pathname.split("/");
    const lastPathnameArr = pathnameArr[pathnameArr.length - 1];
    return lastPathnameArr.replace(".html", "").split("?")[0];
}
const page = findPageNameFromUrl(url);

switch (page) {
    case "index":
        new HomeCtrl(mMovies, uMovies, sMovies, sAuth, mAuth);
        break;

    case "auth":
        new AuthCtrl(mAuth, sAuth);
        break;

    default: throw new Error("Page introuvable");
}