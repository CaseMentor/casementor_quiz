
var countDownDate;

if (localStorage.getItem('countDownDate')) {
  countDownDate = localStorage.getItem('countDownDate');
} else {
  countDownDate = new Date().getTime() + 35 * 60 * 1000;
}

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="count_down"
  document.getElementById("count_down").innerHTML = minutes + ":" + seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("count_down").innerHTML = "Time's Up";
  } else {
    // Store countdown date to localStorage
    localStorage.setItem('countDownDate', countDownDate);
  }
}, 1000);

// end analysis btn
function showConfirmBox() {
  const journalData = $('#case_two').html();
  localStorage.setItem('case_2_answer', JSON.stringify(journalData));
  document.getElementById("overlay").hidden = false;
}
function closeConfirmBox() {
  document.getElementById("overlay").hidden = true;
}

function isConfirm(answer) {
  if (answer) {
    alert("Answer is yes");
  } else {
    closeConfirmBox();
  }
}
$(function () {
  // Make elements with class 'draggable' draggable
  $(".draggable, .sortable").draggable({
    helper: function () {
      return $(this).clone().css("z-index", 1100).appendTo('body');
    },
    revert: 'invalid',

  });


  // Make the 'Journal_container' a droppable for the draggable
  $(".right_screen").droppable({
    accept: ".draggable, .sortable",
    tolerance: "pointer",
    drop: function (event, ui) {
      if (ui.draggable.hasClass('draggable')) {
        var newElem = $(ui.helper).clone(false);
        newElem.removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging').css({ 'position': 'relative', 'left': '', 'top': '' });
        newElem.removeClass('draggable');
        newElem.addClass('sortable')
        var title = ui.helper.data('title');
        // Add a title to the new element
        newElem.prepend("<div class='title' contenteditable='true'>" + title + "</div>");
        // Add a horizontal line after the new element
        newElem.appendTo(this);
        newElem.append("<button class='remove'>X</button>");
        // $("<hr>").appendTo(this);
        $(this).sortable().removeClass('ui-draggable ui-draggable-handle');

      }
      else if (ui.draggable.hasClass('sortable')) {
        var newElem = $(ui.draggable);
        newElem.removeClass('ui-draggable ui-draggable-handle ui-sortable ui-sortable-handle').css({ 'position': 'relative', 'left': '', 'top': '' });
        // newElem.appendTo(this);
        newElem.removeClass('draggable');
        newElem.appendTo(this);
        $(this).sortable();
      }
      // Make the 'right_screen' container sortable
    }
    // Make the 'right_screen' container sortable
  }// log the dropped element 
  );

  $(document).on('click', '.remove', function () {
    $(this).parent().remove();
    $(this).remove();
  });

  $(".sortable").sortable({})
});
