<?php

namespace App\Http\Controllers;

use App\Models\B_like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BLikeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    //insert user like information
    public function store(Request $request)
    {
        // need to modifi. . check u_id and post_id if same... this validation does not work...
        $isExistLike = B_like::where(['u_id'=> $request->u_id, 'post_id'=> $request->post_id])
        ->get();
        if(count($isExistLike)) {
            $likeInfo = B_like::where(['u_id'=> $request->u_id, 'post_id'=> $request->post_id])->delete();

            //return all likes
            $findAllLikes = B_like::where('post_id', $request->post_id)->get();
            $available_likes = count($findAllLikes);
            return response()->json(['success' => false,'likes' => $available_likes]);
        }else{
            $likeInfo = new B_like();
            $likeInfo->post_id = $request->post_id;
            $likeInfo->u_id = $request->u_id;
            $likeInfo->save();
    
            //return all likes
            $findAllLikes = B_like::where('post_id', $likeInfo->post_id)->get();
            $available_likes = count($findAllLikes);
            return response()->json(['success' => true,'likes' => $available_likes]);
        }


       
    }

    
    public function show()
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\B_like  $b_like
     * @return \Illuminate\Http\Response
     */
    public function edit(B_like $b_like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\B_like  $b_like
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, B_like $b_like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\B_like  $b_like
     * @return \Illuminate\Http\Response
     */
    public function destroy(B_like $b_like)
    {
        //
    }

    //shwo specific post liks
    public function getAllLikes(Request $request)
    {
        //return $request->id." ". $request->u_id  ;
        $findAllLikes = B_like::where('post_id', $request->id)->get();
        //return "data " . $findAllLikes;
        $available_likes = count($findAllLikes);
        if($available_likes<1){
            return response()->json(['success' => false,'islikedUser' => 0,'likes' => 0]);
        }

        //if post exist check profile user like availabel or not
        $isExistLike = B_like::where(['u_id'=> $request->u_id, 'post_id'=> $request->id])
        ->count();
        return response()->json(['success' => true,'islikedUser' => $isExistLike,'likes' => $available_likes]);
    }
    
}