$(document).ready(function () {
  // Check if there is any data in the local storage.
  if (localStorage.getItem('journalData')) {
    const journalData = JSON.parse(localStorage.getItem('journalData'));
    $('#Journal_container').html(journalData);
  }
  if (localStorage.getItem('count_down')) {
    const count_down = localStorage.getItem('count_down');
    $('#count_down').html(count_down);
  }
  $('.input_answer').each(function () {
    const id = $(this).attr('id');
    if (localStorage.getItem(id)) {
      const value = localStorage.getItem(id);
      $(this).val(value);
    }
  });
})


// end analysis btn
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
    closeConfirmBox();
  }
}

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
$(function () {
  $(".input_answer, .report_answer").droppable({
    accept: ".draggable, .sortable",
    drop: function (event, ui) {
      let totalValue = ui.helper.text();
      let dataTitle = ui.helper.attr('data-title');
      let otherTitle = ui.helper.attr('title');
      // get the value by replacing the data-title from totalValue
      let value = totalValue.replace(dataTitle, '').replace('X', '').replace(/\D/g, '').trim();
      $(this).val($(this).val() + value);
    }
  });
})
$(function () {
  // Make the calculator's input field droppable
  $("#inputField").droppable({
    accept: ".draggable",
    drop: function (event, ui) {
      let totalValue = ui.helper.text();
      let dataTitle = ui.helper.attr('data-title');
      let otherTitle = ui.helper.attr('title');
      // get the value by replacing the data-title from totalValue
      let value = totalValue.replace(dataTitle, '').replace('X', '').replace(/\D/g, '').trim();
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


$(function () {
  // Make elements with class 'draggable' draggable
  $(".draggable").draggable({
    helper: function () {
      return $(this).clone().css("z-index", 1100).appendTo('body');
    },
    revert: 'invalid',

  });
})
