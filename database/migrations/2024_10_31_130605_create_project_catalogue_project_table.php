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
        Schema::create('project_catalogue_project', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_catalogue_id');
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_catalogue_id')->references('id')->on('project_catalogues')->onDelete('CASCADE');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('CASCADE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_catalogue_project');
    }
};