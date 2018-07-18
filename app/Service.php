<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable=['title','description','address','city','state','zipcode','lat','lng'];

}
