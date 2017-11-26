;"use strict";

var speedAnim = 30,
		cadrs, context, image, width, height;

$(function(){

	$('.image-packs-canvas').each(function(index, el) {
		var $this = $(this);
		context = $this.find('.canvas')['0'].getContext('2d');
		image = $this.find('img');
		cadrs = image.attr('data-cadrs');
		width = image.width();
		height = image.height()/cadrs;

		$this.find('.canvas').attr({
			'height': height,
			'width': width
		});

		context.drawImage(image['0'], 0, height*1, width, height, 0, 0, width, height);
	});

	

	$('.open-canvas').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		OpenPacksCanvas($this.closest('.image-packs-canvas'), $this.closest('.image-packs-canvas').find('img').attr('data-cadrs'));
	});

	$('.close-canvas').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		ClosePacksCanvas($this.closest('.image-packs-canvas'), $this.closest('.image-packs-canvas').find('img').attr('data-cadrs'));
	});

	$('.open').on('click', function(event) {
		event.preventDefault();
		OpenPacks($(this).parent());
	});

	$('.close').on('click', function(event) {
		event.preventDefault();
		ClosePacks($(this).parent());
	});
	
});

function OpenPacks($container){
	var i = 1;
	var $imageCont = $container.find('.image-container'),
			lastItem = $imageCont['0'].childElementCount;
	$container.find('.open, .close').css('pointer-events', 'none');
	var idTm = setInterval(function(){
		$imageCont.children('.img-item:nth-child('+i+')').hide();
		$imageCont.children('.img-item:nth-child('+(i+1)+')').show();
		i++;
		if (lastItem < i){
			$imageCont.children('.img-item:last-child').show();
			$container.find('.close').css('pointer-events', 'auto');
			clearInterval(idTm);
		}
	}, speedAnim);
};

function ClosePacks($container){
	var $imageCont = $container.find('.image-container'),
			lastItem = $imageCont['0'].childElementCount;
	var i = lastItem;
	$container.find('.open, .close').css('pointer-events', 'none');
	var idTm = setInterval(function(){
		$imageCont.children('.img-item:nth-child('+i+')').hide();
		$imageCont.children('.img-item:nth-child('+(i-1)+')').show();
		i--;
		if (!i){
			$imageCont.children('.img-item:first-child').show();
			$container.find('.open').css('pointer-events', 'auto');
			clearInterval(idTm);
		}
	}, speedAnim);
};

function OpenPacksCanvas($container, lastItem){
	var i = 1;
	context = $container.find('.canvas')['0'].getContext('2d');
	image = $container.find('img');
	cadrs = image.attr('data-cadrs');
	width = image.width();
	height = image.height()/cadrs;

	$container.find('.open-canvas, .close-canvas').css('pointer-events', 'none');
	var idTimer = setInterval(function(){
		if (!(i == 1))
			context.clearRect(0, 0, width, height);

		context.drawImage(image['0'], 0, height*i, width, height, 0, 0, width, height);
		if (lastItem-1 <= i) {
			$container.find('.close-canvas').css('pointer-events', 'auto');
			clearInterval(idTimer);
		}	else i++;
	}, speedAnim);
};

function ClosePacksCanvas($container, lastItem){
	var i = lastItem;

	context = $container.find('.canvas')['0'].getContext('2d');
	image = $container.find('img');
	cadrs = image.attr('data-cadrs');
	width = image.width();
	height = image.height()/cadrs;

	$container.find('.open-canvas, .close-canvas').css('pointer-events', 'none');
	var idTimer = setInterval(function(){
		if (!(i == lastItem))
			context.clearRect(0, 0, width, height);

		context.drawImage(image['0'], 0, height*i, width, height, 0, 0, width, height);

		if (!i) {
			$container.find('.open-canvas').css('pointer-events', 'auto');
			clearInterval(idTimer);
		}	else i--;
	}, speedAnim);
};