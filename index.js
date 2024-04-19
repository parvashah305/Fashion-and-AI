import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyAcEKsBcd3fOtWHx97mjD9Z8N5N_SEmZ_g");

const promptInput = document.getElementById("prompt");
const sendPromptBtn = document.getElementById("sendPrompt");
const cp = document.querySelector("slider-color-picker");
const skinToneDiv = document.getElementById("skinTone");

// Get all div elements inside the skinTone div
const skinToneDivs = skinToneDiv.querySelectorAll("div");

let clickedDiv = null;

skinToneDivs.forEach(div => {
  div.addEventListener("mouseenter", (event) => {
    event.target.style.height = "110%";
  });

  div.addEventListener("mouseleave", (event) => {
    // Check if the mouse is leaving the clicked div
    if (clickedDiv !== event.target) {
      event.target.style.height = "100%";
    }
  });

  div.addEventListener("click", (event) => {
    // Reset the height of all div elements
    skinToneDivs.forEach(otherDiv => {
      otherDiv.style.height = "100%";
    });

    // Set the height of the clicked div to 110%
    event.target.style.height = "110%";

    // Update the clickedDiv variable
    clickedDiv = event.target;
  });
});


async function run(prompt) {

    // Show loading Overlay
    document.getElementById("loadingOverlay").style.display = "flex";
    promptInput.blur();

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`improve this prompt so image generating ai can give me exactly what i want  "${prompt}"`);
    console.log(`improve this prompt so image generating ai can give me exactly what i want, "${prompt}, in ${cp.value} color, with ${clickedDiv.id} skin tone"`)
    const response = await result.response;
    const text = response.text();
    console.log(text);

    // Hide loading Overlay
    document.getElementById("loadingOverlay").style.display = "none";
    promptInput.focus();
}

sendPromptBtn.addEventListener("click", ()=>{
    run(promptInput.value);
})
promptInput.addEventListener("keydown", (event)=>{
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        run(promptInput.value);
    }
})
