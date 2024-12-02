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

	

	if ($userDB) {
		$dict = array(
		'status'=>true,
		'message'=>"User with username: $u_name found!",
		'name_php'=>$userDB['name'], 
		'surname_php'=>$userDB['surname'], 
		'biography_php'=>$userDB['description'],
		'profileImage_php'=> $userDB['profilePic'],
		'coverImage_php'=>$userDB['coverImg'],//add coverImg field on users table
		'location_php'=>$userDB['location'],//add coverImg field on users table
		'username_php'=>$userDB['username'],//add coverImg field on users table
		'totalfund_php'=>$userDB['totatFund'],//add coverImg field on users table
		
		);
		$datastring = json_encode($dict);
		echo $datastring;
		
		/*
		SQL QUERY TO ADD coverImg field to users table:

		USE fundchain;
		ALTER TABLE users
		ADD coverImg VARCHAR(100) NULL;	
		
		*/

	}
	else{
		echo json_encode(['status' => false, 'message' => "'User with id:$u_name not Found!"]);
	}


	?>

