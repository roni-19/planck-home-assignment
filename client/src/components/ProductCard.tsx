type ProductCardProps = {
    id: string
    price: number
    picture: string
    title: string
    description: string
    handleAdd: (id: string) => void
    handleRemove: (id: string) => void
    isInWishList: boolean
    isLogin: boolean
}

export default function ProductCard({ id, price, picture, title, description, handleAdd, handleRemove, isInWishList, isLogin }: ProductCardProps) {
    const wishListBtn = isInWishList ?
        <div
            className="px-3.5 py-3 rounded-[14px] text-base font-semibold bg-none border border-dark-10 hover:text-purple-100 cursor-pointer"
            onClick={() => handleRemove(id)}
        >
            Remove
        </div> :
        <div
            className="px-3.5 py-3 rounded-[14px] text-base font-semibold bg-none border border-dark-10 hover:text-purple-100 cursor-pointer"
            onClick={() => handleAdd(id)}
        >
            Add
        </div>

    return (
        <div className={`flex flex-col h-80 w-[262px] bg-white rounded-xl text-black items-start p-4 gap-3`}>
            <div className="bg-dark-50 w-full rounded-lg">
                <img className="m-auto" width={128} src={picture} alt={id}/>
            </div>
            <div className="flex flex-col gap-2 items-start">
                <span className="text-dark-100 text-base">{title}</span>
                <span className="text-sm overflow-hidden text-ellipsis leading-5 max-h-16">{description}</span>
                <div className="flex justify-between w-full items-center text-dark-100 h-12">
                    <p>${price}</p>
                    {isLogin && wishListBtn}
                </div>
            </div>
        </div>
    )
}

