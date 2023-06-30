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

document.getElementById('myForm').addEventListener('submit', function(e) {
  // Prevents the form from submitting normally
  e.preventDefault();

  // Get the prompt from the input box
  let myPrompt = document.getElementById('prompt-input-box').value;

  // Format the question
  myPrompt = formatQuestion(myPrompt);

  // Clear the prompt input box
  document.getElementById('prompt-input-box').value = '';

  // Get the 'response-box' element
  let responseBox = document.getElementById('response-box');

  // Place the question in the 'response-box'
  responseBox.innerHTML = 'Q: ' + myPrompt + '<br><br>';

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
    // Update the text inside the 'response-box' element with the API response
    responseBox.innerHTML += 'A: ' + data.text;

    // Focus back to the input box
    document.getElementById('prompt-input-box').focus();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
