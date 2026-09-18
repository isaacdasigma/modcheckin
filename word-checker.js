export class WordChecker {
  constructor() {
    this.form = document.getElementById('word-form');
    this.input = document.getElementById('word-input');
    this.badge = document.getElementById('result-badge');
    this.details = document.getElementById('word-details');
    this.defTitle = document.getElementById('definition-title');
    this.defText = document.getElementById('definition-text');
    this.scoreVal = document.getElementById('score-val');
    this.lengthVal = document.getElementById('length-val');

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const word = this.input.value.trim().toLowerCase();
    
    if (!word) return;

    this.showLoading();

    try {
      const data = await this.validateWord(word);
      this.renderSuccess(word, data);
    } catch {
      this.renderError(word);
    }
  }

  async validateWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!response.ok) {
      throw new Error('Word not found in dictionary');
    }
    return await response.json();
  }

  showLoading() {
    this.badge.className = 'badge loading';
    this.badge.textContent = 'Checking dictionary...';
    this.badge.classList.remove('hidden');
    this.details.classList.add('hidden');
  }

  renderSuccess(word, data) {
    const definition = data[0]?.meanings[0]?.definitions[0]?.definition || 'Valid word!';
    const points = word.length * 10;

    this.badge.className = 'badge valid';
    this.badge.textContent = `Valid Word! (+${points} pts)`;

    this.defTitle.textContent = word.toUpperCase();
    this.defText.textContent = definition;
    this.scoreVal.textContent = `Points: ${points}`;
    this.lengthVal.textContent = `Length: ${word.length} letters`;

    this.details.classList.remove('hidden');
  }

  renderError(word) {
    this.badge.className = 'badge invalid';
    this.badge.textContent = `"${word}" is not a valid English word.`;
    this.details.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new WordChecker();
});
