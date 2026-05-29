<template lang="pug">
NFlex(class="mx-auto max-w-md px-6 py-16 sm:py-24" vertical size="large")
  NFlex(vertical align="flex-start" size="small")
    NTag(:bordered="false" type="primary") Account
    NH1(class="!text-4xl") Create account
    NP(depth="3") Save your identity for future Field Notes features.
  NAlert(v-if="errorMessage" type="error" :show-icon="false") {{ errorMessage }}
  NCard(size="large")
    NForm(@submit.prevent="submit")
      NFormItem(label="Name")
        NInput(
          v-model:value="form.name"
          :input-props="{ autocomplete: 'name' }"
          placeholder="Your name"
        )
      NFormItem(label="Email")
        NInput(
          v-model:value="form.email"
          :input-props="{ type: 'email', autocomplete: 'email' }"
          placeholder="you@example.com"
        )
      NFormItem(label="Password")
        NInput(
          v-model:value="form.password"
          type="password"
          placeholder="At least 8 characters"
          :input-props="{ autocomplete: 'new-password' }"
          show-password-on="click"
        )
      NButton(block type="primary" attr-type="submit" :loading="isSubmitting") Create account
  NText(depth="3")
    | Already have an account?
    NuxtLink(to="/auth/login")
      NButton(text type="primary" tag="span") Sign in
</template>

<script setup lang="ts">
const userStore = useUserStore()
const form = reactive({ name: '', email: '', password: '' })
const isSubmitting = ref(false)
const errorMessage = ref('')

if (userStore.isLoggedIn) {
  await navigateTo('/account')
}

async function submit() {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await userStore.register(form)
    await navigateTo('/account')
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    isSubmitting.value = false
  }
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error && 'message' in error) {
    return String(error.message)
  }

  return 'Unable to create the account. Please try again.'
}
</script>
