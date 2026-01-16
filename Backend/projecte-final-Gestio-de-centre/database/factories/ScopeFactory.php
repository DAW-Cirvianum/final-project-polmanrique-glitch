<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Scope;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Scope>
 */
class ScopeFactory extends Factory
{
    protected $model = Scope::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word, // Nombre corto del scope
            'description' => $this->faker->sentence(6), // Descripción breve
        ];
    }
}
