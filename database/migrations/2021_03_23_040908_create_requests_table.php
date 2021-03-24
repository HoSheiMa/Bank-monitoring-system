<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->string('id');
            $table->string('brunch_id');
            $table->string('state');
            $table->string('name');
            $table->string('ID_card');
            $table->string('money_in_number');
            $table->string('money_in_text');
            $table->string('details');
            $table->longText('image')->nullable();
            $table->string('iban_number');
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
        Schema::dropIfExists('requests');
    }
}
