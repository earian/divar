import Image from "next/image";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async function UploadImage(){
    async function handleUpload(){

    }

    return (
        <div>
            <label htmlFor="images">عکس‌های خود را بارگزاری کنید:</label>
            <input type="file" name="image" accept="image/png, image/jpeg"/>
        </div>
    )
}