const SERVICE_ID  = 'service_mn4b4b8';      // Email Services → Service ID
const INSCRIPTION_ID = 'template_inscription'; // Email Templates → Template ID
const RESPONSE_ID = 'template_response'; // Email Templates → Template ID


const form  = document.getElementById('notify-form');Add commentMore actions
const msgEl = document.getElementById('message');
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('notify-form');
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

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
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
// var templateParams = {
//   name: 'James',
//   notes: 'Check this out!',
// };

// emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams).then(
//   (response) => {
//     console.log('SUCCESS!', response.status, response.text);
//   },
//   (error) => {
//     console.log('FAILED...', error);
//   },
// );
