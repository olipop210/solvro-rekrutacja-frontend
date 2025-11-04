import { useEffect, useState } from "react";

const useFavorites = () => {

    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        loadFavorites();
    }, [])

    const loadFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as number[];
        setFavorites(storedFavorites);
    }

    const addToFavorite = async (id: number) => {

        setFavorites((prev) => {
            const already = prev.includes(id);
            const newFavorites = already ? prev.filter(favId => favId !== id) : [...prev, id];

            try {
                localStorage.setItem('favorites', JSON.stringify(newFavorites));
            } catch (e) {
                console.error("Failed to update favorites in localStorage", e);
            }

            return newFavorites;
        });
    }

    return {favorites, addToFavorite}
}

export default useFavorites;