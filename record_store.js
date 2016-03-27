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



// // rangeOfRecordsInStock lists all stocked records - 1 of each, no doubles. In a display model could then do each on the array that is returned and then list details of each record, eg. record.title, record.artist, record.retailPrice, store.numberInStock( record )
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

  numberInStock: function( record ){
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
      this.cash += record.retailPrice;
      this.removeFromInventory( record );
    },

  removeFromInventory: function( record ){
    var index = this.inventory.indexOf( record );
    this.inventory.splice( index, 1);
  },

  buy: function( record ){
    this.cash -= record.purchasePrice;
    this.inventory.push( record );
  },

}


module.exports = RecordStore;