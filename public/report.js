"use strict";

document.getElementById("houseButton").addEventListener("click", () => {
  fetchContent("house");
});

document.getElementById("outsideButton").addEventListener("click", () => {
  fetchContent("outside");
});

document.getElementById("backButton").addEventListener("click", () => {
  document.getElementById("main-screen").style.display = "block";
  document.getElementById("content-screen").style.display = "none";
});

function fetchContent(type) {
    fetch(`/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type })
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById("main-screen").style.display = "none";
        document.getElementById("content-screen").style.display = "block";
  
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = ""; 
  
        if (Array.isArray(data.message)) {
          const ul = document.createElement("ul");
          data.message.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          contentDiv.appendChild(ul);
        } else {
          contentDiv.textContent = data.message;
        }
      })
  }
  
