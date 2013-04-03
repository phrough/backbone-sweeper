window.minesweeper = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	bombs: 10,
	gridCols: 8,
	gridRows: 8,
	tileCount: 0,
	clearedTiles: 0,
	remainingTiles: 0,

	// init: function() {
	// 	$('.ms-board').addClass('cols-' + minesweeper.gridCols);
	// 	minesweeper.Tiles = new minesweeper.Collections.Tiles;
	// },

	newGame: function() {
		$('.ms-board').empty().addClass('cols-' + minesweeper.gridCols);
		minesweeper.tileCount = minesweeper.gridCols * minesweeper.gridRows;
		minesweeper.clearedTiles = 0;
		minesweeper.remainingTiles = minesweeper.tileCount - minesweeper.bombs;
		minesweeper.Tiles = new minesweeper.Collections.Tiles;
	}

};

$(document).ready(function(){
	minesweeper.newGame();

	$('#new-game-submit').on('click', function(){
		minesweeper.gridCols = $('#count-cols');
		minesweeper.gridRows = $('#count-rows');
		minesweeper.bombs = $('#count-bombs');
		minesweeper.newGame();
	});
});
