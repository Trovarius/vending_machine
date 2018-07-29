class VendingMachine{
	constructor(){
		this.setupLabels();
		this.setInitialDisabled();
		this.bindEventListeners();
		
		this.scene = {
			letter: '',
			number: ''
		};
	}
	
	setupLabels(){
		$('[data-shelf]').each((i, el)=>{
			var letter = $(el).data('shelf');
			
			this.addNumpad(letter, 'letter');
			
			$('[data-can]', el).each((j, el2)=>{
				var name = $(el2).data('name');
				
				$(el2).append('<div class="can-label">' + name + '</div>');
			});
		});
		
		for(var i = 1; i < 6; i++){
			this.addNumpad(i, 'number');
		}
	}
	
	bindEventListeners(){
		$('[data-label]').on('click', (e)=>{
			if(!$(e.currentTarget).hasClass('disabled')){
				var val = $(e.currentTarget).data('label');
				var type = $(e.currentTarget).data('type');

				this.addVal(val, type);
			}
		});
	}
	
	addNumpad(label, type){
		$('.numpad').append('<button data-label="' + label + '" data-type="' + type + '">' + label + '</button>');
	}
	
	setInitialDisabled(){
		$('[data-type="letter"]').removeClass('disabled');
		$('[data-type="number"]').addClass('disabled');
	}
	
	disableAll(){
		$('[data-type]').addClass('disabled');
	}
	
	resetVals(){
		this.scene.letter = '';
		this.scene.number = '';
		
		this.showVal();
	}
	
	addVal(val, type){
		if(type === 'letter'){
			this.scene.letter = val;
			this.scene.number = '';
		} else {
			this.scene.number = val;
		}
		
		this.validate();
	}
	
	validate(){
		if(this.scene.letter.length){
			$('[data-type="number"]').removeClass('disabled');
		}
		
		if(this.scene.number){
			$('[data-type="number"]').addClass('disabled');
			this.getBeverage();
		}
		
		this.showVal();
	}
	
	showVal(){
		$('.current-input').text(this.scene.letter + this.scene.number);
	}
	
	getBeverage(){
		console.log('getting drink : ' + this.scene.letter + this.scene.number);
		this.disableAll();
		
		this.getPosition();
	}
	
	getPosition(){
		var el = $('[data-shelf="' + this.scene.letter + '"] [data-can="' + this.scene.number + '"]');
		
		var x = el[0].offsetLeft;
		var y = el[0].offsetTop;
		
		this.setPosition(x, y, ()=>{
			// Getting the product
			
			this.appendTheCan();
			
			this.setPosition(110, 420, ()=>{
				// Dropping the product
				
				this.dropTheCan();
				
				this.showCan();
				
				this.setPosition(195, 345, ()=>{
					// Reset to starting position
					this.setInitialDisabled();
					this.resetVals();
				});
			});
		});
	}
	
	showCan(){
		$('.tray-inner').append('<div class="container" data-can="' + this.scene.number + '"><div class="can"></div></div>');
		
		$('.tray').addClass('open');
		
		setTimeout(()=>{
			$('.tray').removeClass('open');
			$('.tray-inner [data-can]').addClass('hide');
			
			setTimeout(function(){
				$('.tray-inner [data-can]').remove();
			}, 750);
		}, 2500);
	}
	
	appendTheCan(){
		$('.hand').append('<div class="container" data-can="' + this.scene.number + '"><div class="can"></div></div>');
	}
	
	dropTheCan(){
		$('.hand [data-can]').remove();
	}
	
	setPosition(x, y, callback){
		$('.hand').on('transitionend', ()=>{
			
			$('.hand').off('transitionend');
			
			setTimeout(function(){
				callback();
			}, 500);
			
		});
		
		this.calculateVelocity(x, y, (velX, velY)=>{
			$('.arm').css({
				'top': (y + 35) + 'px',
				'transition-duration': velY + 's'
			});

			$('.hand').css({
				'left': (x + 5) + 'px',
				'transition-duration': velX + 's',
				'transition-delay': velY + 's'
			});
		});
	}
	
	calculateVelocity(x, y, callback){
		var currentX = $('.hand')[0].offsetLeft;
		var currentY = $('.arm')[0].offsetTop;
		
		var velX = Math.ceil((Math.max(currentX, x) - Math.min(currentX, x)) / 70);
		var velY = Math.ceil((Math.max(currentY, y) - Math.min(currentY, y)) / 70);
		
		callback(velX, velY);
	}
}