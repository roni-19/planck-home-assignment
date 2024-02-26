import { useLocalStorage } from "./useLocalStorage";

export const useWishlist = (user: string) => {
    const [wishlist, setWishlist] = useLocalStorage(user, [])

    const addToWishlist = (id: string) => {
        const newList = [...wishlist]
        if (!newList.includes(id)) {
            newList.push(id)
        }
        setWishlist(newList)
    }

    const removeFromWishlist = (id: string) => {
        const newList = wishlist.filter((currId: string)=> id !== currId)
        setWishlist(newList)
    }

    const isExist = (id: string) => {
        return wishlist.includes(id)
    }

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isExist
    };
}