<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");
require_once '../vendor/autoload.php';
include './pdo.php';
$pdo = (new PDOClass())->connect();
use Firebase\JWT\JWT;

$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

$u_name = $_POST['Username'];//GET USER ID OF CURRENTLY LOGGED IN
//$u_name = 'emreadmin';//GET USER ID OF CURRENTLY LOGGED IN

$stmt= $pdo->prepare("SELECT * FROM users WHERE username = :userName");
$stmt->execute(params:['userName'=>$u_name]);
$userDB = $stmt->fetch(PDO::FETCH_ASSOC);

function getSaved
function getRecommenedProjects($user_id,$pdo_){
	
	$stmt= $pdo_->prepare("SELECT * FROM savedprojects WHERE userId = :u_id");
	$stmt->execute(params:['u_id'=>$user_id]);
	$savedProjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$savedProjectsList = [];
	$categoryCount=[]
	$row=0;
	while($savedCategories[$row]!=null){
		if(array_key_exists($savedCategories[$row]['category'], categoryCount)){
			$categoryCount[]
		}
		
	}	

	return $savedProjectsList
	
}
?>