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
});
