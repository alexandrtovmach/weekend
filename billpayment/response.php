<?php
/*Created by saqib  18-08-2009*/
$PaymentID = $_POST['paymentid']? $_POST['paymentid'] : 'false';
$presult = $_POST['result']? $_POST['result'] : 'false';
$postdate = $_POST['postdate']? $_POST['postdate'] : 'false';
$tranid = $_POST['tranid']? $_POST['tranid'] : 'false';
$auth = $_POST['auth']? $_POST['auth'] : 'false';
$ref = $_POST['ref']? $_POST['ref'] : 'false';
$trackid = $_POST['trackid']? $_POST['trackid'] : 'false';
$udf1 = $_POST['udf1']? $_POST['udf1'] : 'false';
$udf2 = $_POST['udf2']? $_POST['udf2'] : 'false';
$udf3 = $_POST['udf3']? $_POST['udf3'] : 'false';
$udf4 = $_POST['udf4']? $_POST['udf4'] : 'false';
$udf5 = $_POST['udf5']? $_POST['udf5'] : 'false';
/*******************************************************************
/*******************************************************************

 Use the payment ID or Merchant Tracking ID to fetch the transaction
 data from Merchant database.

 If Payment ID not found in database, redirect customer to error URL
  
  echo "REDIRECT=https://www.yourdomain.com/error.php"

 We will use Payment ID here to match the transaction response with request

 If payment ID Not Equal to stored payment ID, output REDIRECT=<Error URL>
 and log error payment ID not found if desired. Payment Gateway shall
 process the output and redirect the customer accordingly
 This step is not really necessary if you have used Payment ID to fetch
 the transaction data from database.

 If (PaymentID != PaymentID) Then
   
 echo "REDIRECT=https://www.yourdomain.com/error.php"
 
 You need to check that the track ID is the same also for more authentication
 If it was mismatch, send customer to error page
 In production, you must also ensure you have not received two responses
 for the same Payment ID Or Tracking ID

elseIf (TrackID !== TrackID)
  echo "REDIRECT=https://www.yourdomain.com/error.php";
   
*/


if ( $presult == "CAPTURED" )
{
    $result_url = "https://www.weekendq8.com/billpaymentsuccess";
	
   $result_params = "/" . $PaymentID . "/" . $presult . "/" . $postdate . "/" . $tranid . "/" . $auth . "/" . $ref . "/" . $trackid . "/" . $udf1 . "/" .$udf2."/".$udf3;

    /*******************************************************************
	/*******************************************************************

	Merchant must send the email to customer containing all the transaction details if the transactino was successfull
	
	*/
}
else
{
    $result_url = "https://www.weekendq8.com/billpaymenterror";
    $result_params = "/" . $PaymentID . "/" . $presult . "/" . $postdate . "/" . $tranid . "/" . $auth . "/" . $ref . "/" . $trackid . "/" . $udf1 . "/" .$udf2."/".$udf3;

}
echo "REDIRECT=".$result_url.$result_params;


	/*******************************************************************
	/*******************************************************************
	You must Update the database with the result of the transaction in this page only for the security reasons as this page is called by Knet PG to pass the data and the user has not interaction with it. 
	save the data in the later / receipt page will lead to data forgery. 
	   
	*/

?>


