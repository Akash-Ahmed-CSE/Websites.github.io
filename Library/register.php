<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
        <?php
        $con= mysqli_connect('localhost', 'root', '');
        $db='register_db';
        if(!$con){
           echo 'Not Connected to the server' ;
        }
        mysqli_select_db($con, $db);
        if(!mysqli_select_db($con, $db)){
            echo 'Database is not selected';
        }
        $fname=$_POST['first_name'];
        $lname=$_POST['last_name'];
        $age=$_POST['age'];
        $pnumber=$_POST['phone_number'];
        $mail=$_POST['email'];
        $pass=$_POST['password'];


        $sql="INSERT INTO user_info(fname,lname,age,pnumber,mail,pass)
VALUES('$fname','$lname','$age','$pnumber','$mail','$pass')";
          if(!mysqli_query($con, $sql)){      
              echo 'Not inserted/Not saved';
          }
          else{
              echo 'Inserted/Saved Succesfully!';
          }
          header("refresh:2,url=register.html");
        ?>
</body>
</html>