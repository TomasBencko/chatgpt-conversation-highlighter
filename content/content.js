console.log('Content script loaded');

function highlightProductivityAppConversations() {
  const nav = document.querySelector('nav[aria-label="Chat history"]');
  if (!nav) return;

  const conversationItems = nav.querySelectorAll('li');
  conversationItems.forEach(item => {
    const link = item.querySelector('a[href*="dev-assistant"]');
    if (link) {
      item.style.backgroundColor = 'red';
    }
  });
}

function observeChanges() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        highlightProductivityAppConversations();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

// Initial call to highlight existing conversations
highlightProductivityAppConversations();

// Set up observer to handle dynamically loaded content
observeChanges();
