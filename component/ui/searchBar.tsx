import { SearchField } from "@heroui/react";

export default function SearchBar({
    searchInput,
    setSearchInput,
} : {
    searchInput: string;
    setSearchInput:  React.Dispatch<React.SetStateAction<string>>,
}){
    return(
        <div className="w-30 md:w-100">
            <SearchField name="search">
                <SearchField.Group className="dark:bg-surface">
                    <SearchField.SearchIcon />
                    <SearchField.Input 
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}/>
                    <SearchField.ClearButton />
                </SearchField.Group>
            </SearchField>
        </div>
    )
}