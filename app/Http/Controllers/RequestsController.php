<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

        $brunch = $request->session()->get('brunch');
        $r = array();
        if ($brunch) {
            $r = \App\Models\requests::where([['brunch_id', '=', $brunch]])->get();

        } else {
            $r = \App\Models\requests::all();

        }
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
        $brunch = $request->session()->get('brunch');

        if ($brunch) {

            if (isset($all['more'])) {
                $more = ($all['more']);

                if ($request->session()->get('Requests_Counter')) {
                    if (isset($all['search'])) {
                        $c = $request->session()->get('Requests_Counter');

                        $r = \App\Models\requests::where([
                            ['id', 'LIKE', '%' . $all['search'] . '%'],
                            ['brunch_id', '=', $brunch]
                        ])->skip($c)->take(15)->get();
                        $n = $more == 1 ? +$c + 15 : +$c - 15;
                        $n = $n < 0 ? 0 : $n;
                        $request->session()->put('Requests_Counter', $n);
                        return $r;
                    }

                    $c = $request->session()->get('Requests_Counter');
                    $r = \App\Models\requests::skip($c)->take(15)->get();
                    $n = $more == 1 ? +$c + 15 : +$c - 15;
                    $n = $n < 0 ? 0 : $n;
                    $request->session()->put('Requests_Counter', $n);
                    return $r;
                }
            }
            if (isset($all['search'])) {
                $r = \App\Models\requests::where([
                    ['brunch_id', '=', $brunch],
                    ['brunch_id', 'LIKE', '%' . $all['search'] . '%']])->skip(0)->take(15)->get();
                $request->session()->put('Requests_Counter', 15);
                return $r;
            }

            $r = \App\Models\requests::where([['brunch_id', '=', $brunch]])->skip(0)->take(15)->get();

            $request->session()->put('Requests_Counter', 15);

            return $r;
        }


        if (isset($all['more'])) {
            $more = ($all['more']);

            if ($request->session()->get('Requests_Counter')) {
                if (isset($all['search'])) {
                    $c = $request->session()->get('Requests_Counter');

                    $r = \App\Models\requests::where('id', 'LIKE', '%' . $all['search'] . '%')->skip($c)->take(15)->get();
                    $n = $more == 1 ? +$c + 15 : +$c - 15;
                    $n = $n < 0 ? 0 : $n;
                    $request->session()->put('Requests_Counter', $n);
                    return $r;
                }

                $c = $request->session()->get('Requests_Counter');
                $r = \App\Models\requests::skip($c)->take(15)->get();
                $n = $more == 1 ? +$c + 15 : +$c - 15;
                $n = $n < 0 ? 0 : $n;
                $request->session()->put('Requests_Counter', $n);
                return $r;
            }
        }
        if (isset($all['search'])) {
            $r = \App\Models\requests::where('brunch_id', 'LIKE', '%' . $all['search'] . '%')->skip(0)->take(15)->get();
            $request->session()->put('Requests_Counter', 15);
            return $r;
        }

        $r = \App\Models\requests::skip(0)->take(15)->get();

        $request->session()->put('Requests_Counter', 15);

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
}
