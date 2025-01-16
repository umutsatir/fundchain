<?php
header('Access-Control-Allow-Origin: *');
require_once '../vendor/autoload.php';
error_reporting(E_ALL & ~E_DEPRECATED);

$htmlContent = file_get_contents("reset_code.html");
$content = str_replace("{RESET_CODE}", $_POST['code'], $htmlContent);
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$apiKey = $_ENV['BREVO_API_KEY'];
// Configure API key authorization: api-key
$config = Brevo\Client\Configuration::getDefaultConfiguration()->setApiKey('api-key', $apiKey);
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = Brevo\Client\Configuration::getDefaultConfiguration()->setApiKeyPrefix('api-key', 'Bearer');
// Configure API key authorization: partner-key
// Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
// $config = Brevo\Client\Configuration::getDefaultConfiguration()->setApiKeyPrefix('partner-key', '7avP35XALOM0qhQS');

$apiInstance = new Brevo\Client\Api\TransactionalEmailsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$sendSmtpEmail = new \Brevo\Client\Model\SendSmtpEmail([
  	 'subject' => 'Password Reset Code',
     'sender' => ['name' => 'Fundchain', 'email' => 'incognitoaccbuss@gmail.com'],
     'replyTo' => ['name' => 'Fundchain', 'email' => 'incognitoaccbuss@gmail.com'],
     'to' => [[ 'name' => 'Fundchain User', 'email' => $_POST['email'] ]],
     'htmlContent' => $content,
     'params' => ['bodyMessage' => 'made just for you!']
]); // \Brevo\Client\Model\SendSmtpEmail | Values to send a transactional email

try {
    $result = $apiInstance->sendTransacEmail($sendSmtpEmail);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling TransactionalEmailsApi->sendTransacEmail: ', $e->getMessage(), PHP_EOL;
}
?>