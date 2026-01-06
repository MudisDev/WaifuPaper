export interface ListWaifusData {
    id: number;
    name: string;
    profile_photo: string;
}

export interface ListImageData {
    id_image: number;
    //date_favorite: string;
    url: string
}


//profileCharacter
export interface TagData {
    id_tag: string,
    name_tag: string,
}

export interface WaifuData {
    id_character: number;
    name: string;
    alias: string;
    description: string;
    history: string;
    hobbie: string;
    occupation: string;
    day: number;
    month: number;
    age: number;
    kind: string;
    profile_photo: string;
    personality: string;
}

export interface ImageData {
    id: number;
    id_character: string;
    url: string;
    seed: string;
    //public_image: boolean;
    public_image: number;
    id_base_model: number;
}