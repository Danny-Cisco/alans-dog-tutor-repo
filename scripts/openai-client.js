// Helper function to format the prompt
function formatQuestion(prompt) {
  // Capitalize the first letter
  prompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);

  // Add a question mark at the end if it's not already there
  if (prompt.charAt(prompt.length - 1) !== '?') {
      prompt += '?';
  }

  return prompt;
}

// Add event listener for the Enter key in the textarea
document.getElementById('prompt-input-box').addEventListener('keydown', function(e) {
  // Check if the Enter key was pressed and the Shift key wasn't
  if (e.key === 'Enter' && !e.shiftKey) {
      // If so, trigger the 'submit' event listener
      e.preventDefault();
      let submitEvent = new Event('submit');
      document.getElementById('myForm').dispatchEvent(submitEvent);
  }
});


document.getElementById('myForm').addEventListener('submit', function(e) {
  // Prevents the form from submitting normally
  e.preventDefault();

  // Get the prompt from the input box and trim it
  let inputBox = document.getElementById('prompt-input-box');
  let myPrompt = inputBox.value.trim();

  // Save the trimmed prompt back to the input box
  inputBox.value = myPrompt;

  // Check if the prompt is empty
  if (!myPrompt) {
      // If it is, focus back to the "prompt-input-box", 
      // change the placeholder text and stop the function
      inputBox.placeholder = "... ... ... Don't forget to type a question!";
      inputBox.focus();
      woof.currentTime = 0;
      woofTrigger.fire();
      woof.play();
      return;
  }

  inputBox.placeholder = "... ... ... Type a cool question here!";

  // play sound and animate upon successful prompt enter
  woof.currentTime = 0;
  //woofTrigger.fire();
  talkingBool.value = true;
  //woof.play();
  letmethink.play();

  // Format the question
  myPrompt = formatQuestion(myPrompt);

  // Clear the prompt input box
  document.getElementById('prompt-input-box').value = '';

  // Get the 'response-box' element
  let responseBox = document.getElementById('response-box');

  // Clear the previous content of 'response-box'
  responseBox.innerHTML = '';

  // Create a new div for the question, and add it to the 'response-box'
  let questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  questionDiv.textContent = 'Q:  ' + myPrompt;
  responseBox.appendChild(questionDiv);

  // Use fetch to send the POST request as before
  fetch('/api/openai', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: myPrompt }),
  })
  .then(response => response.json())
  .then(data => {
      // Create a new div for the answer, and add it to the 'response-box'
      let answerDiv = document.createElement('div');
      answerDiv.classList.add('answer');
      answerDiv.textContent = 'A: ' + data.text;
      //answerDiv.textContent = data.text;
      responseBox.appendChild(answerDiv);

      // Focus back to the input box
      document.getElementById('prompt-input-box').focus();
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});





