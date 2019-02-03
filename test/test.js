import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);


describe('POST Political party', () => {
	it('it should POST a party', (done) => {
		chai.request(server)
		.post('/api/v1/parties')
		.send({
			name: "RPF",
			hqaddress: "Kacyiru",
			logourl: "rpf.png"
		})
		
		.end((err, res) => {
			res.should.have.status(201);
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
});


describe('Patch specific Political party', () => {
	it('it should update specific political party', (done) => {
		chai.request(server)
		.patch('/api/v1/parties/1')
		.send({
			name: "Republican"
		})		
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
				
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
	});
});

describe('POST Political office', () => {
	it('it should POST an office', (done) => {
		chai.request(server)
		.post('/api/v1/offices')
		.send({
			type: "federal",
			name: "Governor"
		})
		
		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			done();
		});
	});
});