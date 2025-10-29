'use client';
import Appbar from '@/components/ui/appbar/appbar';
import './browse.scss';

import { Cocktail } from '@/lib/types';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { toast } from 'sonner';
import MyPagination from '@/components/ui/Pagination/MyPagination';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CocktailInformation from './CocktailInformation';
import { defaultCocktail } from '@/components/CocktailPlaceholder';

const Browse = () => {

    const [cocktails, setCocktails] = useState<Cocktail[]>([]);

    const [totalPages, setTotalPages] = useState<number>(1);

    const [page, setPageNumber] = useState<number>(1);

    const [perPage, setPerPage] = useState<number>(30);

    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const [availableCategories, setAvailableCategories] = useState<string[]>([]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [availableGlasses, setAvailableGlasses] = useState<string[]>([]);

    const [selectedGlasses, setSelectedGlasses] = useState<string[]>([]);

    const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);

    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    const [softDrinksOnly, setSoftDrinksOnly] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const [sortOrder, setSortOrder] = useState<string>('');

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [selectedCocktail, setSelectedCocktail] = useState<Cocktail>(defaultCocktail);

    const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

    const onlyFavoritesChanged = () => {
        setOnlyFavorites(!onlyFavorites);
    }

    const setPage = (number: number) => {
        setPageNumber(number);
        loadCocktails();
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        document.title = "Przeglądaj koktajle - Solvro Cocktails";
        loadCocktails();
        loadFilters();
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

    const loadFilters = async () => {
        loadCategories();
        loadGlasses();
        loadIngredients();
    }

    const loadCategories = async () => {
        const data = await fetch('https://cocktails.solvro.pl/api/v1/cocktails/categories')
        const json = await data.json();
        console.log(json.data);
        setAvailableCategories(json.data);
    }

    const loadGlasses = async () => {
        const data = await fetch('https://cocktails.solvro.pl/api/v1/cocktails/glasses')
        const json = await data.json();
        console.log(json.data);
        setAvailableGlasses(json.data);
    }

    const loadIngredients = async () => {
        const data = await fetch('https://cocktails.solvro.pl/api/v1/ingredients/types')
        const json = await data.json();
        console.log(json.data);
        setAvailableIngredients(json.data);
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

    return (
        <main className="browse-page">
            <Appbar />
            <article>
                <Sheet>
                    <header>
                        <h1>Przeglądaj koktajle</h1>
                        <SheetTrigger asChild>
                            <Button size={'lg'} variant={'outline'}>Filtry</Button>
                        </SheetTrigger>
                    </header>
                    <div className="flex w-full max-w-sm items-center gap-2">
                        <Input value={searchTerm} placeholder='Wyszukaj koktajl...' onChange={searchUpdated} />
                        <Select onValueChange={(value) => sortingUpdated(value)} defaultValue={sortOrder}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sortowanie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="+name">Od A do Z</SelectItem>
                                <SelectItem value="-name">Od Z do A</SelectItem>
                                <SelectItem value="+updatedAt">Od najnowszych</SelectItem>
                                <SelectItem value="-updatedAt">Od najstarszych</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {
                        totalPages > 1 ? <MyPagination setPage={setPage} page={page} totalPages={totalPages} /> : null
                    }
                    <section className='horizontal-container'>
                        <ul className='cocktails-grid'>
                            {cocktails.map(cocktail => (
                                <li key={cocktail.id} onClick={() => {
                                    setDrawerOpen(true)
                                    setSelectedCocktail(cocktail)
                                }} className='cocktail-card'>

                                    <img src={cocktail.imageUrl!} alt={cocktail.name} />
                                    <h3>{cocktail.name}</h3>
                                </li>
                            ))}
                        </ul>
                        <aside>
                            <h2>Filtry</h2>
                        </aside>
                    </section>
                    <footer>
                        {
                            totalPages > 1 ? <MyPagination setPage={setPage} page={page} totalPages={totalPages} /> : null
                        }

                    </footer>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Filtry</SheetTitle>
                            <SheetDescription>
                                Tutaj możesz ustawić filtry wyszukiwania koktajli.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min overflow-scroll gap-6 px-4">
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-name">Liczba wyników na stronę</Label>
                                <ButtonGroup >
                                    <Button disabled={perPage === 15} onClick={() => setPerPage(15)}>15</Button>
                                    <ButtonGroupSeparator />
                                    <Button disabled={perPage === 30} onClick={() => setPerPage(30)}>30</Button>
                                    <ButtonGroupSeparator />
                                    <Button disabled={perPage === 45} onClick={() => setPerPage(45)}>45</Button>
                                    <ButtonGroupSeparator />
                                    <Button disabled={perPage === 60} onClick={() => setPerPage(60)}>60</Button>
                                </ButtonGroup>
                            </div>
                            <div className="grid gap-3">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Typ koktajlu <span className={'text-neutral-500'}>{selectedCategories.length > 0 ? `wybrano ${selectedCategories.length}` : null} </span></AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            {availableCategories.map((category, index) => (
                                                <div key={index} className='flex items-center'>
                                                    <Checkbox defaultChecked={selectedCategories.includes(category)} onCheckedChange={() => categoryChanged(category)} id={`category-${index}`} name="category" value={category} />
                                                    <Label htmlFor={`category-${index}`} className='ml-2'>{category}</Label>
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>

                                </Accordion>
                                <Accordion type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Typ szkła <span className={'text-neutral-500'}>{selectedGlasses.length > 0 ? `wybrano ${selectedGlasses.length}` : null} </span></AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            {availableGlasses.map((glass, index) => (
                                                <div key={index} className='flex items-center'>
                                                    <Checkbox defaultChecked={selectedGlasses.includes(glass)} onCheckedChange={() => glassChanged(glass)} id={`glass-${index}`} name="glass" value={glass} />
                                                    <Label htmlFor={`glass-${index}`} className='ml-2'>{glass}</Label>
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <Accordion type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Posiadane składniki <span className={'text-neutral-500'}>{selectedIngredients.length > 0 ? `wybrano ${selectedIngredients.length}` : null} </span></AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-4 text-balance">
                                            {availableIngredients.map((ingredient, index) => (
                                                <div key={index} className='flex items-center'>
                                                    <Checkbox defaultChecked={selectedIngredients.includes(ingredient)} onCheckedChange={() => ingredientChanged(ingredient)} id={`ingredient-${index}`} name="ingredient" value={ingredient} />
                                                    <Label htmlFor={`ingredient-${index}`} className='ml-2'>{ingredient}</Label>
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <section className='filterSection'>
                                    <Checkbox defaultChecked={softDrinksOnly} onCheckedChange={softDrinksChanged} id={`soft-drinks-only`} name="soft-drinks-only" value="soft-drinks-only" />
                                    <Label className='ml-2'>Soft drinks only</Label>
                                </section>
                                <section className='filterSection'>
                                    <Checkbox defaultChecked={onlyFavorites} onCheckedChange={onlyFavoritesChanged} id={`only-favorites`} name="only-favorites" value="only-favorites" />
                                    <Label className='ml-2'>Only favorites</Label>
                                </section>
                            </div>
                        </div>
                        <SheetFooter>
                            <Button onClick={() => loadCocktails()} >Filtruj</Button>
                            <SheetClose asChild>
                                <Button variant="outline">Zamknij</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <CocktailInformation cocktail={selectedCocktail!} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            </article>
        </main>
    );
}
export default Browse;