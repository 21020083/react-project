import { useEffect, useState } from "react"

function useDebound ({value, time = 200}) {
    const [deboundValue,changeValue] = useState(value)

    useEffect(() => {
        let timer = setTimeout(() => {
            changeValue(value)
        }, time)

        return () => {
            clearTimeout(timer)
        }
    }, [value, time])

    return deboundValue
}

export default useDebound