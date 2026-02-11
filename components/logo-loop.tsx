"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Logo {
    node?: ReactNode;
    title?: string;
    href?: string;
    src?: string;
    alt?: string;
}

interface LogoLoopProps {
    logos: Logo[];
    speed?: number;
    direction?: "left" | "right";
    logoHeight?: number;
    gap?: number;
    hoverSpeed?: number;
    scaleOnHover?: boolean;
    fadeOut?: boolean;
    fadeOutColor?: string;
    ariaLabel?: string;
    useCustomRender?: boolean;
}

export default function LogoLoop({
    logos,
    speed = 30, // seconds for one full loop
    direction = "left",
    logoHeight = 40,
    gap = 60,
    hoverSpeed,
    scaleOnHover = false,
    fadeOut = false,
    fadeOutColor = "hsl(var(--background))",
    ariaLabel,
    useCustomRender = false,
}: LogoLoopProps) {
    // Duplicate logos to create the infinite effect
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

    return (
        <div
            className="relative w-full overflow-hidden py-4"
            aria-label={ariaLabel}
        >
            {/* Fade Overlays */}
            {fadeOut && (
                <>
                    <div
                        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                        style={{
                            background: `linear-gradient(to right, ${fadeOutColor}, transparent)`
                        }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                        style={{
                            background: `linear-gradient(to left, ${fadeOutColor}, transparent)`
                        }}
                    />
                </>
            )}

            {/* Animation Container */}
            <div
                className="flex items-center logo-loop-container"
                style={{
                    gap: `${gap}px`,
                    width: 'max-content',
                    animation: `scroll-${direction} ${speed}s linear infinite`,
                }}
            >
                <style jsx>{`
          .logo-loop-container:hover {
            animation-play-state: ${hoverSpeed === 0 ? 'paused' : 'running'};
          }
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>

                {duplicatedLogos.map((logo, index) => {
                    const content = (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center transition-transform duration-300 ${scaleOnHover ? 'hover:scale-110' : ''}`}
                            style={{ height: `${logoHeight}px` }}
                        >
                            {logo.node ? (
                                <div className="text-3xl md:text-4xl text-muted-foreground hover:text-primary transition-colors">
                                    {logo.node}
                                </div>
                            ) : logo.src ? (
                                <div className="relative" style={{ height: `${logoHeight}px`, width: `${logoHeight * 2}px` }}>
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt || ""}
                                        fill
                                        className="object-contain filter grayscale hover:grayscale-0 transition-all"
                                    />
                                </div>
                            ) : null}
                            {logo.title && !useCustomRender && (
                                <span className="text-[10px] mt-2 font-medium text-muted-foreground uppercase tracking-widest hidden md:block">
                                    {logo.title}
                                </span>
                            )}
                        </div>
                    );

                    if (logo.href) {
                        return (
                            <Link key={index} href={logo.href} target="_blank" rel="noopener noreferrer">
                                {content}
                            </Link>
                        );
                    }

                    return content;
                })}
            </div>
        </div>
    );
}
