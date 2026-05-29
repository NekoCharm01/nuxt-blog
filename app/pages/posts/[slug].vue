<template lang="pug">
NFlex(v-if="post" class="mx-auto max-w-6xl px-6 py-16 sm:py-24" vertical align="flex-start" size="large")
  NButton(text type="primary" @click="navigateTo('/posts')") Back to posts
  NTag(:bordered="false" type="primary") {{ post.category }}
  NH1(class="!text-4xl sm:!text-5xl") {{ post.title }}
  NFlex
    NText(depth="3") {{ post.date }}
    NText(depth="3") {{ post.readingTime }}
  NFlex(vertical size="large")
    NP(v-for="paragraph in post.content" :key="paragraph" class="!text-lg !leading-8") {{ paragraph }}
</template>

<script setup lang="ts">
const route = useRoute()
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`)

useSeoMeta({
  title: () => post.value?.title ?? 'Post not found',
  description: () => post.value?.excerpt ?? '',
})
</script>
