<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 300);
            $table->text('description');
            $table->string('route', 80);
            $table->string('street_number', 80);
            $table->string('city', 191);
            $table->string('state', 191);
            $table->string('zipcode', 191);
            $table->float('lat', 10.6);
            $table->float('lng', 10.6);
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
        Schema::dropIfExists('services');
    }
}
