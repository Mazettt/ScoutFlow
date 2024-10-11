INSERT INTO public.user_metadata (firebase_id) VALUES ('5vEdjBlcQLTAznlZLeNLJpu5DAT2');
INSERT INTO public.user_metadata (firebase_id) VALUES ('nCnV18KhDYUKqTXnsiEcERVdjRy1');

INSERT INTO public.role (name) VALUES ('Admin');
INSERT INTO public.role (name) VALUES ('RG');
INSERT INTO public.role (name) VALUES ('RespMatos');
INSERT INTO public.role (name) VALUES ('RespCleophas');
INSERT INTO public.role (name) VALUES ('RespCompta');
INSERT INTO public.role (name) VALUES ('RespSecretaire');
INSERT INTO public.role (name) VALUES ('Accoco');
INSERT INTO public.role (name) VALUES ('Chef');
INSERT INTO public.role (name) VALUES ('Compa');

INSERT INTO public.local (name, address, postalcode, city, keyresp_userid)
	VALUES ('Ste Thérèse', '16 Av. du Château d''Eau', '90000', 'Belfort', '5vEdjBlcQLTAznlZLeNLJpu5DAT2');

INSERT INTO public.unit (name, age_group, local_id)
	VALUES ('LJ7', 'Louveteau', 1);

INSERT INTO public."user_metadataONrole"(
	user_id, role_id)
	VALUES ('5vEdjBlcQLTAznlZLeNLJpu5DAT2', 1);

INSERT INTO public."user_metadataONrole"(
	user_id, role_id)
	VALUES ('nCnV18KhDYUKqTXnsiEcERVdjRy1', 1);
INSERT INTO public."user_metadataONrole"(
	user_id, role_id)
	VALUES ('nCnV18KhDYUKqTXnsiEcERVdjRy1', 8);
