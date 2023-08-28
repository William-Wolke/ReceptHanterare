import { useRef } from 'react';

export default function useFocus() {
    const htmlElRef = useRef(null);
    function setFocus() {
        htmlElRef.current && htmlElRef.current.focus();
    }

    return [htmlElRef, setFocus];
}
