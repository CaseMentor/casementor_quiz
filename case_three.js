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
  
  // build a plot in plotly
  const xValues = ['North','South','East','West', 'Center'];
  
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{ 
        data: [4,3,2,5,5],
        backgroundColor: 'rgba(32,56,100,255)',
        borderColor: "rgba(32,56,100,255)",
        label: 'Bananas'
      }, { 
        data: [2,5,2,3,4],
        backgroundColor: 'rgba(47,85,151,255)',
        borderColor: "rgba(47,85,151,255)",
        label: 'Mangos'
      }, { 
        data: [1,1,5,6,7],
        backgroundColor: 'rgba(143,170,220,255)',
        borderColor: "rgba(143,170,220,255)",
        label: 'Figs'
      }, {
        data:[7,5,4,2,3],
        backgroundColor: 'rgba(180,199,231,255)',
        borderColor: "rgba(180,199,231,255)",
        label: 'Drupes'
      },]
    },
    options: {
        legend: {
        display: true,
        position: 'bottom',
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }  
        }]
    }
}
  });