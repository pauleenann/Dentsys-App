<?php
error_reporting(E_ALL); //Sets PHP to report all errors, warnings, and notices.
ini_set('display_errors',1);//display errors directly on the web page for debugging purposes.
header("Access-Control-Allow-Origin: *");//Sets CORS policy to allow access to this API from any domain.
header("Access-Control-Allow-Headers: *");// Allows any headers to be sent in the request.
header("Access-Control-Allow-Methods: *");// Allows any HTTP methods (GET, POST, PUT, DELETE, etc.) to be used in requests.

include 'DbConnect.php'; //Includes the DbConnect.php file, which likely contains code to establish a database connection.
$objDb = new DbConnect;
$conn = $objDb->connect();
date_default_timezone_set('Asia/Manila');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if($method ==='PUT'){
    //  This line checks if the 'action' parameter is present in the URL query string 
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    $request = explode('/', $_SERVER['REQUEST_URI']);
    $id = $request[2];
    print_r($id);
        //print_r($request);
        switch($action){
            case 'updateStatus':
                $user = json_decode(file_get_contents('php://input'));
                $path = explode('/',$_SERVER['REQUEST_URI']);
                
                //echo json_encode(["id" => $id, "status" => $userData]);
                
                if (isset($user->status) && isset($path[2])) {
                    $id = isset($path[2]) ? $path[2] : null;
                    $userData = $user->status;

                    try {
                        // Prepare the SQL statement to update the user status
                        $stmt = $conn->prepare("UPDATE users SET status = :status WHERE id = :id");
                        $stmt->bindParam(':status', $userData, PDO::PARAM_STR);
                        $stmt->bindParam(':id', $id, PDO::PARAM_STR);

                        // Execute the statement
                        if ($stmt->execute()) {
                            echo json_encode(["success" => true, "message" => "User status updated successfully"]);
                        } else {
                            echo json_encode(["success" => false, "message" => "Failed to update user status"]);
                        }
                    } catch (PDOException $e) {
                        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
                    }
                } else {
                    echo json_encode(["success" => false, "message" => "Invalid input"]);
                }
                break;

            case 'accept':
                // Update appointment to accepted
                $sql = "UPDATE appointment SET status_ = 'accepted' WHERE a_id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $id);
    
                if ($stmt->execute()) {
                    // Get info from appointment table
                    $sqlAppt = "SELECT * FROM appointment WHERE a_id = :id";
                    $stmtAppt = $conn->prepare($sqlAppt);
                    $stmtAppt->bindParam(':id', $id);
    
                    if ($stmtAppt->execute()) {
                        $Appt = $stmtAppt->fetchAll(PDO::FETCH_ASSOC);
                        $patientId = $Appt[0]['id'];
                        $apptTime = $Appt[0]['time_'];
                        $apptDate = $Appt[0]['date_'];
                        $apptId = $Appt[0]['a_id'];

                        if ($patientId) {
                            // Get patient info from temppatient
                            $sqlTempPatient = "SELECT * FROM temppatient WHERE id = :id";
                            $stmtTemp = $conn->prepare($sqlTempPatient);
                            $stmtTemp->bindParam(':id', $patientId);
    
                            if ($stmtTemp->execute()) {
                                $patient = $stmtTemp->fetch(PDO::FETCH_ASSOC); // Change to fetch as we expect one row
    
                                // Store patient info in variable
                                $recipientEmail = $patient['email'];
                                $recipientFname = $patient['fname'];
                                $recipientLname = $patient['lname'];
                                $recipientAppointmentId = $id;
    
                                // Execute send-email.php
                                require 'send-email.php';
    
                                echo json_encode(['status' => 1, 'message' => 'Appointment accepted and email sent.']);
                            } else {
                                echo json_encode(['status' => 0, 'message' => 'Failed to fetch patient information.']);
                            }
                        } else {
                            echo json_encode(['status' => 0, 'message' => 'Patient ID not found.']);
                        }
                    } else {
                        echo json_encode(['status' => 0, 'message' => 'Failed to fetch patient ID.']);
                    }
                } else {
                    echo json_encode(['status' => 0, 'message' => 'Failed to update appointment status.']);
                }
            break;

            case 'finish':
                    // id is appointment id
                    // Update the appointment status to 'finished'
                    $user = json_decode(file_get_contents('php://input'));
                    $loggedin = $user->loggedin;
                    $action = "Set an appointment to finish";
                    $timestamp = date("Y-m-d H:i:s");
                    $affected_table = "appointment, temppatient"; 
                    $sql = "UPDATE appointment SET status_ = 'finished' WHERE a_id = :id";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':id', $id);
                
                    // Execute the appointment status update
                    if ($stmt->execute()) {
                        // Get patient id from appointments table
                        $sqlApp = "SELECT id FROM appointment WHERE a_id = :id";
                        $stmtApp = $conn->prepare($sqlApp);
                        $stmtApp->bindParam(':id', $id);
                
                        if ($stmtApp->execute()) {
                            $patientId = $stmtApp->fetch(PDO::FETCH_ASSOC);  // Fetch the patient ID from appointment
                            var_dump($patientId);
                
                            // Check if the patient ID exists
                            if ($patientId) {
                                // Get patient info from temppatient
                                $sqlTempPatient = "SELECT * FROM temppatient WHERE id = :id";
                                $stmtTemp = $conn->prepare($sqlTempPatient);
                                $stmtTemp->bindParam(':id', $patientId['id']);  // Correctly pass the id from the previous query
                
                                if ($stmtTemp->execute()) {
                                    $patient = $stmtTemp->fetchAll(PDO::FETCH_ASSOC);
                                    var_dump($patient);
                
                                    // Check if the patient already exists in the patients table
                                    $checkPatient = "SELECT * FROM patients WHERE p_fname = :p_fname AND p_lname = :p_lname AND p_email = :p_email AND p_phone = :p_phone";
                                    $stmtCheckPatient = $conn->prepare($checkPatient);
                                    $stmtCheckPatient->bindParam(':p_fname', $patient[0]['fname']);
                                    $stmtCheckPatient->bindParam(':p_lname', $patient[0]['lname']);
                                    $stmtCheckPatient->bindParam(':p_email', $patient[0]['email']);
                                    $stmtCheckPatient->bindParam(':p_phone', $patient[0]['phone']);
                
                                    if ($stmtCheckPatient->execute()) {
                                        $patientFound = $stmtCheckPatient->fetch(PDO::FETCH_ASSOC);
                
                                        if ($patientFound) {
                                            // Patient already exists, do not insert again
                                            $response = ['status' => 0, 'message' => 'Patient already exists.'];
                                        } else {
                                            // Insert data into patients table since the patient does not exist
                                            $sqlPatient = "INSERT INTO patients (id, p_fname, p_lname, p_mname, p_ename, p_age, p_gender, p_email, p_phone)
                                                           VALUES (null, :p_fname, :p_lname, :p_mname, :p_ename, null, null, :p_email, :p_phone)";
                                            $stmtPatient = $conn->prepare($sqlPatient);
                                            $stmtPatient->bindParam(':p_fname', $patient[0]['fname']);
                                            $stmtPatient->bindParam(':p_lname', $patient[0]['lname']);
                                            $stmtPatient->bindParam(':p_mname', $patient[0]['mname']);
                                            $stmtPatient->bindParam(':p_ename', $patient[0]['ename']);
                                            $stmtPatient->bindParam(':p_email', $patient[0]['email']);
                                            $stmtPatient->bindParam(':p_phone', $patient[0]['phone']);
                                            
                                            if ($stmtPatient->execute()) {
                                                $response = ['status' => 1, 'message' => 'Patient added successfully'];
                                            } else {
                                                $response = ['status' => 0, 'message' => 'Failed to add patient to the patients table.'];
                                            }
                                        }

                                        // // If patient is added, delete the patient from temppatient table
                                        // $deleteTemp = "DELETE FROM temppatient WHERE id = :id";
                                        // $stmtDeleteTemp = $conn->prepare($deleteTemp);
                                        // $stmtDeleteTemp->bindParam(':id', $patientId['id']);
        
                                        // if ($stmtDeleteTemp->execute()) {
                                        //     $response = ['status' => 1, 'message' => 'Patient deleted from temppatient.'];
                                        // } else {
                                        //     $response = ['status' => 0, 'message' => 'Failed to delete patient from temppatient.'];
                                        // }
                                    } else {
                                        $response = ['status' => 0, 'message' => 'Error checking patient existence.'];
                                    }
                                } else {
                                    $response = ['status' => 0, 'message' => 'Failed to fetch patient information from temppatient.'];
                                }
                            } else {
                                $response = ['status' => 0, 'message' => 'Patient ID not found in appointment record.'];
                            }
                        } else {
                            $response = ['status' => 0, 'message' => 'Failed to fetch appointment details.'];
                        }
                    } else {
                        // Respond with failure if update failed
                        $response = ['status' => 0, 'message' => 'Failed to update appointment record.'];
                    }
                
                    // Respond with JSON
                    echo json_encode($response);
            break;
                
            case 'cancel':
                $user = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE appointment SET status_ = 'cancelled' WHERE a_id = :id AND status_ != 'cancelled'";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);

                if($stmt->execute()){
                    // if set to cancelled, execute email 
                    $cancelledApptDetailsQ = "SELECT
                                                appointment.date_,
                                                appointment.a_id,
                                                appointment.time_,
                                                temppatient.fname,
                                                temppatient.lname,
                                                temppatient.email,
                                                services.service_name
                                            FROM appointment
                                            JOIN temppatient ON temppatient.id = appointment.id 
                                            JOIN services ON appointment.service_ = services.service_id
                                            WHERE a_id = :id";
                    $cancelledApptDetailsStmt = $conn->prepare($cancelledApptDetailsQ);
                    $cancelledApptDetailsStmt->bindParam(':id', $id, PDO::PARAM_INT);

                    // execute $cancelledApptDetailsQ
                    if($cancelledApptDetailsStmt->execute()){
                        $cancelledAppt = $cancelledApptDetailsStmt->fetchAll(PDO::FETCH_ASSOC);

                        $recipientEmail = $cancelledAppt[0]['email'];
                        $recipientFname = $cancelledAppt[0]['fname'];
                        $recipientLname = $cancelledAppt[0]['lname'];
                        $apptDate = $cancelledAppt[0]['date_'];
                        $apptTime = $cancelledAppt[0]['time_'];
                        $apptService = $cancelledAppt[0]['service_name'];
                        $recipientAppointmentId = $id;

                        // Execute send-email.php
                        require 'send-cancelled-email.php';
    
                        echo json_encode(['status' => 1, 'message' => 'Appointment accepted and email sent.']);

                    }

                }else{
                    $response = ['status' => 0, 'message' => 'Failed to update Record.'];
                }
                // echo json_encode($response)
                break;

            case 'reschedule':
                $user = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE appointment SET date_=:date_, time_=:time_, status_ = 'pending' WHERE a_id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                $stmt->bindParam(':date_', $user->date_);
                $stmt->bindParam(':time_', $user->time_);
                if($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                }else{
                    $response = ['status' => 0, 'message' => 'Failed to update Record.'];
                }
                // echo json_encode($response)
                break;

            case 'editPatient':
                $user = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE patients SET p_fname=:p_fname, p_lname=:p_lname,  p_mname=:p_mname, p_ename=:p_ename, p_age=:p_age, p_gender=:p_gender, p_email=:p_email, p_phone=:p_phone WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                $stmt->bindParam(':p_fname', $user->p_fname);
                $stmt->bindParam(':p_lname', $user->p_lname);
                $stmt->bindParam(':p_mname', $user->p_mname);
                $stmt->bindParam(':p_ename', $user->p_ename);
                $stmt->bindParam(':p_age', $user->p_age);
                $stmt->bindParam(':p_gender', $user->p_gender);
                $stmt->bindParam(':p_email', $user->p_email);
                $stmt->bindParam(':p_phone', $user->p_phone);
                if($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                }else{
                    $response = ['status' => 0, 'message' => 'Failed to update Record.'];
                }
                // echo json_encode($response)
                break;

                case 'updateUserData':
                    $path = explode('/', $_SERVER['REQUEST_URI']);
                    $user = json_decode(file_get_contents('php://input'));
                    $timestamp = date("Y-m-d H:i:s");
                    $loggedin = $user->loggedin;
                    $status = $user->status;
                    $action = "Edited a user";
                    $affected_table = "users";

                    if (isset($path[2]) && is_numeric($path[2])) {
                        $id = $path[2];

                        $input = json_decode(file_get_contents('php://input'), true);
                
                        $sql = "UPDATE users SET u_fname = :u_fname, u_lname = :u_lname, account_type = :account_type, username = :username, password = :password WHERE id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':u_fname', $input['u_fname']);
                        $stmt->bindParam(':u_lname', $input['u_lname']);
                        $stmt->bindParam(':account_type', $input['account_type']);
                        $stmt->bindParam(':username', $input['username']);
                        $stmt->bindParam(':password', $input['password']); // Consider hashing the password
                        $stmt->bindParam(':id', $id);
                
                        $variables = "username = {$input['username']}, status = {$input['status']}, first name = {$input['u_fname']}, last name = {$input['u_lname']}, account type = {$input['account_type']}, password = {$input['password']}";

                        if ($stmt->execute()) {
                            $logStmt = $conn->prepare("INSERT INTO audit_log (audit_id, user, action, affected_table, record_id, new_value, timestamp) VALUES (null, :user, :action, :affected_table, :record_id, :new_value, :timestamp)");
                            $logStmt->bindParam(':user', $loggedin, PDO::PARAM_STR);
                            $logStmt->bindParam(':action', $action, PDO::PARAM_STR);
                            $logStmt->bindParam(':affected_table', $affected_table, PDO::PARAM_STR);
                            $logStmt->bindParam(':record_id', $id, PDO::PARAM_STR);
                            $logStmt->bindParam(':new_value', $variables, PDO::PARAM_STR);
                            $logStmt->bindParam(':timestamp', $timestamp, PDO::PARAM_STR);

                            if ($logStmt->execute()) {
                                echo json_encode(["success" => true, "message" => "User added and action logged"]);
                            } else {
                                echo $logStmt->queryString;
                                echo json_encode(["success" => false, "message" => "User added, but failed to log action"]);
                            }
                            echo json_encode(['message' => 'User updated successfully']);
                        } else {
                            http_response_code(500);
                            echo json_encode(['message' => 'Failed to update user']);
                        }
                    } else {
                        http_response_code(400);
                        echo json_encode(['message' => 'Invalid user ID']);
                    }
                    break;


            default:
                echo json_encode(['error' => 'Invalid action']);
                break;

        }
}elseif ($method ==='GET'){
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    $request = explode('/', $_SERVER['REQUEST_URI']);
    //for retrieving unaivalable appointment dates
    $date = $request[2];

    switch ($action) {
        case 'getServices':
            $sql = "SELECT * FROM services";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($services);
            break;

        case 'getDentists':
            $sql = "SELECT * FROM users WHERE account_type = 'dentist'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $dentist = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($dentist);
            break;

        case 'getInvoices':
            $sql = "SELECT * FROM invoices";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $invoices = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($invoices);
            break;

        case 'getServicesDetails':
            $sql = "SELECT sd_id, service_id, service_name, sd_description, sd_price
                FROM servicedetails INNER JOIN services
                ON servicedetails.s_id = services.service_id;";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($services);
            break;
        
        case 'getOptions':
                $sql = "SELECT * FROM servicesoptions";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($services);
                break;

        case 'getAppointments':
            $sql = "SELECT 
                        a_id, 
                        fname, 
                        lname, 
                        email, 
                        phone, 
                        service_name, 
                        date_, 
                        time_, 
                        status_
                    FROM appointment 
                    JOIN temppatient ON appointment.id = temppatient.id
                    JOIN services ON appointment.service_ = services.service_id
                    ORDER BY appointment.a_id DESC";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $appt = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($appt);
            break;

        case 'getPendingAppointments':
                $sql = "SELECT COUNT(*) AS total_pending FROM appointment WHERE status_ = 'pending'";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $totalPending = $result['total_pending'];
                echo json_encode(['total_pending' => $totalPending]);
        break;

        case 'getCancelledAppointments':
                $sql = "SELECT COUNT(*) AS total_cancelled FROM appointment WHERE status_ = 'cancelled'";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $totalCancelled = $result['total_cancelled'];
                echo json_encode(['total_cancelled' => $totalCancelled]);
                break;

        case 'getRecentAppointments':
                $sql = "SELECT COUNT(*) AS recent_visits FROM appointment WHERE status_ = 'finished'";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $recentVisits = $result['recent_visits'];
                echo json_encode(['recent_visits' => $recentVisits]);
                break;
                
        case 'getRecentAppointmentDetails':
                date_default_timezone_set('Asia/Singapore');
                $today = date('Y-m-d');
                $sql = "SELECT 
                        a_id, 
                        fname, 
                        lname, 
                        email, 
                        phone, 
                        service_name, 
                        date_, 
                        time_, 
                        status_
                    FROM appointment 
                    JOIN temppatient ON appointment.id = temppatient.id
                    JOIN services ON appointment.service_ = services.service_id
                    WHERE status_ = 'finished' AND date_ <= :today";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':today', $today, PDO::PARAM_STR);
                $stmt->execute();
                $appt = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($appt);
                break;

        case 'getUpcomingAppointments':
                //sets correct timezone
                date_default_timezone_set('Asia/Singapore');
                $today = date('Y-m-d');
                $sql = "SELECT COUNT(*) AS total_upcoming FROM appointment WHERE date_ = :today AND status_='accepted'" ;
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':today', $today, PDO::PARAM_STR);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $totalUpcoming = $result['total_upcoming'];
                echo json_encode(['total_upcoming' => $totalUpcoming]);
        break;

        case 'getUnavailableTime':
            $sql = "SELECT * FROM appointment WHERE date_ = :date_ AND status_='accepted'" ;
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':date_', $date);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        break;
                
        case 'getEarningsToday':
                //sets correct timezone
                date_default_timezone_set('Asia/Singapore');
                $today = date('Y-m-d');
                $sql = "SELECT sum(pay_amount) AS total_earnings FROM payment WHERE pay_date = :today" ;
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':today', $today, PDO::PARAM_STR);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $totalEarnings = $result['total_earnings'];
                echo json_encode(['total_earnings' => $totalEarnings]);
                break;

        case 'getAppointmentsToday':
                //sets correct timezone
                date_default_timezone_set('Asia/Singapore');
                $today = date('Y-m-d');
                $sql = "SELECT 
                        a_id, 
                        fname, 
                        lname, 
                        email, 
                        phone, 
                        service_name, 
                        date_, 
                        time_, 
                        status_
                    FROM appointment 
                    JOIN temppatient ON appointment.id = temppatient.id
                    JOIN services ON appointment.service_ = services.service_id WHERE date_ = :today AND status_='accepted' ORDER BY time_ DESC";
                //change time for testing purposes
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':today', $today, PDO::PARAM_STR);
                $stmt->execute();
                $appToday = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($appToday);
                break;

    
        case 'getPatients':
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10; // Default limit to 10
            $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0; // Default offset to 0
        
            $sql = "SELECT * FROM patients LIMIT :limit OFFSET :offset";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $patients = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            // Get total count of patients for pagination
            $countSql = "SELECT COUNT(*) as total FROM patients";
            $countStmt = $conn->prepare($countSql);
            $countStmt->execute();
            $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
        
            echo json_encode([
                "patients" => $patients,
                "total" => $total
            ]);

           /*  $sql = "SELECT * from patients";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($services); */
            break;

        case 'getPatient':
            $sql = "SELECT * FROM patients WHERE id = :id";
            $path = explode('/',$_SERVER['REQUEST_URI']);
            // print_r($path);
            if(isset($path[2]) && is_numeric($path[2])){
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[2]);
                $stmt->execute();
                $users = $stmt->fetch(PDO::FETCH_ASSOC);
            }else{
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            
            echo json_encode($users);
            break;

            //for patient record overview
            case 'getProcedureHistory':
                $sql = "SELECT 
                            patienthistory.id, 
                            patienthistory.p_date, 
                            patienthistory.p_dentist,
                            patients.p_fname,
                            patients.p_lname,
                            services.service_name,
                            users.u_fname,
                            users.u_lname 
                        FROM patients
                        JOIN patienthistory ON patienthistory.p_id = patients.id
                        JOIN servicesoptions ON servicesoptions.option_id = patienthistory.p_service 
                        JOIN services ON services.service_id = servicesoptions.service_id
                        JOIN users ON patienthistory.p_dentist = users.id WHERE p_id = :id";
                
                $path = explode('/',$_SERVER['REQUEST_URI']);
                // print_r($path);
                if(isset($path[2]) && is_numeric($path[2])){
                    //$sql .= " WHERE p_id = :id";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':id', $path[2]);
                    $stmt->execute();
                    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                }else{
                    $stmt = $conn->prepare($sql);
                    $stmt->execute();
                    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                }
                echo json_encode($users);
                break;

                //for viewing dental record
                case 'getDentalRecord':
                    $sql = "SELECT 
                                patienthistory.p_date, 
                                patienthistory.p_selectedTeeth, 
                                services.service_name, 
                                servicesoptions.option_name, 
                                invoices.inv_totalamount,
                                users.u_fname,
								users.u_lname 
                            FROM patienthistory
                            JOIN servicesoptions ON servicesoptions.option_id = patienthistory.p_service
                            JOIN services ON services.service_id = servicesoptions.service_id
                            JOIN invoices ON patienthistory.id = invoices.ph_id
                            JOIN users ON patienthistory.p_dentist = users.id
                            WHERE patienthistory.id = :id";

                    $path = explode('/',$_SERVER['REQUEST_URI']);
                    // print_r($path);
                    if(isset($path[2]) && is_numeric($path[2])){
                        //$sql .= " WHERE id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $path[2]);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        
                    }else{
                        $stmt = $conn->prepare($sql);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    }
                    
                    echo json_encode($users);
                break;

                case 'getInvoice':
                    $sql = "SELECT * from invoices WHERE ph_id = :id";
                    
                    $path = explode('/',$_SERVER['REQUEST_URI']);
                    // print_r($path);
                    if(isset($path[2]) && is_numeric($path[2])){
                        //$sql .= " WHERE id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $path[2]);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        
                    }else{
                        $stmt = $conn->prepare($sql);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    }
                    
                    echo json_encode($users);
                    break;
                
            case 'getInvoice':
                    $sql = "SELECT * from invoices WHERE ph_id = :id";
                    
                    $path = explode('/',$_SERVER['REQUEST_URI']);
                    // print_r($path);
                    if(isset($path[2]) && is_numeric($path[2])){
                        //$sql .= " WHERE id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $path[2]);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        
                    }else{
                        $stmt = $conn->prepare($sql);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    }
                    
                    echo json_encode($users);
                    break;

            case 'getInvoiceDetails':
                    $sql = "SELECT 
                                patients.p_fname, 
                                patients.p_lname, 
                                invoices.inv_issuedate, 
                                invoices.inv_duedate, 
                                invoices.inv_status, 
                                invoices.inv_totalamount, 
                                invoices.inv_id,
                                services.service_name,
                                servicesoptions.option_name
                            FROM patients
                            JOIN patienthistory ON patients.id = patienthistory.p_id 
                            JOIN invoices ON patienthistory.id = invoices.ph_id
                            JOIN servicesoptions ON servicesoptions.option_id = patienthistory.p_service
                            JOIN services ON services.service_id = servicesoptions.service_id WHERE inv_id=:id";
                    
                    $path = explode('/',$_SERVER['REQUEST_URI']);
                    // print_r($path);
                    if (isset($path[2]) && is_numeric($path[2])) {
                        $id = $path[2];
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } else {
                        $users = [];
                    }
                    
                    echo json_encode($users);
                    break;

            case 'getPayment':
                    $sql = "SELECT * FROM payment WHERE inv_id=:id";
                    
                    $path = explode('/',$_SERVER['REQUEST_URI']);
                    // print_r($path);
                    if (isset($path[2]) && is_numeric($path[2])) {
                        $id = $path[2];
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } else {
                        $users = [];
                    }
                    
                    echo json_encode($users);
                    break;

            //for displaying payment details sa dental history
            case 'getPaymentDetails':
                    $sql = "SELECT inv_status, inv_totalamount, pay_date, pay_time, pay_method, pay_amount 
                            FROM payment INNER JOIN invoices
                            WHERE invoices.ph_id = :id AND invoices.inv_id = payment.inv_id;";
                    
                    $path = explode('/',$_SERVER['REQUEST_URI']);
                    // print_r($path);
                    if (isset($path[2]) && is_numeric($path[2])) {
                        $id = $path[2];
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } else {
                        $users = [];
                    }
                    
                    echo json_encode($users);
                    break;

            

            case 'getTotalPaid':
                    $sql = "SELECT SUM(pay_amount) AS total_paid FROM payment WHERE inv_id = :id";
            
                    $path = explode('/',$_SERVER['REQUEST_URI']);
                    // print_r($path);
                    if (isset($path[2]) && is_numeric($path[2])) {
                        $id = $path[2];
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } else {
                        $users = [];
                    }
                    
                    echo json_encode($users);
                    break;
                    
            case 'getTotalPaidDentalHistory':
                    $sql = "SELECT sum(pay_amount) AS total_paid  FROM payment INNER JOIN invoices WHERE invoices.ph_id = :id AND invoices.inv_id = payment.inv_id;";
            
                    $path = explode('/',$_SERVER['REQUEST_URI']);
                    // print_r($path);
                    if (isset($path[2]) && is_numeric($path[2])) {
                        $id = $path[2];
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } else {
                        $users = [];
                    }
                    
                    echo json_encode($users);
                    break;

            case 'reports':
                $type = $_GET['type'] ?? '';
                $kind = $_GET['kind'] ?? '';
                $startDate = $_GET['startDate'] ?? null;
                $endDate = $_GET['endDate'] ?? null;
                    
                $response = [];
                    
                try {
                    if ($type === 'Appointment Report') {
                        if ($kind === 'Daily Report') {
                            $stmt = $conn->prepare("SELECT 
                                a.a_id as 'ID',
								CONCAT(t.fname, ' ', t.lname) AS 'Patient Name',
                                t.email as Email,
                                s.service_name as Service,
                                a.date_ as 'Appointment Date',
                                a.time_ as 'Appointment Time',
                                a.status_ as 'Appointment Status'
                            FROM appointment a 
                            JOIN temppatient t ON a.id = t.id
                            JOIN services s ON a.service_ = s.service_id
                            WHERE DATE(date_) = CURDATE()");
                        } elseif ($kind === 'Monthly Report') {
                            $stmt = $conn->prepare("SELECT 
                                a.a_id as 'ID',
								CONCAT(t.fname, ' ', t.lname) AS 'Patient Name',
                                t.email as Email,
                                s.service_name as Service,
                                a.date_ as 'Appointment Date',
                                a.time_ as 'Appointment Time',
                                a.status_ as 'Appointment Status'
                            FROM appointment a 
                            JOIN temppatient t ON a.id = t.id
                            JOIN services s ON a.service_ = s.service_id WHERE MONTH(date_) = MONTH(CURDATE()) AND YEAR(date_) = YEAR(CURDATE())");
                        } elseif ($kind === 'Custom Date' && $startDate && $endDate) {
                            $stmt = $conn->prepare("SELECT 
                                a.a_id as 'ID',
								CONCAT(t.fname, ' ', t.lname) AS 'Patient Name',
                                t.email as Email,
                                s.service_name as Service,
                                a.date_ as 'Appointment Date',
                                a.time_ as 'Appointment Time',
                                a.status_ as 'Appointment Status'
                            FROM appointment a 
                            JOIN temppatient t ON a.id = t.id
                            JOIN services s ON a.service_ = s.service_id WHERE date_ BETWEEN :startDate AND :endDate");
                            $stmt->bindParam(':startDate', $startDate);
                            $stmt->bindParam(':endDate', $endDate);
                        } else {
                            throw new Exception("Invalid kind for Appointment Report.");
                        }
                    } elseif ($type === 'Invoices Report') {
                        if ($kind === 'Pending') {
                            $stmt = $conn->prepare("SELECT 
                                i.inv_id as ID,
                                CONCAT(p.p_fname, ' ', p.p_lname) as 'Patient Name',
                                p_email as Email,
                                i.inv_issuedate as 'Issue Date',
                                i.inv_duedate as 'Issue Due Date',
                                i.inv_totalamount as 'Total Ammount'
                            FROM invoices i
                            JOIN patienthistory ph ON i.ph_id = ph.id
                            JOIN patients p ON p.id = ph.p_id
                            WHERE inv_status = 'pending'");
                        } elseif ($kind === 'Paid') {
                            $stmt = $conn->prepare("SELECT 
                                i.inv_id as ID,
                                CONCAT(p.p_fname, ' ', p.p_lname) as 'Patient Name',
                                p_email as Email,
                                i.inv_issuedate as 'Issue Date',
                                i.inv_duedate as 'Issue Due Date',
                                i.inv_totalamount as 'Total Ammount'
                            FROM invoices i
                            JOIN patienthistory ph ON i.ph_id = ph.id
                            JOIN patients p ON p.id = ph.p_id
                            WHERE inv_status = 'paid'");
                        } elseif ($kind === 'Overdue') {
                            $stmt = $conn->prepare("SELECT 
                                i.inv_id as ID,
                                CONCAT(p.p_fname, ' ', p.p_lname) as 'Patient Name',
                                p_email as Email,
                                i.inv_issuedate as 'Issue Date',
                                i.inv_duedate as 'Issue Due Date',
                                i.inv_totalamount as 'Total Ammount'
                            FROM invoices i
                            JOIN patienthistory ph ON i.ph_id = ph.id
                            JOIN patients p ON p.id = ph.p_id
                            WHERE inv_status = 'overdue'");
                        } else {
                            throw new Exception("Invalid kind for Payment Report.");
                        }
                    }else if ($type === 'Payment Report') {
                        if ($kind === 'Daily Report') {
                            $stmt = $conn->prepare("SELECT 
                                pay.pay_id as ID,
                                CONCAT(p_fname, ' ', p_lname) AS 'Payer Name',
                                i.inv_id as 'Invoice ID',
                                pay.pay_date as 'Payment Date',
                                pay.pay_time as 'Payment Time',
                                pay.pay_method as 'Payment Method',
                                pay.pay_amount as 'Payment Amount'
                            FROM payment pay
                            JOIN invoices i ON i.inv_id = pay.inv_id
                            JOIN patienthistory ph ON ph.id = i.ph_id 
                            JOIN patients p ON ph.p_id = p.id
                            WHERE DATE(pay.pay_date) = CURDATE()");
                        } elseif ($kind === 'Monthly Report') {
                            $stmt = $conn->prepare("SELECT 
                                pay.pay_id as ID,
                                CONCAT(p_fname, ' ', p_lname) AS 'Payer Name',
                                i.inv_id as 'Invoice ID',
                                pay.pay_date as 'Payment Date',
                                pay.pay_time as 'Payment Time',
                                pay.pay_method as 'Payment Method',
                                pay.pay_amount as 'Payment Amount'
                            FROM payment pay
                            JOIN invoices i ON i.inv_id = pay.inv_id
                            JOIN patienthistory ph ON ph.id = i.ph_id 
                            JOIN patients p ON ph.p_id = p.id 
                            WHERE MONTH(pay.pay_date) = MONTH(CURDATE()) AND YEAR(pay.pay_date) = YEAR(CURDATE())");
                        } elseif ($kind === 'Custom Date' && $startDate && $endDate) {
                            $stmt = $conn->prepare("SELECT 
                                pay.pay_id as ID,
                                CONCAT(p_fname, ' ', p_lname) AS 'Payer Name',
                                i.inv_id as 'Invoice ID',
                                pay.pay_date as 'Payment Date',
                                pay.pay_time as 'Payment Time',
                                pay.pay_method as 'Payment Method',
                                pay.pay_amount as 'Payment Amount'
                            FROM payment pay
                            JOIN invoices i ON i.inv_id = pay.inv_id
                            JOIN patienthistory ph ON ph.id = i.ph_id 
                            JOIN patients p ON ph.p_id = p.id 
                            WHERE pay.pay_date BETWEEN :startDate AND :endDate");
                            $stmt->bindParam(':startDate', $startDate);
                            $stmt->bindParam(':endDate', $endDate);
                        } else {
                            throw new Exception("Invalid kind for Appointment Report.");
                        }
                    } elseif ($type === 'Patients Report') {
                        $stmt = $conn->prepare("SELECT 
                            id as ID,
                            concat(p_fname, ' ', p_lname) as 'Patient Name',
                            p_email as Email,
                            p_phone as Phone
                        FROM patients");
                    } else {
                        throw new Exception("Invalid report type.");
                    }
                    
                    // Execute the query and fetch results
                    $stmt->execute();
                    $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                } catch (Exception $e) {
                    $response = ['error' => $e->getMessage()];
                }
                    
                // Return JSON response
                header('Content-Type: application/json');
                echo json_encode($response);
                break;

       
        case 'getPatientsByLetter':
            if (isset($_GET['letter']) && !empty($_GET['letter'])) {
                $letter = $_GET['letter'] . '%';
                $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
                $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

                $sql = "SELECT * FROM patients WHERE p_fname LIKE :letter LIMIT :limit OFFSET :offset";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':letter', $letter, PDO::PARAM_STR);
                $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
                $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
                $stmt->execute();
                $patients = $stmt->fetchAll(PDO::FETCH_ASSOC);

                $countSql = "SELECT COUNT(*) as total FROM patients WHERE p_fname LIKE :letter";
                $countStmt = $conn->prepare($countSql);
                $countStmt->bindParam(':letter', $letter, PDO::PARAM_STR);
                $countStmt->execute();
                $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

                echo json_encode([
                    "patients" => $patients,
                    "total" => $total
                ]);
            } else {
                echo json_encode(["error" => "No letter provided"]);
            }
            
            break;
        
            
            case 'getUsers':
                $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10; // Default limit to 10
                $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0; // Default offset to 0
            
                $sql = "SELECT * FROM users LIMIT :limit OFFSET :offset";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
                $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
                // Get total count of patients for pagination
                $countSql = "SELECT COUNT(*) as total FROM users";
                $countStmt = $conn->prepare($countSql);
                $countStmt->execute();
                $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
            
                echo json_encode([
                    "users" => $users,
                    "total" => $total
                ]);
                break;
            
                case 'getUsersByLetter':
                    if (isset($_GET['letter']) && !empty($_GET['letter'])) {
                        $letter = $_GET['letter'] . '%';
                        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
                        $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
        
                        $sql = "SELECT * FROM users WHERE u_fname LIKE :letter LIMIT :limit OFFSET :offset";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':letter', $letter, PDO::PARAM_STR);
                        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
                        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
                        $stmt->execute();
                        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
                        $countSql = "SELECT COUNT(*) as total FROM users WHERE u_fname LIKE :letter";
                        $countStmt = $conn->prepare($countSql);
                        $countStmt->bindParam(':letter', $letter, PDO::PARAM_STR);
                        $countStmt->execute();
                        $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
        
                        echo json_encode([
                            "users" => $users,
                            "total" => $total
                        ]);
                    } else {
                        echo json_encode(["error" => "No letter provided"]);
                    }
                    
                    break;

                    case 'getUserData':
                        $sql = "SELECT * from users";
                        $path = explode('/',$_SERVER['REQUEST_URI']);
                        // print_r($path);
                        if(isset($path[2]) && is_numeric($path[2])){
                            $sql .= " WHERE id = :id";
                            $stmt = $conn->prepare($sql);
                            $stmt->bindParam(':id', $path[2]);
                            $stmt->execute();
                            $users = $stmt->fetch(PDO::FETCH_ASSOC);
                        }else{
                            $stmt = $conn->prepare($sql);
                            $stmt->execute();
                            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        }
                        header('Content-Type: application/json');
                        echo json_encode($users);
                    break;

        default:
            echo json_encode(['error' => 'Invalid action']);
            break;
    }

    // $sql = "SELECT * from appointment";
    // $stmt = $conn->prepare($sql);
    // $stmt->execute();
    // $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($users);

}elseif ($method === 'POST') {
    // Read the input data
    $user = json_decode(file_get_contents('php://input'));

    // Check the action type
    if (isset($user->action)) {
        switch ($user->action) {

            case 'check':
                // Check if username exists
                $username = $user->username;

                try {
                    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
                    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
                    $stmt->execute();
                    $exists = $stmt->fetchColumn() > 0;

                    echo json_encode(["exists" => $exists]);
                } catch (PDOException $e) {
                    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
                }
                break;

            case 'addUser':
                    // Add new user
                    $username = $user->username;
                    $password = password_hash($user->password, PASSWORD_BCRYPT); // Hashing the password for security
                    $account_type = $user->account_type; // Account type (e.g., admin, user)
                    $u_fname = $user->u_fname; // User's first name
                    $u_lname = $user->u_lname; // User's last name
                    $loggedin = $user->loggedin;
                    $status =  'active'; // Default status to 'active'
                    $timestamp = date("Y-m-d H:i:s");
                    $affected_table = "users";
                    $action = "Added a user"; // Description of the action
                    
    
                    try {
                        // Prepare the SQL statement to insert the user data
                        $stmt = $conn->prepare("INSERT INTO users (id, username, password, account_type, u_fname, u_lname, status) VALUES (null, :username, :password, :account_type, :u_fname, :u_lname, :status)");
                        // Bind the parameters using bindParam()
                        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
                        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
                        $stmt->bindParam(':account_type', $account_type, PDO::PARAM_STR);
                        $stmt->bindParam(':u_fname', $u_fname, PDO::PARAM_STR);
                        $stmt->bindParam(':u_lname', $u_lname, PDO::PARAM_STR);
                        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
    
                        // Execute the statement
                        if ($stmt->execute()) {
                            $logStmt = $conn->prepare("INSERT INTO audit_log (audit_id, user, action, affected_table, record_id, new_value, timestamp) VALUES (null, :user, :action, :affected_table, null, :new_value, :timestamp)");
                            $logStmt->bindParam(':user', $loggedin, PDO::PARAM_STR);
                            $logStmt->bindParam(':action', $action, PDO::PARAM_STR);
                            $logStmt->bindParam(':affected_table', $affected_table, PDO::PARAM_STR);
                            $logStmt->bindParam(':new_value', $username, PDO::PARAM_STR);
                            $logStmt->bindParam(':timestamp', $timestamp, PDO::PARAM_STR);

                            if ($logStmt->execute()) {
                                echo json_encode(["success" => true, "message" => "User added and action logged"]);
                            } else {
                                echo $logStmt->queryString;
                                echo json_encode(["success" => false, "message" => "User added, but failed to log action"]);
                            }
                            //echo json_encode(["success" => true]);
                        } else {
                            echo json_encode(["success" => false, "message" => "Failed to add user"]);
                        }
                    } catch (PDOException $e) {
                        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
                    }
                    break;

                

            case 'logSession':
                
                $session_id = $user->session_id;
                $user_agent = $user->user_agent;
                $ip_address = $user->ip_address;
                $username = $user->username;

                try {
                    // Prepare the SQL statement to insert the session data
                    $stmt = $conn->prepare("INSERT INTO user_sessions (session_id, user_agent, ip_address, username) VALUES (:session_id, :user_agent, :ip_address, :username)");
        
                    // Bind the parameters using bindParam()
                    $stmt->bindParam(':session_id', $session_id, PDO::PARAM_STR);
                    $stmt->bindParam(':user_agent', $user_agent, PDO::PARAM_STR);
                    $stmt->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
                    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        
                    // Execute the statement
                    if ($stmt->execute()) {
                        echo json_encode(["status" => "success", "message" => "Login session logged successfully"]);
                    } else {
                        echo json_encode(["status" => "error", "message" => "Failed to log session"]);
                    }
                } catch (PDOException $e) {
                    echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
                }
        
                break;


            case 'addAppointment':
                // Check if the patient already exists
                // $sqlCheck = "SELECT id FROM patients WHERE p_fname = :p_fname AND p_lname = :p_lname AND p_mname = :p_mname AND p_ename = :p_ename AND p_email = :p_email AND p_phone = :p_phone";
                $loggedin = $user->loggedin;
                $action = "Added an appointment";
                $timestamp = date("Y-m-d H:i:s");
                $affected_table = "appointment, temppatient";


                $sqlCheck = "SELECT id FROM temppatient WHERE fname = :fname AND lname = :lname AND email = :email AND phone = :phone";
                $stmtCheck = $conn->prepare($sqlCheck);
                $stmtCheck->bindParam(':fname', $user->fname);
                $stmtCheck->bindParam(':lname', $user->lname);
                $stmtCheck->bindParam(':email', $user->email);
                $stmtCheck->bindParam(':phone', $user->phone);
                $stmtCheck->execute();
            
                $temppatient_id = $stmtCheck->fetchColumn();
            
                // Insert the patient if they don't exist
                if (!$temppatient_id) {
                    $sqlInsert = "INSERT INTO temppatient (id, fname, lname, mname, ename, email, phone) VALUES (NULL, :fname, :lname, :mname, :ename, :email, :phone)";
                    $stmtInsert = $conn->prepare($sqlInsert);
                    $stmtInsert->bindParam(':fname', $user->fname);  // Ensure consistent parameter names
                    $stmtInsert->bindParam(':lname', $user->lname);
                    $stmtInsert->bindParam(':mname', $user->mname);
                    $stmtInsert->bindParam(':ename', $user->ename);
                    $stmtInsert->bindParam(':email', $user->email);
                    $stmtInsert->bindParam(':phone', $user->phone);
            
                    if ($stmtInsert->execute()) {
                        $temppatient_id = $conn->lastInsertId();
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to create patient record.'];
                        echo json_encode($response);
                        break;
                    }
                }
            
                // Add the appointment
                $sqlAppointment = "INSERT INTO appointment (a_id, id, service_, date_, time_, status_) 
                                   VALUES (NULL, :id, :service_, :date_, :time_, :status_)";
                $stmtAppointment = $conn->prepare($sqlAppointment);
                $stmtAppointment->bindParam(':id', $temppatient_id); // Ensure patient_id is correctly passed
                $stmtAppointment->bindParam(':service_', $user->service_);
                $stmtAppointment->bindParam(':date_', $user->date_);
                $stmtAppointment->bindParam(':time_', $user->time_);
                $stmtAppointment->bindParam(':status_', $user->status_);
            
                $variables = "patient ID = {$temppatient_id}, " .
                            "patient name = {$user->fname} {$user->lname}, " .
                            "email = {$user->email}, " .
                            "phone number = {$user->phone}, " .
                            "service = {$user->service_}, " .
                            "date = {$user->date_}, " .
                            "time = {$user->time_}";

            
                if ($stmtAppointment->execute()) {
                    
                    
                    $logStmt = $conn->prepare("INSERT INTO audit_log (audit_id, user, action, affected_table, record_id, new_value, timestamp) VALUES (null, :user, :action, :affected_table, :record_id, :new_value, :timestamp)");
                    $logStmt->bindParam(':user', $loggedin, PDO::PARAM_STR);
                    $logStmt->bindParam(':action', $action, PDO::PARAM_STR);
                    $logStmt->bindParam(':affected_table', $affected_table, PDO::PARAM_STR);
                    $logStmt->bindParam(':record_id', $temppatient_id, PDO::PARAM_STR);
                    $logStmt->bindParam(':new_value', $variables, PDO::PARAM_STR);
                    $logStmt->bindParam(':timestamp', $timestamp, PDO::PARAM_STR);

                    if ($logStmt->execute()) {
                        echo json_encode(["success" => true, "message" => "User added and action logged"]);
                    } else {
                        echo $logStmt->queryString;
                        echo json_encode(["success" => false, "message" => "User added, but failed to log action"]);
                    }
                    //echo json_encode(['message' => 'User updated successfully']);
                    $response = ['status' => 1, 'message' => 'Appointment created successfully.'];
                    
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create appointment.'];
                }
            
                echo json_encode($response);
                break;
            
            // case 'addPayment':
            //         $sql = "INSERT INTO payment(pay_id, inv_id, pay_date, pay_time, pay_method, pay_amount) VALUES(null, :inv_id, :pay_date, :pay_time, :pay_method, :pay_amount)";
            //         $stmt = $conn->prepare($sql);
            //         $stmt->bindParam(':inv_id', $user->inv_id);
            //         $stmt->bindParam(':pay_date', $user->pay_date);
            //         $stmt->bindParam(':pay_time', $user->pay_time);
            //         $stmt->bindParam(':pay_method', $user->pay_method);
            //         $stmt->bindParam(':pay_amount', $user->pay_amount);
                    
            //         if($stmt->execute()){
            //             // Update the invoice status after payment is added
            //             $updateSql = "
            //                 UPDATE invoices i
            //                 JOIN (
            //                     SELECT inv_id, SUM(pay_amount) AS totalpaid
            //                     FROM payment
            //                     GROUP BY inv_id
            //                 ) p ON i.inv_id = p.inv_id
            //                 SET i.inv_status = CASE
            //                     WHEN p.totalpaid = i.inv_totalamount THEN 'paid'
            //                     WHEN p.totalpaid <= i.inv_totalamount and p.totalpaid != 0 THEN 'partial'
            //                     WHEN p.totalpaid != i.inv_totalamount AND i.inv_duedate < CURDATE() THEN 'overdue'
            //                     ELSE i.inv_status
            //                 END
            //                 WHERE i.inv_id = :inv_id;
            //             ";
                        
            //             $updateStmt = $conn->prepare($updateSql);
            //             $updateStmt->bindParam(':inv_id', $user->inv_id);
                        
            //             if ($updateStmt->execute()) {
            //                 $response = ['status' => 1, 'message' => 'Record created and status updated successfully.'];
            //             } else {
            //                 $response = ['status' => 1, 'message' => 'Record created, but failed to update status.'];
            //             }
            //         } else {
            //             $response = ['status' => 0, 'message' => 'Failed to create Record.'];
            //         }
                    
            //         echo json_encode($response);
            // break;

                
            case 'addPayment':
                $sql = "INSERT INTO payment(pay_id, inv_id, pay_date, pay_time, pay_method, pay_amount) VALUES(null, :inv_id, :pay_date, :pay_time, :pay_method, :pay_amount)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':inv_id', $user->inv_id);
                $stmt->bindParam(':pay_date', $user->pay_date);
                $stmt->bindParam(':pay_time', $user->pay_time);
                $stmt->bindParam(':pay_method', $user->pay_method);
                $stmt->bindParam(':pay_amount', $user->pay_amount);
                
                if($stmt->execute()){
                    // Update the invoice status after payment is added
                    $updateSql = "
                        UPDATE invoices i
                        JOIN (
                            SELECT inv_id, SUM(pay_amount) AS totalpaid
                            FROM payment
                            GROUP BY inv_id
                        ) p ON i.inv_id = p.inv_id
                        SET i.inv_status = CASE
                            WHEN p.totalpaid = i.inv_totalamount THEN 'paid'
                            WHEN p.totalpaid < i.inv_totalamount and p.totalpaid != 0 THEN 'pending'
                            ELSE i.inv_status
                        END
                        WHERE i.inv_id = :inv_id;
                    ";
                    
                    $updateStmt = $conn->prepare($updateSql);
                    $updateStmt->bindParam(':inv_id', $user->inv_id);
                    
                    if ($updateStmt->execute()) {
                        // check if updated invoice is paid
                        $checkIfPaidQ = "SELECT 
                                            invoices.inv_id,
                                            invoices.inv_issuedate,
                                            invoices.inv_totalamount,
                                            patients.p_fname,
                                            patients.p_lname,
                                            patients.p_email,
                                            users.u_fname,
                                            users.u_lname,
                                            services.service_name,
                                            servicesoptions.option_name,
                                            patienthistory.p_selectedTeeth
                                        FROM invoices
                                        JOIN patienthistory ON invoices.ph_id = patienthistory.id
                                        JOIN patients ON patienthistory.p_id = patients.id
                                        JOIN servicesoptions ON patienthistory.p_service = servicesoptions.option_id
                                        JOIN services ON servicesoptions.service_id = services.service_id
                                        JOIN users ON patienthistory.p_dentist = users.id
                                        WHERE invoices.inv_id = :inv_id AND invoices.inv_status = 'paid'";
                        $checkIfPaidStmt = $conn->prepare($checkIfPaidQ);
                        $checkIfPaidStmt->bindParam(':inv_id', $user->inv_id);

                        if($checkIfPaidStmt->execute()){
                            $paidDetails = $checkIfPaidStmt->fetchAll(PDO::FETCH_ASSOC);

                            $recipientEmail = $paidDetails[0]['p_email'];
                            $recipientFname = $paidDetails[0]['p_fname'];
                            $recipientLname = $paidDetails[0]['p_lname'];
                            $dentistFname = $paidDetails[0]['u_fname'];
                            $dentistLname = $paidDetails[0]['u_lname'];
                            $service = $paidDetails[0]['service_name'];
                            $serviceOption = $paidDetails[0]['option_name'];
                            $serviceDate = $paidDetails[0]['inv_issuedate'];
                            $toothNo = $paidDetails[0]['p_selectedTeeth'];
                            $totalAmount = $paidDetails[0]['inv_totalamount'];

                            // Execute send-email.php
                            require 'send-fully-paid-email.php';

                            $response = ['status' => 1, 'message' => 'Paid invoices checked'];
                        }else{
                            $response = ['status' => 0, 'message' => 'Failed to check paid record.'];
                        }
                       
                    } else {
                        $response = ['status' => 1, 'message' => 'Record created, but failed to update status.'];
                    }
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create Record.'];
                }
                
                echo json_encode($response);
        break;
                
            

            case 'addNewPatient':
                // Add new appointment
                $sql = "INSERT INTO patients(id, p_fname, p_lname, p_mname, p_ename, p_age, p_gender, p_email, p_phone) VALUES(null, :p_fname, :p_lname, :p_mname, :p_ename, :p_age, :p_gender, :p_email, :p_phone)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':p_fname', $user->p_fname);
                $stmt->bindParam(':p_lname', $user->p_lname);
                $stmt->bindParam(':p_mname', $user->p_mname);
                $stmt->bindParam(':p_ename', $user->p_ename);
                $stmt->bindParam(':p_age', $user->p_age);
                $stmt->bindParam(':p_gender', $user->p_gender);
                $stmt->bindParam(':p_email', $user->p_email);
                $stmt->bindParam(':p_phone', $user->p_phone);
                // $stmt->bindParam(':p_date', $user->p_date);
                // $stmt->bindParam(':p_time', $user->p_time);
                // $stmt->bindParam(':p_service', $user->p_service);
                // $p_selectedteeth_json = json_encode($user->p_selectedteeth);
                //  $stmt->bindParam(':p_selectedteeth', $p_selectedteeth_json);
                // $stmt->bindParam(':p_dentist', $user->p_dentist);
                // $stmt->bindParam(':p_payment', $user->p_payment);
                // $stmt->bindParam(':p_paidamount', $user->p_paidamount);
                
                if($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Record created successfully.'];
                }else{
                    $response = ['status' => 0, 'message' => 'Failed to create Record.'];
                }
                break;
              

              

            case 'login':
                $sql = "SELECT * FROM users WHERE username = :username AND password = :password";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':username', $user->username);
                $stmt->bindParam(':password', $user->password); 
                $stmt->execute();

                // it might return something like this: $userData = [
                //     "id" => 1,
                //     "name" => "John",
                //     "email" => "john@example.com"
                // ];

                $userData = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                if($stmt->rowCount() > 0) {
                    $response =   ['status' => 1, 'message' => 'Login success.', 'success' => true,'username' => $userData['username'], 'account_type' => $userData['account_type']];
                }else{
                    $response = ['status' => 0, 'message' => 'Invalid credentials / user does not exist', 'success' => false];
                }
                echo json_encode($response);
                break;

            // case 'procedureHistory':
            //     // Add new appointment
            //     print_r("hello");
            //     $sql = "INSERT INTO patienthistory(id, p_id, p_date, p_time, p_service, p_selectedTeeth, p_dentist, p_severity_material) VALUES(null, :p_id, :p_date, :p_time, :p_service, :p_selectedTeeth, :p_dentist, :p_severity_material)";
            //     $stmt = $conn->prepare($sql);
            //     $stmt->bindParam(':p_id', $user->p_id);
            //     $stmt->bindParam(':p_date', $user->p_date);
            //     $stmt->bindParam(':p_time', $user->p_time);
            //     $stmt->bindParam(':p_service', $user->p_service);
            //     //$stmt->bindParam(':p_selectedTeeth', (string) $user->p_selectedTeeth);
            //     $p_selectedteeth_json = json_encode($user->p_selectedTeeth);
            //     $stmt->bindParam(':p_selectedTeeth', $p_selectedteeth_json);
            //     //$stmt->bindParam(':p_selectedTeeth', $user->p_selectedTeeth);
            //     $stmt->bindParam(':p_dentist', $user->p_dentist);
            //     $stmt->bindParam(':p_severity_material', $user->p_severity_material);
            //     // $stmt->bindParam(':p_date', $user->p_date);
            //     // $stmt->bindParam(':p_time', $user->p_time);
            //     // $stmt->bindParam(':p_service', $user->p_service);
            //     // $p_selectedteeth_json = json_encode($user->p_selectedteeth);
            //     //  $stmt->bindParam(':p_selectedteeth', $p_selectedteeth_json);
            //     // $stmt->bindParam(':p_dentist', $user->p_dentist);
            //     // $stmt->bindParam(':p_payment', $user->p_payment);
            //     // $stmt->bindParam(':p_paidamount', $user->p_paidamount);
            //     // if($stmt->execute()){
            //     //     $response = ['status' => 1, 'message' => 'Record created successfully.'];
            //     // }else{
            //     //     $response = ['status' => 0, 'message' => 'Failed to create Record.'];
            //     // }
            //     // echo json_encode($response);
            //     if($stmt->execute()){
            //         date_default_timezone_set('Asia/Singapore');
            //         $today = date('Y-m-d');
            //         $historyId = $conn->lastInsertId();
            //         $sql2 = "INSERT INTO invoices(inv_id, ph_id, inv_issuedate, inv_duedate, inv_totalamount, inv_status) VALUES(null, :ph_id, :inv_issuedate, :inv_duedate, :inv_totalamount, :inv_status)";
            //         $stmt2 = $conn->prepare($sql2);
            //         $stmt2->bindParam(':ph_id',$historyId); 
            //         $stmt2->bindParam(':inv_issuedate', $today);
            //         $stmt2->bindParam(':inv_duedate', $today);
            //         $stmt2->bindParam(':inv_totalamount', $user->inv_totalamount);
            //         $stmt2->bindParam(':inv_status', $user->inv_status);
            
            //         if($stmt2->execute()){
            //             $response = ['status' => 1, 'message' => 'Record created successfully.'];
            //         }else{
            //             $response = ['status' => 0, 'message' => 'Failed to create Record.'];
            //         }
            //     } else {
            //         $response = ['status' => 0, 'message' => 'Failed to create Record.'];
            //     }
            //     break;

            case 'procedureHistory':
                // Add new appointment
                print_r("hello");
                $sql = "INSERT INTO patienthistory(id, p_id, p_date, p_time, p_service, p_selectedTeeth, p_dentist) VALUES(null, :p_id, :p_date, :p_time, :p_service, :p_selectedTeeth, :p_dentist)";
                $stmt = $conn->prepare(query: $sql);
                $stmt->bindParam(':p_id', $user->p_id);
                $stmt->bindParam(':p_date', $user->p_date);
                $stmt->bindParam(':p_time', $user->p_time);
                $stmt->bindParam(':p_service', $user->p_severity_material);
                //$stmt->bindParam(':p_selectedTeeth', (string) $user->p_selectedTeeth);
                $p_selectedteeth_json = json_encode($user->p_selectedTeeth);
                $stmt->bindParam(':p_selectedTeeth', $p_selectedteeth_json);
                //$stmt->bindParam(':p_selectedTeeth', $user->p_selectedTeeth);
                $stmt->bindParam(':p_dentist', $user->p_dentist);
               
                if($stmt->execute()){
                    $historyId = $conn->lastInsertId();
                    $sql2 = "INSERT INTO invoices(inv_id, ph_id, inv_issuedate, inv_duedate, inv_totalamount, inv_status) VALUES(null, :ph_id, :inv_issuedate, :inv_duedate, :inv_totalamount, :inv_status)";
                    $stmt2 = $conn->prepare($sql2);
                    $stmt2->bindParam(':ph_id',$historyId); 
                    $stmt2->bindParam(':inv_issuedate', $user->inv_issue);
                    $stmt2->bindParam(':inv_duedate', $user->inv_due);
                    $stmt2->bindParam(':inv_totalamount', $user->inv_totalamount);
                    $stmt2->bindParam(':inv_status', $user->inv_status);
            
                    if($stmt2->execute()){
                        $response = ['status' => 1, 'message' => 'Record created successfully.'];
                    }else{
                        $response = ['status' => 0, 'message' => 'Failed to create Record.'];
                    }
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create Record.'];
                }
                break;
            
            default:
                echo json_encode(['error' => 'Invalid action']);
                break;
        }
    } else {
        echo json_encode(['error' => 'No action specified']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
/*
switch($method){
    //IF POST UNG REQUEST,ETO GAGAWIN NIYA
    case 'POST':
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO appointment(id, fname, lname, mname, ename, email, phone, service_, date_, time_) VALUES(null, :fname, :lname, :mname, :ename, :email, :phone, :service_, :date_, :time_)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':fname', $user->fname);
        $stmt->bindParam(':lname', $user->lname);
        $stmt->bindParam(':mname', $user->mname);
        $stmt->bindParam(':ename', $user->ename);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':phone', $user->phone);
        $stmt->bindParam(':service_', $user->service_);
        $stmt->bindParam(':date_', $user->date_);
        $stmt->bindParam(':time_', $user->time_);

    case 'GET':
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO appointment(id, fname, lname, mname, ename, email, phone, service_, date_, time_) VALUES(null, :fname, :lname, :mname, :ename, :email, :phone, :service_, :date_, :time_)";
        $stmt = $conn->prepare($sql);
        

        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        }else{
            $response = ['status' => 0, 'message' => 'Failed to create Record.'];
        }
        echo json_encode($response);
        break;
}*/
?>