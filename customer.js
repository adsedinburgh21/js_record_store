var Customer = function( options ){
  this.name = options.name,
  this.cash = options.cash,
  this.recordCollection = [ ]
};

Customer.prototype = {

  buy: function( record ){
    if(this.cash >= record.retailPrice){
      this.cash -= record.retailPrice;
      this.recordCollection.push( record );
    };
  },

  sell: function( record ){
    for( item of this.recordCollection){
      if( (item.artist === record.artist) && (item.title === record.title) ){
        this.removeFromRecordCollection( record );
        this.cash += record.purchasePrice;
      };
    };
  },

  removeFromRecordCollection: function( record ){
    var index = this.recordCollection.indexOf( record );
    this.recordCollection.splice( index, 1);
  }
};

  

module.exports = Customer;