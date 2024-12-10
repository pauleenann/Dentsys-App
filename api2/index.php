<?php
error_reporting(E_ALL); //Sets PHP to report all errors, warnings, and notices.
ini_set('display_errors',1);//display errors directly on the web page for debugging purposes.
header("Access-Control-Allow-Origin: http://localhost:3000");//Sets CORS policy to allow access to this API from any domain.
header("Access-Control-Allow-Headers: *");// Allows any headers to be sent in the request.
header("Access-Control-Allow-Methods: *");// Allows any HTTP methods (GET, POST, PUT, DELETE, etc.) to be used in requests.

include 'DbConnect.php'; //Includes the DbConnect.php file, which likely contains code to establish a database connection.
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
if($method ==='PUT'){
    //  This line checks if the 'action' parameter is present in the URL query string 
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    $request = explode('/', $_SERVER['REQUEST_URI']);
    $id = $request[2];
    print_r($id);
        //print_r($request);
        switch($action){
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
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
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
                
                        if ($stmt->execute()) {
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

        case 'getDentist':
            $sql = "SELECT * FROM dentist";
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
                    JOIN services ON appointment.service_ = services.service_id";
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
            $sql = "SELECT * from patients";
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
            
            echo json_encode($users);
            break;

            //for patient record overview
            case 'getProcedureHistory':
                $sql = "SELECT patienthistory.id, patienthistory.p_date, patienthistory.p_dentist,services.service_name FROM patienthistory JOIN servicesoptions ON servicesoptions.option_id = patienthistory.p_service JOIN services ON services.service_id = servicesoptions.service_id WHERE p_id = :id";
                
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
                case 'dentalRecord':
                    $sql = "SELECT patienthistory.p_date, 
                                patienthistory.p_dentist, 
                                patienthistory.p_selectedTeeth, 
                                services.service_name, 
                                servicesoptions.option_name, 
                                invoices.inv_totalamount 
                            FROM patienthistory
                            JOIN servicesoptions ON servicesoptions.option_id = patienthistory.p_service
                            JOIN services ON services.service_id = servicesoptions.service_id
                            JOIN invoices ON patienthistory.id = invoices.ph_id
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
            
                if ($stmtAppointment->execute()) {
                    $response = ['status' => 1, 'message' => 'Appointment created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create appointment.'];
                }
            
                echo json_encode($response);
                break;
            
            
                
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
                                WHEN p.totalpaid <= i.inv_totalamount and p.totalpaid != 0 THEN 'partial'
                                WHEN p.totalpaid != i.inv_totalamount AND i.inv_duedate < CURDATE() THEN 'overdue'
                                ELSE i.inv_status
                            END
                            WHERE i.inv_id = :inv_id;
                        ";
                        
                        $updateStmt = $conn->prepare($updateSql);
                        $updateStmt->bindParam(':inv_id', $user->inv_id);
                        
                        if ($updateStmt->execute()) {
                            $response = ['status' => 1, 'message' => 'Record created and status updated successfully.'];
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