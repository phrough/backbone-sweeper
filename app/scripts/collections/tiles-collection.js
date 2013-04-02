minesweeper.Collections.Tiles = Backbone.Collection.extend({

	model: minesweeper.Models.Tile,

	initialize: function() {
		var tileNumber = 1;
		for( y=1; y<=minesweeper.gridCols; y++ ) {
			for( x=1; x<=minesweeper.gridRows; x++ ) {
				this.add({ id: tileNumber, xPos: x, yPos: y }); 
				this.get(tileNumber).set('parent', this);
				tileNumber++;
			}
		}
		this.introduceBombs();
	},

	introduceBombs: function() {
		var bombs = minesweeper.bombs;
		while (bombs) {
		    var randomNumber = Math.floor( ( minesweeper.gridCols * minesweeper.gridRows ) * Math.random() ) + 1;
		    
		    if ( !this.get(randomNumber).get('bomb') ) {
		        this.get(randomNumber).set( { bomb: true } );
		        //update nieghbors to reflect this bomb
		        theNeighborList = this.get(randomNumber).get('neighbors');
				for( x=0; x < theNeighborList.length; x++ ) {
					var currentNeighbor = theNeighborList[x];
					this.get(currentNeighbor).set( 'neighborBombs', this.get(currentNeighbor).get('neighborBombs') + 1 );
				}
		        bombs--;
		    }
		}
	},

	neighborCascade: function( neighborList ) {
		_.each( neighborList, this.markAsCleared, this );
	},

	markAsCleared: function( neighborId ) {
		this.get(neighborId).set('cleared', true);
	}

});
