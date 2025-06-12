// IDs EmailJS pour la collecte
const SERVICE_ID     = 'service_mn4b4b8';
const INSCRIPTION_ID = 'template_inscription';

const form  = document.getElementById('notify-form');
const msgEl = document.getElementById('message');

// Géoloc (optionnel), countdown… laissez tel quel
document.addEventListener('DOMContentLoaded', () => {
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
const target = new Date(2026, 9, 15, 22, 22, 0).getTime();
// … updateCountdown() + timer = setInterval(…)
updateCountdown();

// Soumission du formulaire
form.addEventListener('submit', async function(e) {
  e.preventDefault();

  // 1) Envoi à votre boîte (EmailJS)
  try {
    await emailjs.sendForm(SERVICE_ID, INSCRIPTION_ID, form);
    msgEl.textContent = "Thanks! You're on the list 😊";
    msgEl.style.opacity = 1;
  } catch (err) {
    console.error('EmailJS error:', err);
    msgEl.textContent = "Oops, inscription failed…";
    msgEl.style.opacity = 1;
    return;
  }

  // 2) Envoi du mail de confirmation via votre back-end PHP
  const userEmail = form.elements.from_email.value;
  try {
    const res  = await fetch('/send-confirm.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email: userEmail })
    });
    const json = await res.json();
    if (json.success) {
      console.log('✅ Confirmation email sent to user');
      // Optionnel : afficher un message différent
      msgEl.textContent = "Confirmation sent to your inbox!";
    } else {
      console.error('Backend error:', json.error);
      msgEl.textContent = "Oops, confirmation failed…";
    }
  } catch (err) {
    console.error('Fetch error:', err);
    msgEl.textContent = "Network error, try later…";
  }
  msgEl.style.opacity = 1;
});
