<?php
error_reporting(E_ALL); //Sets PHP to report all errors, warnings, and notices.
ini_set('display_errors',1);//display errors directly on the web page for debugging purposes.
header("Access-Control-Allow-Origin: *");//Sets CORS policy to allow access to this API from any domain.
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
                $user = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE appointment SET status_ = 'accepted' WHERE a_id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);

                if($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                }else{
                    $response = ['status' => 0, 'message' => 'Failed to update Record.'];
                }

                
                // echo json_encode($response)
                break;

            case 'finish':
                $user = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE appointment SET status_ = 'finished' WHERE a_id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);

                if($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                }else{
                    $response = ['status' => 0, 'message' => 'Failed to update Record.'];
                }
                // echo json_encode($response)
                break;

            case 'cancel':
                $user = json_decode(file_get_contents('php://input'));
                $sql = "UPDATE appointment SET status_ = 'cancelled' WHERE a_id = :id";
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



            default:
                echo json_encode(['error' => 'Invalid action']);
                break;

        }
}elseif ($method ==='GET'){
    $action = isset($_GET['action']) ? $_GET['action'] : '';

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

        case 'getAppointments':
            $sql = "SELECT a_id, p_fname, p_lname, p_email, p_phone, service_, date_, time_, status_
            FROM appointment INNER JOIN patients
            ON appointment.id = patients.id";
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
                $sql = "SELECT a_id, fname, lname, phone, service_, time_
                FROM appointment INNER JOIN temppatient
                ON appointment.id = temppatient.id WHERE status_ = 'finished' AND date_ <= :today";
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
                $sql = "SELECT a_id, p_fname, p_lname, p_email, p_phone, service_, date_, time_, status_
                FROM appointment INNER JOIN patients
                ON appointment.id = patients.id WHERE date_ = :today AND status_='accepted' ORDER BY time_ DESC";
                //change time for testing purposes
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':today', $today, PDO::PARAM_STR);
                $stmt->execute();
                $appToday = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($appToday);
                break;

    
        case 'getPatients':
            $sql = "SELECT * from patients";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($services);
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

            case 'getProcedureHistory':
                $sql = "SELECT * from patienthistory WHERE p_id = :id";
                
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

                case 'getProcedureHistory1':
                    $sql = "SELECT * from patienthistory WHERE id = :id";
                    
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
                    $sql = "SELECT inv_id, p_fname, p_lname, inv_issuedate, inv_duedate, inv_status, p_service, inv_totalamount FROM invoices INNER JOIN patienthistory ON invoices.ph_id = patienthistory.id INNER JOIN patients ON patienthistory.p_id = patients.id WHERE inv_id=:id";
                    
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
            case 'addAppointment':
                // Check if the patient already exists
                $sqlCheck = "SELECT id FROM patients WHERE p_fname = :p_fname AND p_lname = :p_lname AND p_mname = :p_mname AND p_ename = :p_ename AND p_email = :p_email AND p_phone = :p_phone";
                $stmtCheck = $conn->prepare($sqlCheck);
                $stmtCheck->bindParam(':p_fname', $user->fname);
                $stmtCheck->bindParam(':p_lname', $user->lname);
                $stmtCheck->bindParam(':p_mname', $user->mname);
                $stmtCheck->bindParam(':p_ename', $user->ename);
                $stmtCheck->bindParam(':p_email', $user->email);
                $stmtCheck->bindParam(':p_phone', $user->phone);
                $stmtCheck->execute();
            
                $patient_id = $stmtCheck->fetchColumn();
            
                // Insert the patient if they don't exist
                if (!$patient_id) {
                    $sqlInsert = "INSERT INTO patients (id, p_fname, p_lname, p_mname, p_ename, p_age, p_gender, p_email, p_phone)
                                  VALUES (NULL, :p_fname, :p_lname, :p_mname, :p_ename, NULL, NULL, :p_email, :p_phone)";
                    $stmtInsert = $conn->prepare($sqlInsert);
                    $stmtInsert->bindParam(':p_fname', $user->fname);  // Ensure consistent parameter names
                    $stmtInsert->bindParam(':p_lname', $user->lname);
                    $stmtInsert->bindParam(':p_mname', $user->mname);
                    $stmtInsert->bindParam(':p_ename', $user->ename);
                    $stmtInsert->bindParam(':p_email', $user->email);
                    $stmtInsert->bindParam(':p_phone', $user->phone);
            
                    if ($stmtInsert->execute()) {
                        $patient_id = $conn->lastInsertId();
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
                $stmtAppointment->bindParam(':id', $patient_id); // Ensure patient_id is correctly passed
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

                $userData = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                if($stmt->rowCount() > 0) {
                    $response =   ['status' => 1, 'message' => 'Login success.', 'success' => true,'username' => $userData['username'], 'account_type' => $userData['account_type']];
                }else{
                    $response = ['status' => 0, 'message' => 'Invalid credentials / user does not exist', 'success' => false];
                }
                echo json_encode($response);
                break;

            case 'procedureHistory':
                // Add new appointment
                print_r("hello");
                $sql = "INSERT INTO patienthistory(id, p_id, p_date, p_time, p_service, p_selectedTeeth, p_dentist, p_severity_material) VALUES(null, :p_id, :p_date, :p_time, :p_service, :p_selectedTeeth, :p_dentist, :p_severity_material)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':p_id', $user->p_id);
                $stmt->bindParam(':p_date', $user->p_date);
                $stmt->bindParam(':p_time', $user->p_time);
                $stmt->bindParam(':p_service', $user->p_service);
                //$stmt->bindParam(':p_selectedTeeth', (string) $user->p_selectedTeeth);
                $p_selectedteeth_json = json_encode($user->p_selectedTeeth);
                $stmt->bindParam(':p_selectedTeeth', $p_selectedteeth_json);
                //$stmt->bindParam(':p_selectedTeeth', $user->p_selectedTeeth);
                $stmt->bindParam(':p_dentist', $user->p_dentist);
                $stmt->bindParam(':p_severity_material', $user->p_severity_material);
                // $stmt->bindParam(':p_date', $user->p_date);
                // $stmt->bindParam(':p_time', $user->p_time);
                // $stmt->bindParam(':p_service', $user->p_service);
                // $p_selectedteeth_json = json_encode($user->p_selectedteeth);
                //  $stmt->bindParam(':p_selectedteeth', $p_selectedteeth_json);
                // $stmt->bindParam(':p_dentist', $user->p_dentist);
                // $stmt->bindParam(':p_payment', $user->p_payment);
                // $stmt->bindParam(':p_paidamount', $user->p_paidamount);
                // if($stmt->execute()){
                //     $response = ['status' => 1, 'message' => 'Record created successfully.'];
                // }else{
                //     $response = ['status' => 0, 'message' => 'Failed to create Record.'];
                // }
                // echo json_encode($response);
                if($stmt->execute()){
                    date_default_timezone_set('Asia/Singapore');
                    $today = date('Y-m-d');
                    $historyId = $conn->lastInsertId();
                    $sql2 = "INSERT INTO invoices(inv_id, ph_id, inv_issuedate, inv_duedate, inv_totalamount, inv_status) VALUES(null, :ph_id, :inv_issuedate, :inv_duedate, :inv_totalamount, :inv_status)";
                    $stmt2 = $conn->prepare($sql2);
                    $stmt2->bindParam(':ph_id',$historyId); 
                    $stmt2->bindParam(':inv_issuedate', $today);
                    $stmt2->bindParam(':inv_duedate', $today);
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