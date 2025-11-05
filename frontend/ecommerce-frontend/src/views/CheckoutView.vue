<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useToast } from 'vue-toastification'
import { CheckCircleIcon, CreditCardIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const step = ref(1)

const shippingForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'México'
})

const paymentForm = ref({
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
  saveCard: false
})

const processOrder = () => {
  // Simular procesamiento
  toast.success('¡Pedido realizado con éxito!')
  cartStore.clearCart()
  router.push('/')
}

const nextStep = () => {
  if (step.value < 3) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-center space-x-4">
          <div 
            v-for="i in 3" 
            :key="i"
            class="flex items-center"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
              :class="step >= i ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'"
            >
              {{ i }}
            </div>
            <div v-if="i < 3" class="w-16 h-1 mx-2" :class="step > i ? 'bg-black' : 'bg-gray-200'"></div>
          </div>
        </div>
        <div class="flex justify-center space-x-24 mt-3 text-sm">
          <span :class="step >= 1 ? 'text-black font-semibold' : 'text-gray-600'">Envío</span>
          <span :class="step >= 2 ? 'text-black font-semibold' : 'text-gray-600'">Pago</span>
          <span :class="step >= 3 ? 'text-black font-semibold' : 'text-gray-600'">Confirmación</span>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Forms -->
        <div class="lg:col-span-2">
          <!-- Step 1: Shipping -->
          <div v-if="step === 1" class="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h2 class="text-2xl font-bold mb-6">Información de Envío</h2>
            <form class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-2">Nombre</label>
                  <input v-model="shippingForm.firstName" type="text" class="input-field" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2">Apellidos</label>
                  <input v-model="shippingForm.lastName" type="text" class="input-field" required />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Email</label>
                <input v-model="shippingForm.email" type="email" class="input-field" required />
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Teléfono</label>
                <input v-model="shippingForm.phone" type="tel" class="input-field" required />
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Dirección</label>
                <input v-model="shippingForm.address" type="text" class="input-field" required />
              </div>

              <div class="grid sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-2">Ciudad</label>
                  <input v-model="shippingForm.city" type="text" class="input-field" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2">Estado</label>
                  <input v-model="shippingForm.state" type="text" class="input-field" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2">CP</label>
                  <input v-model="shippingForm.zipCode" type="text" class="input-field" required />
                </div>
              </div>

              <button type="button" @click="nextStep" class="w-full btn-primary mt-6">
                Continuar al Pago
              </button>
            </form>
          </div>

          <!-- Step 2: Payment -->
          <div v-if="step === 2" class="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h2 class="text-2xl font-bold mb-6">Información de Pago</h2>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-semibold mb-2">Número de Tarjeta</label>
                <div class="relative">
                  <input v-model="paymentForm.cardNumber" type="text" placeholder="1234 5678 9012 3456" class="input-field pl-12" required />
                  <CreditCardIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Nombre en la Tarjeta</label>
                <input v-model="paymentForm.cardName" type="text" class="input-field" required />
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-2">Fecha de Expiración</label>
                  <input v-model="paymentForm.expiryDate" type="text" placeholder="MM/AA" class="input-field" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2">CVV</label>
                  <input v-model="paymentForm.cvv" type="text" placeholder="123" class="input-field" required />
                </div>
              </div>

              <label class="flex items-center space-x-2 cursor-pointer">
                <input v-model="paymentForm.saveCard" type="checkbox" class="w-4 h-4" />
                <span class="text-sm">Guardar tarjeta para futuras compras</span>
              </label>

              <div class="flex space-x-4 mt-6">
                <button type="button" @click="prevStep" class="flex-1 btn-secondary">
                  Volver
                </button>
                <button type="button" @click="nextStep" class="flex-1 btn-primary">
                  Revisar Pedido
                </button>
              </div>
            </form>
          </div>

          <!-- Step 3: Confirmation -->
          <div v-if="step === 3" class="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h2 class="text-2xl font-bold mb-6">Confirmar Pedido</h2>

            <div class="space-y-6">
              <!-- Shipping Info -->
              <div>
                <h3 class="font-semibold mb-3">Información de Envío</h3>
                <div class="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
                  <p>{{ shippingForm.firstName }} {{ shippingForm.lastName }}</p>
                  <p>{{ shippingForm.email }}</p>
                  <p>{{ shippingForm.phone }}</p>
                  <p>{{ shippingForm.address }}</p>
                  <p>{{ shippingForm.city }}, {{ shippingForm.state }} {{ shippingForm.zipCode }}</p>
                </div>
              </div>

              <!-- Payment Info -->
              <div>
                <h3 class="font-semibold mb-3">Método de Pago</h3>
                <div class="bg-gray-50 p-4 rounded-lg text-sm">
                  <p>Tarjeta terminada en **** {{ paymentForm.cardNumber.slice(-4) }}</p>
                </div>
              </div>

              <div class="flex space-x-4">
                <button type="button" @click="prevStep" class="flex-1 btn-secondary">
                  Volver
                </button>
                <button type="button" @click="processOrder" class="flex-1 btn-primary">
                  Confirmar y Pagar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 class="font-bold mb-4">Resumen de Compra</h3>
            <div class="space-y-3 mb-4">
              <div 
                v-for="item in cartStore.items" 
                :key="item.product.id"
                class="flex justify-between text-sm"
              >
                <span>{{ item.product.name }} x{{ item.quantity }}</span>
                <span class="font-semibold">${{ (item.product.price * item.quantity).toLocaleString('es-MX') }}</span>
              </div>
            </div>
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span class="font-semibold">${{ cartStore.totalPrice.toLocaleString('es-MX') }}</span>
              </div>
              <div class="flex justify-between">
                <span>Envío:</span>
                <span class="font-semibold">GRATIS</span>
              </div>
              <div class="flex justify-between text-xl font-bold pt-2 border-t">
                <span>Total:</span>
                <span>${{ cartStore.totalPrice.toLocaleString('es-MX') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
