import { useEffect } from 'react'
import type { MutableRefObject } from 'react'

export function useOnClickOutside(
  ref: MutableRefObject<unknown>,
  handler: (event: MouseEvent | TouchEvent) => void,
  outsideRefsToIgnore?: MutableRefObject<unknown>[]
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements or clicking an outside ref that should be ignored
        if (
          !ref.current ||
          // @ts-ignore
          ref.current.contains(event.target) ||
          outsideRefsToIgnore
            ?.map(outsideRef => outsideRef.current)
            .includes(event.target)
        ) {
          return
        }
        handler(event)
      }
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler, outsideRefsToIgnore]
  )
}
