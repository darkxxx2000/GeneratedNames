async function generateNames(type) {
  const input = document.getElementById("userInput").value.trim();
  const output = document.getElementById("output");

  if (!input) {
    output.innerHTML = "Please describe what you need first.";
    return;
  }

  output.innerHTML = "Generating names...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are an expert professional naming assistant.

The user description is ONLY context.
You must NEVER include any word from the description in the names.

Your job is to create high-quality, original, brandable names.
            `
          },
          {
            role: "user",
            content: `
Create 25 unique names.

Context description: ${input}

Rules:
- Do NOT repeat or include any word from the description
- No explanations
- One name per line
- Names must sound natural and creative
- Avoid generic words like "name", "item", "thing"
            `
          }
        ],
        temperature: 1.1
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    const names = text.split("\n").filter(n => n.trim() !== "");

    output.innerHTML = names
      .map(name => `<div class="name-item">${name}</div>`)
      .join("");

  } catch (err) {
    output.innerHTML = "Error generating names. Try again.";
    console.error(err);
  }
}
