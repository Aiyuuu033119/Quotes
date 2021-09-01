var quoteArray = [];
var author = '';
var quote = '';
var index = 0;
var textPosition = 0;
var flag = true;

loadQuote = () => {
  const url = 'https://api.quotable.io/random';

  fetch(url)

    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })

    .then(data => {
      quoteArray[index] = data.content;
      author = "- " + data.author;
      console.log(quoteArray[index]);
      console.log(author);
      flag = false;
      typewriter();
    })

    .catch(error => console.log(error));
}

typewriter = () => {
  document.querySelector("#author").innerHTML = author;
  if (flag) {
    document.querySelector("#quote").innerHTML = quoteArray[index].substring(0, textPosition) + '<span>\u25AE</span>';
    setTimeout("loadQuote()", 4000);
  } else {
    type();
  }
}

type = () => {
  document.querySelector("#quote").innerHTML = quoteArray[index].substring(0, textPosition) + '<span>\u25AE</span>';
  if (textPosition++ != quoteArray[index].length) {
    setTimeout("type()", 120)
  } else {
    quoteArray[index] = ' ';
    author = '';
    textPosition = 0;
    flag = true;
    setTimeout("typewriter()", 4000);
  }
}


window.addEventListener('load', loadQuote);
