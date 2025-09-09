import { defineNuxtPlugin } from '#app';

// Define the type for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default defineNuxtPlugin((nuxtApp) => {
  // Access useGtag composable (auto-imported by nuxt-gtag)
  const { gtag } = useGtag();

  // Initialize deferredPrompt with explicit type
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  // Listen for the beforeinstallprompt event (PWA prompt shown)
  window.addEventListener('beforeinstallprompt', (event: Event) => {
    event.preventDefault(); // Prevent the default browser prompt
    deferredPrompt = event as BeforeInstallPromptEvent; // Store the event for later use

    // Track the PWA prompt event in Google Analytics
    gtag('event', 'pwa_prompt_shown', {
      event_category: 'PWA',
      event_label: 'PWA Install Prompt Displayed',
      non_interaction: true,
    });

    // Optional: Show a custom install button
    const installButton = document.querySelector('#install-pwa');
    if (installButton) {
      installButton.removeAttribute('hidden');
      installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
          // Show the browser's install prompt
          await deferredPrompt.prompt();

          // Track the user's choice (accepted or dismissed)
          const { outcome } = await deferredPrompt.userChoice;
          gtag('event', 'pwa_prompt_response', {
            event_category: 'PWA',
            event_label: outcome === 'accepted' ? 'PWA Prompt Accepted' : 'PWA Prompt Dismissed',
            value: outcome === 'accepted' ? 1 : 0,
          });

          // Reset deferredPrompt after use
          deferredPrompt = null;
          installButton.setAttribute('hidden', '');
        }
      });
    }
  });

  // Listen for the appinstalled event (PWA installed)
  window.addEventListener('appinstalled', () => {
    // Track the PWA installed event in Google Analytics
    gtag('event', 'pwa_installed', {
      event_category: 'PWA',
      event_label: 'PWA Installed',
      non_interaction: true,
    });

    // Optional: Hide the install button
    const installButton = document.querySelector('#install-pwa');
    if (installButton) {
      installButton.setAttribute('hidden', '');
    }
  });
});