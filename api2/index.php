<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
if($method ==='PUT'){
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

        case 'getAppointments':
            $sql = "SELECT a_id, fname, lname, email, phone, service_, date_, time_, status_
            FROM appointment INNER JOIN temppatient
            ON appointment.id = temppatient.id";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($services);
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
                $sql = "SELECT * FROM appointment WHERE status_ = 'finished' AND date_ <= :today";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':today', $today, PDO::PARAM_STR);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $recentVisits = $result['recent_visits'];
                echo json_encode(['recent_visits' => $recentVisits]);
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

        case 'getAppointmentsToday':
                //sets correct timezone
                date_default_timezone_set('Asia/Singapore');
                $today = date('Y-m-d');
                $sql = "SELECT a_id, fname, lname, email, phone, service_, date_, time_, status_
                FROM appointment INNER JOIN temppatient
                ON appointment.id = temppatient.id WHERE date_ = :today AND status_='accepted' AND TIME(time_) BETWEEN '09:00:00' AND '17:00:00' ORDER BY time_ DESC";
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
                // Add new appointment
                $sql = "INSERT INTO temppatient(id, fname, lname, mname, ename, email, phone) VALUES(null, :fname, :lname, :mname, :ename, :email, :phone)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':fname', $user->fname);
                $stmt->bindParam(':lname', $user->lname);
                $stmt->bindParam(':mname', $user->mname);
                $stmt->bindParam(':ename', $user->ename);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':phone', $user->phone);
            
                
                if($stmt->execute()){
                    
                    $temppatient_id = $conn->lastInsertId();
                    $sql2 = "INSERT INTO appointment(a_id, id, service_, date_, time_, status_) VALUES(null, :id, :service_, :date_, :time_, :status_)";
                    $stmt2 = $conn->prepare($sql2);
                    $stmt2->bindParam(':id',$temppatient_id); 
                    $stmt2->bindParam(':service_', $user->service_);
                    $stmt2->bindParam(':date_', $user->date_);
                    $stmt2->bindParam(':time_', $user->time_);
                    $stmt2->bindParam(':status_', $user->status_);
            
                    if($stmt2->execute()){
                        $response = ['status' => 1, 'message' => 'Record created successfully.'];
                    }else{
                        $response = ['status' => 0, 'message' => 'Failed to create Record.'];
                    }
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create Record.'];
                }
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

                    
                if ($stmt->rowCount() > 0) {
                    $response = ['status' => 1, 'message' => 'Login success.', 'success' => true];
                }else{
                    $response = ['status' => 0, 'message' => 'Invalid credentials / user does not exist', 'success' => false];
                }
                echo json_encode($response);
                break;

            case 'procedureHistory':
                // Add new appointment
                $sql = "INSERT INTO patienthistory(id, p_id, p_date, p_time, service_, p_selectedTeeth, p_dentist, p_payment, p_paidamount) VALUES(null, :p_id, :p_date, :p_time, :service_, :p_selectedTeeth, :p_dentist, :p_payment, :p_paidamount)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':p_id', $user->p_id);
                $stmt->bindParam(':p_date', $user->p_date);
                $stmt->bindParam(':p_time', $user->p_time);
                $stmt->bindParam(':service_', $user->service_);
                //$stmt->bindParam(':p_selectedTeeth', (string) $user->p_selectedTeeth);
                $p_selectedteeth_json = json_encode($user->p_selectedTeeth);
                $stmt->bindParam(':p_selectedTeeth', $p_selectedteeth_json);
                //$stmt->bindParam(':p_selectedTeeth', $user->p_selectedTeeth);
                $stmt->bindParam(':p_dentist', $user->p_dentist);
                $stmt->bindParam(':p_payment', $user->p_payment);
                $stmt->bindParam(':p_paidamount', $user->p_paidamount);
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