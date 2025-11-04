'use client'

import Appbar from "@/components/ui/appbar/appbar";
import { Cocktail } from "@/lib/types";
import { useEffect, useState } from "react";
import '../browse/browse.scss'
import { defaultCocktail } from "@/components/CocktailPlaceholder";
import CocktailInformation from "../../components/CocktailInformation";
import useFavorites from "@/components/hooks/useFavorites";

const Favorites = () => {

    const [favorites, setFavorites] = useState<Cocktail[]>([]);

    const { favorites: favoriteIDs } = useFavorites();

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [selectedCocktail, setSelectedCocktail] = useState<Cocktail>(defaultCocktail);

    useEffect(() => {
        document.title = "Favorite Cocktails - Solvro Cocktails";
    }, [])

    useEffect(() => {
        loadData()
    }, [favoriteIDs])

    const loadData = async () => {
        let queries = '';
        favoriteIDs.forEach((id) => {
            queries += `&id[]=${id}`;
        });
        const data = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails?ingredients=true${queries}`);
        const json = await data.json();
        console.log(json);
        setFavorites(json.data);
    }

    return (
        <main className="browse-page">
            <Appbar />
            <article>
                <header>
                    <h1 className="ml-2 lg:ml-5 text-3xl md:text-4xl leading-12 lg:text-5xl ">Favorite Cocktails</h1>
                </header>
                <section>
                    {favorites.length > 0 ? (
                        <ul className="cocktails-grid w-80 sm:w-9/10 md:w-9/10 lg:w-8/10">
                            {favorites.map((cocktail: Cocktail) => (
                                <li key={cocktail.id} onClick={() => {
                                    setDrawerOpen(true)
                                    setSelectedCocktail(cocktail)
                                }} className='cocktail-card'>

                                    <img src={cocktail.imageUrl!} alt={cocktail.name} />
                                    <h3>{cocktail.name}</h3>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorite cocktails found.</p>
                    )}
                </section>
            </article>
            <CocktailInformation cocktail={selectedCocktail!} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </main >
    )
}

export default Favorites;