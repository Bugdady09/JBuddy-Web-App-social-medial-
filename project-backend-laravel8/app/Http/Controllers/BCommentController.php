<?php

namespace App\Http\Controllers;

use App\Models\B_comment;
use Illuminate\Http\Request;

class BCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $comment = new B_comment();
        $comment->u_id = $request->u_id;
        $comment->post_id = $request->post_id;
        $comment->comment = $request->comment;
        $comment->save();

        //after store a comment return all available post of this post id ...
        $comment = B_comment::orderBy('created_at', 'desc')->where('post_id',$request->post_id)
        ->join('b__users', 'b_comments.u_id', '=', 'b__users.id')
        ->select('b_comments.*', 'b__users.name','b__users.profile_image')
        ->get();
        $available_comment = count($comment);
        if($available_comment<1){
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true,'comment' => $comment]);
        
    }

    // get all comment by specific id 
    public function show($post_id)
    {
        $comment = B_comment::orderBy('created_at', 'desc')->where('post_id',$post_id)
        ->join('b__users', 'b_comments.u_id', '=', 'b__users.id')
        ->select('b_comments.*', 'b__users.name','b__users.profile_image')
        ->get();
        $available_comment = count($comment);
        if($available_comment<1){
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true,'comment' => $comment]);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\B_comment  $b_comment
     * @return \Illuminate\Http\Response
     */
    public function edit(B_comment $b_comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\B_comment  $b_comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, B_comment $b_comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\B_comment  $b_comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(B_comment $b_comment)
    {
        //
    }
}