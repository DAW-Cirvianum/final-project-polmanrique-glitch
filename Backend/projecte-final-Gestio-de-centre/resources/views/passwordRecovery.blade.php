<div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-200">

        <div class=" p-6 rounded-t-xl border-b border-gray-200">
            <h1 class="text-2xl font-bold text-gray-800 text-center">Recupera la contrassenya</h1>
        </div>

        <div class="p-6">
            @if(session('success'))
                <div class="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-check-circle text-emerald-600"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-emerald-800">{{ session('success') }}</p>
                        </div>
                    </div>
                </div>
            @endif

            @if(session('error'))
                <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-exclamation-circle text-red-600"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-red-800">{{ session('error') }}</p>
                        </div>
                    </div>
                </div>
            @endif

            <form action="{{ route('password.send') }}" method="POST" class="space-y-5">
                @csrf

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-envelope text-gray-400"></i>
                        </div>
                        <input type="email" name="email" id="email" required
                            class="w-full pl-10 p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors"
                            placeholder="mail@mail.com" />
                    </div>
                    <p class="text-sm text-gray-500 mt-2">T'enviarem un enllaç per restablir la teva contrasenya</p>
                </div>

                <button type="submit"
                    class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-3 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200">
                    <i class="fas fa-paper-plane mr-2"></i>
                    Enviar enllaç
                </button>
            </form>


        </div>
    </div>
</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>