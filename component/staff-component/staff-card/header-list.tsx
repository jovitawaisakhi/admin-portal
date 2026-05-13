interface Props{
    icon: React.ElementType,
    title: string
}

export default function HeaderList({icon: Icon, title} : Props){
    return(
        <div className="flex items-center px-4 py-2 rounded-t-2xl border-b border-foreground/10">
            <div className="flex p-2 items-center justify-center">
                <Icon className="text-foregorund" />
            </div>

            <h2 className="text-xl font-semibold">
                {title}
            </h2>
        </div>
    )
}