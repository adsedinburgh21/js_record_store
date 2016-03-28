var assert = require('chai').assert;
var Record = require('../record.js');


describe("Record", function(){
  beforeEach(function(){

    //// RECORDS  ////
    record1 = new Record( {
      artist: 'AC/DC',
      title: 'Powerage',
      purchasePrice: 4,
      retailPrice: 8
    });
  });

    //// TESTS  ////
  it("should have an artist", function(){
    assert.equal( record1.artist, 'AC/DC' )
  });

  it("should have a title", function(){
    assert.equal( record1.title, 'Powerage')
  });

  it("should have a purchase price", function(){
    assert.equal( record1.purchasePrice, 4)
  });

  it("should have a retail price", function(){
    assert.equal( record1.retailPrice, 8)
  });

});