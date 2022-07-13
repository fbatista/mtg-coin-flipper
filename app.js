(function() {
  function coinflip(n) {
    if(n < 1000) {
      return iterative(n);
    } else {
      const mean = n / 2;
      const sd = Math.sqrt(mean * 0.25);
      const p = Math.random();
      const x1 = inverseNormal(p);
      
      return Math.round(mean+sd*x1);
    }
  }

  function iterative(n) {
    var x = 0;
    for(var i = 0; i < n; i++) {
      if(Math.random() < 0.5) {
        x = x + 1;
      }
    }
    return x;
  }

  function inverseNormal(p) {

    const a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    const a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    const b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    const b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    const c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    const c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    const d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    const p_low = 0.02425, p_high = 1 - p_low;
    let q, r;
    let retVal;

    if ((p < 0) || (p > 1)) {
      alert("p out of range.");
      retVal = 0;
    }
    else if (p < p_low) {
      q = Math.sqrt(-2 * Math.log(p));
      retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high) {
      q = p - 0.5;
      r = q * q;
      retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
  }

  var initApplication = function() {
    document.getElementById('competitive_solver').onreset = function(e) {
      document.getElementById('competitive_wins_count').innerHTML = '';
    };
    document.getElementById('competitive_solver').onsubmit = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var f = parseInt(document.getElementById('competitive_flips_count').value);
      var w = 0;
      var verbose = document.getElementById('competitive_verbose').checked;
      var output = [];
      if (f > 1000) {
        w = coinflip(f);
      } else {
        for (var i = 0; i < f; i++) {
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
          if (verbose && i != (f - 1)) {
            output.push(' | ');
          }
        }
      }
      
      if (verbose && f <= 1000) {
        document.getElementById('competitive_wins_count').innerHTML = (
          w.toString() + '<br/>' +
          '<code>' + output.join('') + '</code>'
        );
      } else if (verbose && f > 1000) {
        document.getElementById('competitive_wins_count').innerHTML = (
          w.toString() + '<br/>' +
          '<code>Too many flips to display all results!</code>'
        );
      } else {
        document.getElementById('competitive_wins_count').innerHTML = w.toString();
      }
    }

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
      if (f > 1000 && k == 1) {
        w = coinflip(f);
        verbose = false;
      } else {
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
