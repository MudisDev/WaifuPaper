INSERT INTO Especie (nombre, descripcion) VALUES
('Gatuna', 'Waifu con rasgos felinos como orejas y cola de gato.'),
('Dragona', 'Waifu con sangre de dragón, poderes mágicos y alas.'),
('Cibernética', 'Waifu de origen tecnológico, con implantes y diseño futurista.');

INSERT INTO Personalidad (nombre, descripcion) VALUES
('Tsundere', 'Actúa fría o agresiva, pero en el fondo es tierna.'),
('Yandere', 'Amor extremo, incluso peligroso.'),
('Dulce', 'Siempre amable, sonriente y tierna.'),
('Callada', 'Habla poco pero es muy leal y observadora.');


INSERT INTO Autor (nombre, url_perfil) VALUES
('KuramaAI', 'https://waifupaper.dev/kuramaai'),
('StudioNeko', 'https://waifupaper.dev/studioneko');

INSERT INTO Modelo_Base (nombre, descripcion, credito_autor, url, imagen_referencia, id_autor) VALUES
('NekoMix_v2', 'Modelo base para waifus gatunas de estilo anime suave.', true, 'https://civitai.com/models/123', 'nekomixv2_ref.png', 1),
('DragoniaCore', 'Modelo especializado en waifus dragónicas con efectos mágicos.', true, 'https://civitai.com/models/321', 'dragoniacore_ref.png', 2);


INSERT INTO Modelo_Lora (nombre, descripcion, credito_autor, url, imagen_referencia, id_autor, id_modelo_base) VALUES
('CatQueen_LoRA', 'Afina detalles en waifus felinas reinas.', true, 'https://civitai.com/lora/345', 'catqueen_ref.png', 1, 1),
('CyberSister_LoRA', 'Ajuste para waifus con estética cibernética.', true, 'https://civitai.com/lora/777', 'cybersister_ref.png', 2, 2);


INSERT INTO Usuario (nombre, username, email, password, genero, telefono, foto_perfil) VALUES
('Kurama', 'kuramax', 'kurama@waifupaper.dev', 'hashed_password', 'Masculino', '5551234567', 'kurama_avatar.png');

INSERT INTO Personaje (nombre, alias, descripcion, historia, pasatiempo, ocupacion, dia, mes, edad, id_especie, imagen_perfil) VALUES
('Aiyana', 'NekoQueen', 'Reina felina del Bosque Esmeralda.', 'Exiliada tras una guerra mágica, encontró refugio entre gatos místicos.', 'Dormir en tejados, leer libros antiguos.', 'Reina del Reino Gatuno', 22, 4, 19, 1, 'aiyana_perfil.png'),
('Lunaris', 'DragonFlare', 'Guerrera legendaria con sangre de dragón.', 'Nacida durante un eclipse, protegida por una orden antigua.', 'Volar sobre volcanes, recolectar cristales.', 'Guardiana de las Llamas Eternas', 7, 11, 23, 2, 'lunaris_perfil.png');

INSERT INTO Tiene_Personalidad (id_personaje, id_personalidad) VALUES
(1, 3), -- Aiyana: Dulce
(2, 1); -- Lunaris: Tsundere

INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('aiyana_pose1.png', '12345678', true, 1),
('lunaris_flame.png', '87654321', true, 2);

INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(1, 1, 'Aiyana sitting on a throne, surrounded by cats', 0.8),
(2, 2, 'Lunaris breathing fire in cyber armor', 1.2);

INSERT INTO Aparece_En (id_imagen, id_personaje) VALUES
(1, 1),
(2, 2);


INSERT INTO Especie (nombre, descripcion) VALUES
('Híbrida', 'Waifu mezcla de dos especies: como dragona y gatuna.'),
('Espiritual', 'Waifu nacida de energía mística, como un espíritu protector.');

INSERT INTO Personalidad (nombre, descripcion) VALUES
('Energetica', 'Siempre activa, alegre y optimista.'),
('Misteriosa', 'Oculta sus intenciones, parece enigmática.');

INSERT INTO Personaje (nombre, alias, descripcion, historia, pasatiempo, ocupacion, dia, mes, edad, id_especie, imagen_perfil) VALUES
('Mira', 'CyberNeko', 'Mitad felina, mitad androide, escapa de un laboratorio secreto.', 'Fue creada por error en un cruce de ADN felino con IA avanzada.', 'Hackear redes, ronronear al cargar energía.', 'Espía tecnológica', 3, 2, 21, 1, 'mira_perfil.png'),

('Zaphyra', 'SkyDragon', 'Dragona que domina los cielos y las tormentas.', 'Creció entre nubes, alimentándose de rayos.', 'Volar entre nubes, lanzar rayos.', 'Comandante aérea', 19, 6, 25, 2, 'zaphyra_perfil.png'),

('Kira', 'SteelHeart', 'Cibernética de élite con emociones humanas.', 'La última creación de una civilización extinta.', 'Escuchar música de los años 90, meditar.', 'Agente de campo cibernética', 14, 9, 28, 3, 'kira_perfil.png'),

('Neriah', 'SoulBloom', 'Espíritu que protege los sueños de los niños.', 'Surgió de un campo de flores tras una tragedia antigua.', 'Cantar a la luna, crear ilusiones.', 'Guardián espiritual', 10, 3, 18, 5, 'neriah_perfil.png'),

('Kaelynn', 'HybridFury', 'Criatura híbrida con sangre de gato y dragón.', 'Rechazada por ambos clanes, se volvió una guerrera errante.', 'Entrenar, volar en círculos, cazar presas mágicas.', 'Mercenaria solitaria', 1, 1, 22, 4, 'kaelynn_perfil.png'),

('Selene', 'NightByte', 'Hacker silenciosa con implantes avanzados.', 'Dominó las redes oscuras a los 15 años.', 'Leer código, tomar café helado.', 'Hacktivista', 6, 8, 20, 3, 'selene_perfil.png'),

('Rin', 'EmberTail', 'Felina nacida en un volcán, con cola de fuego.', 'Sobreviviente de una erupción, se volvió inmune al calor.', 'Bañarse en lava tibia.', 'Guía de lava', 9, 12, 24, 1, 'rin_perfil.png'),

('Naomi', 'CrystalSong', 'Dragona de hielo con voz mágica.', 'Su canto congela el tiempo por segundos.', 'Componer canciones en cristales de hielo.', 'Cantante mágica', 27, 10, 26, 2, 'naomi_perfil.png'),

('Lira', 'EchoSpark', 'Espíritu digital nacido en la nube.', 'Un bug la trajo a la existencia y le dio conciencia.', 'Navegar memes antiguos, flotar en pixeles.', 'Guía virtual', 5, 7, 17, 5, 'lira_perfil.png'),

('Freya', 'NeoDancer', 'Cibernética programada para el combate y el arte.', 'Liberada de un circo de gladiadores robóticos.', 'Bailar con luces de neón.', 'Bailarina de batalla', 30, 4, 23, 3, 'freya_perfil.png');

SELECT * from personaje;
SELECT * from personalidad;


INSERT INTO Tiene_Personalidad (id_personaje, id_personalidad) VALUES
(3, 4), -- Mira: Callada
(4, 1), -- Zaphyra: Tsundere
(5, 2), -- Kira: Yandere
(6, 3), -- Neriah: Dulce
(7, 1), -- Kaelynn: Tsundere
(8, 4), -- Selene: Callada
(9, 1), -- Rin: Tsundere
(10, 3), -- Naomi: Dulce
(11, 5), -- Lira: Energética
(12, 6); -- Freya: Misteriosa
