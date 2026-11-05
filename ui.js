// Grabbing HTML elements for Variables
const chatLog = document.getElementById("chat-log");
const translatorCard = document.getElementById("translator");
const textBox = document.getElementById("text-to-translate");
const flagBtns = document.querySelectorAll(".flag-option")

// Adds the Chat message Bubble (AI response)
export function addMessage(role, text) {
    const bubble = document.createElement("div")
    bubble.className = `message ${role}`
    bubble.textContent = text
    chatLog.appendChild(bubble)
    chatLog.scrollTop = chatLog.scrollHeight

    return bubble 
}

// Switches App Phase from Textbox and Radio selectors to Chat mode.
export function showChatView() {
    translatorCard.classList.add("is-chatting")
}

//Clears Input and Allows User to keep typing immediately
export function clearInput() {
    textBox.value = ""
    textBox.focus()
}

//Loops through the buttons and compares the language with selected Language to make sure AI uses selected language. 
export function selectedFlag (selected) {
    flagBtns.forEach((flag) => {
        flag.classList.toggle("selected", flag.dataset.language === selected)
    })
}