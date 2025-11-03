'use client';
import Appbar from '@/components/ui/appbar/appbar';
import './browse.scss';

import { Cocktail } from '@/lib/types';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger, } from "@/components/ui/sheet"
import { toast } from 'sonner';
import MyPagination from '@/components/ui/Pagination/MyPagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CocktailInformation from '../../components/CocktailInformation';
import { defaultCocktail } from '@/components/CocktailPlaceholder';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import Filters from './filters';

const Browse = () => {

    const [cocktails, setCocktails] = useState<Cocktail[]>([]);

    const [totalPages, setTotalPages] = useState<number>(1);

    const [page, setPageNumber] = useState<number>(1);

    const [perPage, setPerPage] = useState<number>(30);

    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [selectedGlasses, setSelectedGlasses] = useState<string[]>([]);

    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    const [softDrinksOnly, setSoftDrinksOnly] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const [sortOrder, setSortOrder] = useState<string>('');

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [selectedCocktail, setSelectedCocktail] = useState<Cocktail>(defaultCocktail);

    const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

    const [favorites, setFavorites] = useState<number[]>([]);

    const setPage = (number: number) => {
        setPageNumber(number);
        loadCocktails();
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        document.title = "Browse Cocktails - Solvro Cocktails";
        loadFavorites();
        loadCocktails();
    }, []);

    useEffect(() => {
        loadCocktails(true);
    }, [sortOrder, page])

    const loadCocktails = async (hideConfirmation = false) => {
        let categoriesQuery = '';
        if (selectedCategories.length > 0) {
            selectedCategories.forEach((category, index) => {
                categoriesQuery += `&category=${encodeURIComponent(category)}`;
            }
            )
        }

        if (selectedGlasses.length > 0) {
            selectedGlasses.forEach((glass, index) => {
                categoriesQuery += `&glass=${encodeURIComponent(glass)}`;
            }
            )
        }

        if (softDrinksOnly) {
            categoriesQuery += `&alcoholic=false`;
        }

        if (searchTerm.length > 0) {
            categoriesQuery += `&name=${encodeURIComponent(`%${searchTerm.toLowerCase()}%`)}`;
            setFirstLoad(true);
        }

        const data = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails?page=${page}&perPage=${perPage}${categoriesQuery}&sort=${sortOrder}&ingredients=true`);
        const json = await data.json();
        console.log(json.data);

        if (onlyFavorites) {
            const favorites = localStorage.getItem('favorites');
            let favArray: number[] = [];
            if (favorites) {
                favArray = JSON.parse(favorites) as number[];
            }
            const filteredData = json.data.filter((cocktail: Cocktail) => favArray.includes(cocktail.id));
            setCocktails(filteredData);
            setTotalPages(Math.ceil(filteredData.length / perPage));
        } else {
            setCocktails(json.data);
            setTotalPages(Math.ceil(json.meta.total / perPage));
        }

        if (firstLoad) {
            setFirstLoad(false);
        }
        else {
            if (!hideConfirmation) {
                toast.success('Zaktualizowano wyszukiwanie');
            }
        }
    }

    const loadFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as number[];
        setFavorites(storedFavorites);
    }

    const categoryChanged = (category: string) => {
        console.log(`Category changed: ${category}`);
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    const glassChanged = (glass: string) => {
        console.log(`Glass changed: ${glass}`);
        if (selectedGlasses.includes(glass)) {
            setSelectedGlasses(selectedGlasses.filter(g => g !== glass));
        } else {
            setSelectedGlasses([...selectedGlasses, glass]);
        }
    }

    const ingredientChanged = (ingredient: string) => {
        console.log(`Ingredient changed: ${ingredient}`);
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    }

    const softDrinksChanged = () => {
        setSoftDrinksOnly(!softDrinksOnly);
    }

    const searchUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        if (searchTerm != newSearchTerm) {
            setSearchTerm(newSearchTerm);
            loadCocktails(true);
        }
    }

    const sortingUpdated = (newSortOrder: string) => {
        if (sortOrder != newSortOrder) {
            console.log("Sort order changed");
            setSortOrder(newSortOrder);

        }
    }

    const addToFavorite = async (id: number) => {

        let newFavorities = favorites;

        if (newFavorities.includes(id)) {
            newFavorities = newFavorities.filter(favId => favId !== id);
        } else {
            newFavorities.push(id);
        }

        localStorage.setItem('favorites', JSON.stringify(newFavorities));
        setFavorites(newFavorities);
    }

    return (
        <main className="browse-page">
            <Appbar />
            <article>
                <Sheet>
                    <header>
                        <h1 className=' ml-2 lg:ml-5 text-3xl md:text-4xl leading-12 lg:text-5xl '>Browse Cocktails</h1>
                        <SheetTrigger asChild>
                            <Button size={'lg'} variant={'outline'}>Filters</Button>
                        </SheetTrigger>
                    </header>
                    <div className="flex w-full max-w-sm items-center gap-2">
                        <Input value={searchTerm} placeholder='Search cocktail...' onChange={searchUpdated} />
                        <Select onValueChange={(value) => sortingUpdated(value)} defaultValue={sortOrder}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sorting" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="+name">A to Z</SelectItem>
                                <SelectItem value="-name">Z to A</SelectItem>
                                <SelectItem value="+updatedAt">Newest</SelectItem>
                                <SelectItem value="-updatedAt">Oldest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {
                        totalPages > 1 ? <MyPagination setPage={setPage} page={page} totalPages={totalPages} /> : null
                    }
                    <section className='horizontal-container'>
                        <ul className='cocktails-grid w-80 sm:w-9/10 md:w-9/10 lg:w-8/10'>
                            {cocktails.map(cocktail => (
                                <li key={cocktail.id} onClick={() => {
                                    setDrawerOpen(true)
                                    setSelectedCocktail(cocktail)
                                }} className='cocktail-card'>

                                    <img src={cocktail.imageUrl!} alt={cocktail.name} />
                                    <HoverCard >
                                        <HoverCardTrigger onClick={() => addToFavorite(cocktail.id)} className=" absolute font-lg mt-3 transition-all ">{favorites.includes(cocktail.id) ?
                                            <MdFavorite className="text-red-500 hover:scale-110 w-10 h-10 font-light font-lg relative -top-35 left-1 lg:-top-69 md:-top-35 sm:-top-35" /> :
                                            <MdFavoriteBorder className="text-red-500 hover:scale-110 font-lg w-10 h-10 stroke-current font-extralight relative -top-35 left-1 lg:-top-69 md:-top-35 sm:-top-35" />}</HoverCardTrigger>
                                        <HoverCardContent side="bottom" className=" p-2 text-center">
                                            {favorites.includes(cocktail.id) ? "Remove from favorites" : "Add to favorites"}
                                        </HoverCardContent>
                                    </HoverCard>
                                    <h3 >{cocktail.name}</h3>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <footer>
                        {
                            totalPages > 1 ? <MyPagination setPage={setPage} page={page} totalPages={totalPages} /> : null
                        }
                    </footer>
                    <Filters perPage={perPage} setPerPage={setPerPage} selectedCategories={selectedCategories}
                        selectedGlasses={selectedGlasses} selectedIngredients={selectedIngredients} softDrinksOnly={softDrinksOnly} onlyFavorites={onlyFavorites}
                        selectedGlassChanged={glassChanged} selectedIngredientChanged={ingredientChanged} selectedCategoryChanged={categoryChanged} loadCocktails={loadCocktails}
                        softDrinksChanged={softDrinksChanged} onlyFavoritesChanged={() => {
                            setOnlyFavorites(!onlyFavorites);
                            loadCocktails();
                        }} />
                </Sheet>
                <CocktailInformation cocktail={selectedCocktail!} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            </article>
        </main>
    );
}
export default Browse;