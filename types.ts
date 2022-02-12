import { IconType } from "react-icons"

export type linkType = {
   name: string
   href: string
   icon?: IconType
}

export type logInputsType = {
   name: string
   label: string
   type: string
   placeholder?: string
   inputType?: string
}

export interface ArticleTypes {
   id: number
   authorId: number
   slug: string
   title: string
   content: string
   description: string
   thumbnail?: string
   createdAt: Date
   updatedAt: Date
}

export interface ArticlesTypes {
   id: number
   title: string
   slug: string
   createdAt: Date
   description: string
   authorId: number
   categories: any[]
}
