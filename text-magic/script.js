// ============ CODE COMPARISON ============

function compareCode() {
    const code1 = document.getElementById("code1").value.split("\n");
    const code2 = document.getElementById("code2").value.split("\n");
    const maxLength = Math.max(code1.length, code2.length);
    let resultHTML = "";
  
    for (let i = 0; i < maxLength; i++) {
      const line1 = code1[i] || "";
      const line2 = code2[i] || "";
  
      if (line1 === line2) {
        resultHTML += `<div class="same">${escapeHTML(line1)}</div>`;
      } else if (!line2 && line1) {
        resultHTML += `<div class="removed">${escapeHTML(line1)}</div>`;
      } else {
        resultHTML += `<div class="changed">${highlightDifferences(line1, line2)}</div>`;
      }
    }
  
    document.getElementById("result").innerHTML = resultHTML;
  }
  
  function highlightDifferences(a, b) {
    let result = "";
    const maxLen = Math.max(a.length, b.length);
  
    for (let i = 0; i < maxLen; i++) {
      const charA = a[i] || "";
      const charB = b[i] || "";
  
      if (charA === charB) {
        result += escapeHTML(charB);
      } else {
        result += `<span class="diff-char">${escapeHTML(charB)}</span>`;
      }
    }
  
    return result;
  }
  
  function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  
  // ============ WORD COUNTER ============
  
  function countAll() {
    const text = document.getElementById("description").value;
  
    const charCount = text.length;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const sentenceCount = (text.match(/[.!?]+/g) || []).length;
    const paragraphCount = text.trim().split(/\n+/).filter(Boolean).length;
    const spaceCount = (text.match(/ /g) || []).length;
  
    document.getElementById("charCount").textContent = charCount;
    document.getElementById("wordCount").textContent = wordCount;
    document.getElementById("sentenceCount").textContent = sentenceCount;
    document.getElementById("paragraphCount").textContent = paragraphCount;
    document.getElementById("spaceCount").textContent = spaceCount;
  }
  
  function debounceCountAll() {
    clearTimeout(window.counterTimeout);
    window.counterTimeout = setTimeout(countAll, 300);
  }
  
  // ============ PARAGRAPH GENERATOR ============
  
  function getRandomWord() {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random() * 8) + 3;
    let word = '';
    for (let i = 0; i < length; i++) {
      word += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return word;
  }
  function generateParagraph() {
    const charLimit = parseInt(document.getElementById("charLimit").value, 10);
  
    // Validation: Check if charLimit is blank or exceeds the maximum limit
    if (isNaN(charLimit) || charLimit <= 0 || charLimit > 10000000) {
      alert("Please enter a valid character count between 1 and 10,000,000.");
      return; // Exit if validation fails
    }
  
    let text = "";
  
    // Handle small character limits (1–9) by generating random characters
    if (charLimit <= 9) {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < charLimit; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length));
      }
    } else {
      // Generate words for larger character limits
      while (text.length < charLimit) {
        const word = getRandomWord();
        if (text.length + word.length + 1 > charLimit) break;
        text += (text.length ? " " : "") + word;
      }
    }
  
    // Trim the text to ensure it doesn't exceed the character limit
    text = text.substring(0, charLimit);
  
    document.getElementById("description").value = text;
    countAll();
  }
  function clearFields() {
    document.getElementById("charLimit").value = ""; // Clear character limit input
    document.getElementById("description").value = ""; // Clear generated paragraph
    document.getElementById("charCount").textContent = "0"; // Reset character count
    document.getElementById("wordCount").textContent = "0"; // Reset word count
    document.getElementById("sentenceCount").textContent = "0"; // Reset sentence count
    document.getElementById("paragraphCount").textContent = "0"; // Reset paragraph count
    document.getElementById("spaceCount").textContent = "0"; // Reset space count
  }
  function copyToClipboard() {
    const textArea = document.getElementById("description");
    const text = textArea.value.trim(); // Remove leading/trailing whitespace
  
    if (!text) {
      alert("Please generate a paragraph before copying.");
      return;
    }
  
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  }
  