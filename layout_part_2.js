$(document).ready(function () {
  // Check if there is any data in the local storage.
  if (localStorage.getItem('journalData')) {
    const journalData = JSON.parse(localStorage.getItem('journalData'));
    $('#Journal_container').html(journalData);
  }
});

$(function () {
  // Make elements with class 'draggable' draggable
  $(".draggable").draggable({
    helper: function () {
      return $(this).clone().css("z-index", 1000).appendTo('body');
    },
    revert: 'invalid',
    start: function () {
      // Change the appearance of the original element as soon as the drag starts
      $(this).addClass('afterDrag').removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging');

    }
  });

  // Make the 'Journal_container' a droppable for the draggable
  $("#Journal_container").droppable({
    accept: ".draggable",
    tolerance: "pointer",
    drop: function (event, ui) {
      var newElem = $(ui.helper).clone(false);
      newElem.removeClass('ui-draggable ui-draggable-handle ui-draggable-dragging').css({ 'position': 'relative', 'left': '', 'top': '' });
      var title = ui.helper.text();
      // Add a title to the new element
      newElem.prepend("<h3>" + title + "</h3>");
      // Add a horizontal line after the new element

      newElem.appendTo(this);
      $("<hr>").appendTo(this);

    }// log the dropped element
  });
});

$(function () {
  // Make the calculator's input field droppable
  $("#inputField").droppable({
    accept: ".draggable",
    drop: function (event, ui) {
      // const value = ui.helper.text();
      let totalValue = ui.helper.text();
      let dataTitle = ui.helper.attr('data-title');

      // get the value by replacing the data-title from totalValue
      let value = totalValue.replace(dataTitle, '').trim();
      if (value === "AC") { // Clear the input field when 'AC' is dropped
        $(this).val('');
      } else if (value === "C") { // Remove the last character when 'C' is dropped
        $(this).val($(this).val().slice(0, -1));
      } else if (value === "=") { // Evaluate the expression when '=' is dropped
        try {
          const expression = $(this).val();
          const result = eval(expression);
          if (isNaN(result)) {
            alert('Invalid Expression');
          } else {
            $(this).val(result);
            $('#result').text(result);
          }
        } catch (error) {
          alert('Invalid Expression');
        }
      } else {
        $(this).val($(this).val() + value);
      }
    }
  });

});

$(".input_answer").droppable({
  accept: ".draggable",
  drop: function (event, ui) {
    $(this).val(ui.helper.text());
  }
});
$("#Journal_container").droppable({
  accept: ".draggable",
  drop: function (event, ui) {
    $(this).val(ui.helper.text());
  }
});
$('.calculator-btn').click(function () {
  const value = $(this).data('value');
  if (value === "AC") { // Clear the input field when 'AC' is clicked
    $('#inputField').val('');
  } else if (value === "C") { // Remove the last character when 'C' is clicked
    $('#inputField').val($('#inputField').val().slice(0, -1));
  } else if (value === "=") { // Evaluate the expression when '=' is clicked
    try {
      const expression = $('#inputField').val();
      const result = eval(expression);
      if (isNaN(result)) {
        alert('Invalid Expression');
      } else {
        $('#inputField').val(result);
        $('#result').text(result);
      }
    } catch (error) {
      alert('Invalid Expression');
    }
  } else {
    $('#inputField').val($('#inputField').val() + value);
  }
});
function showConfirmBox() {
  const journalData = $('#Journal_container').html();
  localStorage.setItem('journalData', JSON.stringify(journalData));
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