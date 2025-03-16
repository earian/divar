export default function Category(props: {
    value: string
}){
    const catMap : any = {"community": "اجتماعی",
                    "electronic-devices": "کالای دیجیتال",
                    "hobbby": "سرگرمی و فراغت",
                    "home-kitchen": "خانه و آشپزخانه",
                    "jobs": "استخدام و کاریابی",
                    "personal": "وسایل شخصی",
                    "real-state": "املاک",
                    "services": "خدمات",
                    "tools": "تجهیزات و صنعتی",
                    "vehicles": "وسایل نقلیه"}
    const name = catMap[props.value]
    
    return(
        <h3
        className="my-[0.875rem] mr-[1.5rem]"
        defaultValue={props.value}
        >
        {name}
        </h3>
    )

}