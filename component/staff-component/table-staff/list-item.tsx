import React from "react";

interface Props{
    last: boolean,
    icon: React.ElementType,
    keys: string,
    value: string,
}

export default function ListItem({last, icon: Icon, keys, value} : Props){
    return(
        <div className={`flex items-center gap-3 px-4 py-2 bg-primary ${!last ? "border-y" : "rounded-b-2xl gap-3"} border-foreground/10`}>
           <div className="flex items-center gap-3">
                <div className="flex p-2 mr-3 items-center justify-center rounded-lg bg-foreground/10">
                    <Icon size={16} className="text-foreground" />
                </div>

                <h2 className="md:text-lg font-semibold sm:min-w-40 ">
                    {keys}
                </h2>
           </div>

            <p className="md:text-lg text-default-600 md:max-w-40">
                {value}
            </p>
        </div>
    )
}