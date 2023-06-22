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
$(".report_input").droppable({
    accept: ".draggable",
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

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Maya Forest Target', 'Blue Lagoon Target', 'Maya Forest Actual', 'Blue Lagoon Actual'],
        datasets: [{
            data: [10, 10, 10, 10],  // Default values
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
            labels: {
                fontSize: 20  // change this to whatever size you want
            }
        }
    }
});

function updateChart() {
    var value1 = document.getElementById('input1').value || 0;
    var value2 = document.getElementById('input2').value || 0;
    var value3 = document.getElementById('input3').value || 0;
    var value4 = document.getElementById('input4').value || 0;

    myChart.data.datasets[0].data = [value1, value2, value3, value4];
    myChart.update();
}
// Add input event listeners to all input fields
document.getElementById('input1').addEventListener('input', updateChart);
document.getElementById('input2').addEventListener('input', updateChart);
document.getElementById('input3').addEventListener('input', updateChart);
document.getElementById('input4').addEventListener('input', updateChart);
