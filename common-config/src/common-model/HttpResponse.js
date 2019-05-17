function HttpResponse(url, timestamp, status, statusCode, payload) {
    this.url = url;
    this.timestamp = timestamp;
    this.status = status;
    this.statusCode = statusCode;
    this.payload = payload;
}

function HttpResponseBuilder() {
    
    this.url = null;
    this.timestamp = null;
    this.status = null;
    this.statusCode = null;
    this.payload = null;

    this.url = (url) => {
        this.url = url;
        return this;
    }

    this.timestamp = (timestamp) => {
        this.timestamp = timestamp;
        return this;
    }

    this.status = (status) => {
        this.status = status;
        return this;
    }

    this.statusCode = (statusCode) => {
        this.statusCode = statusCode;
        return this;
    }

    this.payload = (payload) => {
        this.payload = payload;
        return this;
    }

    this.build = () => {
        return new HttpResponse(this.url, this.timestamp, this.status, this.statusCode, this.payload);
    }

}

module.exports = HttpResponseBuilder;