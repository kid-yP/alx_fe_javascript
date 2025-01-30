const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivational" },
    { text: "Strive not to be a success, but rather to be of value.", category: "Inspirational" },
    { text: "The mind is everything. What you think you become.", category: "Philosophical" },
    { text: "The best way to predict the future is to create it.", category: "Motivational" },
    { text: "You must be the change you wish to see in the world.", category: "Inspirational" },
  ];

  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = `"${quotes[randomIndex].text}" - Category: ${quotes[randomIndex].category}`;
  }

  function createAddQuoteForm() {
    const body = document.querySelector('body');
    const newQuoteDiv = document.createElement('div');

    newQuoteDiv.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
`;
      body.appendChild(newQuoteDiv);
    }

  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
      alert("Quote added successfully!");
      const newQuoteDiv = document.querySelector('body div:last-child');
      newQuoteDiv.remove();
    } else{
      alert('Please fill in all the fields.');
    }
  }


  const newQuoteButton = document.getElementById('newQuote');
  newQuoteButton.addEventListener('click', showRandomQuote);

  createAddQuoteForm();