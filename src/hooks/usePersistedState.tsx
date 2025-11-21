import { useEffect, useState } from 'react'

type Props = {
    key: string
    defaultValue: unknown
}

const usePersistedState = ({ key, defaultValue }: Props) => {
    const [state, setState] = useState(() => {
        const storedState = localStorage.getItem(key)
        return storedState !== null ? JSON.parse(storedState) : defaultValue
    })

    useEffect(() => {
        if (state !== undefined && state !== null) {
            localStorage.setItem(key, JSON.stringify(state))
        } else {
            localStorage.removeItem(key)
        }
    }, [key, state])

    return [state, setState]
}

export default usePersistedState
