'use client'

import { defaultCocktail } from "@/components/CocktailPlaceholder";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Cocktail } from "@/lib/types";
import { use, useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton";

const CocktailInstructions = ({ params }: { params: Promise<{ cocktailID: string }> }) => {

    const { cocktailID } = use(params);

    const [cocktail, setCocktail] = useState<Cocktail>(defaultCocktail);

    const [formattedDate, setFormattedDate] = useState<string>(defaultCocktail.createdAt);

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (cocktailID) {
            loadData();
        }
    }, [cocktailID]);

    const loadData = async () => {

        const favorites = localStorage.getItem('favorites');
        if (favorites) {
            const favArray = JSON.parse(favorites) as number[];
            setIsFavorite(favArray.includes(parseInt(cocktailID)));
        }

        const data = await fetch('https://cocktails.solvro.pl/api/v1/cocktails/' + cocktailID);
        const cocktail = await data.json();
        setCocktail(cocktail.data);
        setFormattedDate(formattedDate);
        console.log(cocktail);
    }

    const addToFavorite = async () => {
        setIsFavorite(!isFavorite);

        const favorites = localStorage.getItem('favorites');
        let favArray: number[] = [];
        if (favorites) {
            favArray = JSON.parse(favorites) as number[];
        }

        if (isFavorite) {
            favArray = favArray.filter(id => id !== cocktail.id);
        } else {
            favArray.push(cocktail.id);
        }

        localStorage.setItem('favorites', JSON.stringify(favArray));
    }

    return (
        <main className="mx-auto w-full p-4 flex flex-col items-center justify-center">
            <header className="">
                <h1 className="text-5xl h-16 flex flex-row items-center justify-center w-full gap-5 m-0 p-0  text-center coloredText font-fancy">
                    {cocktail.name}
                    {cocktail.alcoholic ? <>
                        <Separator orientation='vertical' />
                        <HoverCard >
                            <HoverCardTrigger className="font-light" onClick={addToFavorite} >18+</HoverCardTrigger>
                            <HoverCardContent side="bottom" className="w-auto p-2 text-center">
                                This cocktail contains alcohol
                            </HoverCardContent>
                        </HoverCard>
                    </> : ''}
                </h1>
            </header>
            <div className={'w-7/8 flex flex-row justify-evenly mt-8'}>
                <aside className={'flex-3'}>
                    {
                        cocktail.imageUrl ? <img src={cocktail.imageUrl!} alt={cocktail.name} className="mb-4 max-h-96 rounded-md" /> : <Skeleton className="h-[20px] w-[100px] rounded-md" />
                    }

                    <h2 className="text-3xl font-bold mt-5">{cocktail.name}</h2>
                    <p className="mt-2 text-lg">Category: <span className="font-bold"> {cocktail.category ? `${cocktail.category}` : ''} </span></p>
                    <p className="mt-2 text-lg">Glass: <span className="font-bold"> {cocktail.glass ? `${cocktail.glass}` : ''} </span></p>
                    <p className="mt-2 text-lg">Dodano: <span className="font-bold"> {`${new Date(cocktail.createdAt).toLocaleDateString()}`} </span></p>
                    <section className="w-full flex items-center flex-row h-12">
                        <HoverCard>
                            <HoverCardTrigger onClick={addToFavorite} className="hover:scale-110 transition-all text-lg  h-full">{<IoTrashOutline className="text-white h-full w-auto font-light text-lg" />}</HoverCardTrigger>
                            <HoverCardContent side="bottom" className=" p-2 text-center">
                                {isFavorite ? "Remove from hate list" : "Add to hate list"}
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard >
                            <HoverCardTrigger onClick={addToFavorite} className="hover:scale-110 font-lg transition-all ml-4 h-full">{isFavorite ? <MdFavorite className="text-red-500 h-full w-auto font-light font-lg" /> : <MdFavoriteBorder className="text-red-500 font-lg stroke-current font-extralight h-full w-auto" />}</HoverCardTrigger>
                            <HoverCardContent side="bottom" className=" p-2 text-center">
                                {isFavorite ? "Remove from favorites" : "Add to favorites"}
                            </HoverCardContent>
                        </HoverCard>
                    </section>

                </aside>

                <section className={'flex-5 p-3 mt-15 bg-gradient-to-br from-blue-500 to-purple-500 overflow-scroll rounded-lg shadow-md'}>
                    <Accordion type="single"
                        collapsible
                        className="w-full"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger><h2 className="text-2xl hover:cursor-pointer font-bold mb-4">Ingredients:</h2></AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <ul className="list-disc list-inside">
                                    {cocktail.ingredients?.map((ingredient, index) => (
                                        <li className="text-lg" key={index}>{ingredient.name} {ingredient.measure ? `- ${ingredient.measure}` : ''}</li>
                                    ))}</ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single"
                        collapsible
                        className="w-full"
                        defaultChecked
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger><h2 className="text-2xl hover:cursor-pointer font-bold mb-4">Instructions:</h2></AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p className="text-lg">{cocktail.instructions}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

            </div>
        </main>
    );
}

export default CocktailInstructions;