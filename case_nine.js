// Set the date we're coounting down to
var countDownDate = new Date().getTime() + 35 * 60 * 1000;

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="count_down"
  document.getElementById("count_down").innerHTML =  hours + ":"
  + minutes + ":" + seconds;
    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("coundt_down").innerHTML = "EXPIRED";
      }
    }, 1000);
    //  Complete Investigation function
function showConfirmBox() {
    document.getElementById("overlay").hidden = false;
  }
  function closeConfirmBox() {
    document.getElementById("overlay").hidden = true;
  }
  
  function isConfirm(answer) {
    if (answer) {
      alert("Answer is yes");
    } else {
      closeConfirmBox;
    }
    closeConfirmBox();
  }