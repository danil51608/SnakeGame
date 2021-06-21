const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 900
canvas.height = 900
let snakeSpeed = 5
let direction = 'x'
let k = 1
let cleanerBreakPoints = []
let snakeCoord = []
let head;
let cleaner;
let apple;
function restartGame(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  k = 1
  direction = 'x'
  cleanerBreakPoints = [{'x':500, 'y':500, 'dir': 1, 'axis': 'x'}]
  head = {
  x: 500,
  y: 500,
  width: 20,
  height: 20,
  draw: function(){
    ctx.beginPath()
    ctx.fillStyle = 'green'
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.closePath()
    ctx.fill()
  }
}

apple = {
  x: 600,
  y: 500,
  width: 10,
  height: 10,
  draw: function(){
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.closePath()
    ctx.fill()
  }
}

cleaner = {
  x: 300,
  y: 500,
  width: 20,
  height: 20,
  axis: 'x',
  dir: 1,
  draw: function(){
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.closePath()
    ctx.fill()
  }
}
}



document.addEventListener('keydown', (e)=>{
 if(e.key==='ArrowUp'){
   direction = 'y'
   k = -1
   createBreakPointForCleaner(head.x, head.y, k, direction)
 }
 if(e.key==='ArrowDown'){
   direction = 'y'
   k = 1
   createBreakPointForCleaner(head.x, head.y, k, direction)
 }
 if(e.key==='ArrowLeft'){
   direction = 'x'
   k = -1
   createBreakPointForCleaner(head.x, head.y, k, direction)
 }
 if(e.key==='ArrowRight'){
   direction = 'x'
   k = 1
   createBreakPointForCleaner(head.x, head.y, k, direction)
 }

})

function createBreakPointForCleaner(x, y, dir, axis){
  cleanerBreakPoints.push({'x':x, 'y':y, 'dir':dir, 'axis':axis})
}

function move(){
  if(direction ==='x'){
    head.x += snakeSpeed*k
  }
  if(direction==='y'){
    head.y += snakeSpeed*k
  }
}

function moveCleaner(){
  if(cleaner.axis == 'x'){
    cleaner.x += snakeSpeed*cleaner.dir
  }
  if(cleaner.axis == 'y'){
    cleaner.y += snakeSpeed*cleaner.dir
  }
}

function checkCleaner(){
  if(cleanerBreakPoints.length>0){
    const x = cleanerBreakPoints[0].x
    const y = cleanerBreakPoints[0].y
    const dir = cleanerBreakPoints[0].dir
    const axis = cleanerBreakPoints[0].axis
    if(cleaner.x == x && cleaner.y == y){
        cleaner.x = x
        cleaner.y = y
	cleaner.axis = axis
        cleaner.dir = dir
        cleanerBreakPoints.shift()
    }
  }

}

function generateAppleCoord(){
 if(head.x+20 >= apple.x && apple.x >= head.x){
   if(head.y + 20 >= apple.y && apple.y >= head.y){
     ctx.clearRect(apple.x - 2, apple.y - 2, 15, 15);
     apple.x = Math.random()*(canvas.width - 10)
     apple.y = Math.random()*(canvas.height - 10)
     makeSnakeLonger()
   }
 }
}

function makeSnakeLonger(){
  if(cleaner.axis === 'x'){
    cleaner.x -= cleaner.dir * 50
  }
  if(cleaner.axis === 'y'){
    cleaner.y -= cleaner.dir * 50
  }
}


function collision(){
  if(head.x > canvas.width || head.x < -10 || head.y < -10 || head.y > canvas.height){
      alert('Game Over!')
      restartGame()
  }
  if(cleanerBreakPoints.length >= 1){
    for(let i=1; i<cleanerBreakPoints.length; i++){
        let firstPoint = cleanerBreakPoints[i-1]
        let secondPoint = cleanerBreakPoints[i]
        if(direction === 'x' ){
          if(head.x == firstPoint.x && head.x == secondPoint.x && head.y < firstPoint.y && head.y > secondPoint.y){
            console.log(cleanerBreakPoints)
            console.log(head.x + ' ' + head.y)
	    alert('Game Over!')
         
	    restartGame()
          }
          if(head.x == firstPoint.x && head.x == secondPoint.x && head.y > firstPoint.y && head.y < secondPoint.y){
            console.log(cleanerBreakPoints)
            console.log(head.x + ' ' + head.y)
	    alert('Game Over!')
	    restartGame()
          }
        }
        if(direction === 'y' ){
          if(head.y == firstPoint.y && head.y == secondPoint.y && head.x < firstPoint.x && head.x > secondPoint.x){
            console.log(cleanerBreakPoints)
            console.log(head.x + ' ' + head.y)
	    alert('Game Over!')
	    restartGame()
          }
          if(head.y == firstPoint.y && head.y == secondPoint.y && head.x > firstPoint.x && head.x < secondPoint.x){
            console.log(cleanerBreakPoints)
            console.log(head.x + ' ' + head.y)
	    alert('Game Over!')
	    restartGame()
          }
        }

    }


  }

}

restartGame()
function play(){
 head.draw()
 cleaner.draw()
 apple.draw()
 move()
 collision()
 checkCleaner()
 moveCleaner();
 generateAppleCoord()
 requestAnimationFrame(play)	
}

play()









