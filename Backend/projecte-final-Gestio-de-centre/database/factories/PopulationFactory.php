<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Population;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Population>
 */
class PopulationFactory extends Factory
{
    protected $model = Population::class;

    public function definition(): array
    {
        return [
            'town' => $this->faker->city,
            'street' => $this->faker->streetName,
            'number' => $this->faker->numberBetween(1, 200),
            'postalcode' => $this->faker->numberBetween(10000, 52999),
        ];
    }
}
