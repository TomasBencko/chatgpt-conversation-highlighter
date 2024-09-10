document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup DOM loaded');

  const configTextarea = document.getElementById('configTextarea');
  const saveButton = document.getElementById('saveButton');

  // Load the config when the popup opens
  chrome.runtime.sendMessage({action: "getConfig"}, function(response) {
    if (response && response.config) {
      configTextarea.value = JSON.stringify(response.config, null, 2);
    }
  });

  // Save the config when the save button is clicked
  saveButton.addEventListener('click', function() {
    try {
      const newConfig = JSON.parse(configTextarea.value);
      chrome.runtime.sendMessage({action: "saveConfig", config: newConfig}, function(response) {
        if (response && response.success) {
          alert('Config saved successfully!');
        } else {
          alert('Failed to save config.');
        }
      });
    } catch (error) {
      alert('Invalid JSON. Please check your input.');
    }
  });
});
