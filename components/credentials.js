

export default class Credentials {

    constructor(){
        this._server="http://192.168.43.180:99/gamezone/apiprovider/";
    }

    get server(){

        return this._server;
    }

    set server(server){
        this._server = server;
    }

}

