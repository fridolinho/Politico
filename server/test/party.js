import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.expect();
chai.use(chaiHttp);

describe('POST Political party', () => {
  it('it should POST a party', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send({
        name: 'RPF',
        hqAddress: 'Kacyiru',
        logoUrl: 'rpf.png',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not POST a party', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send({
        name: '',
        hqAddress: 'New YORK',
        logoUrl: 'democratic.png',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not POST a party with missing field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send({
        hqAddress: 'New YORK',
        logoUrl: 'democratic.png',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not POST a party with existing data', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send({
        name: 'RPF',
        hqAddress: 'Kacyiru',
        logoUrl: 'rpf.png',
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('GET all Political parties', () => {
  it('it should show all political parties', (done) => {
    chai.request(server)
      .get('/api/v1/parties')
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
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not found that political party', (done) => {
    chai.request(server)
      .get('/api/v1/parties/100')
      .end((err, res) => {
        res.should.have.status(404);
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
        hqAddress: 'Intare ARENA',
        logoUrl: 'logo.png',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not update specific political party with empty input', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/1')
      .send({
        name: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not found political party', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/100')
      .send({
        name: 'Republican',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Delete specific Political party', () => {
  it('it should delete a specific political party', (done) => {
    chai.request(server)
      .delete('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not delete a specific political party', (done) => {
    chai.request(server)
      .delete('/api/v1/parties/100')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
