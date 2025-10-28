import Config from 'react-native-config';

const apiUrl = Config.API_URL;

const aliasPhp = `${apiUrl}/waifupaper`;

const api_path = `${aliasPhp}/api`;

const user_path = `${api_path}/usuario`;
const list_path = `${api_path}/lista`;
const tag_path = `${api_path}/etiqueta`;
const image_path = `${api_path}/imagen`;
const character_path = `${api_path}/personaje`;
const token_path = `${api_path}/token`;
const email_path = `${api_path}/email`;

export const login_path = `${user_path}/iniciar_sesion.php`;
export const consult_favorite = `${user_path}/consultar_favorito.php`;
export const add_favorite = `${user_path}/marcar_favorito.php`;
export const delete_favorite = `${user_path}/borrar_favorito.php`;
export const register_user = `${user_path}/registrar_usuario.php`;
export const delete_profile = `${user_path}/eliminar_cuenta.php`;
export const update_profile = `${user_path}/actualizar_perfil.php`;
export const search_email = `${user_path}/buscar_email.php`;

export const show_images = `${list_path}/mostrar_imagenes.php`;
export const show_characters = `${list_path}/mostrar_personajes.php`;
export const show_tags = `${list_path}/mostrar_etiquetas.php`;
export const show_images_for_tag = `${list_path}/mostrar_imagenes_por_etiqueta.php`;
export const show_images_for_character = `${list_path}/mostrar_imagenes_por_personaje.php`;
export const show_favorites_images = `${list_path}/mostrar_imagenes_favoritas.php`;

export const register_tag = `${tag_path}/registrar_etiqueta.php`;

export const register_image = `${image_path}/registrar_imagen.php`;
export const associate_tags = `${image_path}/asociar_etiquetas.php`;
export const consult_tags = `${image_path}/consultar_etiquetas.php`;

export const search_character = `${character_path}/buscar_personaje.php`;
export const register_character = `${character_path}/registrar_personaje.php`;
export const assign_personality = `${character_path}/asignar_personalidad.php`;
export const edit_profile = `${character_path}/editar_perfil.php`;

export const generate_token = `${token_path}/generar_token.php`;
export const consult_token = `${token_path}/consultar_token.php`;
export const delete_token = `${token_path}/eliminar_token.php`;

export const send_email = `${email_path}/enviar_email.php`;
