import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import Pages from "./components/Pages";
import Login from "./components/Login";
import { usePagination } from "./hooks/usePagination";
import { useWishlist } from "./hooks/useWishlist";
import { useLogin } from "./hooks/useLogin";
import { Product } from "./types";
import { MAX_PAGE_SIZE } from "./consts";

function App() {
    const [products, setProducts] = useState<Product[]>([])
    const [showFromWishlist, setShowFromWishlist] = useState(false)

    //save the original list in ref, so it will be available after filtering
    const productsList = useRef([])

    const { paginate, currentPage, goToPage } = usePagination(MAX_PAGE_SIZE, 1)
    const { login, logout, currentUser, isError } = useLogin();
    const { addToWishlist, removeFromWishlist, isExist } = useWishlist(currentUser?.username as string)

    useEffect(() => {
        //fetch products data
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
                setProducts(response.data);
                productsList.current = response.data
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleShowFromWishlistChange = (checked: boolean) => {
        setShowFromWishlist(checked)
        //filter products list or initialise it from ref
        const newProducts = checked ? products.filter(product => isExist(product.id)) : productsList.current
        if (checked) {
            goToPage(1)
        }
        setProducts(newProducts)
    }

    const numOfPages = Math.ceil(products.length / MAX_PAGE_SIZE)
    const paginatedProducts = paginate(products)

    return (
        <div className="p-6 flex flex-col gap-3 justify-center">
            <div className="flex justify-between items-center">
                <div className="text-2xl">PlanckMarket</div>
                <Login login={login} logout={logout} currentUser={currentUser} isError={isError}/>
            </div>
            <div className="flex gap-3">
                <input type="checkbox"
                       onChange={e => handleShowFromWishlistChange(e.target.checked)}
                       checked={showFromWishlist}/>
                <div>Show only product from wishlist</div>
            </div>
            <div className="grid grid-cols-auto-fit-card gap-3">
                {paginatedProducts.map(({ id, price, picture, title, description }) =>
                    <ProductCard key={id}
                                 id={id}
                                 price={price}
                                 picture={picture}
                                 title={title}
                                 description={description}
                                 handleAdd={addToWishlist}
                                 handleRemove={removeFromWishlist}
                                 isInWishList={isExist(id)}
                                 isLogin={currentUser !== null}
                    />
                )}
            </div>
            <Pages numberOfPages={numOfPages} currentPage={currentPage}
                   handlePageChange={(pageNumber) => goToPage(pageNumber)}/>
        </div>
    );
}

export default App;
