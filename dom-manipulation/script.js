const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Motivational" },
    { text: "Strive not to be a success, but rather to be of value.", category: "Inspirational" },
    { text: "The mind is everything. What you think you become.", category: "Philosophical" },
    { text: "The best way to predict the future is to create it.", category: "Motivational" },
    { text: "You must be the change you wish to see in the world.", category: "Inspirational" },
];

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const currentQuote = quotes[randomIndex];
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(currentQuote));
    quoteDisplay.textContent = "${currentQuote.text}" - Category: ${currentQuote.category};
}

function createAddQuoteForm() {
    const body = document.querySelector('body');
    const newQuoteDiv = document.createElement('div');
    newQuoteDiv.innerHTML = 
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    ;
    body.appendChild(newQuoteDiv);
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        alert("Quote added successfully!");
        const newQuoteDiv = document.querySelector('body div:last-child');
        newQuoteDiv.remove();

    } else{
        alert('Please fill in all the fields.');
    }
}

function exportToJsonFile() {
    const jsonData = JSON.stringify(quotes, null, 2); // pretty print json
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try{
            const importedQuotes = JSON.parse(event.target.result);
           if(Array.isArray(importedQuotes)){
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
            } else{
              alert('The file does not contain a valid array of quotes.');
            }

        } catch (error){
           alert('There was an error while importing the quotes, please make sure you have selected a valid JSON file.');
           console.error("JSON parsing error", error);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
if (lastViewedQuote) {
    console.log('Last viewed quote:', JSON.parse(lastViewedQuote));
}

const newQuoteButton = document.getElementById('newQuote');
newQuoteButton.addEventListener('click', showRandomQuote);
createAddQuoteForm();
// Add export button
const exportButton = document.createElement('button');
exportButton.textContent = 'Export Quotes';
exportButton.onclick = exportToJsonFile;
document.body.appendChild(exportButton);
// Add file input
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'importFile';
fileInput.accept = '.json';
fileInput.onchange = importFromJsonFile
document.body.appendChild(fileInput);
