export function getGoogleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function getAppleMapsUrl(query: string) {
  return `https://maps.apple.com/?q=${encodeURIComponent(query)}`
}

export function getGoogleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

export function hasSpecificMapLocation(value: string) {
  const normalized = value.trim().toLowerCase()

  if (!normalized) {
    return false
  }

  return normalized !== "savannah, georgia" && normalized !== "location to be announced"
}
