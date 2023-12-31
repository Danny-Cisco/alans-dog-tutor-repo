


// Helper function to format the prompt
function formatQuestion(prompt) {
    prompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
    if (prompt.charAt(prompt.length - 1) !== '?') {
      prompt += '?';
    }
    return prompt;
  }
  
  // Add event listener for the Enter key in the textarea
  document.getElementById('prompt-input-box').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      let submitEvent = new Event('submit');
      document.getElementById('myForm').dispatchEvent(submitEvent);
    }
  });
  
  document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    let inputBox = document.getElementById('prompt-input-box');
    let myPrompt = inputBox.value.trim();
    inputBox.value = myPrompt;
  
    if (!myPrompt) {
      //inputBox.placeholder = "... ... ... Don't forget to type a question!";
      //inputBox.focus();
      woof.currentTime = 0;
      woofTrigger.fire();
      woof.play();
      return;
    }
  
    inputBox.placeholder = "... ... ... Type a cool question here!";
    //talkingBool.value = true;
    //letmethink.play();
  
    myPrompt = formatQuestion(myPrompt);
    document.getElementById('prompt-input-box').value = '';
    let responseBox = document.getElementById('response-box');
    responseBox.innerHTML = '';
  
    let questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.textContent = 'YOU:  ' + myPrompt;
    responseBox.appendChild(questionDiv);
  
    fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: myPrompt }),
    })
    .then(response => response.json())
    .then(data => {
      let answerDiv = document.createElement('div');
      answerDiv.classList.add('answer');
      answerDiv.textContent = 'DOG: ' + data.text;
      responseBox.appendChild(answerDiv);
  
      if (letmethink.paused) {
        //talkingBool.value = true;
        //letssee.play();
      }
  
      fetch('/api/narakeet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: data.text }),
      })
      .then(async (response) => {
        if (response.ok) {
            const blob = await response.blob();
            const audioURL = URL.createObjectURL(blob);
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = audioURL;
            audioPlayer.play();
            talkingBool.value = true;
            audioPlayer.onended = function() {
                console.log("The Narakeet audio has finished playing");
                talkingBool.value = false;
                //greatquestion.play();
            };
        } else {
            console.error('Audio creation failed');
        }
    })
  
      
  
      document.getElementById('prompt-input-box').focus();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });