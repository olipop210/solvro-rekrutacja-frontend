import { Cocktail } from "@/lib/types";

export const defaultCocktail: Cocktail = {
    id: 0,
    name: "Loading...",
    instructions: "Loading...",
    alcoholic: false,
    category: null,
    glass: null,
    imageUrl: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ingredients: [],
}