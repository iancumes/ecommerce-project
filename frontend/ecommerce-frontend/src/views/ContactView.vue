<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon 
} from '@heroicons/vue/24/outline'

const toast = useToast()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  toast.success('Mensaje enviado. Te contactaremos pronto.')
  form.value = { name: '', email: '', subject: '', message: '' }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Contáctanos</h1>
        <p class="text-xl text-gray-600">Estamos aquí para ayudarte</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Contact Info -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <EnvelopeIcon class="w-8 h-8 mb-3" />
            <h3 class="font-bold mb-2">Email</h3>
            <p class="text-gray-600">info@techcomputers.com</p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <PhoneIcon class="w-8 h-8 mb-3" />
            <h3 class="font-bold mb-2">Teléfono</h3>
            <p class="text-gray-600">+52 55 1234 5678</p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <MapPinIcon class="w-8 h-8 mb-3" />
            <h3 class="font-bold mb-2">Ubicación</h3>
            <p class="text-gray-600">Ciudad de México, México</p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <ChatBubbleLeftRightIcon class="w-8 h-8 mb-3" />
            <h3 class="font-bold mb-2">Horario</h3>
            <p class="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
            <p class="text-gray-600">Sáb: 10:00 - 14:00</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold mb-2">Nombre</label>
                  <input v-model="form.name" type="text" class="input-field" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2">Email</label>
                  <input v-model="form.email" type="email" class="input-field" required />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Asunto</label>
                <input v-model="form.subject" type="text" class="input-field" required />
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Mensaje</label>
                <textarea 
                  v-model="form.message" 
                  rows="6" 
                  class="input-field resize-none" 
                  required
                ></textarea>
              </div>

              <button type="submit" class="w-full btn-primary">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
