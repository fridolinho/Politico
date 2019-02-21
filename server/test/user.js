import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import pool from '../models/connect';

chai.should();
chai.expect();
chai.use(chaiHttp);

describe('User', () => {
  before(async () => {
    try {
      await pool.query('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('Register a user to the database', () => {
    it('it should register a new user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Niyongabo',
          lastName: 'Arsene',
          otherName: 'wenger',
          email: 'niyofree@yahoo.fr',
          phoneNumber: '0788778495',
          passportUrl: 'passport2.png',
          password: '1234',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not register a new user with empty field', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: 'fridolin',
          otherName: 'wenger',
          email: 'fridolinho@gmail.com',
          phoneNumber: '0788232369',
          passportUrl: 'passport2.png',
          password: '1235',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not login the user with wrong email', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'fridolinho12@gmail.com',
          password: '1234',
        })

        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not login the user with wrong password', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'fridolinho12@gmail.com',
          password: '123423',
        })

        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    describe('Register a user with data already in the database', () => {
      it('it should login the user', (done) => {
        chai.request(server)
          .post('/api/v1/auth/login')
          .send({
            email: 'niyofree@yahoo.fr',
            password: '1234',
          })

          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });

      it('it should not register a new user with existing email', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstName: 'Niyongabo',
            lastName: 'Arsene',
            otherName: 'wenger',
            email: 'niyofree@yahoo.fr',
            phoneNumber: '0788778495',
            passportUrl: 'passport2.png',
            password: '1234',
          })

          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });
});
