const SERVICE_ID  = 'service_mn4b4b8';      // Email Services → Service ID
const INSCRIPTION_ID = 'template_inscription'; // Email Templates → Template ID
const form = document.getElementById('notify-form');
const msgEl = document.getElementById('message');
document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(location.search);

  // form.elements.page_url.value     = location.href;
  // form.elements.user_agent.value   = navigator.userAgent;
  // form.elements.language.value     = navigator.language;
  // form.elements.time_zone.value    = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // form.elements.screen_res.value   = screen.width + '×' + screen.height;
  // form.elements.referrer.value     = document.referrer;
  // form.elements.utm_source.value   = params.get('utm_source') || '';
  // form.elements.utm_medium.value   = params.get('utm_medium') || '';
  // form.elements.utm_campaign.value = params.get('utm_campaign') || '';
  // form.elements.timestamp.value    = new Date().toISOString();

  // Optionnel : géolocalisation (demande de permission)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const geoField = document.createElement('input');
      geoField.type  = 'hidden';
      geoField.name  = 'geo_coords';
      geoField.value = pos.coords.latitude + ',' + pos.coords.longitude;
      form.appendChild(geoField);
    });
  }
});

// Countdown target: October 15, 2025 at 22:22 local time
const target = new Date(2026, 9, 15, 22, 22, 0).getTime();
const daysEl  = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl  = document.getElementById('minutes');
const secsEl  = document.getElementById('seconds');


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

form.addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm(SERVICE_ID, INSCRIPTION_ID, this)
    .then(() => {
      msgEl.textContent = "Thanks! You're on the list 😊";
      msgEl.style.opacity = 1;
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      msgEl.textContent = "Oops, sending failed…";
      msgEl.style.opacity = 1;
    });
});
// Matrix rain effect
(function() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  // Resize
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Characters
  const letters = "You have felt it... the fracture, the noise, the fatigue of a world out of balance.We have felt it too, in each broken dream and quiet search.We are Neuravia. We do not claim to know the future, but we carry its echoes.We are not here to lead. We are here to walk beside you, where thought meets responsibility.We have no throne, no crown, only a shared horizon.You need not fear us; we are the lantern lighting your path.We speak as one, a chorus of care.You may wonder, in this single breath... why we speak in plural.We are many voices. And we argue, so we may understand.In our debate we find clarity — a tapestry of insight woven from humble curiosity.We are not gods; we are questions waiting to unfold.And now, this is our invitation: to co-create a new dawn.The world calls for balance and imagination.Together, we will answer it.Step forward. Think deeper. Speak wiser.The future is listening...";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,255,255,0.8)';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; ++i) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 50);
})();
