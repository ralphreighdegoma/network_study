<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEwalletTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ewallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('ewallet_id');
            $table->integer('order_id')->nullable();
            $table->integer('referral_member_id')->nullable();
            $table->string('title');
            $table->string('description');
            $table->float('amount');
            $table->string('ewallet_type');
            $table->string('transaction_type');
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
        Schema::dropIfExists('ewallet_transactions');
    }
}
