"use client"

import { Input } from "@heroui/input"
import { Search as SearchIcon, Close } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { search } from "@/api/search";
import { Tooltip } from "@heroui/tooltip"
import { SearchList } from "./SearchList"


export const Search = () => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [searchItems, setSearchItems] = useState<any>([]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (searchValue.length > 0) {
                const results = await search(searchValue);
                console.log(results, "ressults")
                setSearchItems(results);
            } else {
                setSearchItems([]);
            }
        }

        fetchSearch();

    }, [searchValue]);

    const clearList = () => {
        setSearchItems([]);
        setSearchValue("");
    }

    useEffect(() => {
        console.log(searchItems, "searchitems")
    }, [searchItems])

    return (
        <Tooltip
            className="w-80"
            placement="bottom"
            isOpen={searchItems.length > 0}
            content={<SearchList items={searchItems} clearList={clearList} />}

        >
            <div
                className="w-80"
            >
                <Input
                    color={"default"}
                    autoComplete="hidden"
                    variant="flat"
                    placeholder="Search ..."
                    className=""
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    classNames={{
                        inputWrapper: "border-black/30 border-1"
                    }}
                    startContent={(
                        <SearchIcon fontSize="small" />
                    )}

                    endContent={searchValue.length > 0 ?
                        <div
                            className="cursor-pointer h-full flex items-center justify-center"
                            onClick={() => setSearchValue("")}
                        >
                            <Close
                                fontSize="small"

                            />
                        </div>
                        : null
                    }
                />
            </div>
        </Tooltip>

    )
}