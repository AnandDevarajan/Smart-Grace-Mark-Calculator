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
        .send({ email: 'faculty1@sgmc.com', password: 'faculty' })
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
          email: 'faculty1@sgmc.com',
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
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body.message).to.be.a('string');
          done();
        });
    });
  });
  describe('GET /faculty/:id', () => {
    it('Get Faculty details', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/faculty/43')
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
        .put('/faculty/43')
        .send({ email: 'faculty1@sgmc.com' })
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
        .get('/faculty/adviser/students/C')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYxODg0ODQ0NSwiZXhwIjoxNjIxNDQwNDQ1fQ.uMY6fqmBkiYzi4EJonI9-W3rnRdAjdI9_p-nX4H1Eok'
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
        .put('/faculty/43')
        .send({ email: 'faculty1@sgmc.com' })
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
        .put('/faculty/changepassword/43')
        .send({ password: 'faculty' })
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYxODg0ODQ0NSwiZXhwIjoxNjIxNDQwNDQ1fQ.uMY6fqmBkiYzi4EJonI9-W3rnRdAjdI9_p-nX4H1Eok'
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
