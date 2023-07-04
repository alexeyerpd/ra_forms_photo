import * as React from 'react';
import {cn} from 'utils/classname';

import './Photo.scss';

const block = cn('photo');

export function Photo() {
    const [images, setImages] = React.useState<{id: number; url: string}[]>([]);

    const countId = React.useRef(0);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const files = [...e.target.files];
        const urls = await Promise.all(files.map<string>((o) => fileToDataUrl(o) as any));
        setImages((prev) => {
            return [...prev, ...urls.map((url) => ({url, id: countId.current++}))];
        });
    };

    const handleDelete = (id: number) => {
        setImages((prev) => {
            return prev.filter((p) => p.id !== id);
        });
    };

    return (
        <div className={block()}>
            <label className={block('label')}>
                Click to select
                <input className={block('input')} type="file" onChange={handleFileChange} multiple />
            </label>
            {images.map(({url, id}) => (
                <div key={id} className={block('image-block')}>
                    <img className={block('image')} src={url} alt="photo" />
                    <button className={block('btn-remove')} onClick={() => handleDelete(id)}>
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}

function fileToDataUrl(file: FileList[number]) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.addEventListener('load', (evt) => {
            if (!evt.currentTarget) {
                return;
            }

            if ('result' in evt.currentTarget) {
                resolve(evt.currentTarget.result as string);
            }
        });

        fileReader.addEventListener('error', (evt) => {
            if (!evt.currentTarget) {
                return;
            }

            if ('error' in evt.currentTarget) {
                reject(new Error(evt.currentTarget.error as string));
            }
        });

        fileReader.readAsDataURL(file);
    });
}
