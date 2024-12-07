<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer and DbConnect
require 'vendor/autoload.php';
include 'DbConnect.php'; //Includes the DbConnect.php file, which likely contains code to establish a database connection.
$objDb = new DbConnect;
$conn = $objDb->connect();

// Query pending appointments past their time
$sql = "SELECT a.id, a.user_id, u.email, u.name 
        FROM appointments a
        JOIN users u ON a.user_id = u.id
        WHERE a.appointment_time < NOW() AND a.status = 'pending'";

$stmt = $conn->prepare($sql);
$stmt->execute();
$appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($appointments) {
    foreach ($appointments as $row) {
        $appointment_id = $row['id'];
        $user_email = $row['email'];
        $user_name = $row['name'];

        // Update appointment status to 'cancelled'
        $update_sql = "UPDATE appointments SET status = 'cancelled' WHERE id = :id";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bindParam(':id', $appointment_id, PDO::PARAM_INT);

        if ($update_stmt->execute()) {
            // Send cancellation email
            echo "overdue invoices checked"
        } else {
            echo "Error updating record for appointment ID";
        }
    }
}

