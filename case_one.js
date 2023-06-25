
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
  // Get the draggable elements
  const draggables = document.querySelectorAll('.draggable');
  const inputField = document.getElementById('inputField');
  const resultElement = document.getElementById('result');
  
  // Add drag start event listener to each draggable element
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', draggable.textContent);
    });
  });
  
  // Add drag over event listener to the input field to allow dropping
  inputField.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  
  // Add drop event listener to the input field to handle dropping
  inputField.addEventListener('drop', (event) => {
    event.preventDefault();
    const value = event.dataTransfer.getData('text/plain');
    inputField.value += value;
  });
  
  // Get the calculator buttons
  const calculatorButtons = document.querySelectorAll('.calculator-btn');
  
  // Add click event listener to each calculator button
  calculatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');
      if (value === '=') {
        calculateResult();
      } else {
        inputField.value += value;
      }
    });
  });
  
  // Add keydown event listener to the document to capture numpad key inputs
  document.addEventListener('keydown', (event) => {
    const numpadKeyValues = ['Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadDivide', 'NumpadMultiply', 'NumpadSubtract', 'NumpadAdd', 'NumpadDecimal', 'NumpadEnter'];
    
    if (numpadKeyValues.includes(event.code)) {
      event.preventDefault();
      const value = event.key === 'Enter' ? '=' : event.key;
      if (value === '=') {
        calculateResult();
      } else {
        inputField.value += value;
      }
    }
  });
  
  // Calculate and display the result
  function calculateResult() {
    try {
      const expression = inputField.value;
      const result = eval(expression);
      if (isNaN(result)) {
        resultElement.textContent = 'Invalid Expression';
      } else {
        resultElement.textContent = `Result: ${result}`;
      }
    } catch (error) {
      resultElement.textContent = 'Invalid Expression';
    }
  }
  
  // Add event listener to the input field for keyup event to calculate the result
  inputField.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      calculateResult();
    }
  });
  
  const containers = document.querySelectorAll('.container')
  
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })
  
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })
  
  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })
  })
  
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }
  