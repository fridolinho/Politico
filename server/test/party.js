import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import pool from '../models/connect';


let token = '';


const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

describe('Party', () => {
  before(async () => {
    try {
      await pool.query('TRUNCATE party CASCADE; ALTER SEQUENCE party_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('POST Political party', () => {
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
    it('it should POST a party', (done) => {
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
  });

  describe('GET all Political parties', () => {
    it('it should show all political parties', (done) => {
      chai.request(server)
        .get('/api/v1/parties')
        .set('x-http-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });


  describe('GET specific Political party', () => {
    it('it should show specific political party', (done) => {
      chai.request(server)
        .get('/api/v1/parties/1')
        .set('x-http-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });


  describe('Patch specific Political party', () => {
    it('it should update specific political party', (done) => {
      chai.request(server)
        .patch('/api/v1/parties/1')
        .send({
          name: 'Republican',
        })
        .set('x-http-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Delete specific Political party', () => {
    it('it should delete a specific political party', (done) => {
      chai.request(server)
        .delete('/api/v1/parties/1')
        .set('x-http-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
