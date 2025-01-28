
type ButtomMProps = {
    text: string,
    size: "xs" | "sm" | "md" | "lg" | "xl",
    customFunction? : () => void;
}

const buttonSize = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl", 
}

export default function ButtonM ({ text, size, customFunction }: ButtomMProps ){


    


    return (

            <div onClick={customFunction} className={`${buttonSize[size]}  bg-primary-bluegray rounded-2xl items-center justify-center p-2 text-white text-xl font-semibold`}>

                {text}
            </div>

    )
}