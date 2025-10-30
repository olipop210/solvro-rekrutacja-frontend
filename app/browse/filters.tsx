import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";

type FiltersProps = {
    perPage: number;
    setPerPage: (value: number) => void;
    selectedCategories: string[];
    selectedGlasses: string[];
    selectedIngredients: string[];
    softDrinksOnly: boolean;
    onlyFavorites: boolean;
    selectedGlassChanged: (glass: string) => void;
    selectedIngredientChanged: (ingredient: string) => void;
    selectedCategoryChanged: (category: string) => void;
    loadCocktails: () => void;
    softDrinksChanged: () => void;
    onlyFavoritesChanged: () => void;
}

const Filters = ({ perPage, setPerPage, selectedCategories,
    selectedGlasses, selectedIngredients, softDrinksOnly, onlyFavorites,
    selectedGlassChanged, selectedIngredientChanged, selectedCategoryChanged, loadCocktails,
    softDrinksChanged, onlyFavoritesChanged }: FiltersProps) => {

    const [availableCategories, setAvailableCategories] = useState<string[]>([]);

    const [availableGlasses, setAvailableGlasses] = useState<string[]>([]);

    const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);

    useEffect(() => {
        loadFilters();
    }, [])

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

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                    Here you can set the filters for searching cocktails.
                </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min overflow-scroll gap-6 px-4">
                <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-name">Results per page</Label>
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
                            <AccordionTrigger>Cocktail Type <span className={'text-neutral-500'}>{selectedCategories.length > 0 ? `selected ${selectedCategories.length}` : null} </span></AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                {availableCategories.map((category, index) => (
                                    <div key={index} className='flex items-center'>
                                        <Checkbox defaultChecked={selectedCategories.includes(category)} onCheckedChange={() => selectedCategoryChanged(category)} id={`category-${index}`} name="category" value={category} />
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
                            <AccordionTrigger>Glass Type <span className={'text-neutral-500'}>{selectedGlasses.length > 0 ? `selected ${selectedGlasses.length}` : null} </span></AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                {availableGlasses.map((glass, index) => (
                                    <div key={index} className='flex items-center'>
                                        <Checkbox defaultChecked={selectedGlasses.includes(glass)} onCheckedChange={() => selectedGlassChanged(glass)} id={`glass-${index}`} name="glass" value={glass} />
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
                            <AccordionTrigger>Owned Ingredients <span className={'text-neutral-500'}>{selectedIngredients.length > 0 ? `selected ${selectedIngredients.length}` : null} </span></AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                {availableIngredients.map((ingredient, index) => (
                                    <div key={index} className='flex items-center'>
                                        <Checkbox defaultChecked={selectedIngredients.includes(ingredient)} onCheckedChange={() => selectedIngredientChanged(ingredient)} id={`ingredient-${index}`} name="ingredient" value={ingredient} />
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
                <Button onClick={() => loadCocktails()} >Filter</Button>
                <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>

    )
}

export default Filters;