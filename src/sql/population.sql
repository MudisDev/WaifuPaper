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
('Dragón'),
('Cibernética'),
('Espiritual'),
('Fuego'),
('Hielo'),
('Tormenta'),
('Reina'),
('Espía'),
('Guerrera'),
('Cantante'),
('Hacktivista'),
('Híbrida'),
('Sueños'),
('Tecnología');

-- Aiyana (NekoQueen)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (1, 1), (1, 8);

-- Lunaris (DragonFlare)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (2, 2), (2, 6), (2, 10);

-- Mira (CyberNeko)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (3, 1), (3, 3), (3, 9), (3, 15);

-- Zaphyra (SkyDragon)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (4, 2), (4, 7), (4, 10);

-- Kira (SteelHeart)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (5, 3), (5, 10), (5, 15);

-- Neriah (SoulBloom)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (6, 4), (6, 14);

-- Kaelynn (HybridFury)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (7, 1), (7, 2), (7, 13);

-- Selene (NightByte)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (8, 3), (8, 12), (8, 15);

-- Rin (EmberTail)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (9, 1), (9, 5);

-- Naomi (CrystalSong)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (10, 2), (10, 6), (10, 11);

-- Lira (EchoSpark)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (11, 4), (11, 15);

-- Freya (NeoDancer)
INSERT INTO Tiene_Etiqueta (id_personaje, id_etiqueta) VALUES (12, 3), (12, 10), (12, 15);
