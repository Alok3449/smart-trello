// backend/utils/recommendations.js
const moment = require("moment");

function suggestDueDate(description) {
  if (!description) return null;
  const d = description.toLowerCase();
  if (/\btomorrow\b/.test(d)) return moment().add(1, "day").toDate();
  if (/\bnext week\b/.test(d)) return moment().add(7, "days").toDate();
  if (/\burgent\b/.test(d)) return moment().add(1, "day").toDate();
  if (/\bthis week\b/.test(d)) return moment().add(3, "days").toDate();
  return null;
}

function getRecommendations(cards) {
  const suggestions = [];

  cards.forEach(card => {
    if (!card.dueDate) {
      const sd = suggestDueDate(card.description || "");
      if (sd) suggestions.push({ cardId: card._id, type: "dueDate", suggestion: `Set due date to ${sd.toISOString().slice(0,10)}`, dueDate: sd });
    }
    if (/\b(started|in progress|working on)\b/i.test(card.description || "")) {
      suggestions.push({ cardId: card._id, type: "move", suggestion: "Move to In Progress" });
    }
  });

  // related cards by sharing a common tag-like word in title (first word)
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const a = (cards[i].title || "").split(" ")[0];
      const b = (cards[j].title || "").split(" ")[0];
      if (a && a.toLowerCase() === b.toLowerCase()) {
        suggestions.push({ type: "related", suggestion: `Group "${cards[i].title}" with "${cards[j].title}"`, cards: [cards[i]._id, cards[j]._id] });
      }
    }
  }

  return suggestions;
}

module.exports = { getRecommendations };
