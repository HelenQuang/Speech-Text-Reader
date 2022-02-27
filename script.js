const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const speaker = document.getElementById("speaker");
const stop = document.getElementById("stop");

//Add voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}
getVoices();

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

//Init speech synth
const message = new SpeechSynthesisUtterance();

//Event listener to speaker
speaker.addEventListener("click", () => {
  message.text = main.innerText;
  speechSynthesis.speak(message);
});

stop.addEventListener("click", () => {
  speechSynthesis.cancel();
});

//Event listener to change voice
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Event listener to toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// Event listener to close text box
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

//Event listener to voice select
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
  message.text = textArea.value;
  speechSynthesis.speak(message);
});
