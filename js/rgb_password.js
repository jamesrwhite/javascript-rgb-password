/*
*
* RGB Password
* @author: James White
* @date: 20/11/11
*
*/

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
  var hash = 0;
  if (this.length == 0) return hash;
  for (i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// Based on http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    function finalise(color) {
      return Math.round(color * 255)
    }

    return {r:finalise(r), g:finalise(g), b:finalise(b)};
}


window.onload = function() {
  var password = {
    selector: document.getElementById("password"),
    boxes: [
      document.getElementById("one"),
      document.getElementById("two"),
      document.getElementById("three")
    ],
    saturation: 0.5,
    lightness: 0.5,
    salts: [
      2462,
      3637,
      7432
    ]
  };
  
  password.selector.onkeyup = function() {
    var hashCode = password.selector.value.hashCode();
    
    for(var i in password.boxes) {
      var box = password.boxes[i];

      var salt = password.salts[i];
      var hue = (hashCode % salt)/salt;
      var color = hslToRgb(hue, password.saturation, password.lightness);
      
      box.style.backgroundColor = "rgb("
        + color.r + ", "
        + color.g + ", "
        + color.b +
      ")";
    }
  }
}