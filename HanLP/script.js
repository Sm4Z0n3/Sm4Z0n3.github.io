function post(){
  const textDiv = document.getElementById('text');
  const textarea = textDiv.querySelector('textarea');
  var text_ = textarea.value;

  const url = 'https://www.hanlp.com/backend/redirect/v2/sentiment_analysis';
  const data = {
    text: text_,
    zh: true
  };
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => 
        {
            var result = "";
            if(data < 0)
                result = "负面";
            if(data < -0.5)
                result = "极度负面";
            if(data > 0)
                result = "正面";
            if(data > 0.5)
                result = "极度正面";
            console.log(result + data)
        }
        )
    .catch(error => console.error('Error:', error));
  }

const textBoxes = document.querySelectorAll('WinUI-TextBox');
textBoxes.forEach(textBox => {
  const textarea = document.createElement('textarea');
  const computedStyle = window.getComputedStyle(textBox);
  textarea.style.width = computedStyle.width;
  textarea.style.height = computedStyle.height;
  textarea.style.fontSize = computedStyle.fontSize;
  textarea.style.color = computedStyle.color;
  textarea.style.fontFamily = computedStyle.fontFamily;
  //textarea.style.maxHeight = computedStyle.height;
  textarea.style.maxWidth = computedStyle.width;
  textarea.style.minHeight = computedStyle.height;
  textarea.style.minWidth = computedStyle.width;
  const originalContent = textBox.textContent.trim();
  textarea.value = originalContent;
  textBox.textContent = '';
  textBox.appendChild(textarea);
});
