// Local Storage High Scores & Streak Tracking
function initStreakSystem() {
  const today = new Date().toISOString().slice(0, 10);
  let lastPlayed = localStorage.getItem('checkawords_last_date');
  let streak = parseInt(localStorage.getItem('checkawords_streak') || '0', 10);

  if (lastPlayed) {
    const lastDate = new Date(lastPlayed);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      streak = 0;
      localStorage.setItem('checkawords_streak', '0');
    }
  }
  renderStreak(streak);
}

function renderStreak(streak) {
  const el = document.getElementById('streak-display');
  if (el) el.textContent = `🔥 Daily Streak: ${streak} Day${streak === 1 ? '' : 's'}`;
}

document.addEventListener("DOMContentLoaded", () => {
  initStreakSystem();
});
