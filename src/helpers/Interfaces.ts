export interface ListWaifusData {
    id_personaje: number;
    nombre: string;
    imagen_perfil: string;
}

export interface ListImageData {
    id_imagen: number;
    //date_favorite: string;
    url: string
}


//profileCharacter
export interface TagData {
    id_etiqueta: string,
    nombre_etiqueta: string,
}

export interface TagData2 {
    id_etiqueta: string,
    nombre: string,
}

export interface WaifuData {
    id_personaje: number;
    nombre: string;
    alias: string;
    descripcion: string;
    historia: string;
    pasatiempo: string;
    ocupacion: string;
    dia: number;
    mes: number;
    edad: number;
    especie: string;
    imagen_perfil: string;
    personalidades: string;
}
/* export interface WaifuData {
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
} */

export interface ImageData {
    id_imagen: number;
    //id_personaje: string;
    url: string;
    //semilla: string;
    //public_image: boolean;
    //public_image: number;
    //id_base_model: number;
}
/* export interface ImageData {
    id: number;
    id_character: string;
    url: string;
    seed: string;
    //public_image: boolean;
    public_image: number;
    id_base_model: number;
} */

export interface ListWallpapers {
    id: number,
    id_character: string,
    url: string,
}

export interface NekoImageData {
    id_imagen: number;
    url: string;
}