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




$(function () {
  // Make the calculator's input field droppable
  $("#inputField").droppable({
    accept: ".draggable , .sortable",
    drop: function (event, ui) {
      // const value = ui.helper.text();
      let totalValue = ui.helper.text();
      let dataTitle = ui.helper.attr('data-title');
      // get the value by replacing the data-title from totalValue
      let value = totalValue.replace(dataTitle, '').replace('X', '').replace('<hr>', '').trim();
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
        newElem.prepend("<div class='title' contenteditable='true'>Calculator result</div>");
        // Add a horizontal line after the new element
        newElem.appendTo(this);
        newElem.append("<button class='remove'>X</button>");
        var wrapper = $('<div class="journal_container">').append(newElem, "<hr>");
        wrapper.appendTo(this);
        // $("<hr>").appendTo(this);
        $(this).sortable().removeClass('ui-draggable ui-draggable-handle');

      }
      else if (ui.draggable.hasClass('sortable')) {
        var newElem = $(ui.draggable);
        newElem.removeClass('ui-draggable ui-draggable-handle').css({ 'position': 'relative', 'left': '', 'top': '' });
        newElem.next('hr').remove();
        // newElem.appendTo(this);
        var wrapper = $('<div class="journal_container">').append(newElem, "<hr>");
        wrapper.appendTo(this);
        $(this).sortable().removeClass('ui-draggable ui-draggable-handle');
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

  $(".sortable").sortable({})
});


$(".report_input , .input_answer").droppable({
  accept: ".draggable, .sortable",
  drop: function (event, ui) {
    let totalValue = ui.helper.text();
    let dataTitle = ui.helper.attr('data-title');
    let value = totalValue.replace(dataTitle, '').trim();
    $(this).val($(this).val() + value);

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
$(document).on('click', '.remove', function () {
  $(this).parent().next('hr').remove();
  $(this).closest('div').remove();
});
function showConfirmBox() {
  const journalData = $('#Journal_container').html();
  localStorage.setItem('journalData', JSON.stringify(journalData));

  $('.input_answer').each(function () {
    const id = $(this).attr('id');
    const value = $(this).val();
    localStorage.setItem(id, value);
  });

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
document.getElementById('continueButton').addEventListener('click', function () {
  var radios = document.getElementsByName('page');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      window.location.href = radios[i].value;
      break;
    }
  }
});