const autoBind = require('auto-bind');

class threadsHandler{
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postThreadHandler(request, h) {
    
  }
}