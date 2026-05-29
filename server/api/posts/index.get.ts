import type { BlogPost } from '#shared/types/blog'

export default defineEventHandler(async (): Promise<BlogPost[]> => getBlogPosts())
