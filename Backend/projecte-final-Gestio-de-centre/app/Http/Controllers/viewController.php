<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ViewController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function passwordRecovery()
    {
        return view('passwordRecovery');
    }
    public function showAssignAdminRolForm()
    {
        $users = User::all();
        return view('addAdminView', compact('users'));
    }

    public function assignAdminRole(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $user = User::find($request->user_id);
        $user->rol = 'admin';
        $user->save();

        return back()->with('success', "¡{$user->name} ahora es administrador!");
    }
}
