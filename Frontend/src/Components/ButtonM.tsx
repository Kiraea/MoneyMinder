
type ButtomMProps = {
    text: string,
    size: "xs" | "sm" | "md" | "lg" | "xl"
}

const buttonSize = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl", 
}

export default function ButtonM ({ text, size }: ButtomMProps ){


    


    return (

            <div className={`${buttonSize[size]} bg-primary-bluegray rounded-2xl items-center justify-center p-5 text-white text-xl font-semibold`}>
                {text}
            </div>

    )
}