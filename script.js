chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "translateChats") {
    const { inputLang, outputLang } = message;

    console.log("Translation requested from", inputLang, "to", outputLang);

    const chatBubbles = document.querySelectorAll("span._ao3e.selectable-text.copyable-text");
    console.log("Found chat bubbles:", chatBubbles.length);

    chatBubbles.forEach((bubble, index) => {
      const originalText = bubble.innerText;
      console.log(`Bubble ${index} original text:`, originalText);


      translateText(originalText, inputLang, outputLang).then((translatedText) => {
        console.log(`Bubble ${index} translated text:`, translatedText);
        bubble.innerText = translatedText;
      }).catch(error => {
        console.error("Translation failed:", error);
      });
    });
  }
});



// Translate text funtion 
const translateText = async (text, fromLang, toLang) => {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURI(text)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(response)
    return data[0][0][0];  
  } catch (error) {
    console.error("Translation failed:", error);
    throw error;
  }
};
