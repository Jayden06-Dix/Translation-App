// Imports from other Files, bringing in Functions. 
import { getTranslation } from "./api.js";
import { addMessage, showChatView, clearInput, selectedFlag } from "./ui.js";

// DOM Elements for Event Listener and Variables
const translateBtn = document.getElementById("translate-btn");
const textBox = document.getElementById("text-to-translate");
const flagOption = document.querySelectorAll(".flag-option");

// Sets the App State, 1. On Language selection, 2. If chatting or not, 3. Loading Phase
let selectedLanguage = null
let isChatting = false
let isLoading = false 

// Runs when user first submits an input. 
async function handleSubmit() {
   // Ignores clicks while req in progress
   if(isLoading) return;

   //Trim, save result and do nothing if input is empty
   const text = textBox.value.trim();
   if(!text) return;

   // On first submit only, lock in radio choice and switch State to Chat Mode.
   if (!isChatting) {
      const chosen = document.querySelector('input[name="language"]:checked');
      selectedLanguage = chosen.value;
      selectedFlag(selectedLanguage);

      showChatView()
      isChatting = true;
      translateBtn.textContent = "Send";
   }

   //Show what user said, then clears the box.
   addMessage("user", text);
   clearInput();

   // Change to Loading State
   isLoading = true;
   translateBtn.disabled = true;

   // Adds in "typing..." while waiting for response.
   const load = addMessage("ai", "typing...");
   load.classList.add("pending");

   //Get's answer from AI, handles Success and failure
   try {
      const response = await getTranslation(text, selectedLanguage);
      addMessage("ai", response);
   } catch (err) {
      console.error(err);
      addMessage("ai", "Sorry, something went wrong. Please try again later.");
   } finally {
      load.remove();
      isLoading = false;
      translateBtn.disabled = false;
   }
}


// Event Listeners
//  Translate button to call AI response
translateBtn.addEventListener("click", handleSubmit)

// Enter Sends, Shift + Enter makes a new line.
textBox.addEventListener("keydown", (e) => {
   if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
   }
});

// Flag buttons switch language during chat.
flagOption.forEach((flag) => {
   flag.addEventListener("click", () => {
      selectedLanguage = flag.dataset.language;
      selectedFlag(selectedLanguage);
   });

});