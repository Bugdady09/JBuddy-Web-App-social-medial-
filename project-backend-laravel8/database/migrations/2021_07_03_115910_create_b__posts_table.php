<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('b__posts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('u_id');
            $table->string('post')->nullable();
            $table->string('img')->nullable();
            $table->biginteger('share')->defult('0');
            $table->string('share_Name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('b__posts');
    }
}