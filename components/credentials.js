

export default class Credentials {

    constructor(){
        this._server="http://localhost:8081/ajitkri/apiprovider/";
    }

    get server(){

        return this._server;
    }

    set server(server){
        this._server = server;
    }

}

