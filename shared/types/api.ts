export type ApiResponse<T extends unknown = {}> = {
  code: number
  message: string
  data: T
}

export type CommentData = {
  id: string
  content: string
  authorId: number
  createdAt: string
}

export type UserData = {
  id: number
}

export type ApiResponseComment = ApiResponse<CommentData>
export type ApiResponseUser = ApiResponse<UserData>
