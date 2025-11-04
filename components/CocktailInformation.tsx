'use client'

import { Cocktail } from "@/lib/types"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useEffect, useState } from "react"
import useFavorites from "./hooks/useFavorites"


const CocktailInformation = ({ cocktail, drawerOpen, setDrawerOpen }: { cocktail: Cocktail, drawerOpen: boolean, setDrawerOpen: (open: boolean) => void }) => {

    const { favorites, addToFavorite } = useFavorites();

    return (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerContent>
                <div className="mx-auto w-full">
                    <DrawerHeader>
                        <DrawerTitle className={'text-3xl flex justify-center gap-3'}>
                            {cocktail.name}
                            <HoverCard >
                                <HoverCardTrigger onClick={() => addToFavorite(cocktail.id)} className="">{favorites.includes(cocktail.id) ?
                                    <MdFavorite className="text-red-500 hover:scale-110 w-10 h-10 font-light font-lg  " /> :
                                    <MdFavoriteBorder className="text-red-500 hover:scale-110 font-lg w-10 h-10 stroke-current font-extralight " />}
                                </HoverCardTrigger>
                                <HoverCardContent side="bottom" className=" p-2 text-center">
                                    {favorites.includes(cocktail.id) ? "Remove from favorites" : "Add to favorites"}
                                </HoverCardContent>
                            </HoverCard>
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0 flex w-full flex-col overflow-scroll md:flex-row lg:flex-row sm:flex-row justify-evenly items-center mb-50">
                        <img src={cocktail.imageUrl!} alt={cocktail.name} className="mb-4 lg:max-h-80 md:max-h-70 sm:max-h-60 max-h-50 rounded-md" />
                        <div className={'h-full flex flex-col justify-between ml-6 items-center'}>
                            <header>
                                <h2 className="mb-2 text-lg font-semibold text-center w-1/2">Ingredients:</h2>
                            </header>
                            <section>
                                <ul className="list-disc list-inside mb-4">
                                    {cocktail.ingredients?.map((ingredient, index) => (
                                        <li key={index}>{ingredient.name}</li>
                                    ))}
                                </ul>
                            </section>
                            <Separator className="my-4" />
                            <section>
                                <Link className={'mr-4'} href={`/instructions/${cocktail.id}`}>
                                    <Button>Recipe and more information</Button>
                                </Link>
                                <DrawerClose asChild>
                                    <Button variant="outline">Close</Button>
                                </DrawerClose>
                            </section>
                        </div>
                    </div>
                    <DrawerFooter >

                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default CocktailInformation;