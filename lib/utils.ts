export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("fr", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
