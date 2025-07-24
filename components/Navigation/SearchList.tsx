import { SearchItem } from "./SearchItem"


export const SearchList = ({ 
    items,
    clearList 
} : { 
    items: any[],
    clearList: () => void
}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-auto max-h-[600px] overflow-y-scroll p-2">
            <div className="flex flex-col items-center justify-start w-full gap-2">
                { items.map((item) => {
                    return <SearchItem item={item} clearList={clearList}/>
                })}
            </div>

        </div>
    )
}