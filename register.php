<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>SkillTrack Registration</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet" href="css/style.css">

</head>

<body>

<div class="container-fluid">

<div class="row vh-100">

<div class="col-md-6 left-panel">

<img src="images/student.png" class="img-fluid">

</div>

<div class="col-md-6 d-flex justify-content-center align-items-center">

<div class="register-box">

<h4>Create Account</h4>

<form action="register_process.php" method="POST">

<div class="mb-3">

<input type="text"
class="form-control"
name="username"
placeholder="Username"
required>

</div>

<div class="mb-3">

<input type="email"
class="form-control"
name="email"
placeholder="Email"
required>

</div>

<div class="mb-3">

<input type="password"
class="form-control"
name="password"
placeholder="Password"
required>

</div>

<div class="mb-3">

<input type="password"
class="form-control"
name="confirmPassword"
placeholder="Confirm Password"
required>

</div>

<button class="btn btn-signup w-100">

SIGN UP

</button>

<p class="text-center mt-3">

Already have account?

<a href="login.php">

Login

</a>

</p>

</form>

</div>

</div>

</div>

</div>

</body>

</html>