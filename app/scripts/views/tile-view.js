minesweeper.Views.tile = Backbone.View.extend({

	tagName: 'li',
	tileTemplate: '',

	events: {
		'click': 'goTime',
		'contextmenu': 'incrementFlag'
	},

	initialize: function() {
		this.render();
		this.model.on('change:cleared', function(){
			this.get('view').goTime();
		});
	},

	render: function() {
		this.$el.html( '&nbsp;' );
		this.$el.toggleClass( 'flagged', this.model.get('flagged') );
		this.$el.toggleClass( 'unknown', this.model.get('unknown') );
		this.$el.appendTo('.ms-board');
		return this;
	},

	goTime: function() {

		if( this.model.get( 'flagged' ) ) {
			// tile is currently flagged. stop processing click
			return false;
		}
		
		if( this.model.get( 'bomb' ) ) {
			this.$el.addClass('bomb');
			alert('game over!');
		} else {
			this.model.set( 'cleared', true );
			this.$el.addClass('neighbor-bombs-' + this.model.get('neighborBombs'));
		}
		// console.log( 'click on ' + this.model.id );
	},

	incrementFlag: function() {
		if( this.model.get( 'cleared' ) ) { return false; }

		// this.$el.addClass( 'flagged' ) : this.$el.removeClass( 'flagged' );
		this.$el.toggleClass( 'flagged' );
		this.model.set( 'flagged', true );

		return false;//stops propogation to context menu
	}


});
