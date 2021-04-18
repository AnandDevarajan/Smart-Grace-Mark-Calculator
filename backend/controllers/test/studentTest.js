const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

describe('Student', () => {
  describe('POST /student/login', () => {
    it('Student Login', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .post('/student/login')
        .send({ email: 'anand@123.com', password: 'anand123' })
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
  // describe('POST /student/', () => {
  //   it('Student Signup', (done) => {
  //     chai
  //       .request('http://127.0.0.1:5000')
  //       .post('/student')
  //       .send({
  //         name: 'test_student',
  //         rollno: 'test5cxcxstuden',
  //         email: 'student@test.com',
  //         password: 'studenttest',
  //         degree: 'BTech',
  //         branch: 'CSE',
  //         batch: 'C',
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
  describe('GET /student/:id', () => {
    it('Get Student details', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/student/anand123')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.student).to.be.an('object');
          done();
        });
    });
  });
});
