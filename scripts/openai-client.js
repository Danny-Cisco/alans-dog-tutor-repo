document.getElementById('myForm').addEventListener('submit', function(e) {
  // Prevents the form from submitting normally
  e.preventDefault();

  // Get the prompt from the input box
  let myPrompt = document.getElementById('prompt-input-box').value;

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
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

