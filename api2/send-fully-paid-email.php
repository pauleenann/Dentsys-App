<?php
// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Autoload PHPMailer using Composer
require 'vendor/autoload.php'; // Use this if installed via Composer
// require 'fully-paid-email.php';

//Ensure that recipientemail is set
// if (!isset($recipientEmail)) {
//     die('Recipient email is not set.');
// }
$mail = new PHPMailer(true);

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'pndingcong.stjames@gmail.com';
    $mail->Password   = 'ljjwnvktxtnzpvwh'; // Use an App Password, not your Gmail password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Email settings
    $mail->setFrom('pndingcong.stjames@gmail.com', 'Toothie Cutie Dental Clinic');
    $mail->addAddress($recipientEmail); // Recipient's email address
    $mail->isHTML(true);
    $mail->Subject = 'Your bill is now fully paid!';
    ob_start();
    include 'fully-paid-email.php';
    $mail->Body = ob_get_clean();
    // $mail->Body = 'hello';
    $mail->send();
    echo 'Email sent successfully!';
} catch (Exception $e) {
    echo "Email could not be sent. Error: {$mail->ErrorInfo}";
}
?>
