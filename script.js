const scanBtn = document.getElementById("scanBtn");
const output = document.getElementById("output");

scanBtn.onclick = async () => {
  if (!("NDEFReader" in window)) {
    output.textContent = "❌ Web NFC not supported on this device";
    return;
  }

  try {
    const nfc = new NDEFReader();
    await nfc.scan();
    output.textContent = "📡 Scan started... Tap NFC tag";

    nfc.onreading = event => {
      let text = `✅ NFC Tag Detected\n`;
      text += `Serial Number: ${event.serialNumber}\n`;

      for (const record of event.message.records) {
        text += `\nRecord Type: ${record.recordType}`;
      }

      output.textContent = text;
    };

  } catch (err) {
    output.textContent = "❌ Error: " + err;
  }
};
