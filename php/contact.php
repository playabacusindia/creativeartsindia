<?php
/**
 * Creative Arts India - Contact Form Handler
 * Sends emails to contact@playabacusindia.com and idealplayabacus20@gmail.com
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// SMTP Configuration
$smtpServer = "mocha3039.mochahost.com";
$smtpPort = 465;
$smtpUser = "contact@playabacusindia.com";
$smtpPass = "PlayAbacusIndia@IPA.123"; // User will need to update this or I will if provided

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? 'Not provided';
    $email = $_POST['email'] ?? 'Not provided';
    $phone = $_POST['phone'] ?? 'Not provided';
    $message = $_POST['message'] ?? 'Not provided';
    $type = $_POST['inquiry_type'] ?? 'General';
    $city = $_POST['city'] ?? 'Unknown';
    $region = $_POST['region'] ?? 'Unknown';

    $subject = "New Inquiry: " . $type . " from " . $name;

    $body = "Hi,\n\n";
    $body .= "You have received a new inquiry from the Creative Arts India website.\n\n";
    $body .= "Details:\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Inquiry Type: $type\n";
    $body .= "City: $city\n";
    $body .= "Region: $region\n\n";
    $body .= "Message:\n$message\n\n";
    $body .= "Best,\nCreative Arts India Backend";

    $to = "idealplayabacus20@gmail.com, contact@playabacusindia.com";
    $headers = "From: contact@playabacusindia.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Using mail() as primary on cPanel environments as it's typically configured to use the local SMTP
    // If user strictly requires PHPMailer class, I will need to include the library files.
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Thank you for reaching out!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send email. Please try again later."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>