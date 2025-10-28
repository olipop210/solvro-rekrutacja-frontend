'use client'
import './FancyBackground.scss'
import { useEffect, useRef, useState } from "react";

const FancyBackground = () => {

    const [bgSources, setBgSources] = useState<string[]>([]);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const speed = 30;

    useEffect(() => {
        getBgImages()

        let animationFrame: number;

        const container = containerRef.current;
        if (!container) return;
        let offset = 0;

        const animate = () => {
            offset += 0.5;
            container.style.transform = `translateX(${offset}px)`;
            if (offset >= container.scrollWidth / 2) offset = 0;
            animationFrame = requestAnimationFrame(animate);
        };

        //animationFrame = requestAnimationFrame(animate);
        //return () => cancelAnimationFrame(animationFrame);

    }, []);

    const getBgImages = async () => {
        const data = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=1&perPage=30');
        const json = await data.json();

        console.log(json);
        const cocktailImages = json.data.map((cocktail: any) => cocktail.imageUrl);
        console.log(cocktailImages);
        setBgSources(cocktailImages);
    }

    return (
        <div ref={containerRef} className="fancy-background">
            {bgSources.map((src, index) => (
                <img src={src} alt="" />
            ))}
            {bgSources.map((src, index) => (
                <img src={src} alt="" />
            ))}
        </div>
    )
}

export default FancyBackground;