<?php
// send-confirm.php
header('Content-Type: application/json');

// 1) Récupère l’email
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if (!$email) {
  http_response_code(400);
  echo json_encode(['error'=>'Email invalide']);
  exit;
}

// 2) Envoie le mail de confirmation
$to      = $email;
$subject = 'Thank you for joining Neuravia!';
$message = <<<EOD
Hello,

Thank you for joining Neuravia! We’re thrilled to have you on board as one of our pioneers.

Launch Date: October 15, 2025 at 22:22

Stay tuned for exclusive previews!

— The Neuravia Team
EOD;
$headers = 'From: contact@neuravia.org' . "\r\n" .
           'Reply-To: contact@neuravia.org' . "\r\n";

if (mail($to, $subject, $message, $headers)) {
  echo json_encode(['success'=>true]);
} else {
  http_response_code(500);
  echo json_encode(['error'=>'Echec de l’envoi']);
}
