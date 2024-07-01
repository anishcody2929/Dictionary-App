const form = document.querySelector('form');
const resultdiv = document.querySelector('.result');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});
const getWordInfo = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const wordData = data[0];
        const meaning = wordData.meanings[0];
        const definition = meaning.definitions[0];
         console.log(meaning);
        resultdiv.innerHTML = `
            <h2><strong>Word:</strong> ${wordData.word}</h2>
            <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
            <p><strong>Meaning:</strong> ${definition.definition || 'Not Found'}</p>
            <p><strong>Example:</strong> ${definition.example || 'Not Found'}</p>
        `;
        if (meaning.antonyms && meaning.antonyms.length > 0) {
            resultdiv.innerHTML += `<p><strong>Antonyms:</strong></p><ul>`;
            meaning.antonyms.forEach(antonym => {
                resultdiv.innerHTML += `<li>${antonym}</li>`;
            });
            resultdiv.innerHTML += `</ul>`;
        } else {
            resultdiv.innerHTML += `<p><strong>Antonyms:</strong> Not Found</p>`;
        }
        if (meaning.synonyms && meaning.synonyms.length > 0) {
            resultdiv.innerHTML += `<p><strong>Synonyms:</strong></p><ul>`;
            meaning.synonyms.forEach(synonym => {
                resultdiv.innerHTML += `<li>${synonym}</li>`;
            });
            resultdiv.innerHTML += `</ul>`;
        } else {
            resultdiv.innerHTML += `<p><strong>Synonyms:</strong> Not Found</p>`;
        }
        resultdiv.innerHTML += `<div><a href="${wordData.sourceUrls[0]}" target="_blank">Read More</a></div>`;
    } catch (error) {
        resultdiv.innerHTML = `<p>Word Not Found</p>`;
    }
};