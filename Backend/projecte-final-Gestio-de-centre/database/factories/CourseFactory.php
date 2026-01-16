<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Course;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true), // Genera un nombre de curso como "Matemáticas Avanzadas"
            'year' => $this->faker->numberBetween(2020, 2026), // Año entre 2020 y 2026
        ];
    }
}
