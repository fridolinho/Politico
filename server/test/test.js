import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

describe('the Homepage', () => {
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

describe('POST Political party', () => {
	it('it should POST a party', (done) => {
		chai.request(server)
		.post('/api/v1/parties')
		.send({
			name: "RPF",
			hqAddress: "Kacyiru",
			logoUrl: "rpf.png"
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
			hqAddress: "New YORK",
			logoUrl: "democratic.png"
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
			hqAddress: "New YORK",
			logoUrl: "democratic.png"
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
			name: "RPF",
			hqAddress: "Kacyiru",
			logoUrl: "rpf.png"
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
			name: "Republican",
			hqAddress: "Intare ARENA",
			logoUrl: "logo.png"
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
			name: ""
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

	it('it should not POST an office with empty input', (done) => {
		chai.request(server)
		.post('/api/v1/offices')
		.send({
			type: "",
			name: "Mayor"
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
			name: "Mayor"
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
			type: "Legislative",
			name: "Governor"
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

// describe('POST create user', () => {
// 	it('it should create a user', (done) => {
// 		chai.request(server)
// 		.post('/api/v1/users/register')
// 		.send({
// 			firstName: "Niyonsaba",
// 	        lastName: "Fridolin",
// 	        email: "fridolinho@gmail.com",
// 	        phoneNumber: "0788232369",
// 	        passportUrl: "passport.png",
// 	        password: "1234"
// 		})
		
// 		.end((err, res) => {
// 			res.should.have.status(201);
// 			res.body.should.be.a('object');
// 			console.log(res.body)
// 			done();
// 		});
// 	});

// 	it('it should not with existing email create a user', (done) => {
// 		chai.request(server)
// 		.post('/api/v1/users/register')
// 		.send({
// 			firstName: "rwagasore",
// 	        lastName: "Jacques",
// 	        email: "fridolinho@gmail.com",
// 	        phoneNumber: "0788457852",
// 	        passportNrl: "passport.png",
// 	        password: "1234"
// 		})
		
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.body.should.be.a('object');
// 			console.log(res.body)
// 			done();
// 		});
// 	});

// 	it('it should not create a user with empty firstname', (done) => {
// 		chai.request(server)
// 		.post('/api/v1/users/register')
// 		.send({
// 			firstName: "",
// 	        lastName: "Fridolin",
// 	        email: "fridolinho@gmail.com",
// 	        phoneNumber: "0788232369",
// 	        passportUrl: "passport.png",
// 	        password: "1234"
// 		})
		
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.body.should.be.a('object');
// 			console.log(res.body)
// 			done();
// 		});
// 	});
// 	it('it should not create a user with missing passporturl', (done) => {
// 		chai.request(server)
// 		.post('/api/v1/users/register')
// 		.send({
// 			firstName: "Tuyizere",
// 	        lastName: "Donatien",
// 	        email: "tuyidonatien@gmail.com",
// 	        phoneNumber: "0788232369",
// 	        passportUrl: "passport.png",
// 	        password: "1234"
// 		})
		
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.body.should.be.a('object');
// 			console.log(res.body)
// 			done();
// 		});
// 	});
// });

// describe('POST login a user', () => {
// 	it('it should login a user', (done) => {
// 		chai.request(server)
// 		.post('/api/v1/users/login')
// 		.send({
// 	        email: "fridolinho@gmail.com",
// 	        password: "1234"
// 		})
		
// 		.end((err, res) => {
// 			res.should.have.status(200);
// 			res.body.should.be.a('object');
// 			console.log(res.body)
// 			done();
// 		});
// 	});

// 	it('it should fail to login a user', (done) => {
// 		chai.request(server)
// 		.post('/api/v1/users/login')
// 		.send({
// 	        email: "",
// 	        password: "1234"
// 		})
		
// 		.end((err, res) => {
// 			res.should.have.status(400);
// 			res.body.should.be.a('object');
// 			console.log(res.body)
// 			done();
// 		});
// 	});

// 	it('it should not login a user', (done) => {
// 		chai.request(server)
// 		.post('/api/v1/users/login')
// 		.send({
// 	        email: "fridolinho12@gmail.com",
// 	        password: "1234"
// 		})
		
// 		.end((err, res) => {
// 			res.should.have.status(404);
// 			res.body.should.be.a('object');
// 			console.log(res.body)
// 			done();
// 		});
// 	});
// });