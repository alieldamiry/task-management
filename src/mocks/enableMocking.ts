import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

/**
 * Starts the MSW service worker.
 *
 * The worker is enabled in every environment (development and production) so the
 * app can run against the mocked API without a real backend. When a real API is
 * introduced, guard this call behind an env flag.
 */
export async function enableMocking() {
  const worker = setupWorker(...handlers)
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  })
}
