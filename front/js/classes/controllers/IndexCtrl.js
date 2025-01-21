export class IndexCtrl {
    constructor() {
        this.initCommon();
    }

    initCommon() {
        this.bindCommonEvents();
    }

    bindCommonEvents() {
        // mettre les events en communs
        document.addEventListener("click",(e)=>{
            if(e.target.classList.contains("coucou")){
                alert("coucou");
            }
        })
    }


}