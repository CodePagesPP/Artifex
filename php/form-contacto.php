<?php


header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'src/PHPMailer.php';
require 'src/SMTP.php';
require 'src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"));

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No se recibieron datos JSON válidos."]);
        exit;
    }

    
    $name = $data->name ?? "No proporcionado";
    $address = $data->address ?? "No proporcionado";
    $city = $data->city ?? "";
    $state = $data->state ?? "";
    $zip = $data->zip ?? "";
    $phone = $data->phone ?? "No proporcionado";
    $email = $data->email ?? "";
    $service = $data->service ?? "No especificado";

    if (empty($email) || empty($name) || empty($phone)) {
        http_response_code(400); 
        echo json_encode(["status" => "error", "message" => "Nombre, Email y Teléfono son obligatorios."]);
        exit;
    }

    $correoDestino = "jeisson12aaron@gmail.com"; 

    
    $contenidoHTML = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;'>
        
        <div style='background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-bottom: 1px solid #e0e0e0;'>
            <h2 style='color: #222; margin: 0; font-size: 24px;'>New Quote Request from Artifex</h2>
            <p style='color: #666; margin: 5px 0 0; font-size: 16px;'>Main Contact Form</p>
        </div>
        
        <div style='padding: 30px;'>
            <h3 style='color: #333; font-size: 18px; margin-bottom: 15px;'>Contact Information:</h3>
            <table style='width: 100%; border-collapse: collapse; font-size: 16px;'>
                <tr style='border-bottom: 1px solid #f0f0f0;'><td style='padding: 12px 0; color: #555; width: 120px;'><strong>Name:</strong></td><td style='padding: 12px 0; color: #111;'>$name</td></tr>
                <tr style='border-bottom: 1px solid #f0f0f0;'><td style='padding: 12px 0; color: #555;'><strong>Phone:</strong></td><td style='padding: 12px 0; color: #111;'>$phone</td></tr>
                <tr><td style='padding: 12px 0; color: #555;'><strong>Email:</strong></td><td style='padding: 12px 0; color: #111;'>$email</td></tr>
            </table>
            
            <hr style='border: 0; border-top: 1px solid #eee; margin: 25px 0;'>

            <h3 style='color: #333; font-size: 18px; margin-bottom: 15px;'>Service Details:</h3>
            <table style='width: 100%; border-collapse: collapse; font-size: 16px;'>
                <tr style='border-bottom: 1px solid #f0f0f0;'><td style='padding: 12px 0; color: #555; width: 120px;'><strong>Service:</strong></td><td style='padding: 12px 0; color: #111;'>$service</td></tr>
                <tr style='border-bottom: 1px solid #f0f0f0;'><td style='padding: 12px 0; color: #555;'><strong>Address:</strong></td><td style='padding: 12px 0; color: #111;'>$address</td></tr>
                <tr style='border-bottom: 1px solid #f0f0f0;'><td style='padding: 12px 0; color: #555;'><strong>City:</strong></td><td style='padding: 12px 0; color: #111;'>$city</td></tr>
                <tr style='border-bottom: 1px solid #f0f0f0;'><td style='padding: 12px 0; color: #555;'><strong>State:</strong></td><td style='padding: 12px 0; color: #111;'>$state</td></tr>
                <tr><td style='padding: 12px 0; color: #555;'><strong>Zip Code:</strong></td><td style='padding: 12px 0; color: #111;'>$zip</td></tr>
            </table>
        </div>
        
        <div style='background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;'>
            <p style='font-size: 12px; color: #999; margin: 0;'>This is an automated message from the Artifex contact form.</p>
        </div>
    </div>
    ";

    $mail = new PHPMailer(true);

    try {
        
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'jeisson12aaron@gmail.com'; 
        $mail->Password = 'CONTRASENA_DE_APLICACION'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom($mail->Username, 'Artifex Website');
        $mail->addAddress($correoDestino);

        $mail->isHTML(true);
        
        $mail->Subject = 'New Quote Request from ' . $name . ' (Artifex Form)';
        $mail->Body    = $contenidoHTML;

        $mail->send();
        
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error sending message: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(405); 
    echo json_encode(["status" => "error", "message" => "Method Not Allowed."]);
}
?>