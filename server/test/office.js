import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import pool from '../models/connect';

let token = '';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);


describe('Office', () => {
  before(async () => {
    try {
      await pool.query('TRUNCATE office CASCADE; ALTER SEQUENCE office_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('GET all Political offices', () => {
    it('First log in the user to generate the token', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'niyofree@yahoo.fr',
          password: '1234',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          token = res.body.data[0].token;
          done();
        });
    });
    it('it should POST an office', (done) => {
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-http-token', token)
        .send({
          type: 'federal',
          name: 'Governor',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should show all political offices', (done) => {
      chai.request(server)
        .get('/api/v1/offices')
        .set('x-http-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });


  describe('GET specific Political office', () => {
    it('it should show specific political office', (done) => {
      chai.request(server)
        .get('/api/v1/offices/1')
        .set('x-http-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Register candidate for Political office', () => {
    it('it should register a party for use to register candidate', (done) => {
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-http-token', token)
        .send({
          name: 'RPF',
          hqAddress: 'Kacyiru',
          logoUrl: 'rpf.png',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          console.log(res.body);
          done();
        });
    });
    it('it should register candidate with string instead of int', (done) => {
      chai.request(server)
        .post('/api/v1/offices/1/register')
        .set('x-http-token', token)
        .send({
          party: 'pr',
          user: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should register candidate with missing field', (done) => {
      chai.request(server)
        .post('/api/v1/offices/1/register')
        .set('x-http-token', token)
        .send({
          user: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should register candidate to a non existing party', (done) => {
      chai.request(server)
        .post('/api/v1/offices/1/register')
        .set('x-http-token', token)
        .send({
          party: 1,
          user: 12,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should register a non existing user', (done) => {
      chai.request(server)
        .post('/api/v1/offices/1/register')
        .set('x-http-token', token)
        .send({
          party: 12,
          user: 1,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should register candidate to a non existing office', (done) => {
      chai.request(server)
        .post('/api/v1/offices/12/register')
        .set('x-http-token', token)
        .send({
          party: 1,
          user: 1,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    xit('it should register candidate', (done) => {
      chai.request(server)
        .post('/api/v1/offices/1/register')
        .set('x-http-token', token)
        .send({
          party: 1,
          user: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    xit('it should register candidate twice', (done) => {
      chai.request(server)
        .post('/api/v1/offices/1/register')
        .set('x-http-token', token)
        .send({
          party: 1,
          user: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('GET election results for specific office', () => {
    it('it should the results', (done) => {
      chai.request(server)
        .get('/api/v1/offices/1/result')
        .set('x-http-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
