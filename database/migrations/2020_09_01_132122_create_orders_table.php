<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('email');
            $table->string('fname');
            $table->string('lname');
            $table->string('address');
            $table->string('city');
            $table->string('country');
            $table->string('region');
            $table->string('postcode');
            $table->string('phone');
            $table->integer('subtotal');
            $table->integer('total');
            $table->text('file')->nullable();
            $table->string('reference_no')->nullable();
            $table->string('payment_method');
            $table->string('payment_type');
            $table->integer('quantity');
            $table->string('status')->default('pending');
            $table->string('note')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
