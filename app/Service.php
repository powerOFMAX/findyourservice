<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable=['title','description','route','street_number','city','state','zipcode','lat','lng'];
}
