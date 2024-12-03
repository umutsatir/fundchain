<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");
require_once '../vendor/autoload.php';
include './pdo.php';
$pdo = (new PDOClass())->connect();

$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

////////////////////REAL//////////////////////
$username = $_POST['username'];
$stmt= $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(params:['username'=>$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$u_id = $user['userId'];

$data = json_decode($_POST['data'], true);
$u_psswrd_old = $data['oldPassword'];
$u_psswrd_new = $data['newPassword'];
$u_psswrd_new2 = $data['confirmNewPassword'];
$email = $data['email'];

if ($u_psswrd_new != $u_psswrd_new2){
	echo json_encode(['status' => false, 'message' => "New passwords do not match!"]);
	return;
}
if ($email != $user['email']){
	echo json_encode(['status' => false, 'message' => "Email does not match!"]);
	return;
}
////////////////////REAL//////////////////////

////////////////// TEST //////////////////////
//$u_id = 6;//GET USER ID OF CURRENTLY LOGGED IN
//$u_psswrd_old = 'emre123';
//$u_psswrd_new = '321emre';
//$hashed_password_old = password_hash($u_psswrd_old, PASSWORD_DEFAULT);
//$hashed_password_new = password_hash($u_psswrd_new, PASSWORD_DEFAULT);
////////////////// TEST //////////////////////

$stmt= $pdo->prepare("SELECT * FROM users WHERE userId = :userid");
$stmt->execute(params:['userid'=>$u_id]);
//$userDB = $stmt->fetchAll(PDO::FETCH_ASSOC);
$userDB = $stmt->fetch(PDO::FETCH_ASSOC);

if($userDB){
	//echo "db_passs:" .$userDB['password']."\n";//TEST
	//echo "inpt_pss:".$hashed_password_old."\n";//TEST

	if (password_verify($u_psswrd_old, $userDB['password'])){
		$stmt= $pdo->prepare("UPDATE users SET password = :newPassword WHERE userId= :id");
		$hashed_password_new = password_hash($u_psswrd_new, PASSWORD_DEFAULT);
		$stmt->execute(params:['newPassword'=>$hashed_password_new, 'id'=>$u_id]);
		echo json_encode(['status' => True, 'message' => "User with id:$u_id succesfully changed the password!"]);
	}
	else{
		echo json_encode(["status"=> False,"message"=> "Wrong old password!"]);
	}
}
else{
	echo json_encode(['status' => false, 'message' => "'User with id:$u_id not Found!"]);
}

/*
UPDATE users
SET password = :newPassword
WHERE userId= :id;

$stmt= $pdo->prepare("UPDATE users SET password = :newPassword WHERE userId= :id");
$stmt->execute(params:['newPassword'=>$u_psswrd_new, 'id'=>$u_id]);



function generateSameHash($correctPassword, $oldHash) {
    // Extract the salt and settings from the old hash
    $parts = explode('$', $oldHash); // Split the hash by $
    if (count($parts) < 4) {
        throw new Exception("Invalid hash format");
    }

    // Rebuild the settings part of the hash (algorithm, cost, and salt)
    $settings = '$' . $parts[1] . '$' . $parts[2] . '$' . $parts[3];

    // Use `crypt` to hash the password with the same settings
    $newHash = crypt($correctPassword, $settings);

    return $newHash;
}
*/





?>


