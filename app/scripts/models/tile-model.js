minesweeper.Models.Tile = Backbone.Model.extend({
	idAttribute: 'id',
	defaults: {
		// id: null,
		parent: {},//set via the collection
		bomb: false,
		cleared: false,
		flagged: false,
		unknown: false,//not implemented yet
		neighborBombs: 0,
		xPos: 0,
		yPos: 0,
		neighbors: new Array()
	},
	
	initialize: function() {
		this.meetTheNeighbors();
		this.set( 'view', new minesweeper.Views.tile({ model: this }) );

		this.on('change:cleared', function() {
			minesweeper.clearedTiles++;
			minesweeper.remainingTiles--;
			if(minesweeper.remainingTiles == 0) {
				alert('Winner winner, chicken dinner.')
			}
			if(this.get('neighborBombs') === 0) {
				this.get('parent').neighborCascade(this.get('neighbors'));
			}
		});

	},

	meetTheNeighbors: function() {
		//lets build the list of neighbors.
		var neighborList = new Array();
		var thisId = this.get('id');
		switch (this.get('yPos')) {
			case 1://left edge
				switch (this.get('xPos')) {
					case 1://top left corner
						neighborList.push(thisId + 1);
						neighborList.push(thisId + minesweeper.gridCols);
						neighborList.push(thisId + minesweeper.gridCols + 1);
						break;
					case minesweeper.gridRows://top right corner
						neighborList.push(thisId - 1);
						neighborList.push(thisId + minesweeper.gridCols - 1);
						neighborList.push(thisId + minesweeper.gridCols);
						break
					default://top edge, no corner
						neighborList.push(thisId - 1);
						neighborList.push(thisId + 1);
						neighborList.push(thisId + minesweeper.gridCols - 1);
						neighborList.push(thisId + minesweeper.gridCols);
						neighborList.push(thisId + minesweeper.gridCols + 1);
				}
				break;
			case minesweeper.gridCols://right edge
				switch (this.get('xPos')) {
					case 1://bottom left corner
						neighborList.push(thisId + 1);
						neighborList.push(thisId - minesweeper.gridCols);
						neighborList.push(thisId - minesweeper.gridCols + 1);
						break;
					case minesweeper.gridRows://bottom right corner
						neighborList.push(thisId - 1);
						neighborList.push(thisId - minesweeper.gridCols - 1);
						neighborList.push(thisId - minesweeper.gridCols);						
						break
					default://bottom edge, no corner
						neighborList.push(thisId - minesweeper.gridCols - 1);
						neighborList.push(thisId - minesweeper.gridCols);
						neighborList.push(thisId - minesweeper.gridCols + 1);
						neighborList.push(thisId - 1);
						neighborList.push(thisId + 1);
				}
				break;
			default:
				switch (this.get('xPos')) {
					case 1://left edge, not a corner
						neighborList.push(thisId - minesweeper.gridCols);
						neighborList.push(thisId - minesweeper.gridCols + 1);
						neighborList.push(thisId + 1);
						neighborList.push(thisId + minesweeper.gridCols);
						neighborList.push(thisId + minesweeper.gridCols + 1);
						break;
					case minesweeper.gridRows://right edge, not a corner
						neighborList.push(thisId + minesweeper.gridCols - 1);
						neighborList.push(thisId + minesweeper.gridCols);
						neighborList.push(thisId - 1);
						neighborList.push(thisId - minesweeper.gridCols - 1);
						neighborList.push(thisId - minesweeper.gridCols);
						break
					default://middle block, all 8 surrounding
						neighborList.push(thisId - minesweeper.gridCols - 1);
						neighborList.push(thisId - minesweeper.gridCols);
						neighborList.push(thisId - minesweeper.gridCols + 1);
						neighborList.push(thisId - 1);
						neighborList.push(thisId + 1);
						neighborList.push(thisId + minesweeper.gridCols - 1);
						neighborList.push(thisId + minesweeper.gridCols);
						neighborList.push(thisId + minesweeper.gridCols + 1);						
				}
		}//switch (this.get('yPos'))
		this.set('neighbors', neighborList);
	}

});
