"use client"

import { useEffect } from "react"

import { app } from "@/lib/firebase"

export function FirebaseAnalytics() {
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

    if (!measurementId) {
      return
    }

    let isMounted = true

    async function enableAnalytics() {
      const { isSupported, getAnalytics } = await import("firebase/analytics")

      const supported = await isSupported()

      if (!supported || !isMounted) {
        return
      }

      getAnalytics(app)
    }

    void enableAnalytics()

    return () => {
      isMounted = false
    }
  }, [])

  return null
}
