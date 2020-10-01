import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Response = [any, Dispatch<SetStateAction<any>>]

function usePersistedState(key: string, initialState: any): Response {
	const [state, setState] = useState(() => {
		const storageValue = localStorage.getItem(key)
		if (storageValue) {
			return JSON.parse(storageValue)
		} else {
			return initialState
		}
	})

	const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(state) : value;
      // Save state
      setState(valueToStore);
      // Save to local storage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

	// useEffect(() => {
	// 	localStorage.setItem(key, JSON.stringify(state))
	// }, [key, state])

	return [state, setValue]
}

export default usePersistedState
