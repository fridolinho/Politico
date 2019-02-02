import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
const should = chai.should();
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
			console.log(res.body);
			done();
		});
	});
});