fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: myPrompt }),
  })
  .then(response => response.json())
  .then(data => console.log(data.text));
  