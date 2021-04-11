<?php 

    require_once("connection.php");
    $query = " select * from user_info ";
    $result = mysqli_query($con,$query);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" a href="CSS/bootstrap.css"/>
    <title>View Records</title>

</head>

<style type="text/css">
table {

    border-collapse: collapse;
    width: 80%;
    color: #0b639a;
    font-family: monospace;
    font-size: 25px;
    text-align: left;
}
th {
    background-color: #0b639a;
    color: white;
}
tr:nth-child(even) {background-color: #f2f2f2}
</style>

</style>



<body class="bg-dark">

        <div class="container">
            <div class="row">
                <div class="col m-auto">
                    <div class="card mt-5">
                        <table class="table table-bordered">
                            <tr>
                                <td> Fist Name </td>
                                <td> Last Name </td>
                                <td> Age</td>
                                <td> Phone number</td>
                                <td> Email  </td>
                                <td> Password </td>
                            </tr>

                            <?php 
                                    
                                    while($row=mysqli_fetch_assoc($result))
                                    {
                                        $fname = $row['fname'];
                                        $lname = $row['lname'];
                                        $age = $row['age'];
                                        $phone = $row['pnumber'];
                                        $mail = $row['mail'];
                                        $pass = $row['pass'];
                            ?>
                                    <tr>
                                        <td><?php echo $fname ?></td>
                                        <td><?php echo $lname ?></td>
                                        <td><?php echo $age ?></td>
                                        <td><?php echo $phone ?></td>
                                        <td><?php echo $mail ?></td>
                                        <td><?php echo $pass ?></td>
                                    </tr>        
                            <?php 
                                    }  
                            ?>                                                   
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
</body>
</html>