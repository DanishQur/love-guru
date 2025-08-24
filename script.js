async function sendMessage() {
  const input = document.getElementById("userInput");
  const messages = document.getElementById("messages");
  const userText = input.value.trim();
  if (!userText) return;

  messages.innerHTML += `<div class="message user">${userText}</div>`;
  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await res.json();
  messages.innerHTML += `<div class="message bot">${data.reply}</div>`;
  messages.scrollTop = messages.scrollHeight;
}
