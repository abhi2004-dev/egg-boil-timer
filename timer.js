
document.addEventListener("DOMContentLoaded", () => {
  // Define the egg types and their times in seconds
  const eggTimes = {
    soft: 240,   // 4 minutes
    medium: 420, // 7 minutes
    hard: 720    // 12 minutes
  };
  
  // Get the type of egg from the current page URL
  const currentPage = window.location.pathname.split("/").pop();
  const eggType = currentPage.replace(".html", "");
  const totalTime = eggTimes[eggType];

  // Timer variables
  let timeRemaining = totalTime;
  const countdownDisplay = document.getElementById("countdown");
  let alarmSound = null;
  let timerId = null;
  let audioAllowed = false;

  // Function to update the timer display
  function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Function to initialize audio
  function initAudio() {
    if (alarmSound) return;
    
    // Create audio element but don't play it
    alarmSound = new Audio('alarm.mp3');
    alarmSound.preload = 'auto';
    audioAllowed = true;
  }

  // Function to play alarm sound
  function playAlarm() {
    if (alarmSound && audioAllowed) {
      alarmSound.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  }

  // Main timer function
  function startTimer() {
    if (timerId !== null) {
      return; 
    }
    
    // Initialize audio on first user interaction
    if (!audioAllowed) {
      const enableAudio = () => {
        initAudio();
        document.body.removeEventListener('click', enableAudio);
        document.body.removeEventListener('touchstart', enableAudio);
      };
      
      document.body.addEventListener('click', enableAudio);
      document.body.addEventListener('touchstart', enableAudio);
    }
    
    // Start the countdown
    timerId = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(timerId);
        countdownDisplay.textContent = "DONE!";
        playAlarm();
      } else {
        timeRemaining--;
        updateDisplay();
      }
    }, 1000);
  }
  
  // Initial setup
  updateDisplay();
  startTimer();
});
