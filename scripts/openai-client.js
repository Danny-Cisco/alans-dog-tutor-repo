let myPrompt = "Write a short story about a dog on an adventure.";

fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: myPrompt }),
})
.then(response => response.json())
.then(data => console.log(data.text))
.catch((error) => {
    console.error('Error:', error);
});
