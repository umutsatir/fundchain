<?php
    header('Access-Control-Allow-Origin: *');
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
        $targetDir = __DIR__ . "/uploads/"; // Directory to save uploaded files
        $fileName = basename($_FILES['image']['name']);
        $uniqueFileName = uniqid() . "_" . $fileName;
        $targetFilePath = $targetDir . $uniqueFileName; // Create a unique filename

        // Check if the directory exists, create it if not
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        // Move uploaded file to the target directory
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            // File uploaded successfully
            $imageURL = "http://164.92.134.219:80/api/uploads/" . $uniqueFileName;
            echo json_encode(["status" => "success", "url" => $imageURL]);
        } else {
            // File upload failed
            echo json_encode([
                "status" => "error",
                "message" => "Failed to move file",
                "targetDir" => $targetDir,
                "targetFilePath" => $targetFilePath,
                "tmpName" => $_FILES['image']['tmp_name'],
                "errorCode" => $_FILES['image']['error']
            ]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No file uploaded"]);
    }
?>
