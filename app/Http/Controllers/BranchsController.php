<?php

namespace App\Http\Controllers;

use App\Models\Branchs;
use Illuminate\Http\Request;

class BranchsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Branchs  $branchs
     * @return \Illuminate\Http\Response
     */
      public function show(Request $request)
    {
        $all = $request->all();
        if (isset($all['more'])) {
        $more = ($all['more']);

            if ($request->session()->get('Brunches_Counter')) {
                $c = $request->session()->get('Brunches_Counter');
                $r = \App\Models\Branchs::skip($c)->take(15)->get();
                $n = $more == 1 ?  +$c + 15 : +$c -15;
                $n = $n < 0 ? 0 : $n;
                $request->session()->put('Brunches_Counter', $n);
                return $r;
            }
        }
        $r = \App\Models\Branchs::skip(0)->take(15)->get();
        $request->session()->put('Brunches_Counter', 15);

        return $r;
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Branchs  $branchs
     * @return \Illuminate\Http\Response
     */
    public function edit(Branchs $branchs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Branchs  $branchs
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Branchs $branchs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Branchs  $branchs
     * @return \Illuminate\Http\Response
     */
    public function destroy(Branchs $branchs)
    {
        //
    }
}
