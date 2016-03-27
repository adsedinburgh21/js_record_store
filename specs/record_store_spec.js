var assert = require('chai').assert;
var RecordStore = require( '../record_store.js' );
var Record = require( '../record.js' );


describe("Record Store", function(){
  beforeEach( function(){
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
    record4 = new Record( {
      artist: 'Clutch',
      title: 'Summer Sound Attack',
      purchasePrice: 10,
      retailPrice: 14
    });
    record5 = new Record( {
      artist: 'AC/DC',
      title: 'Powerage',
      purchasePrice: 4,
      retailPrice: 8
    });
    record6 = new Record( {
      artist: 'Pink Floyd',
      title: 'The Dark Side Of The Moon',
      purchasePrice: 7,
      retailPrice: 11
    });

    store1 = new RecordStore( {
      name: 'Rockin Records',
      city: 'Edinburgh',
      inventory: [ record1, record2, record3, record4, record5 ],
      cash: 250
    });
  });


  it('should have a name', function(){
    assert.equal( store1.name, 'Rockin Records')
  });

  it('should have a city', function(){
    assert.equal( store1.city, 'Edinburgh')
  });

  it('should have an inventory', function(){
    assert.deepEqual( store1.inventory, [ record1, record2, record3, record4, record5 ] )
  });

  it('should have a cash balance', function(){
    assert.equal( store1.cash, 250)
  });

  it('should return the total cost of the inventory', function(){
    assert.equal( store1.costOfInventory(), 32);
  });

  it('should return the total retail value of the inventory', function(){
    assert.equal( store1.retailValueOfInventory(), 52);
  });

  it('should return total number of records in inventory', function(){
    assert.equal( store1.totalRecordsInInventory(), 5);
  });

  it('should return the number of different records in stock', function(){
    assert.equal( store1.numberOfDifferentRecords(), 4);
  });

  it('should return an array of unique records - only 1 of each copy no doubles', function(){
    assert.deepEqual( store1.rangeOfRecordsInStock(), [ record1, record2, record3, record4 ])
  })

  it('should return true when checking if record is in current range in stock', function(){
    store1.rangeOfRecords = [ record1 ];
    assert.equal( store1.inCurrentRange( record5 ), true);
  });

  it('should return false when checking if record is in current range in stock', function(){
    store1.rangeOfRecords = [ record1 ];
    assert.equal( store1.inCurrentRange( record2 ), false);
  });

  it('should return the number of albums in stock of the same type - eg artist and title', function(){
    assert.equal( store1.numberInStock( record1 ), 2 );
  });

  it('should increase shop cash by retail price of the record', function(){
    store1.sell( record1 );
    assert.equal( store1.cash, 258);
  });

  it('should remove record from the inventory', function(){
    store1.removeFromInventory( record3 );
    assert.deepEqual( store1.inventory, [ record1, record2, record4, record5 ] );
  });

  it('should reduce the store cash by the purchase price of the record', function(){
    store1.buy( record6 );
    assert.equal( store1.cash, 243 )
  });

  it('should add the record to the inventory', function(){
    store1.buy( record6 );
    assert.deepEqual( store1.inventory, [ record1, record2, record3, record4, record5, record6 ]);
  });



});