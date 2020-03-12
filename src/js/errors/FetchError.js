export default class FetchError extends Error {
    name = "FetchError";
  
    constructor(response, body, message) {
      super(message);
      this.response = response;
      this.body = body;
    }
  }