export default function (content) {
  //Strip all tags as well as newlines
  return content.replace(/(<([^>]+)>)/gi, "").replace(/\n/g, "");
}
