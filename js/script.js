let timerId = null;
let remainingTime = 0;
let interruptions = 0;

const startBtn = document.getElementById('startBtn');
const interruptBtn = document.getElementById('interruptBtn');
const durationInput = document.getElementById('durationInput');

const startTimer = (duration) => {
  if (timerId) stopTimer(); // Evita iniciar múltiples temporizadores
  
  remainingTime = duration;
  interruptions = 0; // Reinicia el contador de interrupciones
  document.getElementById('interruptionsLog').innerHTML = ''; // Limpia el log
  document.getElementById('results').innerHTML = ''; // Limpia los resultados

  // Deshabilitar botón de inicio y habilitar botón de interrupción
  startBtn.disabled = true;
  durationInput.disabled = true;
  interruptBtn.disabled = false;

  updateTimerDisplay(remainingTime);
  
  timerId = setInterval(() => {
    remainingTime--;
    updateTimerDisplay(remainingTime);
    if (remainingTime <= 0) stopTimer();
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerId);
  timerId = null;
  
  // Habilitar botón de inicio y deshabilitar botón de interrupción
  startBtn.disabled = false;
  durationInput.disabled = false;
  interruptBtn.disabled = true;

  if (remainingTime <= 0) {
     updateTimerDisplay(0); // Asegura que se muestre 0
     saveSession();
  }
};

const updateTimerDisplay = (time) => {
  const timerElement = document.getElementById('timer');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  timerElement.textContent = `Tiempo restante: ${formattedTime}`;
};

const registerInterruption = () => {
  if (timerId) {
    interruptions++;
    const log = document.getElementById('interruptionsLog');
    const entry = document.createElement('li');
    
    // Calcula el tiempo transcurrido desde el inicio para el log
    const totalDuration = parseInt(document.getElementById('durationInput').value, 10);
    const timeElapsed = totalDuration - remainingTime;
    
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const formattedElapsed = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    entry.textContent = `Interrupción #${interruptions} a los ${formattedElapsed} (quedaban ${remainingTime}s)`;
    log.appendChild(entry);
  }
};

const calculateMetrics = () => {
  const totalTime = parseInt(document.getElementById('durationInput').value, 10);
  // Penalización: 10 segundos por interrupción (se puede ajustar)
  const penalty = interruptions * 10; 
  const focusedTime = totalTime - penalty;
  
  // Puntuación de enfoque (máximo 100%, nunca negativo)
  const focusScore = Math.max(0, (focusedTime / totalTime) * 100); 
  
  return {
    totalTime,
    interruptions,
    focusScore
  };
};

const saveSession = () => {
  const metrics = calculateMetrics();
  const results = document.getElementById('results');
  results.innerHTML = `
    <p>✅ Sesión Finalizada</p>
    <p>Tiempo total programado: <strong>${metrics.totalTime}s</strong></p>
    <p>Interrupciones registradas: <strong>${metrics.interruptions}</strong></p>
    <p class="score">Puntuación de enfoque: <strong>${metrics.focusScore.toFixed(2)}%</strong></p>
  `;
};

const validateForm = () => {
  const input = document.getElementById('durationInput');
  const value = parseInt(input.value, 10);
  if (isNaN(value) || value <= 0) {
    alert('Por favor ingresa una duración válida y positiva en segundos.');
    return false;
  }
  return true;
};

// --- Manejo de Eventos ---

startBtn.addEventListener('click', () => {
  if (validateForm()) {
    const duration = parseInt(durationInput.value, 10);
    startTimer(duration);
  }
});

interruptBtn.addEventListener('click', registerInterruption);