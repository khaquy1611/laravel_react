<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('real_estates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('real_estate_catalogue_id');
            $table->unsignedBigInteger('project_id');

            $table->string('name', 100);
            $table->string('canonical');
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_keyword')->nullable();
            $table->text('meta_description')->nullable();

            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->text('album')->nullable();

            $table->unsignedBigInteger('direction_id');
            $table->unsignedBigInteger('sell_foreign_id');
            $table->unsignedBigInteger('legal_id');
            $table->unsignedBigInteger('furniture_id');

            $table->integer('bedroom');
            $table->float('area');
            $table->integer('bathroom');
            $table->integer('price');
            $table->string('code');
            $table->longText('video');
            $table->longText('vr');
            $table->longText('map');
            $table->string('address');

            $table->tinyInteger('publish')->default(2);
            $table->tinyInteger('follow')->default(2);
            $table->integer('order')->default(0);


            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_estates');
    }
};