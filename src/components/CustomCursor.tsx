import { useEffect, useRef, useState } from 'react';
import '../styles/global.css'; // Ensure styles are loaded

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isCoarsePointer, setIsCoarsePointer] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return;
        }

        const mediaQuery = window.matchMedia('(pointer: coarse)');
        const updatePointerMode = (matches: boolean) => {
            setIsCoarsePointer(matches);
        };

        updatePointerMode(mediaQuery.matches);
        const handler = (event: MediaQueryListEvent) => updatePointerMode(event.matches);

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handler);
        } else {
            // Safari < 14 fallback
            mediaQuery.addListener(handler);
        }

        return () => {
            if (typeof mediaQuery.removeEventListener === 'function') {
                mediaQuery.removeEventListener('change', handler);
            } else {
                mediaQuery.removeListener(handler);
            }
        };
    }, []);

    useEffect(() => {
        if (isCoarsePointer) return;

        const dot = cursorRef.current;
        if (!dot) return;

        const onMouseMove = (e: MouseEvent) => {
            dot.style.top = `${e.clientY}px`;
            dot.style.left = `${e.clientX}px`;
        };

        const onMouseEnter = () => (dot.style.opacity = '1');
        const onMouseLeave = () => (dot.style.opacity = '0');
        const onMouseDown = () => dot.classList.add('cursor--clicked');
        const onMouseUp = () => dot.classList.remove('cursor--clicked');

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseenter', onMouseEnter);
        document.body.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Hover effects
        const hoverables = document.querySelectorAll('a, button, .btn, .nav-btn, .floating-nav-btn');
        const onHoverEnter = () => dot.classList.add('cursor--hover');
        const onHoverLeave = () => dot.classList.remove('cursor--hover');

        hoverables.forEach(el => {
            el.addEventListener('mouseenter', onHoverEnter);
            el.addEventListener('mouseleave', onHoverLeave);
        });

        // MutationObserver to handle dynamically added elements
        const observer = new MutationObserver(() => {
            const newHoverables = document.querySelectorAll('a, button, .btn, .nav-btn, .floating-nav-btn');
            newHoverables.forEach(el => {
                el.removeEventListener('mouseenter', onHoverEnter);
                el.removeEventListener('mouseleave', onHoverLeave);
                el.addEventListener('mouseenter', onHoverEnter);
                el.addEventListener('mouseleave', onHoverLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseenter', onMouseEnter);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);

            hoverables.forEach(el => {
                el.removeEventListener('mouseenter', onHoverEnter);
                el.removeEventListener('mouseleave', onHoverLeave);
            });
            observer.disconnect();
        };
    }, [isCoarsePointer]);

    if (isCoarsePointer) return null;

    return (
        <div id="cursor" ref={cursorRef} style={{ opacity: 0 }}></div>
    );
};
