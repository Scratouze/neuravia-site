// → Remplacez par vos propres IDs EmailJS
const SERVICE_ID  = 'service_ovh_neuravia';
const TEMPLATE_ID = 'template_inscription';



const form   = document.getElementById('notify-form');
const msgEl  = document.getElementById('message');

// Countdown target: October 15, 2025 at 22:22 local time
const target = new Date(2025, 9, 15, 22, 22, 0, 0).getTime();

const daysEl    = document.getElementById('days');
const hoursEl   = document.getElementById('hours');
const minsEl    = document.getElementById('minutes');
const secsEl    = document.getElementById('seconds');

function updateCountdown() {
  const now  = Date.now();
  let diff   = target - now;
  if (diff < 0) {
    clearInterval(timer);
    document.querySelector('.countdown').textContent = 'Launch time!';
    return;
  }
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000);   diff %= 3600000;
  const m = Math.floor(diff / 60000);     diff %= 60000;
  const s = Math.floor(diff / 1000);
  daysEl .textContent = String(d).padStart(2,'0');
  hoursEl.textContent = String(h).padStart(2,'0');
  minsEl .textContent = String(m).padStart(2,'0');
  secsEl .textContent = String(s).padStart(2,'0');
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// Send form via EmailJS
form.addEventListener('submit', function(e) {
  e.preventDefault();
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
    .then(() => {
      msgEl.textContent = "Thanks! You're on the list 😊";
      msgEl.style.opacity = 1;
    }, (err) => {
      console.error('EmailJS error:', err);
      msgEl.textContent = "Oops, sending failed…";
      msgEl.style.opacity = 1;
    });
});

