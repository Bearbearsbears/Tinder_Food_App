touch.addEventListener('start', function (event) {
  startx = e.changedTouches[0].screenX;
})
touch.addEventListener('end', function (event){
  endx= e.changedTouches[0].screenX;
  checkDirection();
})
function checkDirection(){
  if (startx > endx){
    console.log ('swiped left')}
  if (startx <endx){
    console.log('swiped right')}
}
  
