const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

describe('Courses', () => {
  describe('GET /course', () => {
    it('returns the list of all courses', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/course')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.courses).to.be.an('array');
          done();
        });
    });
  });
  describe('GET /course/report', () => {
    it('returns the reports of courses', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .get('/course/report')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.report).to.be.an('array');
          done();
        });
    });
  });
});
