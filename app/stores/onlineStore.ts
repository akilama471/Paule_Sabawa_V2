import { useState} from '#app'
import { onMounted, onUnmounted } from 'vue'

export function useOnline() {
  // Initialize state with navigator.onLine, default to true for SSR
  const isOnline = useState('online-status', () => typeof navigator !== 'undefined' ? navigator.onLine : true)

  // Function to update online status
  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine
    console.log('Online status changed:', isOnline.value)
  }

  // Client-side lifecycle hooks
  onMounted(() => {
    // Only run on client-side
    if (process.client) {
      updateOnlineStatus() // Update on app load
      window.addEventListener('online', updateOnlineStatus)
      window.addEventListener('offline', updateOnlineStatus)
    }
  })

  onUnmounted(() => {
    // Only run on client-side
    if (process.client) {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  })

  return { isOnline }
}