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
  describe('POST /faculty/', () => {
    it('Faculty Signup', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .post('/faculty')
        .send({
          name: 'test_faculty',
          email: 'faculty2@test.com',
          password: 'facultytest',
          department: 'CSE',
          courseId: '15CSE313',
          batch: 'N/A',
          adviser: 'No',
          dob: '20/2/1999',
          gender: 'Male',
          phone: '1234567890',
          address: 'testaddress',
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.be.an('object');
          expect(res.body.result).to.be.an('object');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });
  describe('GET /faculty/:id', () => {
    it('Get Faculty details', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/faculty/9')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.faculty).to.be.an('object');
          done();
        });
    });
  });
  describe('PUT /faculty/:id', () => {
    it('Update Faculty details', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .put('/faculty/9')
        .send({ email: 'Faculty1@123.com' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.faculty).to.be.an('object');
          done();
        });
    });
  });
  describe('GET /faculty/course/mark/:id', () => {
    it('List of Students for Course faculty', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/faculty/course/mark/15CSE213')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.students).to.be.an('Array');
          done();
        });
    });
  });
  describe('GET /faculty/adviser/students/:id', () => {
    it('View Students by class adviser', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/faculty/adviser/students/B')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjE4NzIwMDE5LCJleHAiOjE2MjEzMTIwMTl9.1Y3Ab5Zj44HNkU12w7zKtag1By_LWR-gcTozEGm3C3c'
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.students).to.be.an('Array');
          done();
        });
    });
  });

  describe('PUT /course/mark/update/:id', () => {
    it('Faculty allocating course marks and internals to students + edit', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .put('/course/mark/update/15CSE213')
        .send({ id: 'anand123', marks: '70', internals: '30' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.updatedMark).to.be.an('Array');
          done();
        });
    });
  });

  describe('PUT /faculty/:id', () => {
    it('Update faculty profile', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .put('/faculty/9')
        .send({ email: 'faculty1@123.com' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.faculty).to.be.an('Object');
          done();
        });
    });
  });

  describe('GET /faculty/changepassword/:id', () => {
    it('Change Password', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .put('/faculty/changepassword/9')
        .send({ password: 'faculty' })
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
