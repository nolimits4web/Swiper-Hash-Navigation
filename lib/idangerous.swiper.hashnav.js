Swiper.prototype.plugins.hashNav = function(swiper, params) {
  var isH = swiper.params.mode == 'horizontal';
  if(!params) return;

  function updateHash(internal){
    var newHash = swiper.activeSlide().getAttribute('data-hash')
    if (!newHash) newHash = '';
    document.location.hash = newHash;
  }
  function swipeToHash(e){
    var hash = document.location.hash;
    if (!hash) return;
    var hash = hash.replace('#','');
    var speed = e ? swiper.params.speed : 0;
    for (var i=0; i<swiper.slides.length; i++) {
      var slide = swiper.slides[i];
      var slideHash = slide.getAttribute('data-hash');
      if (slideHash == hash && slide.getData('looped')!==true) {
          var index = slide.index()
          if (swiper.params.loop) index = index - swiper.loopedSlides;
          swiper.swipeTo(index, speed);
      }
    }
  }

  //Plugin Hooks
  var hooks = {
    onSwiperCreated : function(args){
      swipeToHash()
    },
    onSlideChangeStart: function(){
      updateHash(true)
    },
    onSwipeReset: function(){
      updateHash(true)
    }
  }
  return hooks
}
