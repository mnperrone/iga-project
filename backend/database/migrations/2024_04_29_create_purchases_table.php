<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->decimal('amount', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('purchases');
    }
}; 