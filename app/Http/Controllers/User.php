<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require_once '../vendor/autoload.php';

class User extends Controller
{
    public function deleteUser(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
        ]);
        $all = $request->all();

        $isLogin = $request->session()->get('isLogin');

        $role = $request->session()->get('role');
        if ($isLogin == "true") {
            if ($role == "super_user") {
                \App\Models\User::where('id', $all["id"])->delete();
                return array("success" => true, "msg" => "success update the data", "role" => $role);
            }
        }

    }

    public function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function AddUserInfo(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required',
            'email' => "required",
            "role" => "required",
            "brunch" => "required"
        ]);
        $all = $request->all();

        $isLogin = $request->session()->get('isLogin');
        $roles = array('super_user', 'admin_user', 'viewer_user', 'normal_user');
        if (!in_array($all['role'], $roles)) {
            return array("success" => false, "msg" => "role is not valid");

        }

        $id = $all['brunch'] . date('Y') . rand(10000, 190000) * rand(10000, 190000);
        $password = $this->generateRandomString(16);
        $role = $request->session()->get('role');
        if ($isLogin == "true") {
            if ($role == "super_user") {
                $user = new \App\Models\User;
                $user->id = $id;
                $user->name = $all['name'];
                $user->email = $all['email'];
                $user->password = password_hash($password, PASSWORD_DEFAULT);
                $user->role = $all['role'];
                $user->Place = $all['brunch'];
                $user->save();
                try {
                    $this->SendWelcomeEmail($all['email'], $password);

                } catch (Exception $e) {
                    return array("success" => true, "msg" => "we can't send the email please try again later...", "role" => $role);

                }

                return array("success" => true, "msg" => "success update the data", "role" => $role);


            }
        }

    }

    public function logOut(Request $request)
    {
        $request->session()->put('isLogin', 'false');
        $request->session()->put('role', '');

    }

    public function SendWelcomeEmail($email, $password)
    {
        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->CharSet = 'UTF-8';
            $mail->SMTPDebug = 0;
            // Enable verbose debug output
            // $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Port = 587;                                    // TCP port to connect to
            $mail->Username = '';
            $mail->Password = '';                       // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted

            //Recipients
            $mail->setFrom("$email", "Welcome Your now can join to the cpanal");
            $mail->addAddress("$email");    // Name is optional
            $mail->setLanguage('ar', '/optional/path/to/language/directory/');
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Your Email Details';
            $mail->Body =
                "
        <div style=\"text-center\">
       <h3> Your now can log in the cpanal with this email and password</h3>" .
                "<h3>Email: $email</h3>" .
                "<h3>password: $password</h3>" .
                $mail->AltBody = '';

            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function UpdateUserInfo(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
            'name' => 'required',
            'email' => "required",
            "role" => "required",
            "brunch" => "required"
        ]);
        $all = $request->all();

        $isLogin = $request->session()->get('isLogin');

        $role = $request->session()->get('role');
        if ($isLogin == "true") {
            if ($role == "super_user") {
                \App\Models\User::where('id', $all["id"])->update([
                    'name' => $all["name"],
                    'email' => $all["email"],
                    "role" => $all["role"],
                    "Place" => $all["brunch"]
                ]);
                return array("success" => true, "msg" => "success update the data", "role" => $role);


            }
        }

    }

    public function isLogIn(Request $request)
    {
        $isLogin = $request->session()->get('isLogin');
        $role = $request->session()->get('role');
        if ($isLogin == "true") {
            return array("success" => true, "msg" => "log in before", "role" => $role);

        }
        return array("success" => false, "msg" => "not log in yet",);

    }

    public function show(Request $request)
    {
        $all = $request->all();
        if (isset($all['more'])) {
            $more = ($all['more']);

            if ($request->session()->get('Users_Counter')) {
                if (isset($all['search'])) {

                    $c = $request->session()->get('Requests_Counter');
                    $r = \App\Models\requests::User('name', 'LIKE', '%' . $all['search'] . '%')->skip($c)->take(15)->get();
                    $n = $more == 1 ? +$c + 15 : +$c - 15;
                    $n = $n < 0 ? 0 : $n;
                    $request->session()->put('Requests_Counter', $n);
                    return $r;
                }
                $c = $request->session()->get('Users_Counter');
                $r = \App\Models\User::where('role', '!=', 'super_user')->skip($c)->take(15)->get();
                $n = $more == 1 ? +$c + 15 : +$c - 15;
                $n = $n < 0 ? 0 : $n;
                $request->session()->put('Users_Counter', $n);
                return $r;
            }
        }
        if (isset($all['search'])) {
            $r = \App\Models\User::where('name', 'LIKE', '%' . $all['search'] . '%')->skip(0)->take(15)->get();
            $request->session()->put('Requests_Counter', 15);
            return $r;
        }
        $r = \App\Models\User::where('role', '!=', 'super_user')->skip(0)->take(15)->get();
        $request->session()->put('Users_Counter', 15);

        return $r;
    }

    public function login(Request $request)
    {


        $validated = $request->validate([
            'user' => 'required|max:255',
            'password' => 'required',
        ]);


        $data = $request->all();
        $pass = $data['password'];
        $user = \App\Models\User::where([
            'email' => $data['user']
        ])->first();
        if (!$user) {
            return array("success" => false, "msg" => "login error");
        };
        $userPasswordInHash = $user['password'];
        $role = $user['role'];
        $brunch = $user['Place'];

        if (password_verify($pass, $userPasswordInHash)) {
            $request->session()->put('isLogin', 'true');
            $request->session()->put('role', $user['role']);
            $request->session()->put('brunch', "{$user['Place']}");
            return array("success" => true, "msg" => "login successful", "role" => $role, "brunch" => $brunch);
        }
        return array("success" => false, "msg" => "login error");


    }
}
