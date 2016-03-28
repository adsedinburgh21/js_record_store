var RecordStore = function( options ){
  this.name = options.name;
  this.city = options.city;
  this.inventory = options.inventory;
  this.cash = options.cash;
  this.rangeOfRecords = [];
}

RecordStore.prototype = {

  costOfInventory: function(){
    var total = 0;
    for(var record of this.inventory){
      total += record.purchasePrice;
    };
    return total;
  },

  retailValueOfInventory: function(){
    var total = 0;
    for(var record of this.inventory){
      total += record.retailPrice;
    };
    return total;
  },

  totalRecordsInInventory: function(){
    return this.inventory.length;
  },

  numberOfDifferentRecords: function(){
    return this.rangeOfRecordsInStock().length;
  },



// // rangeOfRecordsInStock lists all stocked records - 1 of each, no doubles. In a display model (eg. /records INDEX) could then do each on the array that is returned and then list details of each record, eg. record.title, record.artist, record.retailPrice, store.quantityInStock( record )
  rangeOfRecordsInStock: function(){
    this.rangeOfRecords = [ ];
    for( var record of this.inventory){
      if( !this.inCurrentRange( record ) ){
        this.rangeOfRecords.push( record );
      };
    };
    return this.rangeOfRecords;
  },

  inCurrentRange: function( record ){
    var result = false;
    for( var item of this.rangeOfRecords){
      if( (item.artist === record.artist) && (item.title === record.title) ){
        result = true;
      };
    };
    return result;
  },

  quantityInStock: function( record ){
    var counter = 0;
    for( var item of this.inventory){
      if( (item.artist === record.artist) && (item.title === record.title) ){
        counter += 1;
      };
    };
    return counter;
  },
  //// could maybe refactor with map

  sell: function( record ){ 
    for( item of this.inventory){
      if( (item.artist === record.artist) && (item.title === record.title) ){
        this.cash += record.retailPrice;
        this.removeFromInventory( record );
        break;
      };
    };
  },

  removeFromInventory: function( record ){
    var index = this.inventory.indexOf( record );
    this.inventory.splice( index, 1);
  },

  buy: function( record ){
    this.cash -= record.purchasePrice;
    this.inventory.push( record );
  },

  //// Search functions will not list multiple records of same type (artist & title), only lists one of each.
  searchRecordArtist: function( recordArtist ){
    var result = [];
    for( record of this.rangeOfRecordsInStock() ){
      if( record.artist === recordArtist ){
        result.push( record );
      };
    };
    return result;
  },

  searchRecordTitle: function( recordTitle ){
    var result = [];
    for( record of this.rangeOfRecordsInStock() ){
      if( record.title === recordTitle ){
        result.push( record );
      };
    };
    return result;
  },

  searchRetailPriceBetween: function( lowPrice, highPrice ){
    var result = [];
    for( record of this.rangeOfRecordsInStock() ){
      if( (record.retailPrice >= lowPrice) && (record.retailPrice <= highPrice) ){
        result.push( record );
      };
    };
    return result;
  },

  //// Inventory Count functions include multiples of records and is for managing stock.
  inventoryCountRecordArtist: function( recordArtist ){
    var result = [];
    for( record of this.inventory ){
      if( record.artist === recordArtist ){
        result.push( record );
      };
    };
    return result;
  },

  inventoryCountRecordTitle: function( recordTitle ){
    var result = [];
    for( record of this.inventory ){
      if( record.title === recordTitle ){
        result.push( record );
      };
    };
    return result;
  },

  inventoryCountRetailPriceBetween: function( lowPrice, highPrice ){
    var result = [];
    for( record of this.inventory ){
      if( (record.retailPrice >= lowPrice) && (record.retailPrice <= highPrice) ){
        result.push( record );
      };
    };
    return result;
  }

  // searchInventory: function(searchField, searchQuery){
  //   return this.searchField( searchQuery );
  // }

  //// Could add function to set record purchase and retail price. - where? store or record?
  //// How could I have put record purchase and retail price in store rather than record? Dont like the idea of passing record to customer with purchase and retail price attached.

};


module.exports = RecordStore;