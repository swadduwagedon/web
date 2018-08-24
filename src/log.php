<?php
session_start();

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    @$id = $request->id;
    @$provider = $request ->provider;
    @$city = $request ->city;
    @$country = $request ->country;
    @$countryCode = $request ->countryCode;
    @$isp = $request ->isp;
    @$lat = $request ->lat;
    @$lon = $request ->lon;
    @$org = $request ->org;
    @$query = $request ->query;
    @$region = $request ->region;
    @$regionName = $request ->regionName;
    @$status = $request ->status;
    @$timezone = $request ->timezone;
    @$zip = $request ->zip;

    @$user_name = $request ->user_name;
    @$password = $request ->password;


$time = time();
$timeX = date('d M Y @ h:i:s',$time);
$dateX = date('d m y',$time);
$timeX1 = date('h:i:s',$time);


// server
 $log_BD = mysql_connect("localhost","shamdnxg_admin","my1980_sk")or
 die(mysql_error());
 mysql_select_db("shamdnxg_shammi_us_log",$log_BD);

$msg = 'fail';
$out = 'fail';
$logs = array();

if($user_name && $password){
$sql="SELECT * FROM usertb";
$result = mysql_query($sql,$log_BD);

while($row = mysql_fetch_array($result)){
         if ($row["user_Name"] == $user_name){
            if ($row["password"] == $password){
                $msg = 'pass';
                $out = 'pass';
                
                $sql2="SELECT * FROM guest";
                $result2 = mysql_query($sql2,$log_BD);
                while($row2 = mysql_fetch_array($result2)){
                    $logs[] = $row2;
                }
            }
         }

    }

$arr = array ("res" => $out,"token" => $time, "mgs" => $msg, "log" => $logs);
echo json_encode($arr);

}

if($id){
$queryNew = "INSERT INTO guest (id, on_date, ip, provider,city,country,countryCode,isp,lat,lon,org,query,region,regionName,status,timezone,zip) VALUES ('$timeX1','$timeX','$id','$provider','$city','$country','$countryCode','$isp','$lat','$lon','$org','$query','$region','$regionName','$status','$timezone','$zip')";
                    mysql_query($queryNew,$log_BD);
                    echo "feed in";}


?>