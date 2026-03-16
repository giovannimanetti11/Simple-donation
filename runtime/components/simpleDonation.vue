<template>
  <div class="max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden simple-donation">
    <div class="md:flex">
      <!-- Main content -->
      <div class="md:w-2/3 p-4 sm:p-6 md:p-8">
        <!-- Step indicators -->
        <div class="flex flex-wrap justify-between mb-6 sm:mb-8">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center mb-2 sm:mb-0 mr-4">
            <button 
              @click="goToStep(index + 1)" 
              :class="[
                'rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-2 transition-colors duration-300',
                currentStep > index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600 hover:bg-accent hover:text-white'
              ]"
            >
              <span class="text-center text-xs sm:text-sm">{{ index + 1 }}</span>
            </button>
            <span 
              @click="goToStep(index + 1)" 
              class="cursor-pointer hover:text-primary transition-colors duration-300 text-sm sm:text-base"
              :class="{ 'font-bold': currentStep === index + 1 }"
            >
              {{ step }}
            </span>
            <div v-if="index < steps.length - 1" class="hidden sm:block h-1 w-8 sm:w-16 bg-gray-200 mx-2"></div>
          </div>
        </div>

        <!-- Step content -->
        <!-- Step 1: Amount selection -->
        <div v-if="currentStep === 1" class="transition-all duration-500 ease-in-out">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 text-black">{{ steps[0] }}</h2>
          <!-- Donation amount selection -->
          <div class="flex flex-wrap gap-2 sm:gap-4 mb-4">
            <button 
              v-for="amount in [5, 10, 20, 50]" 
              :key="amount" 
              @click="setAmount(amount)" 
              :class="[
                'px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors duration-300 text-sm sm:text-base',
                donationAmount === amount ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600 hover:bg-accent hover:text-white'
              ]"
            >
              €{{ amount }}
            </button>
            <div class="w-full mt-2 sm:mt-4">
              <input 
                v-model="customAmount" 
                type="number" 
                min="1"
                :placeholder="t.otherAmount" 
                class="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-colors duration-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                @input="setAmount(Number(customAmount))"
              >
            </div>
          </div>
          <!-- Next button -->
          <div class="flex justify-end items-end mt-4">
            <button 
              @click="nextStep" 
              class="bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-sm sm:text-base"
            >
              {{ t.next }}
            </button>
          </div>
        </div>

        <!-- Step 2: Profile information -->
        <div v-if="currentStep === 2" class="transition-all duration-500 ease-in-out">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 text-black">{{ steps[1] }}</h2>
          <!-- Profile information form -->
          <form @submit.prevent="validateAndProceed" ref="profileForm">
            <div class="mb-4">
              <label for="email" class="block text-gray-700 mb-2 text-sm sm:text-base">{{ t.email }}</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                required 
                class="w-full px-4 py-2 sm:py-3 border rounded-md transition-colors duration-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              >
            </div>
            <div class="mb-4">
              <label for="name" class="block text-gray-700 mb-2 text-sm sm:text-base">{{ t.name }}</label>
              <input 
                type="text" 
                id="name" 
                v-model="name" 
                class="w-full px-4 py-2 sm:py-3 border rounded-md transition-colors duration-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              >
            </div>
            <!-- Navigation buttons -->
            <div class="flex justify-between items-center mt-4 space-x-4">
              <button 
                @click="prevStep" 
                type="button" 
                class="bg-gray-200 text-gray-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-accent hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 text-sm sm:text-base"
              >
                {{ t.back }}
              </button>
              <button 
                type="submit" 
                class="bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-sm sm:text-base"
              >
                {{ t.next }}
              </button>
            </div>
          </form>
        </div>

        <!-- Step 3: Payment -->
        <div v-if="currentStep === 3" class="transition-all duration-500 ease-in-out">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 text-black">{{ steps[2] }}</h2>
          <!-- PayPal Button Container -->
          <div id="paypal-button-container" class="mt-4"></div>
          <!-- Back button -->
          <div class="flex justify-start items-center mt-4">
            <button 
              @click="prevStep" 
              class="bg-gray-200 text-gray-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-accent hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 text-sm sm:text-base"
            >
              {{ t.back }}
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="md:w-1/3 bg-slate-100 p-4 sm:p-6 md:p-8">
        <h3 class="text-lg sm:text-xl font-bold mb-4 text-black">{{ t.donationSummary }}</h3>
        <p class="text-sm sm:text-base">{{ t.amount }}: €{{ donationAmount }}</p>
        <hr class="my-4">
        <h3 class="text-lg sm:text-xl font-bold mb-4 text-black">{{ t.faq }}</h3>
        <div v-for="(faq, index) in sanitizedFaqs" :key="index" class="border-b border-slate-200">
          <button 
            @click="toggleFaq(index)" 
            class="w-full flex justify-between items-center py-3 sm:py-5 text-slate-800 hover:bg-slate-50 transition-colors duration-300"
          >
            <span v-html="faq.question" class="text-left font-medium py-2 text-sm sm:text-base"></span>
          </button>
          <div 
            class="overflow-hidden transition-all duration-500 ease-in-out"
            :style="{ maxHeight: activeFaq === index ? '1000px' : '0', opacity: activeFaq === index ? 1 : 0 }"
          >
            <div class="p-3 text-xs sm:text-sm text-slate-600" v-html="faq.answer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { usePaypal } from '../composables/usePaypal'
import DOMPurify from 'dompurify'
import translations from '../../translations'

// Props definition
const props = defineProps({
  lang: {
    type: String,
    default: 'en',
    validator: (val) => ['en', 'it', 'es', 'fr', 'de'].includes(val)
  },
  faqs: {
    type: Array,
    default: null
  }
})

// Translations
const t = computed(() => translations[props.lang] || translations.en)

// Default FAQs from locale
const defaultFaqs = computed(() => [
  { question: t.value.faqQuestion1, answer: t.value.faqAnswer1 },
  { question: t.value.faqQuestion2, answer: t.value.faqAnswer2 },
  { question: t.value.faqQuestion3, answer: t.value.faqAnswer3 }
])

// Step labels from locale
const steps = computed(() => [t.value.details, t.value.profile, t.value.payment])

// Reactive state
const currentStep = ref(1)
const donationAmount = ref(20)
const customAmount = ref('')
const email = ref('')
const name = ref('')
const activeFaq = ref(null)
const profileForm = ref(null)

// Composables
const { initPaypal, renderPayPalButtons } = usePaypal()

// Computed properties
const sanitizedFaqs = computed(() => {
  const source = props.faqs || defaultFaqs.value
  return source.map(faq => ({
    question: DOMPurify.sanitize(faq.question),
    answer: DOMPurify.sanitize(faq.answer)
  }))
})

// Methods
const validateAndProceed = () => {
  if (profileForm.value.checkValidity()) {
    nextStep()
  } else {
    profileForm.value.reportValidity()
  }
}

const setAmount = (amount) => {
  donationAmount.value = Math.max(1, amount)
  customAmount.value = donationAmount.value
}

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const goToStep = (step) => {
  if (step >= 1 && step <= steps.value.length) {
    if (step === 3 && currentStep.value < 3) {
      validateAndProceed()
    } else {
      currentStep.value = step
    }
  }
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

// Initialize PayPal
const initializePayPal = async () => {
  try {
    await initPaypal()
    renderPayPalButtons(donationAmount.value, 
      (details) => {
        console.log(t.value.transactionCompleted, details)
        alert(t.value.donationSuccessful)
      }, 
      (error) => {
        console.error(t.value.paypalError, error)
        alert(error.message || t.value.paypalError)
      }
    )
  } catch (error) {
    console.error(t.value.paypalError, error)
    alert(t.value.paypalError)
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
.simple-donation {
  background-color: var(--simple-donation-background);
}

.bg-primary {
  background-color: var(--simple-donation-primary);
}

.bg-secondary {
  background-color: var(--simple-donation-secondary);
}

.bg-accent {
  background-color: var(--simple-donation-accent);
}

.text-primary {
  color: var(--simple-donation-primary);
}

.text-secondary {
  color: var(--simple-donation-secondary);
}

.hover\:bg-accent:hover {
  background-color: var(--simple-donation-accent);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--simple-donation-primary);
}

.rounded-full {
  min-width: 2.5rem;
  min-height: 2.5rem;
}

button:focus,
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--simple-donation-accent), 0.5);
}

</style>
