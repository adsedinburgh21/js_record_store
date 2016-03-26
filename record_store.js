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

  rangeOfRecordsInStock: function(){
    this.rangeOfRecords = [ ];
    for( var record of this.inventory){
      if( !this.inCurrentRange( record ) ){
        this.rangeOfRecords.push( record );
      };
    };
    return this.rangeOfRecords.length;
  },
  // // could re-use this code without the .length on the end, eg on display mode on browser could do an each and do .artist and .title to list all records in stock (1 of each, whats in stock not how many in stock. could also run numberInStock on the each and it would show quantity in stock)

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
  }
  //// could maybe refactor with map



  // // pass in record, return how many in stock:
  //// counter = 0, if record = item


  // detailInventory: function(){
  //   return {
  //     'Total Records': this.totalRecordsInInventory()
  //   }
  // },

}


module.exports = RecordStore;