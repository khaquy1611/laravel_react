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
        Schema::create('real_estate_catalogue_real_estate', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('real_estate_catalogue_id');
            $table->unsignedBigInteger('real_estate_id');
            $table->foreign('real_estate_catalogue_id', 'fk_catalogue_real_estate')->references('id')->on('real_estate_catalogues')->onDelete('CASCADE');
            $table->foreign('real_estate_id', 'fk_real_estate_catalogue')->references('id')->on('real_estates')->onDelete('CASCADE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_estate_catalogue_real_estate');
    }
};