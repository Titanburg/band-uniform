process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../app.js');
var User = require("../models/user");
var should = chai.should();
chai.use(chaiHttp);


describe('Users', function(done) {
  it('should list ALL users on /users GET', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should list a SINGLE user on /user/<id> GET', function(done) {
      var newUser = new User({
        name: 'Super',
        lastName: 'man'
      });
      newUser.save(function(err, data) {
        chai.request(server)
          .get('/user/'+data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('firstname');
            res.body.should.have.property('lastName');
            res.body.name.should.equal('Super');
            res.body.lastName.should.equal('man');
            res.body._id.should.equal(data.id);
            done();
          });
      });
  });

});
