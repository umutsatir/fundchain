<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
require_once '../vendor/autoload.php';
include './pdo.php';
$pdo = (new PDOClass())->connect();

$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

///////////REAL/////////////////////
$username = $_POST['username'];
$data = json_decode($_POST['data'], true);
$name_input = $data['name'];
$surname_input = $data['surname'];
$profilePic_input = $data['avatar'];
$location_input = $data['location'];
$biography_input = $data['biography'];

$stmt= $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(params:['username'=>$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$u_id = $user['userId'];
///////////REAL/////////////////////

///////////TEST/////////////////////
//$u_id = 6;//GET USER ID OF CURRENTLY LOGGED IN
//$name_input = 'EMRE' ;
//$surname_input = 'DURMAZ' ;
//$profilePic_input = null ;
//$location_input = 'Afyon/Türkiye' ;
//$biography_input = 'EAFL->GTU'  ;
///////////TEST/////////////////////

$stmt= $pdo->prepare("SELECT * FROM users WHERE username = :u_name");
$stmt->execute(params:['u_name'=>$username]);
$old_data = $stmt->fetch(PDO::FETCH_ASSOC);

if ($old_data){
	$nameToChange = $old_data['name'];
	$surnameToChange = $old_data['surname'];
	$profilePicToChange = $old_data['profilePic'];
	$locationToChange = $old_data['location'];
	$biographyToChange = $old_data['description'];

	if($name_input){$nameToChange = $name_input;}
	if($surname_input){$surnameToChange = $surname_input;}
	if($profilePic_input){$profilePicToChange = $profilePic_input;}
	if($location_input){$locationToChange = $location_input;}
	if($biography_input){$biographyToChange = $biography_input;}

	$stmt= $pdo->prepare("UPDATE users SET name = :setName ,surname = :setSurname , profilePic = :setProfilePic , location = :setLocation , description=:setDescription  WHERE username= :u_name");
	$stmt->execute(params:['setName'=>$nameToChange,'setSurname'=>$surnameToChange,'setProfilePic'=>$profilePicToChange,'setLocation'=>$locationToChange,'setDescription'=>$biographyToChange, 'u_name' =>$username]);

	echo json_encode(['status' => true, 'message' => "Made changes on user:$u_id"]);
}
else{
	echo json_encode(['status' => false, 'message' => "User:$username not Found!"]);
}

/*
editProfile.php
input olarak name, profilePic, location, biography girecek
output olarak status ve message cikacak


$stmt= $pdo->prepare("SELECT * FROM users WHERE userId = :userid");
$stmt->execute(params:['userid'=>$u_id]);
$old_data = $stmt->fetch(PDO::FETCH_ASSOC);
*/

?>


