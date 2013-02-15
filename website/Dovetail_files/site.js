// Shrink article headings when cramped for space
// new Shrink({ target: '#logo', overflow: '.site-title .logo' });

Y.use('squarespace-image-loader', function(Y) {

  Y.on('domready', function() {

    var resizer = new Y.Squarespace.ResizeEmitter({timeout: 100});

    var heroImages = Y.all('#hero img[data-src]');
    resizer.on('resize:end', function() {
      heroImages.each(function(img) { ImageLoader.load(img) });
    });

    // SIDEBAR min-height set

    function setPageHeight() {
      var sidebarHeight;
      if (Y.one('#sidebar')) {
        sidebarHeight = Y.one('#sidebar').getComputedStyle('height');
      }
      if (sidebarHeight) {
        Y.one('#page').setStyle('min-height', sidebarHeight);
      }
    }

    // run on page load
    setPageHeight();

    // run when sidebar width is tweaked
    if (Y.Global) {
      Y.Global.on('tweak:change', function(f){
        if (f.getName() == 'blogSidebarWidth' ) {
          setPageHeight();
        }
      });
    }

  });

});
