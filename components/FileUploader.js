
export class FileUploader {
    _fileName;
    _fileData;
    _hostServer;

    constructor() {
        // something here
    }

    get fileName() {
        return this._fileName;
    }

    set fileName(value) {
        this._fileName = value;
    }

   

    get fileData() {
        return this._fileData;
    }

    set fileData(value) {
        this._fileData = value;
    }

    get hostServer() {
        return this._hostServer;
    }

    set hostServer(value) {
        this._hostServer = value;
    }

    async upload(){
        let config ={
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: this.fileData
        };
        return await fetch('http://192.168.43.180:99/gamezone/apiprovider/?context=uploader&action=upload&filename='+this.fileName, config);
    }

}