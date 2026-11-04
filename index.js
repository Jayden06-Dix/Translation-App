/* ============================================================
   index.js: entry point. Wires up events and holds app state.
   ============================================================ */

/* ---------- 1. IMPORTS ----------
   - From ui.js:  addMessage, showChatView, clearInput
   - From api.js: getTranslation
*/


/* ---------- 2. GRAB DOM ELEMENTS ----------
   - #translator (the card, used for the "is-chatting" class)
   - #text-to-translate (textarea)
   - #translate-btn (button)
   - radio inputs: input[name="language"]
*/


/* ---------- 3. APP STATE ----------
   - selectedLanguage = null   (set once, on the first submit, then never changes)
   - isChatting = false        (false = first screen, true = chat view)
   - isLoading = false         (stops double-submits while waiting for the AI)
*/


/* ---------- 4. MAIN HANDLER: handleSubmit() ----------
   1. If isLoading, return.
   2. Read the textarea value and trim it. If it's empty, return.
   3. If this is the FIRST submit (isChatting is false):
        a. Read the checked radio's value and save it to selectedLanguage.
        b. Call showChatView() to add "is-chatting" to #translator.
        c. Set isChatting = true.
        d. Change the button text to "Send" (optional).
   4. Call addMessage("user", text) to show the user's bubble.
   5. Call clearInput() to empty the textarea.
   6. Set isLoading = true and disable the button.
        (optional: show a "typing..." bubble from the AI)
   7. try:
        - const reply = await getTranslation(text, selectedLanguage)
        - Call addMessage("ai", reply)
      catch (error):
        - Call addMessage("ai", "Sorry, something went wrong. Please try again.")
        - console.error(error)
      finally:
        - isLoading = false and re-enable the button
        - (optional: remove the "typing..." bubble)
*/


/* ---------- 5. EVENT LISTENERS ----------
   - Button "click" -> handleSubmit
   - Textarea "keydown": if Enter (without Shift) is pressed,
     call event.preventDefault() and then handleSubmit
*/


/* ============================================================
   ui.js (separate file) will export:
   - addMessage(role, text)
       create a <div class="message user|ai">, set textContent,
       append it to #chat-log, scroll #chat-log to the bottom
   - showChatView()
       add "is-chatting" to #translator
   - clearInput()
       empty the textarea and focus it

   api.js (separate file) will export:
   - getTranslation(text, language)
       import getSystemPrompt (from prompt.js or api.js),
       call the AI API with the system prompt + user text,
       return the reply string
   ============================================================ */