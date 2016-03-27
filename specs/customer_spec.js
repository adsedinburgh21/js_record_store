var assert = require('chai').assert;
var Customer = require('../customer.js');
var Record = require('../record.js');



describe("Customer", function(){
  beforeEach(function(){
    customer1 = new Customer( {
      name: 'David',
      cash: 50
    });
    customer2 = new Customer( {
      name: 'Fred',
      cash: 5
    });

    record1 = new Record( {
      artist: 'AC/DC',
      title: 'Powerage',
      purchasePrice: 4,
      retailPrice: 8
    });
    record2 = new Record( {
      artist: 'AC/DC',
      title: 'Let There Be Rock',
      purchasePrice: 6,
      retailPrice: 10
    });
    record3 = new Record( {
      artist: 'Metallica',
      title: 'Master Of Puppets',
      purchasePrice: 8,
      retailPrice: 12
    });
  });

  it('buy should reduce the customer cash by retailPrice of record', function(){
    customer1.buy( record1 );
    assert.equal( customer1.cash, 42 );
  });

  it('buy should add the record to the customers record collection', function(){
    customer1.buy( record1 );
    assert.deepEqual( customer1.recordCollection, [ record1 ] );
  });

  it('should not allow record to be purchased if not enough cash', function(){
    customer2.buy( record1 );
    assert.equal( customer2.cash, 5 );
    assert.deepEqual( customer2.recordCollection, [ ] );
  });

  it('should remove record from record collection', function(){
    customer1.recordCollection = [ record1, record2 ];
    customer1.removeFromRecordCollection( record2 );
    assert.deepEqual( customer1.recordCollection, [ record1 ]);
  });

  it('should add purchase price to customers cash when selling record', function(){
    customer1.recordCollection = [ record1, record2 ];
    customer1.sell( record2 );
    assert.equal( customer1.cash, 56 );
  });

// // need to test for sell and remove from collection

});