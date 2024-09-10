console.log('⭐⭐⭐ Content script loaded');

const gptConvoConfig = [
  { name: 'anki-generator', color: '#FFD700', emoji: '📚' },
  { name: 'dev-assistant', color: '#32CD32', emoji: '⏱️' },
  { name: 'work-assistant', color: '#4169E1', emoji: '🚀' }
];


function highlightConversations() {
  const nav = document.querySelector('nav[aria-label="Chat history"]');
  if (!nav) return;

  const conversationItems = nav.querySelectorAll('li:not([data-highlighted])');
  conversationItems.forEach(item => {
    gptConvoConfig.forEach(gptConvo => {
      const link = item.querySelector(`a[href*="${gptConvo.name}"]`);
      if (link) {
        item.style.backgroundColor = gptConvo.color;
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = gptConvo.emoji;
        emojiSpan.style.marginRight = '5px';
        link.insertBefore(emojiSpan, link.firstChild);
        item.setAttribute('data-highlighted', 'true');
      }
    });
  });
}

function observeChanges() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        highlightConversations();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

// Initial call to highlight existing conversations
highlightConversations();

// Set up observer to handle dynamically loaded content
observeChanges();
