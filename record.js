var Record = function( options ){
  this.artist = options['artist'];
  this.title = options['title'];
  this.purchasePrice = options['purchasePrice'];
  this.retailPrice = options['retailPrice'];
}

//  Two ways can call value from a hash in JS.

// options['artist']
// options.artist



module.exports = Record;