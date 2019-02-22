import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import pool from '../models/connect';

chai.should();
chai.expect();
chai.use(chaiHttp);

let token = '';

describe('Homepage, user and required test to run others', () => {
  describe('Homepage', () => {
    it('it should open the homepage', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('User', () => {
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
            token = res.body.data[0].token;
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

  describe('required to run other test', () => {
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
    it('it should POST a party later to be deleted', (done) => {
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-http-token', token)
        .send({
          name: 'Republican',
          hqAddress: 'New york',
          logoUrl: 'repub.png',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          console.log(res.body);
          done();
        });
    });

    it('it should register candidate', (done) => {
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

    it('it should not register a candidate twice', (done) => {
      chai.request(server)
        .post('/api/v1/offices/1/register')
        .set('x-http-token', token)
        .send({
          party: 1,
          user: 1,
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Vote', () => {
    it('it should not add vote with invalid input', (done) => {
      chai.request(server)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 'clement',
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not add vote with missing input', (done) => {
      chai.request(server)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not add vote with non existing user input', (done) => {
      chai.request(server)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 12,
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not add vote with non existing office input', (done) => {
      chai.request(server)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 1,
          office: 12,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not add vote with non existing candidate', (done) => {
      chai.request(server)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 1,
          office: 1,
          candidate: 12,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should add vote', (done) => {
      chai.request(server)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 1,
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not vote twice one candidate', (done) => {
      chai.request(server)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 1,
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          done();
        });
    });
    describe('Petition', () => {
      it('it should not add petition with invalid input', (done) => {
        chai.request(server)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 'clement',
            office: 1,
            body: 1,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should not add petition with non existing user', (done) => {
        chai.request(server)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 12,
            office: 1,
            body: 'test petition',
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should not add petition with non existing office', (done) => {
        chai.request(server)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 1,
            office: 12,
            body: 'test petition two',
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should add petition', (done) => {
        chai.request(server)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 1,
            office: 1,
            body: 'test petition two',
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should add not register petition that exist already', (done) => {
        chai.request(server)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 1,
            office: 1,
            body: 'test petition two',
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
