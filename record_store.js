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
  // // could re-use this code without the .length on the end and do an each and do .artist, .title to list all records in stock (1 of each, not how many in stock)

  inCurrentRange: function( record ){
    var result = false;
    for( var item of this.rangeOfRecords){
      if( (item.artist === record.artist) && (item.title === record.title) ){
        result = true;
      };
    };
    return result;
  }



  // detailInventory: function(){
  //   return {
  //     'Total Records': this.totalRecordsInInventory()
  //   }
  // },

}


module.exports = RecordStore;