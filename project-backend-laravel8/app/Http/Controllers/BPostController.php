<?php

namespace App\Http\Controllers;

use App\Models\B_comment;
use App\Models\B_Image;
use App\Models\B_like;
use App\Models\B_Post;
use App\Models\B_User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BPostController extends Controller
{
    
    public function index()
    {
        // //get post and user info
        // $post = B_Post::join('b__users', 'b__posts.u_id', '=', 'b__users.id')
        // ->select('b__posts.*', 'b__users.name','b__users.profile_image','b__users.cover_image')
        // ->get();
        // $available_post = count($post);
        // if($available_post<1){
        //     return response()->json(['success' => false]);
        // }
        // return response()->json(['success' => true,'posts' => $post]);
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

   //store user post 
    public function store(Request $request)
    {
        
        // $filename = $request->image->getClientOriginalName();
        // return $request->all() . $filename;
        $post = new B_Post();
        // if(!isset($request->image)){
        //     $post->image = '';
        // }
        //check if image or post, atleast one available
        if($request->post || $request->image){
        if($request->image){
        $filename = $request->image->getClientOriginalName();
        $request->image->storeAs('uploadImages',$filename,'public');
        $post->img = $filename;
        }
        // else{
        // $post->image = null;
        // }
    
        $post->u_id = $request->u_id;
        $post->post = $request->post;
        //return $post;
        $posts = $post->save();


        //get post and user info
        $post = B_Post::orderBy('created_at', 'desc')
        ->where('u_id', $request->u_id)
        ->join('b__users', 'b__posts.u_id', '=', 'b__users.id')
        ->select('b__posts.*', 'b__users.name','b__users.profile_image','b__users.cover_image')
        ->get();
        $available_post = count($post);
        if($available_post<1){
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true,'posts' => $post]);
            
     }

        return response()->json(['errors' => "Write post or and select Image" , 'success' => false ]);
   
    
    }

    
    public function show($id)
    {
        //get post and user info
        $post = B_Post::orderBy('created_at', 'desc')
        ->where('u_id', $id)
        ->join('b__users', 'b__posts.u_id', '=', 'b__users.id')
        ->select('b__posts.*', 'b__users.name','b__users.profile_image','b__users.cover_image')
        ->get();
        $available_post = count($post);
        if($available_post<1){
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true,'posts' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\B_Post  $b_Post
     * @return \Illuminate\Http\Response
     */
    public function edit(B_Post $b_Post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\B_Post  $b_Post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$post_id)
    {
    //     //return response()->json(['success' => true,'posts' => $request->all(), "imagename" =>$request->image->getClientOriginalName()]);
    //     //return $post_id;
    //     $post = B_Post::find($post_id);
    //     if($request->post || $request->image){

    //     if($request->image){
    //     $filename = $request->image->getClientOriginalName();
    //     $request->image->storeAs('uploadImages',$filename,'public');
    //     $post->img = $filename;
    //     $post->post = $request->post;
    //     }
    //     else{
    //         $post->img = null;
    //         $post->post = $request->post;
    //     }
    
    //     // return response()->json(['success' => true,'posts' => $post]);
    //     return $post;
    //     $post->save();
        

    //     //get post and user info
    //     $post = B_Post::orderBy('created_at', 'desc')
    //     ->where('u_id', $request->u_id)
    //     ->join('b__users', 'b__posts.u_id', '=', 'b__users.id')
    //     ->select('b__posts.*', 'b__users.name','b__users.profile_image','b__users.cover_image')
    //     ->get();
    //     $available_post = count($post);
    //     if($available_post<1){
    //         return response()->json(['success' => false]);
    //     }
    //     return response()->json(['success' => true,'posts' => $post]);
            
    //  }

    //     return response()->json(['errors' => "Write post or and select Image" , 'success' => false ]);

        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\B_Post  $b_Post
     * @return \Illuminate\Http\Response
     */
    public function destroy(B_Post $b_Post)
    {
        //
    }

    //update profile pic...
    public function ProfilePic(Request $request)
    {
        $user = B_User::find($request->u_id);
        $filename = $request->image->getClientOriginalName();
        $request->image->storeAs('uploadImages',$filename,'public');
        $user->profile_image= $filename;
        $user->id = $request->u_id;
        $user->update();
        
        //get post and user info
        return response()->json(['success' => true,'user' => $user]);
    }

    //update cover pic...
    public function CoverPic(Request $request)
    {
        $user = B_User::find($request->u_id);
        $filename = $request->image->getClientOriginalName();
        $request->image->storeAs('uploadImages',$filename,'public');
        $user->cover_image= $filename;
        $user->id = $request->u_id;
        $user->update();
        
        //get post and user info
        return response()->json(['success' => true,'user' => $user]);
    }


    public function UpdatePost(Request $request)
    {
        //return response()->json(['success' => true,'posts' => $request->all(), "imagename" =>$request->image->getClientOriginalName()]);
        //return $post_id;
        $post = B_Post::find($request->post_id);
        if($request->post || $request->image){

        if($request->image){
        $filename = $request->image->getClientOriginalName();
        //testing
        $request->image->storeAs('uploadImages',$filename,'public');
        $post->img = $filename;
        $post->post = $request->post;
        }
        else{
            $post->img = null;
            $post->post = $request->post;
        }
    
        // return response()->json(['success' => true,'posts' => $post]);
        //return $post;
        $post->save();
        

        //get post and user info
        $post = B_Post::orderBy('created_at', 'desc')
        ->where('u_id', $request->u_id)
        ->join('b__users', 'b__posts.u_id', '=', 'b__users.id')
        ->select('b__posts.*', 'b__users.name','b__users.profile_image','b__users.cover_image')
        ->get();
        $available_post = count($post);
        if($available_post<1){
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true,'posts' => $post]);
            
     }

        return response()->json(['errors' => "Write post or and select Image" , 'success' => false ]);
    }


    public function DeletePost($id)
    {
        $post = B_Post::find($id);
        $u_id = $post->u_id;

        $like =  B_like::where('post_id', $id)->delete();
        $comment = B_comment::where('post_id', $id)->delete();

        $postDelete = $post->delete();
        

        //get post and user info
        $post = B_Post::orderBy('created_at', 'desc')
        ->where('u_id', $u_id)
        ->join('b__users', 'b__posts.u_id', '=', 'b__users.id')
        ->select('b__posts.*', 'b__users.name','b__users.profile_image','b__users.cover_image')
        ->get();
        $available_post = count($post);
        if($available_post<1){
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => true,'posts' => $post]);
        
    }

    public function SharePost(Request $request)
    {
        $post = B_Post:: where('b__posts.id', $request->post_id)
        ->join('b__users', 'b__posts.u_id', '=', 'b__users.id')
        ->select('b__posts.*', 'b__users.name')
        ->get();
        $post = $post[0];
        //return $post;
        $post->share = ($post->share * 1) + 1;
        $post->save();

        // create new post

        $newpost = new B_Post();
        $newpost->u_id = $request->u_id; 
        $newpost->post = $post->post;
        $newpost->img = $post->img;
        $newpost->share_Name = $post->name;
        $newpost->save();

        //get post and user info
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

    

}