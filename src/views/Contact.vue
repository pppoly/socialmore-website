<template>
  <section class="section contact-page">
    <div class="container contact-grid">
      <div class="contact-info card">
        <p class="eyebrow">Reach us</p>
        <h1 class="section-title">{{ t('contact.title') }}</h1>
        <p>{{ t('contact.intro') }}</p>
        <div class="info-block">
          <p><strong>{{ contactInfo.company }}</strong></p>
          <p>{{ contactInfo.location }}</p>
          <p>{{ contactInfo.email }}</p>
          <p>{{ contactInfo.encouragement }}</p>
        </div>
      </div>
      <form class="card contact-form" @submit.prevent="submitForm">
        <label>
          {{ t('contact.form.name') }}
          <input type="text" v-model="form.name" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </label>
        <label>
          {{ t('contact.form.email') }}
          <input type="email" v-model="form.email" />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </label>
        <label>
          {{ t('contact.form.organization') }}
          <input type="text" v-model="form.organization" />
        </label>
        <label>
          {{ t('contact.form.inquiryType') }}
          <select v-model="form.inquiryType">
            <option v-for="option in inquiryOptions" :key="option">{{ option }}</option>
          </select>
        </label>
        <label>
          {{ t('contact.form.message') }}
          <textarea rows="5" v-model="form.message"></textarea>
          <span v-if="errors.message" class="error">{{ errors.message }}</span>
        </label>
        <button type="submit" class="btn btn-primary">{{ t('contact.form.submit') }}</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t, dictionary, currentLocale } = useI18n();
const contact = computed(() => dictionary.value.contact);
const contactInfo = computed(() => contact.value.info);
const inquiryOptions = computed(() => contact.value.inquiryOptions);

const form = reactive({
  name: '',
  email: '',
  organization: '',
  inquiryType: inquiryOptions.value[0],
  message: ''
});

const errors = reactive({ name: '', email: '', message: '' });
const successMessage = ref('');

watch(inquiryOptions, (options) => {
  if (!options.includes(form.inquiryType)) {
    form.inquiryType = options[0];
  }
});

const submitForm = () => {
  const isJa = currentLocale.value === 'ja';
  errors.name = form.name ? '' : isJa ? '必須項目です' : 'Required field';
  errors.email = validateEmail(form.email)
    ? ''
    : isJa
      ? '正しいメールアドレスを入力してください'
      : 'Please enter a valid email';
  errors.message = form.message ? '' : isJa ? '必須項目です' : 'Required field';

  if (!errors.name && !errors.email && !errors.message) {
    successMessage.value = contact.value.form.success;
    form.name = '';
    form.email = '';
    form.organization = '';
    form.inquiryType = inquiryOptions.value[0];
    form.message = '';
  }
};

const validateEmail = (value) => /.+@.+\..+/.test(value);
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.contact-info {
  background: linear-gradient(135deg, rgba(15, 138, 215, 0.1), rgba(246, 195, 67, 0.25));
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 600;
}

input,
textarea,
select {
  border-radius: 16px;
  border: 1px solid rgba(15, 138, 215, 0.2);
  padding: 0.85rem 1rem;
  font-size: 1rem;
  font-family: inherit;
}

textarea {
  resize: vertical;
}

.error {
  color: #d9534f;
  font-size: 0.85rem;
}

.success {
  color: #1fa57a;
  font-weight: 600;
}
</style>
