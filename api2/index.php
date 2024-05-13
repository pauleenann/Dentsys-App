<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
echo "testing";

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
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
        

        if($stmt->execute()){
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        }else{
            $response = ['status' => 0, 'message' => 'Failed to create Record.'];
        }
        echo json_encode($response);
        break;
}
?>