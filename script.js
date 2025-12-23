const scanBtn = document.getElementById("scanBtn");
const statusText = document.getElementById("status");
const resultBox = document.getElementById("result");
const uidEl = document.getElementById("uid");
const timeEl = document.getElementById("time");
const recordsEl = document.getElementById("records");

scanBtn.onclick = async () => {
  if (!("NDEFReader" in window)) {
    statusText.textContent = "❌ Web NFC not supported";
    return;
  }

  try {
    const reader = new NDEFReader();
    await reader.scan();
    statusText.textContent = "📡 Tap NFC card…";

    reader.onreading = (event) => {
      resultBox.classList.remove("hidden");
      recordsEl.innerHTML = "";

      uidEl.textContent = event.serialNumber || "Not available";
      timeEl.textContent = new Date().toLocaleString();

      for (const record of event.message.records) {
        const li = document.createElement("li");

        if (record.recordType === "text") {
          const textDecoder = new TextDecoder(record.encoding);
          li.textContent = "Text: " + textDecoder.decode(record.data);
        } 
        else if (record.recordType === "url") {
          const textDecoder = new TextDecoder();
          li.textContent = "URL: " + textDecoder.decode(record.data);
        } 
        else {
          li.textContent = `Type: ${record.recordType}`;
        }

        recordsEl.appendChild(li);
      }

      statusText.textContent = "✅ NFC card scanned";
    };

  } catch (err) {
    statusText.textContent = "❌ Error: " + err;
  }
};

