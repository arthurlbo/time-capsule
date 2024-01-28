"use client";

import { ChangeEvent, useState } from "react";

export const MediaPicker = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const onMediaSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        if (!files) {
            return;
        }

        const previewURL = URL.createObjectURL(files[0]);

        setPreview(previewURL);
    };

    return (
        <>
            <input name="coverUrl" type="file" id="media" accept="image/*" className="invisible h-0 w-0" onChange={onMediaSelected} />
            {preview && <img src={preview} alt="" className="aspect-video w-full rounded-lg object-cover" />}
        </>
    );
};
