<?php 
ob_start();
ini_set("display_errors", "1");
error_reporting(E_ALL);

$params = json_decode(file_get_contents('php://input'));

	$amount=$params->amount;
	$trackid=$params->trackid;
	$phone = $params->phone;
	$orderId = $params->orderId;
	require_once "com/aciworldwide/commerce/gateway/plugins/e24PaymentPipe.inc.php" ;
	$Pipe = new e24PaymentPipe;

    $Pipe->setAction(1);
    $Pipe->setCurrency(414);
    $Pipe->setLanguage("ENG"); //change it to "ARA" for arabic language
    $Pipe->setResponseURL("https://weekendq8.com/billpayment/response.php"); // set your respone page URL
    $Pipe->setErrorURL("https://weekendq8.com/billpayment/error.php"); //set your error page URL
    $Pipe->setAmt($amount); //set the amount for the transaction
    //$Pipe->setResourcePath("/Applications/MAMP/htdocs/php-toolkit/resource/");
    $Pipe->setResourcePath("resource/"); //change the path where your resource file is
    $Pipe->setAlias("week"); //set your alias name here
    $Pipe->setTrackId($trackid);//generate the random number here
    $Pipe->setUdf1($phone); //set User defined value
    $Pipe->setUdf2($orderId); //set User defined value
    $Pipe->setUdf3($amount); //set User defined value
    $Pipe->setUdf4("UDF 4"); //set User defined value
    $Pipe->setUdf5("UDF 5"); //set User defined value*/

            //get results
		if($Pipe->performPaymentInitialization()!=$Pipe->SUCCESS){
				// echo "Result=".$Pipe->SUCCESS;
				// echo "<br>".$Pipe->getErrorMsg();
				// echo "<br>".$Pipe->getDebugMsg();
			header("location: https://weekendq8.com/billpayment/error.php");
		}else {
			$payID = $Pipe->getPaymentId();
            $payURL = $Pipe->getPaymentPage();
            echo json_encode(array('location'=>$payURL, 'paymentID'=>$payID,'trackID'=>$trackid));
			// echo $Pipe->getDebugMsg();
			//header("location:".$payURL."?PaymentID=".$payID);
		}
?>