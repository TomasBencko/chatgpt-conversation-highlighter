console.log('⭐⭐⭐ Content script loaded');

const gptConvoConfig = [
  { name: 'anki-generator', colorLight: '#d1fae5', colorDark: '#831843', emoji: '🎓' },
  { name: 'dev-assistant', colorLight: '#e0f2fe', colorDark: '#334155', emoji: '🚀' },
  { name: 'work-assistant', colorLight: '#e2e8f0', colorDark: '#27272a', emoji: '💼' }
];

const isDarkMode = document.documentElement.classList.contains('dark');

function highlightConversations() {
  console.log('🔍 Highlighting gpt conversations');
  const nav = document.querySelector('nav[aria-label="Chat history"]');
  if (!nav) return;

  const conversationItems = nav.querySelectorAll('li:not([data-highlighted])');
  conversationItems.forEach(item => {
    gptConvoConfig.forEach(gptConvo => {
      const link = item.querySelector(`a[href*="${gptConvo.name}"]`);
      if (link) {
        const itemBackground = item.querySelector('div.group');
        itemBackground.style.backgroundColor = isDarkMode ? gptConvo.colorDark : gptConvo.colorLight;
        itemBackground.style.color = isDarkMode ? 'rgb(236, 236, 236)' : 'rgb(13, 13, 13)';
        itemBackground.classList.add('hover:opacity-80');
        const menuGradient = link.querySelector('div.absolute');
        if (menuGradient) menuGradient.style.display = 'none';
        const itemText = link.querySelector('div.relative');
        if (itemText) itemText.style.textOverflow = 'ellipsis';
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = gptConvo.emoji;
        emojiSpan.style.marginRight = '-3px';
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
        console.log('🔄 Mutation detected');
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
