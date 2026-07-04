<template>
  <section class="section contact-page">
    <div class="container contact-grid">
      <div class="contact-info card">
        <!-- icon-contact.svg: コンタクトカード右上に浮かせる信封アイコン。 -->
        <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
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
        </label>
        <label>
          <span class="label-row">
            <span>{{ t('contact.form.email') }}</span>
            <span class="field-badge">必須</span>
          </span>
          <input type="email" v-model="form.email" required />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </label>
        <label>
          {{ t('contact.form.phone') }}
          <input type="tel" v-model="form.phone" />
        </label>
        <label>
          {{ t('contact.form.organization') }}
          <input type="text" v-model="form.organization" />
        </label>
        <label>
          {{ t('contact.form.inquiryType') }}
          <select v-model="form.inquiryType">
            <option v-for="option in inquiryOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <span v-if="inquiryTypeHelpLines.length" class="field-help">
            <span v-for="line in inquiryTypeHelpLines" :key="line">{{ line }}</span>
          </span>
        </label>
        <label>
          <span class="label-row">
            <span>{{ t('contact.form.message') }}</span>
            <span class="field-badge">必須</span>
          </span>
          <textarea rows="5" v-model="form.message" required></textarea>
          <span v-if="errors.message" class="error">{{ errors.message }}</span>
        </label>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? submittingText : t('contact.form.submit') }}
        </button>
        <p v-if="submitError" class="error">{{ submitError }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '../composables/useI18n';
import { submitContactInquiry } from '../services/contactRepository';

const { t, dictionary, currentLocale } = useI18n();
const route = useRoute();
const contact = computed(() => dictionary.value.contact);
const contactInfo = computed(() => contact.value.info);
const inquiryOptions = computed(() =>
  contact.value.inquiryOptions.map((option) =>
    typeof option === 'string'
      ? { value: option, label: option }
      : option
  )
);
const validationMessages = computed(() => contact.value.form.validation);
const submittingText = computed(() => (currentLocale.value === 'ja' ? '送信中...' : 'Sending...'));
const toLines = (value, fallback) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value || fallback ? [value || fallback] : [];
};
const inquiryTypeHelpLines = computed(() =>
  toLines(contact.value.form.inquiryTypeHelpLines, contact.value.form.inquiryTypeHelp)
);
const queryInquiryType = computed(() => {
  const type = route.query.type;
  return Array.isArray(type) ? type[0] || '' : type || '';
});
const defaultInquiryType = computed(() => inquiryOptions.value[0]?.value ?? '');

const form = reactive({
  name: '',
  email: '',
  phone: '',
  organization: '',
  inquiryType: defaultInquiryType.value,
  message: ''
});

const errors = reactive({ email: '', message: '' });
const successMessage = ref('');
const submitError = ref('');
const isSubmitting = ref(false);
const selectedInquiryOption = computed(() =>
  inquiryOptions.value.find((option) => option.value === form.inquiryType)
);

watch([inquiryOptions, queryInquiryType], ([options, queryType]) => {
  if (!options.length) {
    form.inquiryType = '';
    return;
  }

  if (queryType && options.some((option) => option.value === queryType)) {
    form.inquiryType = queryType;
    return;
  }

  if (!options.some((option) => option.value === form.inquiryType)) {
    form.inquiryType = options[0].value;
  }
}, { immediate: true });

const submitForm = async () => {
  const validation = validationMessages.value;
  successMessage.value = '';
  submitError.value = '';
  errors.email = validateEmail(form.email) ? '' : validation.email;
  errors.message = form.message ? '' : validation.required;

  if (!errors.email && !errors.message) {
    isSubmitting.value = true;
    try {
      const inquiryOption = selectedInquiryOption.value;
      await submitContactInquiry({
        ...form,
        inquiryType: inquiryOption?.label ?? form.inquiryType,
        inquiryTypeKey: form.inquiryType
      });
      successMessage.value = contact.value.form.success;
      form.name = '';
      form.email = '';
      form.phone = '';
      form.organization = '';
      form.inquiryType = defaultInquiryType.value;
      form.message = '';
    } catch (error) {
      submitError.value = currentLocale.value === 'ja'
        ? '送信できませんでした。時間をおいて再度お試しください。'
        : 'Could not send your message. Please try again later.';
    } finally {
      isSubmitting.value = false;
    }
  }
};

const validateEmail = (value) => /.+@.+\..+/.test(value);
</script>

<style scoped>
.contact-page {
  background-image: linear-gradient(180deg, rgba(11, 28, 46, 0.85), rgba(15, 138, 215, 0.2)),
    url('../assets/backgrounds/bg-section-dark.svg');
  background-size: cover;
  background-repeat: no-repeat;
  /* bg-section-dark.svg: 夜景＋星点のテクスチャ。 */
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.contact-info {
  position: relative;
  background-image: linear-gradient(135deg, rgba(15, 138, 215, 0.12), rgba(246, 195, 67, 0.3)),
    url('../assets/icons/icon-contact.svg');
  background-repeat: no-repeat;
  background-size: cover, 180px;
  background-position: center, calc(100% - 24px) 24px;
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

.label-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.field-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
  padding: 0 0.5rem;
  border-radius: 999px;
  background: rgba(15, 138, 215, 0.1);
  color: #1a5fa8;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.field-help {
  display: grid;
  gap: 0.1rem;
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.6;
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

button[disabled] {
  cursor: progress;
  opacity: 0.72;
}
</style>
