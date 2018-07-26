<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin');
    }
    public function showInsert()
    {
        return view('addservice');
    }
    public function showUpdate($id)
    {
        return view('updateservice')
                    ->with('id', $id);
    }
    public function showDelete()
    {
        return view('deleteservice');
    }
}
