INSERT INTO public.role (name)
VALUES
	('Admin'),
	('RG'),
	('RespMatos'),
	('RespCleophas'),
	('RespCompta'),
	('RespSecretaire'),
	('Accoco'),
	('Chef'),
	('Compa');

INSERT INTO public.local (name, address, postalcode, city, keyresp_userid)
	VALUES ('Ste Thérèse', '16 Av. du Château d''Eau', '90000', 'Belfort', '5vEdjBlcQLTAznlZLeNLJpu5DAT2');

INSERT INTO public.unit (name, age_group, local_id)
VALUES
	('LJ7', 'Louveteau', 1),
	('LJ3', 'Louveteau', 1),
	('SG3', 'Scout', 1),
	('SG7', 'Scout', 1),
	('PK', 'Pionnier', 1),
	('Farfa', 'Farfadet', 1),
	('Compa''d''tente', 'Compagnon', 1),
	('Incomparables', 'Compagnon', 1);
