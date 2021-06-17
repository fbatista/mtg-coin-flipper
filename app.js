(function() {
  var initApplication = function() {
    document.getElementById('frenetic_solver').onreset = function(e) {
      document.getElementById('frenetic_wins_count').innerHTML = '';
    };
    document.getElementById('frenetic_solver').onsubmit = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var k = Math.pow(2, parseInt(document.getElementById('frenetic_krark_thumb_count').value));
      var f = parseInt(document.getElementById('frenetic_flips_count').value);
      var w = 0;
      var verbose = document.getElementById('frenetic_verbose').checked;
      var output = [];
      for (var i = 0; i < f; i++) {
        for (var j = 0; j < k; j++) {
          if (Math.random() < 0.5) {
            w = w + 1;
            if (verbose) {
              output.push('H');
            }
            break;
          }
          if (verbose) {
            output.push('T');
          }
        }
        if (verbose && i != (f - 1)) {
          output.push(' | ');
        }
      }
      if (verbose) {
        document.getElementById('frenetic_wins_count').innerHTML = (
          w.toString() + '<br/>' +
          '<code>' + output.join('') + '</code>'
        );
      } else {
        document.getElementById('frenetic_wins_count').innerHTML = w.toString();
      }
    };
  
    document.getElementById('okaun_solver').onreset = function(e) {
      document.getElementById('okaun_wins_count').innerHTML = '';
      document.getElementById('okaun_multi').innerHTML = '';
    };
    document.getElementById('okaun_solver').onsubmit = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var t = parseInt(document.getElementById('okaun_krark_thumb_count').value);
      var max = parseInt(document.getElementById('okaun_max').value);
      var stop_at_max = document.getElementById('okaun_stop').checked;
      if (t >= 5) {
        document.getElementById('okaun_wins_count').innerHTML = "This is going to take a while to compute... (hint: it's going to be a very large number)";
        document.getElementById('okaun_multi').innerHTML = "Infinity";
      }
      setTimeout(function () {
        var verbose = document.getElementById('okaun_verbose').checked;
        var output = [];
        var k = Math.pow(2, t);
        var winning = true;
        var w = 0;
        while (winning) {
          var pre = w;
          for (var j = 0; j < k; j++) {
            if (stop_at_max && w >= max) {
              if (Math.random() < 0.5) {
                if (verbose) {
                  output.push('T');
                }
                break;
              } else {
                if (j == (k - 1)) {
                  w = w + 1;
                }
                if (verbose) {
                  output.push('H');
                }
                continue;
              }
            }
            if (Math.random() < 0.5) {
              w = w + 1;
              if (verbose) {
                output.push('H');
              }
              break;
            }
            if (verbose) {
              output.push('T');
            }
          }
          if (pre == w) {
            winning = false;
          }
          if (verbose && winning) {
            output.push(' | ');
          }
        }
        document.getElementById('okaun_multi').innerHTML = Math.pow(2, w);
  
        if (verbose) {
          document.getElementById('okaun_wins_count').innerHTML = (
            w.toString() + '<br/>' +
            '<code>' + output.join('') + '</code>'
          );
        } else {
          document.getElementById('okaun_wins_count').innerHTML = w.toString();
        }
      }, 100)
    };
  
    document.getElementById('krark_solver').onreset = function(e) {
      document.getElementById('krark_hand').innerHTML = '';
      document.getElementById('krark_wins_count').innerHTML = '';
    };
    document.getElementById('krark_solver').onsubmit = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var k = Math.pow(2, parseInt(document.getElementById('krark_thumb_count').value));
      var s = parseInt(document.getElementById('krarks_count').value);
      var t = parseInt(document.getElementById('krarks_enhancers').value) + 1;
      s = t * s;
      var returned_to_hand = false;
      var successful_copy = false;
      var attempt_before = document.getElementById('krark_before').checked
      var attempt_after = document.getElementById('krark_after').checked
      var max = parseInt(document.getElementById('krark_max').value);
      var stop_at_max = document.getElementById('krark_stop').checked;
      var verbose = document.getElementById('krark_verbose').checked;
      var output = [];
  
      var w = 0;
      for (var i = 0; i < s; i++) {
        for (var j = 0; j < k; j++) {
          if (returned_to_hand == false) {
            if (successful_copy == false) {
              if (attempt_before) {
                if (Math.random() < 0.5) {
                  returned_to_hand = true;
                  if (verbose) {
                    output.push('T');
                  }
                  break;
                } else {
                  if (j == (k - 1)) {
                    w = w + 1;
                  }
                  if (verbose) {
                    output.push('H');
                  }
                  continue;
                }
              }
            } else {
              if (attempt_after) {
                if (Math.random() < 0.5) {
                  returned_to_hand = true;
                  if (verbose) {
                    output.push('T');
                  }
                  break;
                } else {
                  if (j == (k - 1)) {
                    w = w + 1;
                  }
                  if (verbose) {
                    output.push('H');
                  }
                  continue;
                }
              }
            }
          }
          if (stop_at_max && w >= max) {
            if (Math.random() < 0.5) {
              if (verbose) {
                output.push('T');
              }
              break;
            } else {
              if (j == (k - 1)) {
                w = w + 1;
              }
              if (verbose) {
                output.push('H');
              }
              continue;
            }
          }
          if (Math.random() < 0.5) {
            successful_copy = true
            w = w + 1;
            if (verbose) {
              output.push('H');
            }
            break;
          }
          if (verbose) {
            output.push('T');
          }
        }
        if (verbose && i != (s - 1)) {
          output.push(' | ');
        }
      }
      document.getElementById('krark_hand').innerHTML = (w < s) ? 'Yes' : 'No';
  
      if (verbose) {
        document.getElementById('krark_wins_count').innerHTML = (
          w.toString() + '<br/>' +
          '<code>' + output.join('') + '</code>'
        );
      } else {
        document.getElementById('krark_wins_count').innerHTML = w.toString();
      }
    };
  
    document.getElementById('mana_solver').onreset = function(e) {
      document.getElementById('mana_hand').innerHTML = '';
      document.getElementById('mana_generated').innerHTML = '';
    };
    document.getElementById('mana_solver').onsubmit = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var k = Math.pow(2, parseInt(document.getElementById('mana_thumb').value));
      var s = parseInt(document.getElementById('mana_krarks').value);
      var t = parseInt(document.getElementById('mana_krarks_enhancers').value) + 1;
      s = t * s;
      var mana_sk = parseInt(document.getElementById('mana_sk').value);
      var mana_ts = parseInt(document.getElementById('mana_ts').value);
      var mana_out = parseInt(document.getElementById('mana_out').value);
      var mana_in = parseInt(document.getElementById('mana_in').value);
      var desired_mana = parseInt(document.getElementById('desired_mana').value);
      var attempt_before = document.getElementById('mana_before').checked
      var attempt_after = document.getElementById('mana_after').checked
      var verbose = document.getElementById('mana_verbose').checked;
      var output = [];
  
      var current_mana = 0;
      var returned_to_hand = false;
      var over = false;
      while(current_mana < desired_mana && !over) {
        var w = 0;
        current_mana = current_mana + mana_sk;
        for (var i = 0; i < s; i++) {
          for (var j = 0; j < k; j++) {
            if(!returned_to_hand && (current_mana >= desired_mana || (attempt_before && w == 0) || (attempt_after && w >= 1))) {
              if (Math.random() < 0.5) {
                returned_to_hand = true;
                if (verbose) {
                  output.push('T');
                }
                break;
              } else {
                if (j == (k - 1)) {
                  w = w + 1;
                  current_mana = current_mana + mana_out + mana_sk + 2 * mana_ts;
                }
                if (verbose) {
                  output.push('H');
                }
                continue;
              }
            }
            if (Math.random() < 0.5) {
              w = w + 1;
              current_mana = current_mana + mana_out + mana_sk + 2 * mana_ts;
              if (verbose) {
                output.push('H');
              }
              break;
            }
            if (j == (k - 1)) {
              returned_to_hand = true;
            }
            if (verbose) {
              output.push('T');
            }
          }
          if (verbose && i != (s - 1)) {
            output.push(' | ');
          }
        }
        if (returned_to_hand) {
          if (current_mana >= mana_in && current_mana < desired_mana) {
            current_mana = current_mana - mana_in;
            returned_to_hand = false;
            if (verbose) {
              output.push("\nRecast\n");
            }
          } else {
            over = true;
          }
        } else {
          current_mana = current_mana + mana_out;
          over = true;
        }
      }
      document.getElementById('mana_hand').innerHTML = (w < s) ? 'Yes' : 'No';
  
      if (verbose) {
        document.getElementById('mana_generated').innerHTML = (
          current_mana.toString() + '<br/>' +
          '<code>' + output.join('') + '</code>'
        );
      } else {
        document.getElementById('mana_generated').innerHTML = current_mana.toString();
      }
    };
  };

  if (document.readyState === 'complete') {
    initApplication();
  } else {
    document.onreadystatechange = function () {
      if (document.readyState === 'complete') {
        initApplication();
      }
    }
  }
})();
