export default function (number) {
  //Take a ten-digit phone number with no formatting and return it in the format (xxx) xxx-xxxx
  if (number.length === 10) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } else {
    return number;
  }
}
