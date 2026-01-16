<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Tutor;
use App\Models\User;
use App\Models\Course;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tutor>
 */
class TutorFactory extends Factory
{
    protected $model = Tutor::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'course_id' => Course::factory()
        ];
    }
}
