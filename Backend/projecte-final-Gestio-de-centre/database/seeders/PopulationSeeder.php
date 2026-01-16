<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Population;

class PopulationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $populations = [
            [
                'town' => 'Barcelona',
                'street' => 'Carrer de Balmes',
                'number' => '12',
                'postalcode' => '08007',
            ],
            [
                'town' => 'Madrid',
                'street' => 'Calle de Alcalá',
                'number' => '45',
                'postalcode' => '28014',
            ],
            [
                'town' => 'Valencia',
                'street' => 'Calle de la Paz',
                'number' => '7',
                'postalcode' => '46003',
            ],
        ];

        foreach ($populations as $pop) {
            Population::create($pop);
        }
    }
}
