<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");
require_once '../vendor/autoload.php';
include './pdo.php';
$pdo = (new PDOClass())->connect();
use Firebase\JWT\JWT;

$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

///////////REAL/////////////////////
$u_id = $_POST['UserId'];//GET USER ID OF CURRENTLY LOGGED IN
$name_input = $_POST['name'];
$surname_input = $_POST['surname'];
$profilePic_input = $_POST['profilePic'];
$location_input = $_POST['location'];
$biography_input = $_POST['biography'];
///////////REAL/////////////////////

///////////TEST/////////////////////
//$u_id = 6;//GET USER ID OF CURRENTLY LOGGED IN
//$name_input = 'EMRE' ;
//$surname_input = 'DURMAZ' ;
//$profilePic_input = null ;
//$location_input = 'Afyon/Türkiye' ;
//$biography_input = 'EAFL->GTU'  ;
///////////TEST/////////////////////

$stmt= $pdo->prepare("SELECT * FROM users WHERE userId = :userid");
$stmt->execute(params:['userid'=>$u_id]);
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

	$stmt= $pdo->prepare("UPDATE users SET name = :setName ,surname = :setSurname , profilePic = :setProfilePic , location = :setLocation , description=:setDescription  WHERE userId= :id");
	$stmt->execute(params:['setName'=>$nameToChange,'setSurname'=>$surnameToChange,'setProfilePic'=>$profilePicToChange,'setLocation'=>$locationToChange,'setDescription'=>$biographyToChange, 'id' =>$u_id]);

	echo json_encode(['status' => true, 'message' => "Made changes on user:$u_id"]);

	
}
else{
	echo json_encode(['status' => false, 'message' => "User with id:$u_id not Found!"]);
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


