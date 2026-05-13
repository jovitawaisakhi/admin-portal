interface Props{
    icon: React.ElementType,
    text: string,
    total: number|undefined,
    bgIcon: string,
    iconColor: string,
}

export default function CardInfo({icon : Icon, text, total, bgIcon, iconColor} : Props){
    return(
        <div className="flex items-center w-120 p-4 space-x-5 rounded-md shadow-sm bg-white dark:bg-surface">
            <div className={`${bgIcon} p-4 rounded-md`}>
                <Icon size={22} className={`${iconColor}`}/>
            </div>
            <div>
                <p className="text-sm">{text}</p>
                <p className="text-2xl font-bold">{total}</p>
            </div>
        </div>
    )
}