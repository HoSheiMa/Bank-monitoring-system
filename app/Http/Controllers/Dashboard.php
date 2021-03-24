<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Dashboard extends Controller
{
    public function sizeofBranchs()
    {
        $b = \App\Models\Branchs::all();
        return sizeof($b);
    }

    public function sizeofUsers()
    {
        $u = \App\Models\User::all();
        return sizeof($u);
    }

    public function sizeofRequest($state = "padding")
    {
        $r = \App\Models\requests::where('state', $state)->get();

        return sizeof($r);
    }

    public function ShortInfo()
    {
        $rp = $this->sizeofRequest('padding'); // padding
        $ra = $this->sizeofRequest('approved'); // approved
        $b = $this->sizeofBranchs();
        $u = $this->sizeofUsers();

        return array(
            "padding_requests" => $rp,
            "approved_requests" => $ra,
            "Branches" => $b,
            "users" => $u,

        );

    }
}
