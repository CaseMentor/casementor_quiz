$(document).ready(function () {
  // Check if there is any data in the local storage.
  if (localStorage.getItem('journalData')) {
    const journalData = JSON.parse(localStorage.getItem('journalData'));
    $('#journal_container').html(journalData);
  }
});
// Set the date we're counting down to
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

  // Pad the minutes and seconds with leading zeros if they are less than 10.
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

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

$(function () {
  // Make elements with class 'draggable' draggable
  $(".draggable, .sortable").draggable({
    cancel: ".title",
    helper: function () {
      return $(this).clone().css("z-index", 10).appendTo('body');
    },
    revert: 'invalid',
    start: function () {

      // Change the appearance of the original element as soon as the drag starts
      $(this).addClass('afterDrag').removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging');

    }
  })



  // Make the 'Journal_container' a droppable for the draggable
  $(".right_screen").droppable({
    accept: ".draggable",
    tolerance: "pointer",
    drop: function (event, ui) {
      if (ui.draggable.hasClass('draggable')) {
        var newElem = $(ui.helper).clone(false);
        newElem.removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging').css({ 'position': 'relative', 'left': '', 'top': '' });
        newElem.removeClass('draggable');
        var title = ui.helper.data('title');
        newElem.addClass('sortable')
        // Add a title to the new element
        newElem.prepend("<div class='title' contenteditable='true'>" + title + "</div>");
        // Add a horizontal line after the new element
        newElem.append("<button class='remove'>X</button>");
        newElem.appendTo(this);
        // $("<hr>").appendTo(this);
        $(this).sortable({ cancel: '.title' }).removeClass('ui-draggable ui-draggable-handle ui-sortable-handle');
      }
      else if (ui.draggable.hasClass('sortable')) {
        var newElem = $(ui.draggable);
        newElem.removeClass('ui-draggable ui-draggable-handle ui-sortable-handle').css({ 'position': 'relative', 'left': '', 'top': '' });
        newElem.next('hr').remove();
        // newElem.appendTo(this);
        newElem.appendTo(this);
      }
      // Make the 'right_screen' container sortable
    }
    // Make the 'right_screen' container sortable
  }// log the dropped element 
  );

  $(document).on('click', '.remove', function () {
    $(this).parent().next('hr').remove();
    $(this).closest('div').remove();
  });

  //   $(".sortable").sortable({})
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

function SaveToLocalStorage() {
  const journalData = $('#journal_container').html();
  localStorage.setItem('journalData', JSON.stringify(journalData));

  $('.input_answer').each(function () {
    const id = $(this).attr('id');
    const value = $(this).val();
    localStorage.setItem(id, value);
  });
  $('.report_answer').each(function () {
    const id = $(this).attr('id');
    const value = $(this).val();
    localStorage.setItem(id, value);
  });
  $('.select_box').each(function () {
    const id = $(this).attr('id');
    const value = $(this).val();
    localStorage.setItem(id, value);
  });
  $('.checkbox').each(function () {
    const id = $(this).attr('id');
    if ($(this).is(':checkbox')) {
      // If it's a checkbox and it's not checked, we don't save it
      if (!$(this).prop('checked')) {
        return;
      }
    }
    const value = $(this).val();
    localStorage.setItem(id, value);
  });



}
