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
        .send({ email: 'ananddevarajan01@gmail.com', password: 'anand123' })
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
  describe('POST /student/', () => {
    it('Student Signup', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .post('/student')
        .send({
          name: 'test_student',
          rollno: 'anand123',
          email: 'student@test.com',
          password: 'studenttest',
          degree: 'BTech',
          branch: 'CSE',
          batch: 'C',
          dob: '20/2/1999',
          gender: 'male',
          phone: '1234567890',
          address: 'testaddress',
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body.message).to.be.a('string');
          done();
        });
    });
  });
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

  describe('GET /student/view/result/:id', () => {
    it('Get Student results grade', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get(
          '/student/view/result/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkNCLkVOLlU0Q1NFMTgyMDciLCJpYXQiOjE2MTg4NjEyMjAsImV4cCI6MTYyMTQ1MzIyMH0.T4syKBOgFgT1HbfIVezdRylCICyKvkGHuHicHD9uBik-CB.EN.U4CSE18207'
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.markList).to.be.an('Array');
          done();
        });
    });
  });
  describe('GET /course/student/marks/:id', () => {
    it('View Students Internals and Total Marks by admin,faculty,adviser', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/course/student/marks/anand123')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.markList).to.be.an('Array');
          done();
        });
    });
  });

  describe('PUT /student/:id', () => {
    it('Update student profile', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .put('/student/test')
        .send({ email: 'test1@123.com' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.student).to.be.an('Object');
          done();
        });
    });
  });

  describe('GET /student/changepassword/:id', () => {
    it('Change Password', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .put('/student/changepassword/test')
        .send({ password: 'test' })
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJpYXQiOjE2MTg3MjQ1MDksImV4cCI6MTYyMTMxNjUwOX0.jB1PP4dWLzRNsHBK5_UeAs2fqaDcDSaMkLTF2xgg9qM'
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.message).to.be.an('string');
          done();
        });
    });
  });
});
