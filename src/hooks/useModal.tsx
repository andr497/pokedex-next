"use client";
import { useCallback, useEffect, useState } from 'react';

const useModal = () => {
    const [open, setOpen] = useState<boolean>(false);

    const toggle = useCallback(function() {
        setOpen(prev => !prev);
    }, []);

    useEffect(() => {
        document.body.style.overflowY = open ? "hidden" : "scroll"
    }, [open])

    return {
        open,
        toggle
    }
}

export default useModal;