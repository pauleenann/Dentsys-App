<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer and DbConnect
require 'vendor/autoload.php';
include 'DbConnect.php'; //Includes the DbConnect.php file, which likely contains code to establish a database connection.
$objDb = new DbConnect;
$conn = $objDb->connect();

// Query pending appointments past their time
$sql = "SELECT 
            i.inv_id, 
            i.inv_issuedate,
            i.inv_duedate, 
            i.inv_status, 
            i.inv_totalamount,
            p.p_fname,
            p.p_lname,
            p.p_email,
            s.service_name
        FROM invoices i
        JOIN patienthistory ph ON i.ph_id = ph.id
        JOIN patients p ON ph.p_id = p.id
        JOIN services s ON ph.p_service = s.service_id
        WHERE inv_duedate < DATE(NOW()) AND inv_status = 'pending';";

$stmt = $conn->prepare($sql);
$stmt->execute();
$overdues = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($overdues) {
    echo json_encode($overdues);
    //checks if $appointmnets has elements
    if(count($overdues)>0){
        foreach($overdues as $overdue){
            $invoiceId = $overdue['inv_id'];
            $recipientEmail = $overdue['p_email'];
            $recipientFname = $overdue['p_fname'];
            $recipientLname = $overdue['p_lname'];
            $issueDate = $overdue['inv_issuedate'];
            $dueDate = $overdue['inv_duedate'];
            $total = $overdue['inv_totalamount'];
            $service = $overdue['service_name'];

            require 'send-overdue-email.php';

            echo $invoiceId;
            $sql = "UPDATE invoices 
                    SET inv_status = 'overdue'
                    WHERE inv_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id',$invoiceId);

            if($stmt->execute()){
                echo "Overdue invoices checked and updated";
            }else{
                echo "Error updating record for appointment ID";
            }
        }
    }
}
?>