import { useRef, useEffect } from 'react';

export function useInterval(cb, delay) {
    const savedCb = useRef()

    useEffect(() => {
        savedCb.current = cb;
    }, [cb]);

    useEffect(() => {
        function tick(){
            savedCb.current?.()
        }

        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id);
        } else {
            return () => {}
        }
    }, [delay])
}

