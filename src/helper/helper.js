import moment from "moment"

export function handleDate(date) {
  return moment(date).format("MMMM Do hh:mm a")
}
