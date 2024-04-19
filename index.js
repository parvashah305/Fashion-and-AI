import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyAcEKsBcd3fOtWHx97mjD9Z8N5N_SEmZ_g");

const promptInput = document.getElementById("prompt");
const sendPromptBtn = document.getElementById("sendPrompt");
const cp = document.querySelector("slider-color-picker");

async function run(prompt) {

    // Show loading Overlay
    document.getElementById("loadingOverlay").style.display = "flex";
    promptInput.blur();

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`improve this prompt so image generating ai can give me exactly what i want  "${prompt}"`);
    console.log(`improve this prompt so image generating ai can give me exactly what i want, "${prompt}, in ${cp.value} color"`)
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