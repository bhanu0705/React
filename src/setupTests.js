beforeEach(() => {
   Storage.prototype.setItem = jest.fn();
   Storage.prototype.getItem = jest.fn();
   Storage.prototype.removeItem = jest.fn();
   Storage.prototype.clear = jest.fn();
});