$(document).ready(function () {
  // Check if there is any data in the local storage.
  if (localStorage.getItem('journalData')) {
    const journalData = JSON.parse(localStorage.getItem('journalData'));
    $('#Journal_container').html(journalData);
  }
  $('.input_answer').each(function () {
    const id = $(this).attr('id');
    if (localStorage.getItem(id)) {
      const value = localStorage.getItem(id);
      $(this).val(value);
    }
  });
  $('.report_answer').each(function () {
    const id = $(this).attr('id');
    if (localStorage.getItem(id)) {
      const value = localStorage.getItem(id);
      $(this).val(value);
    }
  })
  $('.select_box').each(function () {
    const id = $(this).attr('id');
    if (localStorage.getItem(id)) {
      const value = localStorage.getItem(id);
      $(this).val(value);
    }
  })
  if (localStorage.getItem('graph_type')) {
    const value = localStorage.getItem('graph_type');
    $('input[name="page"][value="' + value + '"]').prop('checked', true);
  }
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
      accept: ".draggable, .sortable",
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
    $(".draggable, .sortable").draggable({
      helper: function () {
        return $(this).clone().css("z-index", 1100).appendTo('body');
      },
      revert: 'invalid',

    });
    $(".right_screen").sortable({})

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
      $(this).parent().next('hr').remove();
      $(this).closest('div').remove();
    });

    $(".sortable").sortable({})
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
})


function showConfirmBox() {
  const journalData = $('#Journal_container').html();
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
      localStorage.setItem('graph_type', radios[i].value)
      window.location.href = radios[i].value;
      break;
    }
  }
});