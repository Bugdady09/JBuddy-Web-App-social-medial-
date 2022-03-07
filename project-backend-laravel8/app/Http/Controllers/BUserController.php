<?php

namespace App\Http\Controllers;

use App\Models\B_Image;
use App\Models\B_User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class BUserController extends Controller
{
    // retrive all user and their posts
    public function index()
    {
        $user = B_User::orderBy('created_at', 'desc')
        ->join('b__posts', 'b__posts.u_id', '=', 'b__users.id')
        ->select('b__posts.*', 'b__users.name','b__users.profile_image')
        ->get();
        $available_post = count($user);
        if($available_post<1){
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true,'posts' => $user]);
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
                'name' => 'required | string | max:255',
                'city' => 'required | string | max:255',
                'email'    => 'required | string | email | unique:b__users| max:255',
                'password' => 'required|string',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        //create user
        $user = new B_User();
        $user->name = $request->name;
        $user->city = $request->city;
        $user->email = $request->email;
        $password = Hash::make($request->password);
        $user->password = $password;
        
        $user = $user->save();

        return response()->json(['users' => $user, 'success' => true ]);
    }

    //retrive a specific user info 
    public function show($id)
    {
        $user = B_User::find($id);
        return response()->json(['success' => true,'user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\B_User  $b_User
     * @return \Illuminate\Http\Response
     */
    public function edit(B_User $b_User)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\B_User  $b_User
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, B_User $b_User)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\B_User  $b_User
     * @return \Illuminate\Http\Response
     */
    public function destroy(B_User $b_User)
    {
        //
    }


    //login for user
    public function login(Request $request) {

        $validator = Validator::make($request->all(), [
            'email'    => 'required | string | email| max:255',
            'password' => 'required|string',
    ]);
    
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->getMessageBag(),
        ]);
    }

    $finduser = B_User::where('email', $request->email)->first();
   if(!$finduser){
    return response()->json([
        'success' => false,
        'errors' => ['email'=>['Email dose not match']]
    ]);
   }else{
    $matchPassword = Hash::check($request->password, $finduser->password);
        
        if($matchPassword) {
            session(['user-data' => $finduser]);
            $userData = new B_User();
            $userData->id = $finduser->id;
            $userData->name = $finduser->name;
            $userData->profile_image = $finduser->profile_image;

            return response()->json([
                'success' => true,
                'userinfo' =>$userData
            ]);
        }
        else {
            return response()->json([
                'success' => false,
                'errors' => ['password'=>['Incorrect Password']]
            ]);
        }
   
   }

    }




}