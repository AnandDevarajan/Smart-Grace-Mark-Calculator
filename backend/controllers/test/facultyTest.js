const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

describe('Faculty', () => {
  describe('POST /faculty/login', () => {
    it('Faculty Login', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .post('/faculty/login')
        .send({ email: 'faculty1@123.com', password: 'faculty' })
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
  // describe('POST /faculty/', () => {
  //   it('Faculty Signup', (done) => {
  //     chai
  //       .request('http://127.0.0.1:5000')
  //       .post('/faculty')
  //       .send({
  //         name: 'test_faculty',
  //         email: 'faculty2@test.com',
  //         password: 'facultytest',
  //         department: 'CSE',
  //         courseId: '15CSE313',
  //         batch: 'N/A',
  //         adviser: 'No',
  //         dob: '20/2/1999',
  //         gender: 'Male',
  //         phone: '1234567890',
  //         address: 'testaddress',
  //       })
  //       .end((err, res) => {
  //         if (err) done(err);
  //         expect(res).to.be.an('object');
  //         expect(res.body.result).to.be.an('object');
  //         expect(res.body.token).to.be.a('string');
  //         done();
  //       });
  //   });
  // });
});
