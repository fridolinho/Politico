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

	it('it should not POST a party', (done) => {
		chai.request(server)
		.post('/api/v1/parties')
		.send({
			name: "",
			hqaddress: "Kacyiru",
			logourl: "rpf.png"
		})
		
		.end((err, res) => {
			res.should.have.status(400);
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
			name: "Republican"
		})		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
	});

	it('it should not found political party', (done) => {
		chai.request(server)
		.patch('/api/v1/parties/100')
		.send({
			name: "Republican"
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

	it('it should not POST an office', (done) => {
		chai.request(server)
		.post('/api/v1/offices')
		.send({
			type: "",
			name: "Governor"
		})
		
		.end((err, res) => {
			res.should.have.status(400);
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

describe('POST create user', () => {
	it('it should create a user', (done) => {
		chai.request(server)
		.post('/api/v1/users/register')
		.send({
			firstname: "Niyonsaba",
	        lastname: "Fridolin",
	        email: "fridolinho@gmail.com",
	        phonenumber: "0788232369",
	        passporturl: "passport.png",
	        password: "1234"
		})
		
		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			console.log(res.body)
			done();
		});
	});

	it('it should not create a user', (done) => {
		chai.request(server)
		.post('/api/v1/users/register')
		.send({
			firstname: "",
	        lastname: "Fridolin",
	        email: "fridolinho@gmail.com",
	        phonenumber: "0788232369",
	        passporturl: "passport.png",
	        password: "1234"
		})
		
		.end((err, res) => {
			res.should.have.status(400);
			res.body.should.be.a('object');
			console.log(res.body)
			done();
		});
	});
});

describe('POST login a user', () => {
	it('it should login a user', (done) => {
		chai.request(server)
		.post('/api/v1/users/login')
		.send({
	        email: "fridolinho@gmail.com",
	        password: "1234"
		})
		
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			console.log(res.body)
			done();
		});
	});

	it('it should fail to login a user', (done) => {
		chai.request(server)
		.post('/api/v1/users/login')
		.send({
	        email: "",
	        password: "1234"
		})
		
		.end((err, res) => {
			res.should.have.status(400);
			res.body.should.be.a('object');
			console.log(res.body)
			done();
		});
	});

	it('it should not login a user', (done) => {
		chai.request(server)
		.post('/api/v1/users/login')
		.send({
	        email: "fridolinho12@gmail.com",
	        password: "1234"
		})
		
		.end((err, res) => {
			res.should.have.status(404);
			res.body.should.be.a('object');
			console.log(res.body)
			done();
		});
	});
});