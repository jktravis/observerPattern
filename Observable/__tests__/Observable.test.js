const { Observable } = require('../Observable');

describe('Observable', () => {
  it('should be defined', () => {
    expect(Observable).toBeDefined();
  });

  describe('subscribe', () => {
    it('should have a subscribe method', () => {
      const observer = new Observable();
      expect(typeof observer.subscribe).toEqual('function');
    });

    it('should return an Id', () => {
      const observer = new Observable();
      const fn = jest.fn();
      expect(observer.subscribe(fn)).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    it('should have id in subscription list', () => {
      const observer = new Observable();
      const fn = jest.fn();
      const id = observer.subscribe(fn);
      expect(observer.getSubscriptions()).toContain(id);
    });

    it('should return undefined if no function is passed', () => {
      const observer = new Observable();
      expect(observer.subscribe()).toBeUndefined();
    });
  });

  describe("unsubscribe", () => {
    it('should have an unsubscribe method', () => {
      const observer = new Observable();
      expect(typeof observer.unsubscribe).toEqual('function');
    });

    it("should remove subscription", () => {
      const observer = new Observable();
      const fn = jest.fn();
      const subId = observer.subscribe(fn);
      observer.unsubscribe(subId);
      expect(observer.getSubscriptions()).not.toContain(subId);
    });
  });

  describe('notify', () => {
    it('should have a notify method', () => {
      const observer = new Observable();
      expect(typeof observer.notify).toEqual('function');
    });

    it('should execute subscribed functions', () => {
      const observer = new Observable();
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      observer.subscribe(fn1);
      observer.subscribe(fn2);
      observer.notify('foo', 'bar', 1);

      expect(fn1.mock.calls).toEqual([['foo', 'bar', 1]]);
      expect(fn2.mock.calls).toEqual([['foo', 'bar', 1]]);

    });
  });

  describe("getSubscriptions", () => {
    it("should have a getSubscription function", () => {
      const observer = new Observable();
      expect(typeof observer.getSubscriptions).toEqual('function');
    });

    it('should return an array of Ids', () => {
      const observer = new Observable();
      const id = observer.subscribe(jest.fn());
      const subs = observer.getSubscriptions();
      expect(subs).toEqual([id]);
    });
  });

});