const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

describe('Admin', () => {
  describe('POST /admin/login', () => {
    it('Admin Login', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .post('/admin/login')
        .send({ email: 'admin@207.com', password: '207' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.result).to.be.an('object');
          expect(res.body.token).to.be.an('string');
          done();
        });
    });
  });
  // describe('POST /admin/', () => {
  //   it('Admin Signup', (done) => {
  //     chai
  //       .request('http://127.0.0.1:5000')
  //       .post('/admin')
  //       .send({
  //         name: 'test_admin',
  //         email: 'admin@test.com',
  //         password: 'admintest',
  //         dob: '20/2/1999',
  //         gender: 'male',
  //         phone: '1234567890',
  //         address: 'testaddress',
  //       })
  //       .end((err, res) => {
  //         if (err) done(err);
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.an('object');
  //         expect(res.body.result).to.be.an('object');
  //         expect(res.body.token).to.be.a('string');
  //         done();
  //       });
  //   });
  // });

  describe('GET /admin/:id', () => {
    it('Get Admin details', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/admin/6')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.admin).to.be.an('object');
          done();
        });
    });
  });
});
