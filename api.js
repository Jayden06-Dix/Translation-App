// Sends the text to the Netlify function, which talks to the AI and keeps the key private
export async function getTranslation(text, language) {
  const res = await fetch("/.netlify/functions/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });

  if (!res.ok) throw new Error("Translation request failed");

  const data = await res.json();
  return data.reply;
}
