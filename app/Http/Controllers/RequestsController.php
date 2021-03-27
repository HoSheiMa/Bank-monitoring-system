<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Float_;
use Psy\Util\Json;
use Validator;


class RequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function ExportExcel(Request $request)
    {
        // using cache of last query of seaching or filter or something else
        $r = $request->session()->get('Query_Cache');

        return $r;


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $all = $request->all();

        $role = $request->session()->get('role');

        if (isset($all['advance']) && ($role == "super_user" || $role == "viewer_user")) {
            $startPoint = 0;
            $endPoint = 15;
            $more = isset($all['more']) ? $all['more'] : null;
            if ($more) {
                $n = $more == 1 ? 15 : -15;
                $startPoint = $request->session()->get('Requests_Counter');
                $endPoint = $request->session()->get('Requests_Counter') + $n;
                $request->session()->put('Requests_Counter', $startPoint);
            }
            $brunch = isset($all['brunch']) ? ["brunch_id", "=", $all['brunch']] : [];
            $date = isset($all['date']) ? ['created_at', 'LIKE', '%' . $all['date'] . '%'] : [];
            $search = isset($all['search']) ? ['id', 'LIKE', '%' . $all['search'] . '%'] : [];
            $q = [
                $brunch,
                $date,
                $search
            ];
            $query = [];
            foreach ($q as $i) {
                if (sizeof($i) > 0) array_push($query, $i);
            }
            $r = \App\Models\requests::where($query)->skip($startPoint)->take($endPoint)->get();
            $cache_r = json_encode(\App\Models\requests::where($query)->get());
            $request->session()->put('Query_Cache', $cache_r);

            return $r;

        }
        $brunch = $request->session()->get('brunch');
        $brunch = $role == "admin_user" || $role == "member_user" ? ["brunch_id", "=", $all['brunch']] : [];
        $startPoint = 0;
        $endPoint = 15;
        $more = isset($all['more']) ? $all['more'] : null;
        if ($more) {
            $n = $more == 1 ? 15 : -15;
            $startPoint = $request->session()->get('Requests_Counter');
            $endPoint = $request->session()->get('Requests_Counter') + $n;
            $request->session()->put('Requests_Counter', $startPoint);
        }
        $search = isset($all['search']) ? ['id', 'LIKE', '%' . $all['search'] . '%'] : [];
        $q = [
            $brunch,
            $search
        ];
        $query = [];
        foreach ($q as $i) {
            if (sizeof($i) > 0) array_push($query, $i);
        }
        $r = \App\Models\requests::where($query)->skip($startPoint)->take($endPoint)->get();
        $cache_r = json_encode(\App\Models\requests::where($query)->get());
        $request->session()->put('Query_Cache', $cache_r);
        return $r;

    }

    public function showStatement(Request $request)
    {
        $all = $request->all();

        $role = $request->session()->get('role');

        if (isset($all['advance']) && ($role == "super_user" || $role == "viewer_user")) {
            $startPoint = 0;
            $endPoint = 15;
            $more = isset($all['more']) ? $all['more'] : null;
            if ($more) {
                $n = $more == 1 ? 15 : -15;
                $startPoint = $request->session()->get('showStatement_Counter');
                $endPoint = $request->session()->get('showStatement_Counter') + $n;
                $request->session()->put('Requests_Counter', $startPoint);
            }
            $brunch = isset($all['brunch']) ? ["brunch_id", "=", $all['brunch']] : [];
            $date = isset($all['date']) ? ['created_at', 'LIKE', '%' . $all['date'] . '%'] : [];
            $search = isset($all['search']) ? ['id', 'LIKE', '%' . $all['search'] . '%'] : [];
            $q = [
                $brunch,
                $date,
                $search
            ];
            $query = [];
            foreach ($q as $i) {
                if (sizeof($i) > 0) array_push($query, $i);
            }
            $r = \App\Models\statement::where($query)->skip($startPoint)->take($endPoint)->get();
            $cache_r = json_encode(\App\Models\statement::where($query)->get());
            $request->session()->put('statement_Query_Cache', $cache_r);

            return $r;

        }
        $brunch = $request->session()->get('brunch');
        $brunch = $role == "admin_user" || $role == "member_user" ? ["brunch_id", "=", $all['brunch']] : [];
        $startPoint = 0;
        $endPoint = 15;
        $more = isset($all['more']) ? $all['more'] : null;
        if ($more) {
            $n = $more == 1 ? 15 : -15;
            $startPoint = $request->session()->get('showStatement_Counter');
            $endPoint = $request->session()->get('showStatement_Counter') + $n;
            $request->session()->put('showStatement_Counter', $startPoint);
        }
        $search = isset($all['search']) ? ['id', 'LIKE', '%' . $all['search'] . '%'] : [];
        $q = [
            $brunch,
            $search
        ];
        $query = [];
        foreach ($q as $i) {
            if (sizeof($i) > 0) array_push($query, $i);
        }
        $r = \App\Models\statement::where($query)->skip($startPoint)->take($endPoint)->get();
        $cache_r = json_encode(\App\Models\statement::where($query)->get());
        $request->session()->put('statement_Query_Cache', $cache_r);
        return $r;

    }

    public function cancel(Request $request)
    {
        $d = $request->all();
        if (isset($d['id'])) {
            $id = $d['id'];
            $isLogin = $request->session()->get('isLogin');

            $role = $request->session()->get('role');
            $brunch = $request->session()->get('brunch');

            if ($role == "admin_user") {

                \App\Models\requests::where([
                    ['brunch_id', $brunch],
                    ['id', $id],
                ])->first()->update([
                    "state" => "cancelled"
                ]);


            }
        }
    }

    public function approve(Request $request)
    {
        $d = $request->all();
        if (isset($d['id'])) {
            $id = $d['id'];
            $isLogin = $request->session()->get('isLogin');

            $role = $request->session()->get('role');
            $brunch = $request->session()->get('brunch');

            if ($role == "admin_user") {

                $res = \App\Models\requests::where([
                    ['brunch_id', "=", $brunch],
                    ['id', "=", $id],
                ])->first()->update([
                    "state" => "approved"
                ]);
                return $res;


            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addRequest(Request $request)
    {


        $role = $request->session()->get('role');

        if ($role !== "normal_user") {
            return;
        }
        $request->validate([
            'name' => 'required',
            'details' => 'required',
            'iban' => 'required',
            'id_card' => 'required',
            'money_in_number' => 'required',
            'money_in_text' => 'required',
        ]);
        $all = $request->all();
        $image = isset($all['image']) ? $all['image']['src'] : null;
        $name = $all['name'];
        $details = $all['details'];
        $iban = $all['iban'];
        $id_card = $all['id_card'];
        $money_in_number = $all['money_in_number'];
        $money_in_text = $all['money_in_text'];
        $brunch = $request->session()->get('brunch');
        $id = $brunch . date('Y') . rand();
        $r = new \App\Models\requests;
        $r->id = $id;
        $r->brunch_id = $brunch;
        $r->state = 'padding';
        $r->image = $image;
        $r->name = $name;
        $r->details = $details;
        $r->iban_number = $iban;
        $r->ID_card = $id_card;
        $r->money_in_number = $money_in_number;
        $r->money_in_text = $money_in_text;
        $r->save();


    }

    public function checkStatementMoney($request, $brunch, $money, $date)
    {
        $rs = \App\Models\requests::where([['brunch_id', "=", $brunch], [
            "created_at", "LIKE", "%" . $date . "%",
        ]])->get();
        $total = 0;
        $money = (float)$money;
        foreach ($rs as $r) {
            $m = (float)$r['money_in_number'];
            $total += +$m;
        }
        if ($total !== $money) {
            return false;
        }
        return true;
    }

    public function statementGetDataForPrint(Request $request
    )
    {
        $all = $request->all();
        $request->validate([
            "brunch" => "required",
            "date" => "required",
            "id" => "required",
            "details" => "required",
        ]);

        $date = $all['date'];
        $role = $request->session()->get('role');
        $roles = ["super_user", "viewer_user"];
        if (!in_array($role, $roles)) {
            return array("success" => false, "msg" => "you are not has role.");
        }
        $brunch = $all['brunch'];
        $statement_id = $all['id'];
        $money_in_text = $all['money_in_text'];
        $rs = \App\Models\requests::where([['brunch_id', "=", $brunch], [
            "created_at", "LIKE", "%" . $date . "%",
        ]])->get();
        $total = 0;
        $requests = array();
        foreach ($rs as $r) {
            $m = (float)$r['money_in_number'];
            $total += +$m;
            array_push($requests, array("id" => $r['id'], "name" => $r['name'], "money_in_number" => $r['money_in_number']));
        }
        return array(
            "details" => $all['details'],
            "requests" => $requests,
            "total" => $total,
            "money_in_text" => $money_in_text,
            "brunch" => $brunch,
            "date" => $date,
            "statement_id" => $statement_id,
        );


    }

    public function addStatement(Request $request)
    {
        $all = $request->all();
        $request->validate([
            "money_in_number" => "required",
            "id" => "required",
            "money_in_text" => "required",
            "details" => "required",
            "date" => "required",
        ]);
        $brunch = $request->session()->get('brunch');
        $date = $all['date'];
        $_r = \App\Models\statement::where([
            ['brunch_id', '=', $brunch],
            ['created_at', 'LIKE', '%' . date('Y-m-d') . '%']
        ])->get();
        if (sizeof($_r) > 0) {
            return array("success" => false, "msg" => "maximum statement today. ");

        }


        $money_in_number = $all['money_in_number'];
        $money_in_text = $all['money_in_text'];
        $details = $all['details'];
        $id = $all['id'];

        if (!$this->checkStatementMoney($request, $brunch, $money_in_number, $date)) {
            return array("success" => false, "msg" => "money is not correct");

        }

        $nStatement = new \App\Models\statement;
        $nStatement->money_in_number = $money_in_number;
        $nStatement->money_in_text = $money_in_text;
        $nStatement->details = $details;
        $nStatement->date = $date;
        $nStatement->id = $id;
        $nStatement->brunch_id = $brunch;
        $nStatement->save();

        return array("success" => true, "msg" => "success");
    }
}
