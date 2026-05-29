<template lang="pug">
NFlex(class="mx-auto max-w-4xl px-6 py-16 sm:py-24" vertical align="flex-start" size="large")
  NTag(:bordered="false" type="primary") Contact
  NH1(class="!text-4xl")
    | Have a story, question, or collaboration in mind?
  NP(class="!text-lg !leading-8")
    | Send a note and tell us what you are working on. The contact area can later become a form,
    | newsletter signup, or booking link.
  NCard(size="large")
    NDescriptions(:column="1" label-placement="top")
      NDescriptionsItem(label="Email")
        ExternalLink(href="mailto:hello@example.com") hello@example.com
</template>
