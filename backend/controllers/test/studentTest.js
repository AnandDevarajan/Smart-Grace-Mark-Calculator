const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

describe('Student', () => {
  describe('GET /student/login', () => {
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
});
