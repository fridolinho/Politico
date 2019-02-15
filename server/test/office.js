import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.expect();
chai.use(chaiHttp);

describe('POST Political office', () => {
  it('it should POST an office', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
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

  it('it should not POST an office with empty input', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send({
        type: '',
        name: 'Mayor',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not POST an office with missing input', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send({
        name: 'Mayor',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not POST an office with existing data', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send({
        type: 'Legislative',
        name: 'Governor',
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        done();
      });
  });
});


describe('GET all Political offices', () => {
  it('it should show all political offices', (done) => {
    chai.request(server)
      .get('/api/v1/offices')
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
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not found specific political office', (done) => {
    chai.request(server)
      .get('/api/v1/offices/100')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
