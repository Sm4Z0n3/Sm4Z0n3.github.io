window.addEventListener("beforeunload", function() {
    document.body.style.opacity = "0";
  });
  
  window.addEventListener("load", function() {
    document.body.style.opacity = "1";
  });
  
  document.addEventListener('mousemove', function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var body = document.querySelector('body');
  body.style.backgroundPositionX = -x/50 + 'px';
  body.style.backgroundPositionY = -y/50 + 'px';
  });
  
  function Anm(){
      document.querySelector(".play").style.transform = 'translateY(-1000px)';
      document.querySelector(".menu").style.marginLeft = '200px';
  }
  
  function expandText(element) {
      element.querySelector("span").style.height = "100px";
      console.log(element)
  }
  
  function collapseText(element) {
      element.querySelector("span").style.height = "0px";
  }