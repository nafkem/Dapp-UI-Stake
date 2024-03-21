
const MaxWidth = ({ children, className }) => {
    return (
        <div className={`w-full mx-auto max-w-[1368px] ${className}`}>
            {children}
        </div>
    )
}

export default MaxWidth