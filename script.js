// script.js
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    const welcome = document.querySelector(".welcome-container");
  
    // Hide loader after 2.5 seconds
    setTimeout(() => {
      loader.style.display = "none";
      welcome.style.display = "block";
    }, 2500);
  });
// Simple demo for timer redirection
function startTimer(minutes) {
    // Save choice in localStorage
    localStorage.setItem("eggTime", minutes);
  
    // Redirect to timer page
    window.location.href = "timer.html";
  }
    