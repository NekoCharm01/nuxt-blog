import type { FunctionalComponent } from 'vue'
import { NuxtLink } from '#components'

type ExternalLinkProps = {
  href: string
  noIcon?: boolean
}

const ExternalLink: FunctionalComponent<ExternalLinkProps> = (props, ctx) => {
  return (
    <NuxtLink class="external-link" to={props.href} target="_blank" rel="noopener nofollow">
      {ctx.slots.default?.()}
      {!props.noIcon && (
        <span class="i-fa-solid-external-link-alt inline-block vertical-middle ms-1" />
      )}
    </NuxtLink>
  )
}

ExternalLink.props = {
  href: {
    type: String,
    required: true,
  },
  noIcon: {
    type: Boolean,
    default: false,
  },
}

export default ExternalLink
