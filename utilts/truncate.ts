export default (str = "", length = 25) => {
   var dots = str.length > length ? "..." : ""
   return str.substring(0, length) + dots
}
