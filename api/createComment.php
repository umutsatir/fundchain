<?php	
// Set the necessary headers
header('Access-Control-Allow-Origin: *');
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
$maksNumOfComments = 1;

if($username_input && $projectId_input){
	$stmt = $pdo->prepare("SELECT userId FROM users WHERE username = :u_n");
	$stmt->execute(['u_n' => $username_input]); // Correctly pass the array
	$user = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch the associative array

	if($user){
		$user_id = $user['userId'];
		
		// Check if the user is commenting on their own project
		$stmt = $pdo->prepare("SELECT userId FROM projects WHERE projectId = :p_id");
		$stmt->execute(['p_id' => $projectId_input]);
		$project = $stmt->fetch(PDO::FETCH_ASSOC);

		if($project && $project['userId'] == $user_id){
			echo json_encode(['status' => false, 'message' => 'You cannot comment on your own project']);
			exit;
		}

		$stmt = $pdo->prepare("SELECT COUNT(*) AS comment_count FROM comments WHERE userId = :u_id AND projectId = :p_id");
		$stmt->execute(['u_id' => $user_id,'p_id'=>$projectId_input]);
		$result = $stmt->fetch();// Extract userId from the fetched result

		if($result['comment_count'] >= $maksNumOfComments){
			echo json_encode(['status' => false, 'message' => 'At most ' .$maksNumOfComments. ' comments can be made by same user ']);// If comment limit reached
		}
		else{
			if($projectId_input && $title_input && $description_input && $rate_input){
				$stmt = $pdo->prepare("INSERT INTO comments (projectId, userId, title, description, rate, creationDate) VALUES (:p_id, :u_id, :ttle, :desc, :rte, NOW())");
				$stmt->execute(['p_id' => $projectId_input, 'u_id' => $user_id, 'ttle' => $title_input, 'desc'=>$description_input,'rte'=>$rate_input ]);

				echo json_encode(['status' => true, 'message' => 'Comment made successfully']);
			}
			else{
				echo json_encode(['status' => false, 'message' => 'Comment creation failed! All of the title, content and rate must be filled']);//If one of the $projectId_input && $title_input && $description_input && $rate_input is null
			}
		}
	} 
	else{
		echo json_encode(['status' => false, 'message' => 'Login required! If you already logged in, try re-login']);//If user not found
	}
}
else{
	echo json_encode(['status' => false, 'message' => 'Comment creation failed']);//If one of the $username_input && $description_input is null
}
?>