import User from './User'

export default interface Link {
  id: number,
  url: string,
  description?: string,
  author: User,
  authorId: number,
  createdAt: string
}
