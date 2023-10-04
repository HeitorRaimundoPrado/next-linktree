import Link from './Link'

export default interface User {
  id: number,
  email: string
  username: string
  passwordHash?: string
  links: Link[]
  desc?: string
}
