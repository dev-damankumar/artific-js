  function scrollIn(el){

      el.onwheel = function (event) {
      if (event.deltaY > 0) {
        if (Number(this.value) == 0) {

          this.value = 1;

        }
      } else {
        var val = Number(this.value);
        val += 1;
      }
    }
    }