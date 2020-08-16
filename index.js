function initComparisons() {
  var x, i, y;
  /* Find all elements with an "overlay" class: */
  x = document.getElementsByClassName("img-comp-overlay");
  y = document.getElementsByClassName("first");
  var custom_offset = 36;  // custom adjustment from the left of the screen
  for (i = 0; i < x.length; i++) {
    /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i], y[i]);
  }

  function compareImages(img, img2) {
    /*  img = after photo
        img2 = before photo    */

    var slider, img, clicked = 0, w, h;
    /* Get the width and height of the img element */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* Set the width of the img element to 50%: */
    img.style.width = (w / 2) + "px";
    /* Create slider: */
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /* Insert slider */
    img.parentElement.insertBefore(slider, img);
    /* Position the slider in the middle: */
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = custom_offset + (w / 2) - (slider.offsetWidth / 2) + 13 + "px"; // added 13 to adjust slider to appear higher
    /* Execute a function when the mouse button is pressed:
    add event listener to both imaages and slideReady
    for easier interactivity
    */
  
    slider.addEventListener("mousedown", slideReady);

    slider.addEventListener("touchstart", slideReady);

    slider.addEventListener("pointerdown", slideReady);


     /* When touch or mouse released: */
       window.addEventListener("mouseup", slideFinish);
    window.addEventListener("touchcancel", slideFinish);
    window.addEventListener("pointerup", slideFinish);
    window.addEventListener("pointercancel", slideFinish);
    function slideReady(e) {
      /* Prevent any other actions that may occur when moving over the image: */
      e.preventDefault();
      /* The slider is now clicked and ready to move: */
      clicked = 1;
      /* Execute a function when the slider is moved: */
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
      window.addEventListener("pointermove", slideMove);

    }

    function slideFinish() {
      /* The slider is no longer clicked: */
      clicked = 0;
    }

    function slideMove(e) {
      var pos;
      /* If the slider is no longer clicked, exit this function: */
      if (clicked == 0) return false;
      /* Get the cursor's x position: */
      pos = getCursorPos(e)
      /* Prevent the slider from being positioned outside the image: */
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /* Execute a function that will resize the overlay image according to the cursor: */
      slide(pos);
    }

    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /* Get the x positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x coordinate, relative to the image: */
      x = e.pageX - a.left;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
        //
      /* Resize the image: */
      img.style.width = x + "px";
      /* Position the slider: */
      slider.style.left = custom_offset + img.offsetWidth - (slider.offsetWidth / 2) + 13 + "px";
    }
  }
}

initComparisons();
