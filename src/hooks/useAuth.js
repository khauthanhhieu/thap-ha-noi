import { useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from "firebase/auth";

export function useAuth() {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  })

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(getAuth(), user =>
      setAuthState({ user, pending: false, isSignedIn: !!user })
    )
    return () => unregisterAuthObserver()
  }, [])

  return authState
}
