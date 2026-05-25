<?php
// Enable error logging for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to user
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-errors.log');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://corpenta.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Log request for debugging
file_put_contents(__DIR__ . '/api-requests.log', date('Y-m-d H:i:s') . " - Request received\n", FILE_APPEND);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
file_put_contents(__DIR__ . '/api-requests.log', "Input: " . $input . "\n", FILE_APPEND);

$data = json_decode($input, true);

// Validate input
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['phone'])) {
    file_put_contents(__DIR__ . '/api-requests.log', "Validation failed\n", FILE_APPEND);
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'بيانات غير صحيحة']);
    exit();
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags($data['phone']));
$activity = isset($data['activity']) ? htmlspecialchars(strip_tags($data['activity'])) : '';
$message = isset($data['message']) ? htmlspecialchars(strip_tags($data['message'])) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'البريد الإلكتروني غير صحيح']);
    exit();
}

// Resend API configuration
$resendApiKey = 're_Es2fp7jc_DHichbSD6WYVhBrbhhhXAy4n'; // Your API key
$resendApiUrl = 'https://api.resend.com/emails';

// Prepare email HTML
$emailHtml = "
<!DOCTYPE html>
<html dir='rtl' lang='ar'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2563eb, #3b82f6); padding: 30px; text-align: center; }
        .header img { max-width: 180px; height: auto; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; border-right: 4px solid #2563eb; }
        .label { font-weight: bold; color: #03034d; margin-bottom: 5px; }
        .value { color: #4b5563; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='https://i.ibb.co/dsJFm3qn/Corpenta-Logo-Dark.png' alt='Corpenta Logo'>
        </div>
        <div class='content'>
            <h2 style='color: #03034d; margin-bottom: 20px;'>استفسار جديد من الموقع</h2>
            
            <div class='field'>
                <div class='label'>الاسم:</div>
                <div class='value'>{$name}</div>
            </div>
            
            <div class='field'>
                <div class='label'>البريد الإلكتروني:</div>
                <div class='value'>{$email}</div>
            </div>
            
            <div class='field'>
                <div class='label'>رقم الهاتف:</div>
                <div class='value'>{$phone}</div>
            </div>
            
            " . ($activity ? "<div class='field'>
                <div class='label'>نوع النشاط:</div>
                <div class='value'>{$activity}</div>
            </div>" : "") . "
            
            " . ($message ? "<div class='field'>
                <div class='label'>الرسالة:</div>
                <div class='value'>{$message}</div>
            </div>" : "") . "
        </div>
        <div class='footer'>
            <p>© 2024 Corpenta. جميع الحقوق محفوظة.</p>
            <p><a href='https://corpenta.com' style='color: #2563eb; text-decoration: none;'>corpenta.com</a></p>
        </div>
    </div>
</body>
</html>
";

// Prepare Resend API request
$emailData = [
    'from' => 'Corpenta Contact Form <onboarding@resend.dev>',
    'to' => ['sales@corpenta.com'],
    'reply_to' => $email,
    'subject' => "استفسار جديد من {$name}",
    'html' => $emailHtml
];

// Send request to Resend API
$ch = curl_init($resendApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resendApiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Log response
file_put_contents(__DIR__ . '/api-requests.log', "Response code: $httpCode\n", FILE_APPEND);
file_put_contents(__DIR__ . '/api-requests.log', "Response: $response\n", FILE_APPEND);

// Handle response
if ($curlError) {
    file_put_contents(__DIR__ . '/api-requests.log', "CURL Error: $curlError\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'حدث خطأ في إرسال الرسالة. الرجاء المحاولة مرة أخرى.'
    ]);
    exit();
}

if ($httpCode >= 200 && $httpCode < 300) {
    $responseData = json_decode($response, true);
    file_put_contents(__DIR__ . '/api-requests.log', "Success! Email sent\n", FILE_APPEND);
    echo json_encode([
        'success' => true,
        'messageId' => isset($responseData['id']) ? $responseData['id'] : null
    ]);
} else {
    file_put_contents(__DIR__ . '/api-requests.log', "Failed with code: $httpCode\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'حدث خطأ في إرسال الرسالة. الرجاء المحاولة مرة أخرى.'
    ]);
}
?>
