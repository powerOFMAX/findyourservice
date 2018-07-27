<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class services extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$faker=Faker::create();
        for ($i=0; $i < 15; $i++) {
		    \DB::table('services')->insert(array(
		           'title' => $faker->randomElement(['Internet Solutions','Indian Wifi','Fibertel Solutions','Direct TV', 'Yahoo! Web Services','WWW Network', 'NASA Web Services', 'America Solutions',
		       			'Europe Web Services']),
		           'description'  => $faker->sentence($nbWords = 8, $variableNbWords = true),
		           'route' => $faker-> streetName(),
		           'street_number' => $faker->buildingNumber(),
		           'city' => $faker->city(),
		           'state' => $faker->state(),
		           'zipcode' => $faker->postcode(),
		           'lat' => $faker->latitude($min = -50, $max = 70),
		           'lng' => $faker->longitude($min = -150, $max = 140),
		           'created_at' => $faker-> date('Y-m-d H:m:s'),
		           'updated_at' => $faker-> date('Y-m-d H:m:s')
		    ));
		}
    }
}
