<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div class="text-center mb-8">

            <h2 class="text-2xl font-bold text-gray-800">Canviar contrasenya</h2>
            <p class="text-gray-600 mt-2">Ingresa la teva nova contrasenya</p>
        </div>

        @if(session('success'))
            <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-600 mr-3"></i>
                    <span class="text-green-800">{{ session('success') }}</span>
                </div>
            </div>
        @endif

        @if(session('error'))
            <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-600 mr-3"></i>
                    <span class="text-red-800">{{ session('error') }}</span>
                </div>
            </div>
        @endif

        @if($errors->any())
            <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div class="flex">
                    <i class="fas fa-exclamation-triangle text-red-600 mr-3 mt-0.5"></i>
                    <div>
                        <h4 class="font-medium text-red-800 mb-2">Por favor corrige:</h4>
                        <ul class="text-red-700 text-sm space-y-1">
                            @foreach ($errors->all() as $error)
                                <li class="flex items-start">
                                    <i class="fas fa-chevron-right text-red-500 text-xs mt-1 mr-2"></i>
                                    <span>{{ $error }}</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif

        <form action="{{ route('password.update') }}" method="POST" class="space-y-6">
            @csrf
            <input type="hidden" name="user_id" value="{{ $user->id ?? '' }}">

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                    Nova contrasenya
                </label>
                <input type="password" name="password" id="password" required
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none"
                    placeholder="" </div>

                <button type="submit"
                    class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium p-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                    Cambiar contrasenya
                </button>
        </form>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>