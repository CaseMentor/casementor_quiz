$(document).ready(function () {
  // Check if there is any data in the local storage.
  if (localStorage.getItem('journalData')) {
    const journalData = JSON.parse(localStorage.getItem('journalData'));
    $('#journal_container').html(journalData);
  }
  if (localStorage.getItem('count_down')) {
    const count_down = localStorage.getItem('count_down');
    $('#count_down').html(count_down);
  }
});

// Set the date we're coounting down to
var countDownDate = new Date().getTime() + 35 * 60 * 1000;

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="count_down"
  document.getElementById("count_down").innerHTML = hours + ":"
    + minutes + ":" + seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("count_down").innerHTML = "Time's Up";
  }
}, 1000);

$(function () {
  // Make elements with class 'draggable' draggable
  $(".draggable").draggable({
    helper: function () {
      return $(this).clone().css("z-index", 10).appendTo('body');
    },
    revert: 'invalid',
    start: function () {
      // Change the appearance of the original element as soon as the drag starts
      $(this).addClass('afterDrag').removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging');
      // .draggable('disable');
    }
  });

  // Make the 'Journal_container' a droppable for the draggable
  $(".right_screen").droppable({
    accept: ".draggable",
    tolerance: "pointer",
    drop: function (event, ui) {
      var newElem = $(ui.helper).clone(false);
      newElem.removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging').css({ 'position': 'relative', 'left': '', 'top': '' });
      var title = ui.helper.data('title');
      // Add a title to the new element
      newElem.prepend("<div class='title'>" + title + "</div>");
      // Add a horizontal line after the new element

      newElem.appendTo(this);
      $("<hr>").appendTo(this);

    }// log the dropped element
  });
});


$("#sort1,#sort2").disableSelection();
//  Complete Investigation function
function showConfirmBox() {
  const journalData = $('#journal_container').html();
  localStorage.setItem('journalData', JSON.stringify(journalData));
  const count_down = $('#count_down').html();
  localStorage.setItem('count_down', count_down);
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


// This assumes you have a button with the id "nextPageButton"
$("#nextPageButton").click(function () {
  // This stores the journal contents before going to the next page
  const journalData = $('#journal_container').html();
  localStorage.setItem('journalData', JSON.stringify(journalData));

  // This is where you'd put your code to navigate to the next page
  window.location.href = "calculator_question_1.html";
});

