import Config from 'react-native-config';

const apiUrl = Config.API_URL;

const aliasPhp = `${apiUrl}/nekopaper`;

const api_path = `${aliasPhp}/api`;

const user_path = `${api_path}/usuario`;
const list_path = `${api_path}/lista`;
const tag_path = `${api_path}/etiqueta`;
const image_path = `${api_path}/imagen`;

export const login_path = `${user_path}/iniciar_sesion.php`;
export const consult_favorite = `${user_path}/consultar_favorito.php`;
export const add_favorite = `${user_path}/marcar_favorito.php`;
export const delete_favorite = `${user_path}/borrar_favorito.php`;
export const register_user = `${user_path}/registrar.php`;
export const delete_profile = `${user_path}/eliminar_cuenta.php`;

export const show_images = `${list_path}/mostrar_imagenes.php`;
export const show_tags = `${list_path}/mostrar_etiquetas.php`;
export const show_images_for_tag = `${list_path}/mostrar_imagenes_por_etiqueta.php`;
export const show_favorites_images = `${list_path}/mostrar_imagenes_favoritas.php`;

export const register_tag = `${tag_path}/registrar_etiqueta.php`;

export const register_image = `${image_path}/registrar_imagen.php`;
export const associate_tags = `${image_path}/asociar_etiquetas.php`;
export const consult_tags = `${image_path}/consultar_etiquetas.php`;

