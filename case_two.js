
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
