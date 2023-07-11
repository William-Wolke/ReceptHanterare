import { useRef } from 'react';

export default function useFocus() {
    const htmlElRef = useRef(null);
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
}
