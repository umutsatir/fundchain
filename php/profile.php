<?php
	header('Access-Control-Allow-Origin: http://localhost:5173');
	header("Access-Control-Allow-Methods: POST, OPTIONS");
	require_once '../vendor/autoload.php';
	include './pdo.php';
	use Firebase\JWT\JWT;

	$gump = new GUMP();
	$_POST = $gump->sanitize($_POST);

	$u_id = $_POST['user_id'];//GET USER ID OF CURRENTLY LOGGED IN

	$stmt= $pdo->prepare("SELECT * FROM users WHERE userId = :userid");
	$stmt->execute(params:['userid'=>$u_id]);
	$userDB = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if ($userDB) {
		$dict = array(
		'status'=>true,
		'message'=>"User with id: $u_id found!",
		'name_php'=>$userDB['name'], 
		'surname_php'=>$userDB['surname'], 
		'biography_php'=>$userDB['description'],
		'profileImage_php'=> $userDB['profilePic'],
		'coverImage_php'=>$userDB[''],//add coverImg field on users table
		
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
		echo json_encode(['status' => false, 'message' => "'User with id:$u_id not Found!"]);
	}


	?>

