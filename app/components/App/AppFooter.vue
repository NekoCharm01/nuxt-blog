<template lang="pug">
NLayoutFooter(bordered)
  NFlex(class='mx-auto max-w-screen-2xl px-6 py-8' justify='space-between' align='center' :wrap='true' :size='12')
    NText(depth='3') &copy; 2026 Field Notes. Essays, updates, and practical guides.
    NuxtLink(to='/contact')
      NButton(text tag='span') Work with us
</template>
