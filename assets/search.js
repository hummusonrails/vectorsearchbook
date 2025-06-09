function jaccardSimilarity(a, b) {
  const setA = new Set(a.toLowerCase().split(/\s+/));
  const setB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

function simulateSearch(query) {
  if (!query) return [];
  const scores = pragmaticBooks.map(book => ({
    title: book.title,
    url: book.url,
    score: jaccardSimilarity(query, book.title)
  }));
  return scores.sort((a, b) => b.score - a.score).slice(0, 5);
}

function handleSearch() {
  const input = document.getElementById('search-input');
  const resultsDiv = document.getElementById('search-results');
  const query = input.value.trim();
  if (!query) return;
  resultsDiv.innerHTML = '<p class="animate-pulse">Searching...</p>';
  setTimeout(() => {
    const results = simulateSearch(query);
    if (results.length === 0) {
      resultsDiv.innerHTML = '<p>No similar titles found.</p>';
    } else {
      resultsDiv.innerHTML = results
        .map(r => {
          const pct = Math.round(r.score * 100);
          return `<p class="mb-1"><a href="${r.url}" target="_blank" rel="noopener" class="text-blue-600 hover:underline">${r.title}</a> <span class="text-sm text-gray-600">${pct}%</span></p>`;
        })
        .join('');
    }
  }, 800);
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('search-btn');
    if (btn) {
      btn.addEventListener('click', handleSearch);
    }
  });
}
