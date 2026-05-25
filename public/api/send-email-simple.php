<?php
// Simple PHP mail without external libraries
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-errors.log');

// Log script start
error_log('🚀 [PHP] Script started at ' . date('Y-m-d H:i:s'));
error_log('🌐 [PHP] Request method: ' . $_SERVER['REQUEST_METHOD']);
error_log('🌐 [PHP] Request URI: ' . $_SERVER['REQUEST_URI']);
error_log('🌐 [PHP] Script filename: ' . __FILE__);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://corpenta.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

error_log('✅ [PHP] Headers sent');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    error_log('✅ [PHP] OPTIONS request - sending 200');
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log('❌ [PHP] Invalid method: ' . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

error_log('✅ [PHP] POST request received');

// Get JSON input
$input = file_get_contents('php://input');
error_log('📦 [PHP] Raw input: ' . $input);

$data = json_decode($input, true);
error_log('📦 [PHP] Decoded data: ' . print_r($data, true));

// Validate input
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['phone'])) {
    error_log('❌ [PHP] Validation failed - missing required fields');
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'بيانات غير صحيحة']);
    exit();
}

error_log('✅ [PHP] Validation passed');

// Sanitize inputs
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags($data['phone']));
$activity = isset($data['activity']) ? htmlspecialchars(strip_tags($data['activity'])) : '';
$message = isset($data['message']) ? htmlspecialchars(strip_tags($data['message'])) : '';

error_log('📝 [PHP] Sanitized data - Name: ' . $name . ', Email: ' . $email . ', Phone: ' . $phone);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_log('❌ [PHP] Invalid email format: ' . $email);
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'البريد الإلكتروني غير صحيح']);
    exit();
}

error_log('✅ [PHP] Email validation passed');

// Email configuration
$to = 'sales@corpenta.com';
$subject = 'استفسار جديد من ' . $name . ' - موقع Corpenta';
$from = 'noreply@corpenta.com';
$replyTo = $email;

// Create email body (HTML)
$emailBody = "
<!DOCTYPE html>
<html dir='rtl' lang='ar'>
<head>
    <meta charset='UTF-8'>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 20px;
            direction: rtl;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px;
        }
        .field {
            margin-bottom: 20px;
            padding: 15px;
            background: #f9fafb;
            border-radius: 8px;
            border-right: 4px solid #2563eb;
        }
        .label {
            font-weight: bold;
            color: #03034d;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .value {
            color: #4b5563;
            font-size: 16px;
            margin-top: 5px;
        }
        .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
        .footer a {
            color: #2563eb;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>📧 استفسار جديد من الموقع</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 الاسم:</div>
                <div class='value'>{$name}</div>
            </div>
            
            <div class='field'>
                <div class='label'>📧 البريد الإلكتروني:</div>
                <div class='value'>{$email}</div>
            </div>
            
            <div class='field'>
                <div class='label'>📱 رقم الهاتف:</div>
                <div class='value'>{$phone}</div>
            </div>
            
            " . ($activity ? "<div class='field'>
                <div class='label'>💼 نوع النشاط:</div>
                <div class='value'>{$activity}</div>
            </div>" : "") . "
            
            " . ($message ? "<div class='field'>
                <div class='label'>💬 الرسالة:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>" : "") . "
        </div>
        <div class='footer'>
            <p>© 2024 Corpenta. جميع الحقوق محفوظة.</p>
            <p><a href='https://corpenta.com'>corpenta.com</a></p>
        </div>
    </div>
</body>
</html>
";

// Create plain text version
$plainTextBody = "
استفسار جديد من موقع Corpenta
================================

الاسم: {$name}
البريد الإلكتروني: {$email}
رقم الهاتف: {$phone}
" . ($activity ? "نوع النشاط: {$activity}\n" : "") . "
" . ($message ? "الرسالة:\n{$message}\n" : "") . "

================================
© 2024 Corpenta
https://corpenta.com
";

// Email headers
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Corpenta Contact Form <' . $from . '>';
$headers[] = 'Reply-To: ' . $replyTo;
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email
error_log('📧 [PHP] Attempting to send email...');
error_log('📧 [PHP] To: ' . $to);
error_log('📧 [PHP] Subject: ' . $subject);
error_log('📧 [PHP] From: ' . $from);

$success = mail($to, $subject, $emailBody, implode("\r\n", $headers));

error_log('📧 [PHP] Mail function result: ' . ($success ? 'SUCCESS' : 'FAILED'));

// Log the attempt
$logMessage = date('Y-m-d H:i:s') . " - Email sent: " . ($success ? 'YES' : 'NO') . 
    " - To: {$to} - From: {$email}\n";
file_put_contents(__DIR__ . '/mail-log.txt', $logMessage, FILE_APPEND);
error_log('📝 [PHP] Logged to mail-log.txt');

if ($success) {
    error_log('✅ [PHP] Sending success response');
    echo json_encode([
        'success' => true,
        'message' => 'تم إرسال الرسالة بنجاح',
        'debug' => [
            'timestamp' => date('Y-m-d H:i:s'),
            'to' => $to,
            'from' => $email
        ]
    ]);
} else {
    error_log('❌ [PHP] Sending error response');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'حدث خطأ في إرسال الرسالة. الرجاء المحاولة مرة أخرى.',
        'debug' => [
            'timestamp' => date('Y-m-d H:i:s'),
            'mail_function_failed' => true
        ]
    ]);
}

error_log('🏁 [PHP] Script completed');
?>
