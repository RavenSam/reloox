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
