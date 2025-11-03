startx = 0;
endx= 0;
//observes whether or not the user has touched screen and/or finished touching screen
//horizontal axis
touch.addEventListener('start', function (event) {
  startx = e.changedTouches[0].screenX;
})
touch.addEventListener('end', function (event){
  endx= e.changedTouches[0].screenX;
  checkDirection();
})
function checkDirection(){
  //compare horizontal distance to determine if user swiped left or right
  // need to adhere this to like/dislike buttons
  if (startx > endx){
    console.log ('swiped left')}
  if (startx <endx){
    console.log('swiped right')}
}
  
