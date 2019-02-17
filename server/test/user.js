import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.expect();
chai.use(chaiHttp);

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
        password: '1235',
      })

      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        console.log(err);
        done();
      });
  });

  it('it should not register a new user with empty field', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: '',
        lastName: 'Arsene',
        otherName: 'wenger',
        email: 'niyofree@yahoo.fr',
        phoneNumber: '0788778495',
        passportUrl: 'passport2.png',
        password: '1235',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        console.log(err);
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
        email: 'fridolinho@gmail.com',
        phoneNumber: '0788778495',
        passportUrl: 'passport2.png',
        password: '1235',
      })

      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        console.log(err);
        done();
      });
  });
});
