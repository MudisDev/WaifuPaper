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


-- Mira (CyberNeko)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('mira_city.png', '99887711', true, 1);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(3, 1, 'cyber neko girl with cat ears and glowing eyes, urban night background', 1.1);

-- Zaphyra (SkyDragon)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('zaphyra_skyfire.png', '10293847', true, 2);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(4, 2, 'dragon girl flying through storm clouds, glowing wings and armor', 1.0);

-- Kira (SteelHeart)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('kira_neon.png', '56473829', true, 2);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(5, 2, 'cyberpunk female warrior with robotic limbs and glowing tattoos', 1.2);

-- Neriah (SoulBloom)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('neriah_dream.png', '00112233', true, 1);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(6, 1, 'spiritual girl in a field of glowing flowers under the moon', 0.9);

-- Kaelynn (HybridFury)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('kaelynn_battle.png', '22334455', true, 1);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(7, 1, 'hybrid dragon neko girl in armor, intense stare, magical flames', 1.3);

-- Selene (NightByte)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('selene_code.png', '33445566', true, 2);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(8, 2, 'hacker girl in dark room, surrounded by glowing code and screens', 1.1);

-- Rin (EmberTail)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('rin_lava.png', '44556677', true, 1);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(9, 1, 'fire neko girl near lava pool, glowing tail and volcanic outfit', 1.2);

-- Naomi (CrystalSong)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('naomi_ice.png', '55667788', true, 2);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(10, 2, 'ice dragon girl singing in a crystal cave, sparkles and snowflakes', 1.0);

-- Lira (EchoSpark)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('lira_digital.png', '66778899', true, 2);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(11, 2, 'digital spirit girl glowing with pixel particles, ethereal look', 0.8);

-- Freya (NeoDancer)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('freya_dance.png', '77889900', true, 2);
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(12, 2, 'battle dancer girl in glowing arena, cyber costume, dynamic pose', 1.2);

INSERT INTO Aparece_En (id_imagen, id_personaje) VALUES
(3, 3), (4, 4), (5, 5), (6, 6), (7, 7),
(8, 8), (9, 9), (10, 10), (11, 11), (12, 12);

INSERT INTO Etiqueta (nombre) VALUES
('Felina'),
('Dragon'),
('Cibernetica'),
('Espiritual'),
('Fuego'),
('Hielo'),
('Tormenta'),
('Reina'),
('Espia'),
('Guerrera'),
('Cantante'),
('Hacktivista'),
('Hibrida'),
('Sueños'),
('Tecnologia');

-- Aiyana (NekoQueen)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (1, 1), (1, 8);

-- Lunaris (DragonFlare)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (2, 2), (2, 6), (2, 10);

-- Mira (CyberNeko)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (3, 1), (3, 3), (3, 9), (3, 15);

-- Zaphyra (SkyDragon)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (4, 2), (4, 7), (4, 10);

-- Kira (SteelHeart)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (5, 3), (5, 10), (5, 15);

-- Neriah (SoulBloom)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (6, 4), (6, 14);

-- Kaelynn (HybridFury)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (7, 1), (7, 2), (7, 13);

-- Selene (NightByte)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (8, 3), (8, 12), (8, 15);

-- Rin (EmberTail)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (9, 1), (9, 5);

-- Naomi (CrystalSong)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (10, 2), (10, 6), (10, 11);

-- Lira (EchoSpark)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (11, 4), (11, 15);

-- Freya (NeoDancer)
INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES (12, 3), (12, 10), (12, 15);


INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('waifu1_01.png', '11110001', true, 1),
('waifu1_02.png', '11110002', true, 2),
('waifu1_03.png', '11110003', true, 1),
('waifu1_04.png', '11110004', true, 2),
('waifu1_05.png', '11110005', true, 1),
('waifu1_06.png', '11110006', true, 2),
('waifu1_07.png', '11110007', true, 1),
('waifu1_08.png', '11110008', true, 2),
('waifu1_09.png', '11110009', true, 1),
('waifu1_10.png', '11110010', true, 2),
('waifu2_01.png', '22220001', true, 1),
('waifu2_02.png', '22220002', true, 2),
('waifu2_03.png', '22220003', true, 1),
('waifu2_04.png', '22220004', true, 2),
('waifu2_05.png', '22220005', true, 1),
('waifu2_06.png', '22220006', true, 2),
('waifu2_07.png', '22220007', true, 1),
('waifu2_08.png', '22220008', true, 2),
('waifu2_09.png', '22220009', true, 1),
('waifu2_10.png', '22220010', true, 2);

INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(14, 1, 'cute neko girl smiling with cherry blossoms', 0.8),
(15, 2, 'soft pastel tone portrait of digital waifu', 0.75),
(16, 1, 'anime girl glowing hair and cat ears', 0.85),
(17, 2, 'waifu looking at sunset in anime style', 0.78),
(18, 1, 'kawaii catgirl with headphones and pink eyes', 0.82),
(19, 2, 'calm waifu under pixel rain light', 0.77),
(20, 1, 'neon cyber neko with glowing tail', 0.8),
(21, 2, 'fluffy hair anime girl in magic forest', 0.76),
(22, 1, 'dreamy catgirl portrait with floating petals', 0.83),
(23, 2, 'sparkling waifu aura digital glow', 0.79),
(24, 1, 'blue themed waifu looking at ocean horizon', 0.8),
(25, 2, 'anime girl with water magic and glowing eyes', 0.77),
(26, 1, 'waifu surrounded by bubbles underwater', 0.84),
(27, 2, 'digital mermaid spirit soft lighting', 0.78),
(28, 1, 'soft aquatic aura anime girl portrait', 0.81),
(29, 2, 'blue tone dreamy ocean waifu art', 0.79),
(30, 1, 'calm waifu with flowing blue hair', 0.8),
(31, 2, 'magic waves and glowing eyes character', 0.83),
(32, 1, 'shimmering sea catgirl smiling gently', 0.77),
(33, 2, 'aquatic goddess with pixel glow effect', 0.8);

INSERT INTO Aparece_En (id_imagen, id_personaje) VALUES
(14, 1), (15, 1), (16, 1), (17, 1), (18, 1),
(19, 1), (20, 1), (21, 1), (22, 1), (23, 1),
(24, 2), (25, 2), (26, 2), (27, 2), (28, 2),
(29, 2), (30, 2), (31, 2), (32, 2), (33, 2);

INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES
(14, 1), (14, 8),
(15, 2), (15, 10),
(16, 3), (16, 7),
(17, 5), (17, 12),
(18, 4), (18, 15),
(19, 6), (19, 11),
(20, 9), (20, 14),
(21, 1), (21, 5),
(22, 2), (22, 13),
(23, 3), (23, 6),
(24, 1), (24, 9),
(25, 2), (25, 10),
(26, 3), (26, 15),
(27, 4), (27, 12),
(28, 5), (28, 8),
(29, 6), (29, 14),
(30, 7), (30, 13),
(31, 8), (31, 9),
(32, 10), (32, 11),
(33, 11), (33, 15);

INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
-- Waifu 3
('waifu3_01.png', '33330001', true, 1),
('waifu3_02.png', '33330002', true, 2),
('waifu3_03.png', '33330003', true, 1),
('waifu3_04.png', '33330004', true, 2),
('waifu3_05.png', '33330005', true, 1),
('waifu3_06.png', '33330006', true, 2),
('waifu3_07.png', '33330007', true, 1),
('waifu3_08.png', '33330008', true, 2),
('waifu3_09.png', '33330009', true, 1),
('waifu3_10.png', '33330010', true, 2),
-- Waifu 4
('waifu4_01.png', '44440001', true, 2),
('waifu4_02.png', '44440002', true, 1),
('waifu4_03.png', '44440003', true, 2),
('waifu4_04.png', '44440004', true, 1),
('waifu4_05.png', '44440005', true, 2),
('waifu4_06.png', '44440006', true, 1),
('waifu4_07.png', '44440007', true, 2),
('waifu4_08.png', '44440008', true, 1),
('waifu4_09.png', '44440009', true, 2),
('waifu4_10.png', '44440010', true, 1),
-- Waifu 5
('waifu5_01.png', '55550001', true, 1),
('waifu5_02.png', '55550002', true, 2),
('waifu5_03.png', '55550003', true, 1),
('waifu5_04.png', '55550004', true, 2),
('waifu5_05.png', '55550005', true, 1),
('waifu5_06.png', '55550006', true, 2),
('waifu5_07.png', '55550007', true, 1),
('waifu5_08.png', '55550008', true, 2),
('waifu5_09.png', '55550009', true, 1),
('waifu5_10.png', '55550010', true, 2);

INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
-- Waifu 3
(34, 1, 'mystic forest waifu surrounded by glowing leaves', 0.82),
(35, 2, 'elf girl with long green hair and flower crown', 0.78),
(36, 1, 'anime forest spirit under moonlight', 0.84),
(37, 2, 'soft portrait of magical guardian of woods', 0.8),
(38, 1, 'kawaii forest nymph with glowing eyes', 0.79),
(39, 2, 'digital waifu holding a crystal leaf', 0.83),
(40, 1, 'catgirl spirit born from the trees', 0.81),
(41, 2, 'neon forest protector anime art', 0.8),
(42, 1, 'waifu hidden in enchanted jungle', 0.77),
(43, 2, 'forest goddess glowing with energy', 0.85),
-- Waifu 4
(44, 1, 'fiery waifu with lava and flames', 0.83),
(45, 2, 'volcanic goddess with ember aura', 0.79),
(46, 1, 'anime girl controlling molten fire', 0.82),
(47, 2, 'red haired waifu with glowing hands', 0.8),
(48, 1, 'lava catgirl in blazing background', 0.84),
(49, 2, 'flame mage waifu mid spell casting', 0.78),
(50, 1, 'ember spirit anime girl smirking', 0.81),
(51, 2, 'volcano-themed waifu with sparks flying', 0.8),
(52, 1, 'flame aura girl surrounded by smoke', 0.83),
(53, 2, 'fiery digital spirit in anime tone', 0.79),
-- Waifu 5
(54, 1, 'ice waifu with snowflakes floating around', 0.8),
(55, 2, 'blue haired frost queen in blizzard', 0.83),
(56, 1, 'cold hearted anime girl with icy stare', 0.79),
(57, 2, 'snow catgirl smiling softly', 0.82),
(58, 1, 'frozen landscape waifu portrait', 0.8),
(59, 2, 'waifu surrounded by ice crystals', 0.85),
(60, 1, 'snow aura anime girl sitting alone', 0.78),
(61, 2, 'ice goddess raising a crystal shard', 0.81),
(62, 1, 'chilly waifu with wind and snow swirl', 0.8),
(63, 2, 'digital frost waifu with blue glow', 0.83);

INSERT INTO Aparece_En (id_imagen, id_personaje) VALUES
-- Waifu 3
(34, 3), (35, 3), (36, 3), (37, 3), (38, 3),
(39, 3), (40, 3), (41, 3), (42, 3), (43, 3),
-- Waifu 4
(44, 4), (45, 4), (46, 4), (47, 4), (48, 4),
(49, 4), (50, 4), (51, 4), (52, 4), (53, 4),
-- Waifu 5
(54, 5), (55, 5), (56, 5), (57, 5), (58, 5),
(59, 5), (60, 5), (61, 5), (62, 5), (63, 5);

INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES
-- Waifu 3
(34, 1), (34, 7),
(35, 3), (35, 10),
(36, 2), (36, 14),
(37, 4), (37, 6),
(38, 5), (38, 9),
(39, 7), (39, 11),
(40, 8), (40, 13),
(41, 6), (41, 12),
(42, 10), (42, 15),
(43, 9), (43, 5),
-- Waifu 4
(44, 1), (44, 12),
(45, 2), (45, 8),
(46, 3), (46, 11),
(47, 4), (47, 14),
(48, 5), (48, 9),
(49, 6), (49, 15),
(50, 7), (50, 13),
(51, 8), (51, 10),
(52, 9), (52, 5),
(53, 10), (53, 7),
-- Waifu 5
(54, 1), (54, 9),
(55, 2), (55, 10),
(56, 3), (56, 14),
(57, 4), (57, 13),
(58, 5), (58, 11),
(59, 6), (59, 12),
(60, 7), (60, 15),
(61, 8), (61, 10),
(62, 9), (62, 14),
(63, 10), (63, 13);




INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('frost_embrace_1.png', '88001122', true, 1),
('frost_embrace_2.png', '88001123', true, 2),
('frost_embrace_3.png', '88001124', true, 1),
('frost_embrace_4.png', '88001125', true, 2),
('frost_embrace_5.png', '88001126', true, 1),
('zephyr_sky_1.png', '99002233', true, 2),
('zephyr_sky_2.png', '99002234', true, 1),
('zephyr_sky_3.png', '99002235', true, 2),
('zephyr_sky_4.png', '99002236', true, 1),
('zephyr_sky_5.png', '99002237', true, 2),
('ember_desert_1.png', '10112233', true, 1),
('ember_desert_2.png', '10112234', true, 2),
('ember_desert_3.png', '10112235', true, 1),
('ember_desert_4.png', '10112236', true, 2),
('ember_desert_5.png', '10112237', true, 1),
('ember_desert_6.png', '10112238', true, 2),
('zephyr_sky_6.png', '99002238', true, 1),
('frost_embrace_6.png', '88001127', true, 2),
('zephyr_sky_7.png', '99002239', true, 1),
('ember_desert_7.png', '10112239', true, 2),
('frost_embrace_7.png', '88001128', true, 1),
('zephyr_sky_8.png', '99002240', true, 2),
('ember_desert_8.png', '10112240', true, 1),
('frost_embrace_8.png', '88001129', true, 2),
('zephyr_sky_9.png', '99002241', true, 1),
('ember_desert_9.png', '10112241', true, 2),
('frost_embrace_9.png', '88001130', true, 1),
('zephyr_sky_10.png', '99002242', true, 2),
('ember_desert_10.png', '10112242', true, 1),
('frost_embrace_10.png', '88001131', true, 2);

/* INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(54, 1, 'frost queen with crystalline hair, winter magic aura', 0.7),
(55, 2, 'frost girl glowing in icy winds, fantasy art', 0.8),
(56, 1, 'frozen elegance, digital snow princess', 0.9),
(57, 2, 'ice sorceress under moonlight', 0.75),
(58, 1, 'ethereal frost aura, delicate light', 0.8),

(59, 2, 'sky goddess floating with feathers and light', 0.85),
(60, 1, 'angelic pilot girl, wind energy wings', 0.7),
(61, 2, 'celestial waifu with flowing hair, blue sky tones', 0.9),
(62, 1, 'aerial grace, soft light, divine pose', 0.8),
(63, 2, 'fantasy sky warrior, glowing clouds background', 0.75),

(64, 1, 'desert queen with sand veil, mystical aura', 0.7),
(65, 2, 'waifu of the dunes, sunlight shimmer', 0.85),
(66, 1, 'golden heat aura, ancient ruin background', 0.8),
(67, 2, 'sand sorceress, warm palette, fantasy theme', 0.9),
(68, 1, 'mystic desert guardian, glowing amber eyes', 0.75),
(69, 2, 'nomad waifu wandering dunes, strong sunlight', 0.8),
(70, 1, 'sky dancer with ribbons of wind', 0.9),
(71, 2, 'ice queen commanding storm', 0.85),
(72, 1, 'desert princess with crystal staff', 0.8),
(73, 2, 'air mage summoning clouds', 0.75),
(74, 1, 'frozen warrior with mirror blade', 0.8),
(75, 2, 'heavenly girl descending with wind aura', 0.9),
(76, 1, 'sun-blessed queen of the sands', 0.85),
(77, 2, 'ice maiden surrounded by snow petals', 0.8),
(78, 1, 'storm girl controlling thunder in the sky', 0.9),
(79, 2, 'desert empress with flowing scarf', 0.75),
(80, 1, 'glacial goddess gazing into the distance', 0.8); */

INSERT INTO Aparece_En (id_imagen, id_personaje) VALUES
(54, 6), (55, 6), (56, 6), (57, 6), (58, 6),
(59, 7), (60, 7), (61, 7), (62, 7), (63, 7),
(64, 8), (65, 8), (66, 8), (67, 8), (68, 8),
(69, 8), (70, 7), (71, 6), (72, 8), (73, 7),
(74, 6), (75, 7), (76, 8), (77, 6), (78, 7),
(79, 8), (80, 6);

/* INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES
(54, 2), (54, 9),
(55, 4), (55, 13), (55, 6),
(56, 1), (56, 11),
(57, 5), (57, 7), (57, 10), (57, 14),
(58, 3), (58, 15),

(59, 2), (59, 4),
(60, 8), (60, 12), (60, 5),
(61, 6), (61, 14),
(62, 9), (62, 3), (62, 13),
(63, 10), (63, 1),

(64, 7), (64, 11),
(65, 3), (65, 6), (65, 14),
(66, 5), (66, 2),
(67, 12), (67, 15), (67, 7),
(68, 8), (68, 4), (68, 1),

(69, 9), (69, 11),
(70, 3), (70, 6), (70, 14),
(71, 5), (71, 13),
(72, 2), (72, 15), (72, 7), (72, 10),
(73, 8), (73, 4),
(74, 1), (74, 12), (74, 14),
(75, 6), (75, 9), (75, 3),
(76, 11), (76, 15),
(77, 4), (77, 13), (77, 8),
(78, 2), (78, 10),
(79, 7), (79, 5), (79, 14), (79, 1),
(80, 3), (80, 12); */

--waifu 6
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(64, 1, 'desert catgirl in glowing veil, warm light, soft dunes background', 0.8),
(65, 2, 'waifu in flowing desert robes, sandstorm particles, cinematic light', 0.9),
(66, 1, 'cat-eared warrior under sun haze, elegant and calm', 0.7),
(67, 2, 'anime girl standing in dunes, wind and light aura', 0.8),
(68, 1, 'golden desert glow waifu, ethereal tone, fantasy look', 0.9),
(69, 2, 'sunlit catgirl with amber eyes, painterly lighting', 0.8),
(70, 1, 'mystical desert princess, warm breeze and sands', 0.9),
(71, 2, 'anime girl with sand veil, oasis reflection', 0.8),
(72, 1, 'celestial catgirl traveler in golden dunes', 0.8),
(73, 2, 'desert breeze waifu portrait glowing softly', 0.9);

INSERT INTO Aparece_En (id_imagen, id_personaje) VALUES
(64, 6),(65, 6),(66, 6),(67, 6),(68, 6),
(69, 6),(70, 6),(71, 6),(72, 6),(73, 6);

INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES
(64,1),(64,3),(65,5),(65,8),(65,11),
(66,2),(66,9),(66,12),(67,3),(67,15),
(68,1),(68,7),(68,13),(69,4),(69,8),
(70,6),(70,14),(71,2),(71,10),
(72,5),(72,9),(73,1),(73,8),(73,12);

--waifu 7
INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(74,1,'ice queen waifu under aurora light, silver hair, serene tone',0.9),
(75,2,'cold waifu spirit emerging from frost mist',0.8),
(76,1,'blue-eyed anime girl surrounded by snowflakes',0.8),
(77,2,'ice crystals floating, elegant waifu with long white hair',0.9),
(78,1,'icy landscape reflection, calm and cold expression',0.7),
(79,2,'northern light waifu portrait glowing softly',0.8),
(80,1,'anime frost spirit girl, transparent veil and icy aura',0.9),
(81,2,'waifu ice mage casting frost magic, cinematic glow',0.8),
(82,1,'winter catgirl in crystal cave, sparkle particles',0.8),
(83,2,'frozen dream aesthetic, waifu under aurora sky',0.9);

INSERT INTO Aparece_En (id_imagen, id_personaje) VALUES
(74,7),(75,7),(76,7),(77,7),(78,7),
(79,7),(80,7),(81,7),(82,7),(83,7);

INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES
(74,2),(74,6),(74,11),(75,8),(75,15),
(76,3),(76,10),(77,1),(77,4),(77,12),
(78,5),(78,14),(79,6),(80,7),(80,13),
(81,1),(81,9),(82,2),(82,11),(83,4),(83,12),(83,15);

--waifu 8

INSERT INTO Usa_Modelo_Lora (id_imagen, id_modelo_lora, prompt, fuerza) VALUES
(84,1,'sky princess waifu floating among clouds, bright pastel tones',0.8),
(85,2,'anime wind spirit waifu glowing softly in sunlight',0.9),
(86,1,'airy anime girl with long hair, feathers drifting around',0.8),
(87,2,'stormy sky background, ethereal catgirl in motion',0.9),
(88,1,'blue and white aesthetic, waifu with wind aura',0.8),
(89,2,'soft aerial glow waifu portrait',0.9),
(90,1,'celestial wind maiden, calm atmosphere',0.7),
(91,2,'waifu flying through clouds, sunlight reflection',0.8),
(92,1,'windy plains waifu, fluttering scarf and soft focus',0.8),
(93,2,'anime air goddess, pastel energy and sky tones',0.9);

INSERT INTO Aparece_En (id_imagen, id_personaje) VALUES
(84,8),(85,8),(86,8),(87,8),(88,8),
(89,8),(90,8),(91,8),(92,8),(93,8);

INSERT INTO Tiene_Etiqueta (id_imagen, id_etiqueta) VALUES
(84,1),(84,5),(84,9),
(85,3),(85,8),(86,4),(86,12),(86,15),
(87,2),(87,10),(87,13),
(88,5),(88,9),
(89,1),(89,11),(90,6),(90,7),(91,8),(91,14),
(92,2),(92,3),(93,9),(93,13),(93,15);








-- 🪨 WAIFU 9 (Reino Montaña / Tierra)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('terra_stoneheart.png','88224466',true,1),
('terra_crystal_cavern.png','99332211',true,2),
('terra_mountain_guardian.png','55446688',true,1),
('terra_rock_bloom.png','22119933',true,2),
('terra_moss_goddess.png','66770022',true,1),
('terra_cliff_watch.png','77443355',true,2),
('terra_emerald_vale.png','11009922',true,1),
('terra_dustwarden.png','55667722',true,2),
('terra_earthsong.png','33442277',true,1),
('terra_titan_soul.png','88990033',true,2);

INSERT INTO Usa_Modelo_Lora (id_imagen,id_modelo_lora,prompt,fuerza) VALUES
(94,1,'mountain catgirl waifu, earthy tones, rocky textures, calm expression',0.8),
(95,2,'waifu in crystal cave with glowing moss, fantasy lighting',0.9),
(96,1,'rock guardian waifu in stone temple, natural palette',0.8),
(97,2,'forest-earth mix waifu, subtle light shafts and dust',0.7),
(98,1,'nature spirit girl with moss and vines, fantasy atmosphere',0.9),
(99,2,'mountain breeze waifu, peaceful look under sunset',0.8),
(100,1,'earth goddess waifu with crystals and runes',0.9),
(101,2,'stone shrine anime waifu glowing softly',0.8),
(102,1,'anime nature guardian with stone aura',0.9),
(103,2,'waifu of the mountains, powerful and calm presence',0.8);

INSERT INTO Aparece_En (id_imagen,id_personaje) VALUES
(94,9),(95,9),(96,9),(97,9),(98,9),
(99,9),(100,9),(101,9),(102,9),(103,9);

INSERT INTO Tiene_Etiqueta (id_imagen,id_etiqueta) VALUES
(94,3),(94,7),(95,5),(95,9),(95,13),
(96,1),(96,8),(97,4),(97,10),(98,2),(98,6),
(99,3),(99,14),(100,1),(100,7),(101,2),(101,11),(102,4),(103,9),(103,12),(103,15);

-- 🌑 WAIFU 10 (Reino Oscuro / Sombras)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('shade_darkveil.png','22335566',true,1),
('shade_swamp_queen.png','44332288',true,2),
('shade_silent_dream.png','99884422',true,1),
('shade_shadowglow.png','66779922',true,2),
('shade_nightwhisper.png','55990011',true,1),
('shade_voidrose.png','88553344',true,2),
('shade_gloomveil.png','11002233',true,1),
('shade_ebonlight.png','77889911',true,2),
('shade_darkness_embrace.png','33224477',true,1),
('shade_night_bloom.png','66558822',true,2);

INSERT INTO Usa_Modelo_Lora (id_imagen,id_modelo_lora,prompt,fuerza) VALUES
(104,2,'dark swamp waifu with ethereal glow, gothic tone',0.9),
(105,1,'anime shadow queen with soft purple light',0.8),
(106,2,'mysterious catgirl in misty dark forest, glowing eyes',0.8),
(107,1,'waifu surrounded by floating dark petals, cinematic',0.9),
(108,2,'night sorceress anime girl, low light contrast',0.7),
(109,1,'dark fantasy waifu portrait, subtle smoke and mystery',0.8),
(110,2,'gothic style waifu in dark swamp ruins',0.9),
(111,1,'shadow mage waifu with dim light and runes',0.8),
(112,2,'dark rose waifu surrounded by mist, elegant tone',0.9),
(113,1,'void spirit girl glowing with purple energy',0.8);

INSERT INTO Aparece_En (id_imagen,id_personaje) VALUES
(104,10),(105,10),(106,10),(107,10),(108,10),
(109,10),(110,10),(111,10),(112,10),(113,10);

INSERT INTO Tiene_Etiqueta (id_imagen,id_etiqueta) VALUES
(104,2),(104,9),(105,5),(105,11),
(106,3),(106,8),(106,14),
(107,6),(107,15),
(108,1),(108,7),(109,4),(109,10),
(110,9),(110,13),(111,3),(112,5),(112,12),(113,2),(113,6),(113,8);

-- 🌸 WAIFU 11 (Reino Bosque)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('neko_forestbloom.png','66774455',true,1),
('neko_leafsong.png','88992211',true,2),
('neko_greenshade.png','55660099',true,1),
('neko_naturelight.png','22334466',true,2),
('neko_wildwhisper.png','77443322',true,1),
('neko_verdant_dream.png','44556600',true,2),
('neko_mossglow.png','99887722',true,1),
('neko_flowerveil.png','33009944',true,2),
('neko_springheart.png','55667788',true,1),
('neko_leaf_waltz.png','11224433',true,2);

INSERT INTO Usa_Modelo_Lora (id_imagen,id_modelo_lora,prompt,fuerza) VALUES
(114,1,'forest catgirl waifu surrounded by flowers and vines',0.8),
(115,2,'anime nature spirit girl glowing in green light',0.9),
(116,1,'waifu with leaves and light aura, forest ambient',0.8),
(117,2,'mystical anime waifu in woodland clearing',0.9),
(118,1,'forest priestess waifu, sunlight through trees',0.8),
(119,2,'catgirl with floral crown and gentle smile',0.9),
(120,1,'anime waifu surrounded by moss and petals',0.8),
(121,2,'waifu in deep forest, serene tone, soft glow',0.7),
(122,1,'spring blossom waifu, pink-green palette',0.8),
(123,2,'forest sprite anime girl smiling softly',0.9);

INSERT INTO Aparece_En (id_imagen,id_personaje) VALUES
(114,11),(115,11),(116,11),(117,11),(118,11),
(119,11),(120,11),(121,11),(122,11),(123,11);

INSERT INTO Tiene_Etiqueta (id_imagen,id_etiqueta) VALUES
(114,1),(114,7),(114,12),
(115,3),(115,10),
(116,5),(116,8),(117,2),(117,11),(117,13),
(118,4),(118,15),(119,9),(119,14),
(120,6),(121,5),(121,12),(122,1),(122,9),(123,2),(123,7),(123,10);

-- 🌊 WAIFU 12 (Reino Acuático)
INSERT INTO Imagen (url, semilla, imagen_listada, id_modelo_base) VALUES
('aqua_tidalspirit.png','77669933',true,1),
('aqua_coral_bloom.png','44559911',true,2),
('aqua_wavewhisper.png','22337788',true,1),
('aqua_seabreeze.png','88991122',true,2),
('aqua_depthglow.png','66770044',true,1),
('aqua_shellsong.png','11002299',true,2),
('aqua_oceanveil.png','99882255',true,1),
('aqua_sapphirelight.png','55448877',true,2),
('aqua_ripple_dream.png','77223344',true,1),
('aqua_mistgoddess.png','33229911',true,2);

INSERT INTO Usa_Modelo_Lora (id_imagen,id_modelo_lora,prompt,fuerza) VALUES
(124,1,'ocean spirit waifu surrounded by glowing water particles',0.9),
(125,2,'underwater anime girl floating in blue light',0.8),
(126,1,'sea goddess waifu with flowing hair and coral crown',0.8),
(127,2,'anime catgirl with wave magic, ethereal tone',0.9),
(128,1,'blue crystal water waifu, soft atmosphere',0.8),
(129,2,'waifu near shore with reflection and droplets',0.9),
(130,1,'aqua waifu portrait glowing softly, deep tone',0.7),
(131,2,'waifu swimming under moonlight, fantasy lighting',0.8),
(132,1,'oceanic anime girl with pearl accessories',0.9),
(133,2,'water mage waifu casting spell, transparent glow',0.8);

INSERT INTO Aparece_En (id_imagen,id_personaje) VALUES
(124,12),(125,12),(126,12),(127,12),(128,12),
(129,12),(130,12),(131,12),(132,12),(133,12);

INSERT INTO Tiene_Etiqueta (id_imagen,id_etiqueta) VALUES
(124,2),(124,6),(125,1),(125,7),(125,10),
(126,3),(126,8),(126,14),
(127,4),(127,9),(128,5),(128,12),(129,11),
(130,2),(131,6),(131,13),(132,1),(132,8),(133,5),(133,15);