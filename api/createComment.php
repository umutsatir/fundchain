<?php	
// Set the necessary headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Include necessary files
require_once '../vendor/autoload.php';
include './pdo.php';

// Database connection
$pdo = (new PDOClass())->connect();

// Sanitize POST data
$gump = new GUMP();
$_POST = $gump->sanitize($_POST);

$username_input = $_POST['username'];
$projectId_input = $_POST['projectId'];
$title_input = $_POST['title'];
$description_input = $_POST['description'];
$rate_input = $_POST['rate'];
$maksNumOfComments = 5;

if($username_input && $projectId_input){
	$stmt = $pdo->prepare("SELECT userId FROM users WHERE username = :u_n");
	$stmt->execute(['u_n' => $username_input]); // Correctly pass the array
	$user = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch the associative array

	if($user){
		$user_id = $user['userId'];
		
		$stmt = $pdo->prepare("SELECT COUNT(*) AS comment_count FROM comments WHERE userId = :u_id, projectId = :p_id");
		$stmt->execute(['u_id' => $user_id,'p_id'=>$projectId_input]);
		$result = $stmt->fetch(PDO::FETCH_ASSOC);// Extract userId from the fetched result

		if($result['comment_count'] > $maksNumOfComments){
			echo json_encode(['status' => false, 'message' => 'At most' .$maksNumOfComments. 'comments can be made by same user!']);// If comment limit reached
		}
		else{
			if($projectId_input && $title_input && $description_input && $rate_input){
				$stmt = $pdo->prepare("INSERT INTO comments (projectId, userId, title , description ,rate) VALUES (:p_id, :u_id, :ttle, :desc, :rte)");
            	$stmt->execute(['p_id' => $projectId_input, 'u_id' => $user_id, 'ttle' => $title_input, 'desc'=>$description_input,'rte'=>$rate_input ]);

				echo json_encode(['status' => true, 'message' => 'Comment made succesfully!']);
			}
			else{
				echo json_encode(['status' => false, 'message' => 'Failed! All of the title,content and rate must be filled.']);//If one of the $projectId_input && $title_input && $description_input && $rate_input is null
			}
		}
	} 
	else{
		echo json_encode(['status' => false, 'message' => 'Login required!,if you already logged in try re-login.']);//If user not found
	}

		

}
else{
	echo json_encode(['status' => false, 'message' => 'Making comment failed!']);//If one of the $username_input && $description_input is null
}




?>