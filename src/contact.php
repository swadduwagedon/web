<?php

session_start();
require_once 'phpmailer_s/PHPMailerAutoload.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    @$name = $request->name;
    @$address = $request->address;
    @$note = $request->note;

if($name && $address && $note){

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->From = 'admin@shammi.us'; //add my own address to prevent go spam
    $mail->Fromname = $name ;
    $mail->AddAddress('shamdnxg@server146.web-hosting.com','admin@shammi.us'); //recipient
    $mail->Subject =  $address;
    $mail->Body = "name: " . $name  . "\r\n\r\nMessage: " . stripslashes($note);

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'pass');//Thanks! We have received your message.
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'blank'); //Please fill out the form completely....! 
    echo json_encode($data);

}


?>