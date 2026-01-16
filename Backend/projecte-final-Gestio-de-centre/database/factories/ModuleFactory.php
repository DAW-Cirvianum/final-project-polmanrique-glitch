<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Module;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Module>
 */
class ModuleFactory extends Factory
{
    protected $model = Module::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Mòdul ' . $this->faker->unique()->numberBetween(1, 50),
            'code' => 'MOD' . $this->faker->unique()->numberBetween(100, 999),
            'hours' => $this->faker->numberBetween(10, 50),
            'teacher_id' => 1, // Puedes cambiarlo por un ID aleatorio de tabla users donde rol = 'teacher'
            'scope_id' => 1,   // Si tienes scopes, cambiarlo por ID real o random
            'course_id' => 1,  // Si quieres, puedes asociarlo dinámicamente con Course::factory()
        ];
    }
}
