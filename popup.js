
document.getElementById("translateChatBtn").addEventListener("click", () => {
  const inputLang = document.getElementById("inputLang").value;
  const outputLang = document.getElementById("outputLang").value;


  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0].id; 

    chrome.tabs.sendMessage(activeTab, {
      type: "translateChats",
      inputLang: inputLang,
      outputLang: outputLang
    }, (response) => {
      console.log("Response from script:", response);
    });
  });
});
  
  