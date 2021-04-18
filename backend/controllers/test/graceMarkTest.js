const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

describe('Gracemark', () => {
  describe('POST /gracemark', () => {
    it('Create Gracemark', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .post('/gracemark')
        .send({ description: 'test_grace', mark: '20' })
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjE4NzE4OTQ3LCJleHAiOjE2MjEzMTA5NDd9.kGhJE07OUixWkHobeLMdkuIY43mjJ_2c8k8e5CnD6Do'
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.result).to.be.an('Object');
          done();
        });
    });
  });
});
