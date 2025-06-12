document.getElementById('notify-form').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('message');
  msg.textContent = "Merci ! Vous serez tenu informé.";
  msg.style.opacity = 1;
  setTimeout(() => { msg.style.opacity = 0; }, 3000);
});
