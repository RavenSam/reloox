import { sample } from "lodash"

const avatarsImages = [
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685490/loc/19_aea0he.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685489/loc/20_ytwfda.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685489/loc/18_kcyh1c.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685489/loc/17_um6yck.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685489/loc/16_k9pips.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685488/loc/12_xqgudj.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685488/loc/11_qcker8.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685488/loc/13_dbpeva.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685488/loc/15_j44b4b.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685488/loc/14_zpf50k.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685488/loc/10_hvxuq5.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685488/loc/8_thxnop.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685488/loc/9_ffo8hm.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685487/loc/7_z0xqxb.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685487/loc/5_d5771a.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685487/loc/2_yay0ta.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685487/loc/6_hgtsfp.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685487/loc/4_unbmtb.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685487/loc/1_hmnttl.png",
   "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685487/loc/3_nc7fdl.png",
]

export default () => {
   const avatar = sample(avatarsImages)
   return avatar
}
