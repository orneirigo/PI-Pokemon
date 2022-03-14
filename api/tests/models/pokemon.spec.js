const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Black' });
      });
    });
    describe('hp', () => {
      it('should throw an error if hp is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid hp')))
          .catch(() => done());
      });
      it('should work when hp is a number', () => {
        Pokemon.create({ hp: 10 });
      });
    });
    describe('attack', () => {
      it('should throw an error if attack is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid attack')))
          .catch(() => done());
      });
      it('should work when attck is a number', () => {
        Pokemon.create({ attack: 10 });
      });
    });
    describe('defense', () => {
      it('should throw an error if defense is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid defense')))
          .catch(() => done());
      });
      it('should work when defense is a number', () => {
        Pokemon.create({ defense: 10 });
      });
    });
    describe('speed', () => {
      it('should throw an error if speed is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid speed')))
          .catch(() => done());
      });
      it('should work when speed is a number', () => {
        Pokemon.create({ speed: 30 });
      });
    });
    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
      it('should work when height is a number', () => {
        Pokemon.create({ height: 5 });
      });
    });
    describe('weight', () => {
      it('should throw an error if weight is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should work when weight is a number', () => {
        Pokemon.create({ hp: 25 });
      });
    });
  }); 
});
