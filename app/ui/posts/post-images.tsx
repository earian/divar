export default function Images(props: {
    thumbnail: string
}){
    return (
        <div
        className="w-full aspect-square"
        >
            <img 
            src={props.thumbnail} 
            className="w-full max-h-[100%] object-fill"
            />
        </div>
    )
}