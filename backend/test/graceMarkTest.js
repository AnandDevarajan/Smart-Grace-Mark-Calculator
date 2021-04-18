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
  describe('PUT /gracemark/:id', () => {
    it('Update Gracemark details', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .put('/gracemark/130')
        .send({ description: 'NSS', mark: '20' })
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjE4NzE4OTQ3LCJleHAiOjE2MjEzMTA5NDd9.kGhJE07OUixWkHobeLMdkuIY43mjJ_2c8k8e5CnD6Do'
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.gracemark).to.be.an('Array');
          done();
        });
    });
  });
  describe('PUT /student/request/:id', () => {
    it('Student request for gracemark', (done) => {
      chai
        .request('http://127.0.0.1:5000')
        .put('/student/request/test')
        .send({ request: 'Inter University Sports and Games Events 15' })
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJpYXQiOjE2MTg3MjQ1MDksImV4cCI6MTYyMTMxNjUwOX0.jB1PP4dWLzRNsHBK5_UeAs2fqaDcDSaMkLTF2xgg9qM'
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.result).to.be.an('Object');
          expect(res.body.token).to.be.an('string');
          done();
        });
    });
  });
});
