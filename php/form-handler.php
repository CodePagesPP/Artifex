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

    $name = $data->name ?? "No proporcionado";
    $email = $data->email ?? "";


    if (empty($email)) {
        http_response_code(400); 
        echo json_encode(["status" => "error", "message" => "El email es obligatorio."]);
        exit;
    }

    $correoDestino = "jeisson12aaron@gmail.com"; 


    $contenidoHTML = "
    <div style='font-family: Arial, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;'>
        
        <div style='background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-bottom: 1px solid #e0e0e0;'>
            <h2 style='color: #222; margin: 0; font-size: 24px;'>New Lead from Artifex</h2>
            <p style='color: #666; margin: 5px 0 0; font-size: 16px;'>Landing Page Chat</p>
        </div>
        
        <div style='padding: 30px;'>
            <p style='color: #333; font-size: 16px; margin-top: 0;'>A new user has submitted their details through the website chat widget.</p>
            
            <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
            
            <h3 style='color: #333; font-size: 18px; margin-bottom: 15px;'>Lead Details:</h3>
            
            <table style='width: 100%; border-collapse: collapse;'>
                <tr style='border-bottom: 1px solid #f0f0f0;'>
                    <td style='padding: 12px 0; color: #555; font-size: 16px; width: 100px;'><strong>Name:</strong></td>
                    <td style='padding: 12px 0; color: #111; font-size: 16px;'>$name</td>
                </tr>
                <tr>
                    <td style='padding: 12px 0; color: #555; font-size: 16px;'><strong>Email:</strong></td>
                    <td style='padding: 12px 0; color: #111; font-size: 16px;'>$email</td>
                </tr>
            </table>
            
        </div>
        
        <div style='background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;'>
            <p style='font-size: 12px; color: #999; margin: 0;'>This is an automated message from the Artifex chat widget.</p>
        </div>
    </div>
    ";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'jeisson12aaron@gmail.com'; 
        $mail->Password = 'CONTRASENA_DE_APLICACION_AQUI'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom($mail->Username, 'Notificación Web');
        $mail->addAddress($correoDestino);

        $mail->isHTML(true);
        $mail->Subject = 'Nuevo Lead de Chat: ' . $name;
        $mail->Body    = $contenidoHTML;

        $mail->send();
        
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Mensaje enviado correctamente."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(405); 
    echo json_encode(["status" => "error", "message" => "Acceso no permitido."]);
}
?>