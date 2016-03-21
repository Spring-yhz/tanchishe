$(function(){
  

    var s = '';
	for(var i = 0 ; i < 20; i++){
		for(var j = 0; j < 20; j++ ){
			var id = i+'_'+j;
			s += '<div id="'+id+'" class="block"></div>'
		}
	}
	$('#sence').html(s);
	var snake = [ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
	var data =  {'0_0':true,'0_1':true,'0_2':true};
	var huashe  = function(){
		$.each(snake,function(index,value){
			$('#'+ value.x + '_'+ value.y).css({backgroundImage:'url(./img/bei.png)'});
		})
	}
	huashe();
 var kaishi=function(){
	var dropFood = function() {
		var x = Math.floor(Math.random()*20);		
		var y = Math.floor(Math.random()*20);		
		while( data[x+'_'+y] ){
			x = Math.floor(Math.random()*20);		
			y = Math.floor(Math.random()*20);
		$('#'+x+'_'+y).css({backgroundImage:'url(./img/shi.png)'});		
		}
		$('#'+x+'_'+y).css({backgroundImage:'url(./img/shi.png)'});

		// $xx.apend("<img/>")
		return {x:x,y:y};
	}	
	var food = dropFood();
	var fangxiang = 39;
	var $tan=$('#tan');
	var score=0;

	var move = function () {
		var oldTou = snake[snake.length-1];
		if(fangxiang == 39){
			var newTou = {x:oldTou.x,y:oldTou.y+1};
		}
		if(fangxiang == 40 ){
			var newTou = {x:oldTou.x+1,y:oldTou.y};
		}
		if(fangxiang == 37){
			var newTou = {x:oldTou.x,y:oldTou.y-1};
		}
		if(fangxiang == 38){
			var newTou = {x:oldTou.x-1,y:oldTou.y};
		}
		if(newTou.x<0||newTou.y<0||newTou.x>19||newTou.y>19||data[newTou.x+'_'+newTou.y]){
			alert('撞死了');
			alert('Game over！！！你的分数：'+score);
			//  $tan.attr('class','tan');
			// $('.block').css({background:'none'});
			clearInterval(timerId);
			/***********************/
			return;
		}
		if(newTou.x == food.x && newTou.y == food.y){
			score+=10;
			food = dropFood();

		}else{
			var weiba = snake.shift();
			delete data[weiba.x+'_'+weiba.y];
			$('#'+weiba.x+'_'+weiba.y).css({backgroundImage:'url(./img/bei2.png)'});
		}
		snake.push(newTou)
		data[newTou.x + '_' + newTou.y] = true;
		$('#'+newTou.x + '_' + newTou.y).css({backgroundImage:'url(./img/bei.png)'})


	}	
	var timerId = setInterval(move,200);

	$(document).keydown(function(e){
		if( Math.abs(e.keyCode - fangxiang) == 2 ){
			return;
		}
		if( !(e.keyCode>=37 && e.keyCode<=40 ) ){
			return;
		}
	    fangxiang = e.keyCode;
	})	

   }
 
   var $begin=$('.begin'); 
   $begin.bind('click',function(e){
   	   $(this).css({display:'none'});
   	   window.requestAnimationFrame(kaishi);
   })
   //在浏览器动画程序中，我们通常使用一个定时器来循环每隔几毫秒移动目标物体一次，来让它动起来。如今有一个好消息，浏览器开发商们决定：“嗨，为什么我们不在浏览器里提供这样一个API呢，这样一来我们可以为用户优化他们的动画。”所以，这个requestAnimationFrame()函数就是针对动画效果的API，你可以把它用在DOM上的风格变化或画布动画或WebGL中。










	
})