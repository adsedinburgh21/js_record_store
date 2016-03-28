var assert = require('chai').assert;
var RecordStore = require( '../record_store.js' );
var Record = require( '../record.js' );


describe("Record Store", function(){
  beforeEach( function(){

    //// RECORDS  ////
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
    //// Record 6 doesn't start in Store's inventory. ////
    record6 = new Record( {
      artist: 'Pink Floyd',
      title: 'The Dark Side Of The Moon',
      purchasePrice: 7,
      retailPrice: 11
    });

  ////  STORE  ////
    store1 = new RecordStore( {
      name: 'Rockin Records',
      city: 'Edinburgh',
      inventory: [ record1, record2, record3, record4, record5 ],
      cash: 250
    });
  });


  //// TESTS ////
  it('should have a name', function(){
    assert.equal( store1.name, 'Rockin Records')
  });

  it('should have a city', function(){
    assert.equal( store1.city, 'Edinburgh')
  });

  it('should have an inventory', function(){
    assert.deepEqual( store1.inventory, [ record1, record2, record3, record4, record5 ] )
  });

  // ** Finance  ** //
  it('should have a cash balance', function(){
    assert.equal( store1.cash, 250)
  });

  it('should return the total cost of the inventory', function(){
    assert.equal( store1.costOfInventory(), 32);
  });

  it('should return the total retail value of the inventory', function(){
    assert.equal( store1.retailValueOfInventory(), 52);
  });

  // ** Stock  ** //
  it('should return total number of records in inventory', function(){
    assert.equal( store1.totalRecordsInInventory(), 5);
  });

  it('should return the number of different records in stock', function(){
    assert.equal( store1.numberOfDifferentRecords(), 4);
  });

  it('should return an array of unique records - only 1 of each copy no doubles', function(){
    assert.deepEqual( store1.rangeOfRecordsInStock(), [ record1, record2, record3, record4 ])
  });

  it('should return true when checking if record is in current stock range', function(){
    store1.rangeOfRecords = [ record1 ];
    assert.equal( store1.inCurrentRange( record5 ), true);
  });

  it('should return false when checking if record is in current stock range', function(){
    store1.rangeOfRecords = [ record1 ];
    assert.equal( store1.inCurrentRange( record2 ), false);
  });

  it('should return the quantity of albums in stock of the same type - eg artist and title', function(){
    assert.equal( store1.quantityInStock( record1 ), 2 );
  });

  // ** Sell Records  ** //
  it('sell should increase shop cash by retail price of the record', function(){
    store1.sell( record1 );
    assert.equal( store1.cash, 258);
  });

  it('should remove record from the inventory', function(){
    store1.removeFromInventory( record3 );
    assert.deepEqual( store1.inventory, [ record1, record2, record4, record5 ] );
  });

  it('should not be able to sell record that is not in inventory', function(){
    store1.sell( record6 );
    var result = [ record1, record2, record3, record4, record5 ];
    assert.deepEqual( store1.inventory, result);
    assert.equal( store1.cash, 250 );
  });

  // ** Purchase Records  ** //
  it('should reduce the store cash by the purchase price of the record', function(){
    store1.buy( record6 );
    assert.equal( store1.cash, 243 )
  });

  it('should add the record to the inventory', function(){
    store1.buy( record6 );
    assert.deepEqual( store1.inventory, [ record1, record2, record3, record4, record5, record6 ]);
  });

  // ** Searches  ** //
  it('should return an array of records currently in rangeOfRecords by specified artist', function(){
    var query = store1.searchRecordArtist( 'AC/DC');
    var result = [ record1, record2 ];
    assert.deepEqual( query, result);
  });

  it('should return an array of records currently in rangeOfRecords by specified title', function(){
    var query = store1.searchRecordTitle( 'Powerage');
    var result = [ record1 ];
    assert.deepEqual( query, result);
  });

  it('should return an array of all records currently in rangeOfRecords between a specified retail price range', function(){
    var query = store1.searchRetailPriceBetween(8, 10);
    var result = [ record1, record2 ];
    assert.deepEqual( query, result );
  });

  it('should return an array of records currently in inventory with a specified artist', function(){
    var query = store1.inventoryCountRecordArtist( 'AC/DC');
    var result = [ record1, record2, record5 ];
    assert.deepEqual( query, result);
  });

  it('should return an array of all records currently in inventory with a specified title', function(){
    var query = store1.inventoryCountRecordTitle( 'Powerage');
    var result = [ record1, record5 ];
    assert.deepEqual( query, result);
  });

  it('should return an array of all records in current inventory between a specified retail price range', function(){
    var query = store1.inventoryCountRetailPriceBetween(8, 12);
    var result = [ record1, record2, record3, record5 ];
    assert.deepEqual( query, result );
  });

  // it('should allow Search Inventory to work as a callback method- test artist', function(){
  //   var query = store1.searchInventory( searchRecordArtist, 'AC/DC');
  //   var result = [ record1, record2, record5 ];
  //   assert.deepEqual( query, result );
  // });


});