<?php
	header('Access-Control-Allow-Origin: http://localhost:5173');
	header("Access-Control-Allow-Methods: POST, OPTIONS");
	require_once '../vendor/autoload.php';
	include './pdo.php';
	use Firebase\JWT\JWT;

	$gump = new GUMP();
	$_POST = $gump->sanitize($_POST);
	$pdo = (new PDOClass())->connect();

	$username = $_POST['username'];

	$stmt= $pdo->prepare("SELECT * FROM users WHERE username = :username");
	$stmt->execute(params:['username'=>$username]);
	$userDB = $stmt->fetch(PDO::FETCH_ASSOC);

	if ($userDB) {
		$dict = array(
		'username_php'=>$userDB['username'],
		'name_php'=>$userDB['name'], 
		'surname_php'=>$userDB['surname'], 
		'location_php'=>$userDB['location'],
		'biography_php'=>$userDB['description'],
		'profileImage_php'=> $userDB['profilePic'],
		'coverImage_php'=>$userDB['coverImg'],
		'totalFund_php'=>$userDB['totalFund'],
		);
		echo json_encode(['status' => true, 'message' => 'User Found!', 'data' => $dict]);
		/*
		SQL QUERY TO ADD coverImg field to users table:

		USE fundchain;
		ALTER TABLE users
		ADD coverImg VARCHAR(100) NULL;	
		
		*/

	}
	else{
		echo json_encode(['status' => false, 'message' => "'User with id:$u_id not Found!"]);
	}


	?>

