<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer and DbConnect
require 'vendor/autoload.php';
include 'DbConnect.php'; //Includes the DbConnect.php file, which likely contains code to establish a database connection.
$objDb = new DbConnect;
$conn = $objDb->connect();

// Query pending appointments past their time
$sql = "SELECT inv_id, inv_duedate, inv_status 
        FROM invoices
        WHERE inv_duedate < DATE(NOW()) AND inv_status = 'pending'";

$stmt = $conn->prepare($sql);
$stmt->execute();
$overdues = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($overdues) {
    echo json_encode($overdues);
    //checks if $appointmnets has elements
    if(count($overdues)>0){
        foreach($overdues as $overdue){
            $invoiceId = $overdue['inv_id'];
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