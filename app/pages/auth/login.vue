<template lang="pug">
NFlex(class="mx-auto max-w-md px-6 py-16 sm:py-24" vertical size="large")
  NFlex(vertical align="flex-start" size="small")
    NTag(:bordered="false" type="primary") Account
    NH1(class="!text-4xl") Sign in
    NP(depth="3") Access your Field Notes account.
  NAlert(v-if="errorMessage" type="error" :show-icon="false") {{ errorMessage }}
  NCard(size="large")
    NForm(@submit.prevent="submit")
      NFormItem(label="Email")
        NInput(
          v-model:value="form.email"
          :input-props="{ type: 'email' }"
          placeholder="you@example.com"
          autocomplete="email"
        )
      NFormItem(label="Password")
        NInput(
          v-model:value="form.password"
          :input-props="{ type: 'password' }"
          placeholder="Your password"
          autocomplete="current-password"
          show-password-on="click"
        )
      NButton(block type="primary" attr-type="submit" :loading="isSubmitting") Sign in
  NText(depth="3")
    | New here?
    NuxtLink(to="/auth/register")
      NButton(text type="primary" tag="span") Create an account
</template>

<script setup lang="ts">
const userStore = useUserStore()
const form = ref({ email: '', password: '' })
const isSubmitting = ref(false)
const errorMessage = ref('')

if (userStore.isLoggedIn) {
  await navigateTo('/account')
}

async function submit() {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await userStore.login(form.value)
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

  return 'Unable to sign in. Please try again.'
}
</script>
