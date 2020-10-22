const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Order Delivery Controller', () => {

    it ('should update order status', done => {
        chai.request(app)
            .put('/orders/5f8a9e701f68124ffc8b9817/status')
            .send({})
            .end((err, response) => {
                expect(err).to.be.null;
                expect(response).to.have.status(200);
                expect(response.body).to.haveOwnProperty('success').eq(true);
                expect(response.body).to.haveOwnProperty('data');
                expect(response.body.data).to.haveOwnProperty('status').eq('Delivered');
                done();
            });
    });

});