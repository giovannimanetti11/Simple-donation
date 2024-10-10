<template>
  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="md:flex">
      <!-- Main content -->
      <div class="md:w-2/3 p-8">
        <!-- Step indicators -->
        <div class="flex mb-8">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center">
            <button 
              @click="goToStep(index + 1)" 
              :class="[
                'rounded-full w-10 h-10 flex items-center justify-center mr-2 transition-colors duration-300',
                currentStep > index ? 'bg-blu text-white' : 'bg-gray-200 text-gray-600 hover:bg-celeste hover:text-white'
              ]"
            >
              <span class="text-center">{{ index + 1 }}</span>
            </button>
            <span 
              @click="goToStep(index + 1)" 
              class="cursor-pointer hover:text-blu transition-colors duration-300"
              :class="{ 'font-bold': currentStep === index + 1 }"
            >
              {{ step }}
            </span>
            <div v-if="index < steps.length - 1" class="h-1 w-16 bg-gray-200 mx-2"></div>
          </div>
        </div>

        <!-- Step content -->
        <!-- Step 1: Amount selection -->
        <div v-if="currentStep === 1" class="transition-all duration-500 ease-in-out">
          <h2 class="text-2xl font-bold mb-4">{{ steps[0] }}</h2>
          <!-- Donation amount selection -->
          <div class="flex flex-wrap gap-4 mb-4">
            <button 
              v-for="amount in [5, 10, 20, 50]" 
              :key="amount" 
              @click="setAmount(amount)" 
              :class="[
                'px-6 py-3 rounded-full transition-colors duration-300',
                donationAmount === amount ? 'bg-blu text-white' : 'bg-gray-200 text-gray-600 hover:bg-celeste hover:text-white'
              ]"
            >
              €{{ amount }}
            </button>
            <div class="w-full mt-4">
              <input 
                v-model="customAmount" 
                type="number" 
                placeholder="Other amount" 
                class="w-full px-6 py-3 rounded-full border transition-colors duration-300 focus:ring-2 focus:ring-blu focus:border-transparent"
                @input="setAmount(Number(customAmount))"
              >
            </div>
          </div>
          <!-- Next button -->
          <div class="flex justify-end items-end mt-4">
            <button 
              @click="nextStep" 
              class="bg-blu text-white px-8 py-3 rounded-full hover:bg-celeste transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blu"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Step 2: Profile information -->
        <div v-if="currentStep === 2" class="transition-all duration-500 ease-in-out">
          <h2 class="text-2xl font-bold mb-4">{{ steps[1] }}</h2>
          <!-- Profile information form -->
          <form @submit.prevent="nextStep">
            <div class="mb-4">
              <label for="email" class="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                required 
                class="w-full px-4 py-3 border rounded-md transition-colors duration-300 focus:ring-2 focus:ring-blu focus:border-transparent"
              >
            </div>
            <div class="mb-4">
              <label for="name" class="block text-gray-700 mb-2">Name (optional)</label>
              <input 
                type="text" 
                id="name" 
                v-model="name" 
                class="w-full px-4 py-3 border rounded-md transition-colors duration-300 focus:ring-2 focus:ring-blu focus:border-transparent"
              >
            </div>
            <!-- Navigation buttons -->
            <div class="flex justify-end items-end mt-4 space-x-4">
              <button 
                @click="prevStep" 
                type="button" 
                class="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Back
              </button>
              <button 
                type="submit" 
                class="bg-blu text-white px-8 py-3 rounded-full hover:bg-celeste transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blu"
              >
                Next
              </button>
            </div>
          </form>
        </div>

        <!-- Step 3: Payment -->
        <div v-if="currentStep === 3" class="transition-all duration-500 ease-in-out">
          <h2 class="text-2xl font-bold mb-4">{{ steps[2] }}</h2>
          <!-- PayPal Button Container -->
          <div id="paypal-button-container" class="mt-4"></div>
          <!-- Back button -->
          <div class="flex justify-start items-center mt-4 space-x-4">
            <button 
              @click="prevStep" 
              class="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="md:w-1/3 bg-slate-100 p-8">
        <h3 class="text-xl font-bold mb-4">Donation summary</h3>
        <p>Amount: €{{ donationAmount }}</p>
        <hr class="my-4">
        <h3 class="text-xl font-bold mb-4">FAQ</h3>
        <div v-for="(faq, index) in sanitizedFaqs" :key="index" class="border-b border-slate-200">
          <button 
            @click="toggleFaq(index)" 
            class="w-full flex justify-between items-center py-5 text-slate-800 hover:bg-slate-50 transition-colors duration-300"
          >
            <span v-html="faq.question" class="text-left font-medium py-2"></span>
            <span :id="`icon-${index}`" class="text-zinc-400 flex-shrink-0 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
          </button>
          <div :id="`content-${index}`" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div class="p-3 text-sm text-slate-600" v-html="faq.answer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { usePaypal } from '../composables/usePaypal'
import DOMPurify from 'dompurify'

// Props definition
const props = defineProps({
  faqs: {
    type: Array,
    default: () => ([
      {
        question: 'How are donations used?',
        answer: 'Donations are used to support the development and maintenance of our project.'
      },
      {
        question: 'Is this system secure?',
        answer: 'Yes, all transactions use systems with high levels of security.',
      },
      {
        question: 'Can I make a recurring donation?',
        answer: 'Currently, we only support one-time donations, but we are working on implementing recurring donations in the future.',
      }
    ])
  }
})

// Reactive state
const steps = ['Details', 'Profile', 'Payment']
const currentStep = ref(1)
const donationAmount = ref(20) // Default donation amount set to 20 EUR
const customAmount = ref('')
const email = ref('')
const name = ref('')
const activeFaq = ref(null)

// Composables
const { initPaypal, renderPayPalButtons } = usePaypal()

// Computed properties
const sanitizedFaqs = computed(() => {
  return props.faqs.map(faq => ({
    question: DOMPurify.sanitize(faq.question),
    answer: DOMPurify.sanitize(faq.answer)
  }))
})

// Methods
const setAmount = (amount) => {
  donationAmount.value = amount
  customAmount.value = amount !== customAmount.value ? amount : customAmount.value
}

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const goToStep = (step) => {
  if (step >= 1 && step <= steps.length) {
    currentStep.value = step
  }
}

const toggleFaq = (index) => {
  const content = document.getElementById(`content-${index}`);
  const icon = document.getElementById(`icon-${index}`);

  // SVG for Minus icon
  const minusSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
    </svg>
  `;

  // SVG for Plus icon
  const plusSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  `;

  // Toggle the content's max-height for smooth opening and closing
  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0';
    icon.innerHTML = plusSVG;
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.innerHTML = minusSVG;
  }

  activeFaq.value = activeFaq.value === index ? null : index;
}

// Lifecycle hooks
onMounted(() => {
  // Accordions closed by default
  sanitizedFaqs.value.forEach((_, index) => {
    const content = document.getElementById(`content-${index}`);
    if (content) {
      content.style.maxHeight = '0';
    }
  });

  if (currentStep.value === 3) {
    initializePayPal()
  }
})

// Initialize PayPal
const initializePayPal = async () => {
  try {
    await initPaypal()
    renderPayPalButtons(donationAmount.value, 
      (details) => {
        console.log('Donation successful:', details)
        alert('Thank you for your donation!')
      }, 
      (error) => {
        console.error('Error during donation:', error)
        let errorMessage = 'An error occurred during the donation process. '
        if (error.message) {
          errorMessage += `Details: ${error.message}`
        }
        alert(errorMessage + ' Please try again or contact support.')
      }
    )
  } catch (error) {
    console.error('Error initializing PayPal:', error)
    alert('An error occurred while initializing PayPal. Please reload the page and try again.')
  }
}

// Lifecycle hooks
onMounted(() => {
  if (currentStep.value === 3) {
    initializePayPal()
  }
})

// Watchers
watch(currentStep, (newStep) => {
  if (newStep === 3) {
    initializePayPal()
  }
})

watch(donationAmount, () => {
  if (currentStep.value === 3) {
    initializePayPal()
  }
})
</script>

<style scoped>
.rounded-full {
  min-width: 2.5rem;
  min-height: 2.5rem;
}

button:focus,
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.border-blu {
  border-color: #3B82F6;
}
</style>