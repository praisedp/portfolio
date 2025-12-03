import React, { useRef, useEffect } from 'react';
import '../styles/global.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ href, className = '', children, ...props }) => {
    const btnRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const MAX_ANGLE = 15;
        const SCALE = 1.08;
        const BASE_BLUR = 12;
        const BLUR_K = 0.3;
        const BASE_OPAC = 0.15;
        const OPAC_K = 0.015;
        const OFFSET_K = 0.4;
        const BASE_OFFSET_Y = 0;

        const onMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (-y / (rect.height / 2)) * MAX_ANGLE;
            const rotateY = (x / (rect.width / 2)) * MAX_ANGLE;

            const shadowX = -rotateY * OFFSET_K;
            const shadowY = rotateX * OFFSET_K + BASE_OFFSET_Y;
            const shadowBlur = BASE_BLUR + (Math.abs(rotateX) + Math.abs(rotateY)) * BLUR_K;
            const shadowOp = BASE_OPAC + (Math.abs(rotateX) + Math.abs(rotateY)) * OPAC_K;

            // Assuming white shadow for now as per CSS
            const rgb = '255,255,255';

            btn.classList.add('btn--active');
            btn.style.transform = `scale(${SCALE}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            btn.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(${rgb}, ${shadowOp})`;
        };

        const onMouseLeave = () => {
            btn.classList.remove('btn--active');
            btn.style.transform = 'none';
            btn.style.boxShadow = '';
        };

        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);

        return () => {
            btn.removeEventListener('mousemove', onMouseMove);
            btn.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    const combinedClassName = `btn ${className}`;

    if (href) {
        return (
            <a
                ref={btnRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={combinedClassName}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={btnRef as React.RefObject<HTMLButtonElement>}
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    );
};
