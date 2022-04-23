import moment from "moment"

export function handleDate(date) {
  return moment(date).format("MMMM Do hh:mm a")
}

export function handleTimestamp(date) {
  return moment(date).valueOf()
}
