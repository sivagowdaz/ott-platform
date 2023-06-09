PGDMP     7             	        {         	   dbms_mini    9.6.20    9.6.20 /    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    17284 	   dbms_mini    DATABASE     �   CREATE DATABASE dbms_mini WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE dbms_mini;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12387    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1255    17342    trigger_set_timestamp()    FUNCTION     �   CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.trigger_set_timestamp();
       public       postgres    false    3    1            �            1259    17501    casting    TABLE     3  CREATE TABLE public.casting (
    cont_id integer NOT NULL,
    charectore1 character varying(200) NOT NULL,
    charectore2 character varying(200) NOT NULL,
    charectore3 character varying(200) NOT NULL,
    charectore4 character varying(200) NOT NULL,
    charectore5 character varying(200) NOT NULL
);
    DROP TABLE public.casting;
       public         postgres    false    3            �            1259    17337    category    TABLE     �   CREATE TABLE public.category (
    cat_id numeric(5,0) NOT NULL,
    cat_name character varying(25),
    cat_desc character varying(100)
);
    DROP TABLE public.category;
       public         postgres    false    3            �            1259    17451    content    TABLE     �  CREATE TABLE public.content (
    cont_id bigint NOT NULL,
    cat_id numeric(2,0) NOT NULL,
    cont_title character varying(50) NOT NULL,
    cont_desc character varying(150) NOT NULL,
    genre character varying(25) NOT NULL,
    duration character varying(20) NOT NULL,
    age_limit numeric(2,0) NOT NULL,
    release_time date NOT NULL,
    ratting numeric(2,1),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.content;
       public         postgres    false    3            �            1259    17449    content_cont_id_seq    SEQUENCE     |   CREATE SEQUENCE public.content_cont_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.content_cont_id_seq;
       public       postgres    false    191    3            �           0    0    content_cont_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.content_cont_id_seq OWNED BY public.content.cont_id;
            public       postgres    false    190            �            1259    17471    content_file    TABLE     �   CREATE TABLE public.content_file (
    cont_id integer NOT NULL,
    image_url1 character varying(200) NOT NULL,
    image_url2 character varying(200) NOT NULL,
    vedio_url2 character varying(200) NOT NULL
);
     DROP TABLE public.content_file;
       public         postgres    false    3            �            1259    17524    crew    TABLE       CREATE TABLE public.crew (
    cont_id integer NOT NULL,
    director character varying(50) NOT NULL,
    producer character varying(50) NOT NULL,
    music_dir character varying(50) NOT NULL,
    dop character varying(50) NOT NULL,
    camera_man character varying(50) NOT NULL
);
    DROP TABLE public.crew;
       public         postgres    false    3            �            1259    17445    refreshtoken    TABLE     X   CREATE TABLE public.refreshtoken (
    refresh_token character varying(300) NOT NULL
);
     DROP TABLE public.refreshtoken;
       public         postgres    false    3            �            1259    17301    roles    TABLE     �   CREATE TABLE public.roles (
    role_id numeric(5,0) NOT NULL,
    role_name character varying(25),
    role_desc character varying(100)
);
    DROP TABLE public.roles;
       public         postgres    false    3            �            1259    17413    user_register    TABLE     �   CREATE TABLE public.user_register (
    username character varying(25) NOT NULL,
    email character varying(35) NOT NULL,
    password character varying(200) NOT NULL,
    is_admin numeric(5,0),
    is_staff numeric(5,0),
    is_customer numeric(5,0)
);
 !   DROP TABLE public.user_register;
       public         postgres    false    3            �            1259    17435    userprofile    TABLE       CREATE TABLE public.userprofile (
    email character varying(35) NOT NULL,
    first_name character varying(50),
    middle_name character varying(50),
    last_name character varying(50),
    about character varying(150),
    image_url character varying(100)
);
    DROP TABLE public.userprofile;
       public         postgres    false    3            �           2604    17454    content cont_id    DEFAULT     r   ALTER TABLE ONLY public.content ALTER COLUMN cont_id SET DEFAULT nextval('public.content_cont_id_seq'::regclass);
 >   ALTER TABLE public.content ALTER COLUMN cont_id DROP DEFAULT;
       public       postgres    false    191    190    191            �          0    17501    casting 
   TABLE DATA               k   COPY public.casting (cont_id, charectore1, charectore2, charectore3, charectore4, charectore5) FROM stdin;
    public       postgres    false    193   j8       �          0    17337    category 
   TABLE DATA               >   COPY public.category (cat_id, cat_name, cat_desc) FROM stdin;
    public       postgres    false    186   p:       �          0    17451    content 
   TABLE DATA               �   COPY public.content (cont_id, cat_id, cont_title, cont_desc, genre, duration, age_limit, release_time, ratting, created_at, updated_at) FROM stdin;
    public       postgres    false    191   �:       �           0    0    content_cont_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.content_cont_id_seq', 27, true);
            public       postgres    false    190            �          0    17471    content_file 
   TABLE DATA               S   COPY public.content_file (cont_id, image_url1, image_url2, vedio_url2) FROM stdin;
    public       postgres    false    192   �<       �          0    17524    crew 
   TABLE DATA               W   COPY public.crew (cont_id, director, producer, music_dir, dop, camera_man) FROM stdin;
    public       postgres    false    194   l>       �          0    17445    refreshtoken 
   TABLE DATA               5   COPY public.refreshtoken (refresh_token) FROM stdin;
    public       postgres    false    189   �?       �          0    17301    roles 
   TABLE DATA               >   COPY public.roles (role_id, role_name, role_desc) FROM stdin;
    public       postgres    false    185   \g       �          0    17413    user_register 
   TABLE DATA               c   COPY public.user_register (username, email, password, is_admin, is_staff, is_customer) FROM stdin;
    public       postgres    false    187   �g       �          0    17435    userprofile 
   TABLE DATA               b   COPY public.userprofile (email, first_name, middle_name, last_name, about, image_url) FROM stdin;
    public       postgres    false    188   �j                  2606    17508    casting casting_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.casting
    ADD CONSTRAINT casting_pkey PRIMARY KEY (cont_id);
 >   ALTER TABLE ONLY public.casting DROP CONSTRAINT casting_pkey;
       public         postgres    false    193    193            �           2606    17341    category category_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (cat_id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public         postgres    false    186    186                        2606    17458    content content_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (cont_id);
 >   ALTER TABLE ONLY public.content DROP CONSTRAINT content_pkey;
       public         postgres    false    191    191                       2606    17528    crew crew_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.crew
    ADD CONSTRAINT crew_pkey PRIMARY KEY (cont_id);
 8   ALTER TABLE ONLY public.crew DROP CONSTRAINT crew_pkey;
       public         postgres    false    194    194            �           2606    17305    roles roles_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public         postgres    false    185    185            �           2606    17417     user_register user_register_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.user_register
    ADD CONSTRAINT user_register_pkey PRIMARY KEY (email);
 J   ALTER TABLE ONLY public.user_register DROP CONSTRAINT user_register_pkey;
       public         postgres    false    187    187            �           2606    17444 1   user_register user_register_username_password_key 
   CONSTRAINT     z   ALTER TABLE ONLY public.user_register
    ADD CONSTRAINT user_register_username_password_key UNIQUE (username, password);
 [   ALTER TABLE ONLY public.user_register DROP CONSTRAINT user_register_username_password_key;
       public         postgres    false    187    187    187                       2620    17464    content set_timestamp    TRIGGER     |   CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.content FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();
 .   DROP TRIGGER set_timestamp ON public.content;
       public       postgres    false    195    191                       2606    17509    casting casting_cont_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.casting
    ADD CONSTRAINT casting_cont_id_fkey FOREIGN KEY (cont_id) REFERENCES public.content(cont_id);
 F   ALTER TABLE ONLY public.casting DROP CONSTRAINT casting_cont_id_fkey;
       public       postgres    false    191    193    2048            	           2606    17459    content content_cat_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.category(cat_id);
 E   ALTER TABLE ONLY public.content DROP CONSTRAINT content_cat_id_fkey;
       public       postgres    false    186    2042    191            
           2606    17477 &   content_file content_file_cont_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.content_file
    ADD CONSTRAINT content_file_cont_id_fkey FOREIGN KEY (cont_id) REFERENCES public.content(cont_id);
 P   ALTER TABLE ONLY public.content_file DROP CONSTRAINT content_file_cont_id_fkey;
       public       postgres    false    192    2048    191                       2606    17529    crew crew_cont_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.crew
    ADD CONSTRAINT crew_cont_id_fkey FOREIGN KEY (cont_id) REFERENCES public.content(cont_id);
 @   ALTER TABLE ONLY public.crew DROP CONSTRAINT crew_cont_id_fkey;
       public       postgres    false    191    194    2048                       2606    17420 )   user_register user_register_is_admin_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_register
    ADD CONSTRAINT user_register_is_admin_fkey FOREIGN KEY (is_admin) REFERENCES public.roles(role_id);
 S   ALTER TABLE ONLY public.user_register DROP CONSTRAINT user_register_is_admin_fkey;
       public       postgres    false    187    185    2040                       2606    17430 ,   user_register user_register_is_customer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_register
    ADD CONSTRAINT user_register_is_customer_fkey FOREIGN KEY (is_customer) REFERENCES public.roles(role_id);
 V   ALTER TABLE ONLY public.user_register DROP CONSTRAINT user_register_is_customer_fkey;
       public       postgres    false    185    2040    187                       2606    17425 )   user_register user_register_is_staff_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_register
    ADD CONSTRAINT user_register_is_staff_fkey FOREIGN KEY (is_staff) REFERENCES public.roles(role_id);
 S   ALTER TABLE ONLY public.user_register DROP CONSTRAINT user_register_is_staff_fkey;
       public       postgres    false    2040    187    185                       2606    25883 "   userprofile userprofile_email_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.userprofile
    ADD CONSTRAINT userprofile_email_fkey FOREIGN KEY (email) REFERENCES public.user_register(email) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.userprofile DROP CONSTRAINT userprofile_email_fkey;
       public       postgres    false    187    2044    188            �   �  x�UR;��@�G��P�8X��YS66%H\E�H�h4�{FlA�k8s�`�����G�[&�u�{�?w������n���$�H>'|؛=V<��%�h�� ��δ��) 3�ro�xl֩�)���c�I�WsV��`��`�����1���3��,u���p��;r0fA��N\�q?���ś9�r�G��u�F�e���k�T���2.����v���)�G_xB���[�<Q�Ex$GQۄ�*F� �	� �T���y����&�*���-t��N�~�.c��t���;��h�Q�DE�GF��:�����4,���#��>�e����cc�u3-�{��@T��9�Yj�ge����S%��V���f��w퓅/��`��a�w�x�fe��Nsh�kjN�ݽ)��V�@|�guj:)��p���QM1Y��?�ږͤ�'|��[�Y�,�P�G��]���^}m����������b=*��V(      �   g   x�m�A�P��)zL��Ay@h��G����$���_�'y�eXXR��L�����T�I5����I�K����~K7�n�����퍙w�{1F      �   �  x�u�Mk�0���_�{�ь$[�m����^�c.�W�����!��c�!d�V��z���(�0_b�D�b=?��������s��?qΙa�t1�z�ii�H�B�t��4@�R���j=�H%j!���VN���i�O8@��p�(��r���@��{�dR>d������Ô��$ЛGƐ�W�J*'���#�2�8u�~Mc|?b�&V`�K<���׍y@/�ܟ�������8��THӘ ��F'/3uM�9�;
�Xo���0�w�a��9=�1�w��7��]��x�����c��@A������w����V��M)�ۻ���ƪ1�ƣ�8��i*mi|[��|���s���)u-��0@��ި|o��b�Ky%��hd}MUBZo,�QI^i�F}����k��1      �   �  x�ݓ[��@ F�������i��E��xI��r+#����ˆb�}�K�''��|Ч�����q�6I�#N#6	G�/8[s��w�}�@v� e�����&k���a^��xh��!CI�c �}��˲��7�dܷwl���*jSТRJY*�~�e�����#^TrIV�Mrq �[�� �o�E�����,����i�&�An�O������Fz��� ponC���J-��]B���긶�ӛ*Qcߖ4����m )���>�u�N����1�E<(ҹ�9��
��^�]o����e��p��=@��Ů,�t��Q����E�pf�ڊx����Ou�vo_����YJ��b.#S7�B]����\5]��%��^j*x@�\m*�w�A^��H����V(�?�K���> -�r���P���jU{ڝ�
�����n�v0�]`�S      �   L  x�EO�jA>k�BP
�����@�〡Ћ���g�V�cw�6=�Xz�u_�J�������'شZw�cb���1�L��ÐO��TU���	Lwl#Й��ʡ�������R��B�ل$*n�������W�ο�S}៘�p�^�Ϳ+>љ�4t���r2޻ݲ�%�	�T�C���.���F+��~]�}���'_C_��Ɉk�������@������ķ4�C��`mnqG�'��|�	Wٯ/�����T��[�1��I��K�psϴO��ZM'2|~vplB��G��QO$4&X��Lt)�y�D<�����oC��9�      �      x���ٮ�ڲ-������ԕ�������.l�_�9��YcX��3r�ֺw>�r�c�pk��-"z.����(�2ItR3�k�hq'�w�%��e��>���k�A��QU�Q�-�kdZ*�.מ����P����D/fc�(�ͤ�
�����]�w�L�YXY�Y��Y�U�-�&��@�ߥہQԂ��Ll���K�A�5�,�A��˧h6�`�)v@�R��-Y�Z�4[��cڕ�;��@���~� �>�?dP�M��,p�H�_��|	�U�f��g�ص�g<Q���&���n_��>��Ţ0ƨ"�/�E=��6g���9��Pt1:�����짖�U&A�/�jLJ�
Xt�&��h�C��jw�%�3$�q'RP
�%S���a�� �}� R���V�����b�C�%� 	w޵#+�s+9<�����%��#~u��Bc��v`�[� "C��v1� ##��XO~!z�Y/6��`�� ��m�� s�7F���)"v�S�;�Cu>�
�G`���/t���'Т�c�fIC�]��}�\u5|�������rDTY���-�mL�,� �"A�;$\�⶧�.����?<-t�EO��������&�#����W��8�恿�K��ӱ�>;�AR�\W��e�9S�5��c�*�~`� ~�wf����EP��_vԁ�S��p�d�v}�=�0e��jKW���j`�l>[��RW�d �r���P��?��� ��+�V���􅩐2�?ٵ���n]C/�1��e��J��|�";�	Ag�Q�ғ�?��1�P9J��l�v��X���$ϷeW�SV�O����5R�3U��)-5E�I��$2r�Ӕ����Sg�G��u鿹�Yc|ts5�}(^K�®������7�KԽz�0��J>P�O��\A��~r�����L�(%u`_C��hS��殔�^���8�ā��Z5�,_w�3)��l���ĉ��ÙCӳ7]��
%�=��L�P�
3wJ�?ݭ}�����{譿��?���x�@�u�/-vp�B�s��m�h�`i�$%	$t[m���������+�o~r�����/��wU}	��Nڎ;�0ꑏ�q�=C�~������5�~�+Ӷ�;`��%����_��I0��:ey>��8y��G�c��5�n��k]y#L���l�rS]��%\�"3����fz�R���u�z��,���'Ě�N���Oݭ��І��]���'�%y�3�$� �@k@�^edSe1_�7�:b����@��d�
q�?@'����
x�d����lY՗�<�4&�7�I�W�2(��)<��BU$�y�u	m\R���3I(��x��*W�ɸ>����j���ʍ������;�5�B���W*�r����7��o����w�k��fS�r?��e�	��P'���.Щ�bVV��3�]u/���7�[��y���Y��CP �-h���������q)�rO�l�R�O�i>'Gu�m���$��f�%���D�/��u$+�Q���1�8^�<T��,�7�j^�j����6���ˋv_;=z�9�{����ZB�;~�]��m��7�ʿ�c/�f_�v��)y���l� ��Q��>�Y͂�2�8,{�{��]=9~Q�����SU�G����
���P:5��T@���� �VD�]txs��/�[4}~ͨ�5�NZe�E �a,G�Qa�N�D2xR����Cy����]�����/�3� ��S�#GM���z��}G��S��M��q��1Nnp��"���|�1�eRy������S���\ㄞ�])��&�,\F�N&o�6[�~�4�7��ɧT�lޕ�jr�S@�W*)"�٠�$=4{,5�r(��و[B�b�q����m6y8<g׻����ַ���'�t�#uj�u������ʃ��l��YוG�� U]r1�:z��$p"�L��׎�;��͞��|��n�W�=��@���{���C��
������\��d�q����-:��w�)�βw�jݝ!���u�8���i��wZ�E��pe��ؼ��o�f�<˦m�("���e��z`�d��=//1w1�p���G���l�'��aW��y���� aאO�\�E��^=c�����xڡ@}B�=��6O�!JwH(��0�6����/pF��J�b��Ձ�R��m����Im��MU�xM%�x�����ҽ��6u�C��j�q!R�6������-�;맀�[(��8$6���s@>T��^X1��V�����*̪�r�.z�q��4���F}��[}�����6�@�	=���������n�ۉ������cwR�p$:=�2�
r$Ճ�]�?�(߅�U�7a�D&Ҟ�u�|pՓU��xL�-���E�KyY�^�L���4a��?��=t=`U�&� ���59!�#g}��ɳ�dh-�����W����|ީ�ίF�+�ַdyH���ϒ���9m�O��������Yt*�����l��+x�%�y�9���kMw�L>�"�G�Ѩ�/��BB�<`���y|�Ko�p�=��'�x��.���-�;9�~�P�C������Ƕ�7\��pd���t�%W/�L��d���/Mw��?���=�]����F%����>^�q>7,r��z_�U�/H|b���R�6�8�f��)( `��<+ʀQ_
.tID�P'��y�$w��V�v�������SSɏ���G�rwiP��6ɣ(�Z�j�Z����h+�� � ��+@U��3����cL�!N�R��ļҼ�`�$����7�&(��m��2�4(�S�"�Ζ�Ì]@ht�`λӰ����� �)���� Ům��4�FQ+�}R���:.ZW��%[,;73�y:���6�����������bڂTS,V;�S�X�0���9�Pi�*)��P������������_}�7=_��U2nz���\;���<����:�LV}e����xiA)��aW���ܷ�$N��>[����i �
��A��D1���n�UZ���\�����{2��LF�h�)�%�Z�^�=t91ͤHװ�m؃H�E�{����?�ǯ���8���ĝ������D��]�`�@)m6q��C�:;�֞?��-<~{�ioog������s��d-5��0�����Hu�sSW�<Sn@��������=,~k��\��K\�����}�e%Y� ��Z*�AK/�����|��~)��$�1Ÿ����:����щv܍��9]� 2�g�^����U�&c ��6'Q�f�����;_V�H�L�x[��L�.uv���p���HMW�����۬"�k�yq�rX�����}�E��i�G��-.GЃ�őǞ�{r��������nدG��ڰ����5���tQ�Hi$�c[*�J?ۏ��\RK��#A*���v�����m&��O�ޠe#΅�i�JY�=,��xnm��8���O��}K�k��\��>^�cn�ju7D/e
����]}vr��Զ^܆���=H��b�ȗ��xl;{�eR]�7B\l*X��e�ǀ�}��J������X�����f��~���m� �_3�TF��9!ӽ���qmN���3���@Ojs���U�=]�3mf#���~�q�Y��ϣ��H�7���=���)��2��`�ٰ��]�`�	�M��W)1u�,S��.�%�*�m�s�6��[�� �?+���?n�½RP ����n㳢{��N*���"E0� 7�����;/�oz>��Bxdn�X� �̪L>�ȹٕ1q�f��4Mˀ�G\�>z~]�K�"�`�ٸ.<r�8�b����(�t������� �������S<ѼP�&�ʽ��{=��p�y�r��;���ew���7m��S�`�5�w��L��H=g�$�J� �-s�)�����˂���6O��_�&�G
��m�B�䦣w�5�>/��1��e��q��ܷG�'x    H�_���֕��l�
{i�f�c䔓�����G&����av\�foo�m��Yc�����4A�֧F����ՠԈ����!`Vw٩�������7y �߮�m���7U���E������ipQq�C��ySĆ�-���:#����IͿA/`e���*�x֣��p������*]1��:�=#��m�x�o�o6��ʋ��}�m��JF;3��M�*0��@H��c�&r��.l�42�� �n�o�l͢�\��-7�L�v�����	�h-��N�*c����M�zo���l�m^�w�YVo��<E[�ַY㝔�6NZ�/�]��p��C���*;9{��ك���C�O���s�e0����2��P��.�.Ι�IT����A�t�Ȇuf��%�u��>�y��Ʋ�TTж��5+�0��^Dx E6N���������?�?
~�|2omR�0������<ȝ�����"K�]�K��w�n~������|i���R���D
@cC�VU�t�8��e�K5��8-��#�@6>y�m�i��9��~�$w�<�D;��(�w�1.M�%n��DF�%����־�_�JTY~�ʸ��^D�	9<�:���gh(����@aĭ4A�p�.�oG�W�]<����:_h�X�C���h����[i;{@o�t�������^�|ݰ��βm�#v�!:f��8\9a�����F��g����zz�ͯ������\�����{�B�vW����=���ɒ[��8�,�֮+�o�y{�[Y�e�I}�6�m=����A�L���c�@�&�\�8��=^6�y��(��_�P��Mn3n��G{�˫�`��^fz��#��ٌ�V}��v鹪ܧ`�~ ���6�v�eQ�^`�Y�9�j]y�k�5�:���&���p����S�İ�9
��o�o�����w�ݯ�%D�q'|wO�k��W6�s`�b'	X�v�	�	�@g�����������2Vo�1�s\)K ��pC����<"T������&�F�S���۫�6�Ѿ�u���>'��x����~C���	�G��D�e�@F���5���:����O�ow��o����y�x�6j��g{�f������Se�.g�!voY���J߽]�����}�L��3���[vb�d���>~~v�������2���6!QUz%���!���VR$x5~e��r ���̪��lZ��AA�KNye��#����A6=Wf�ɿ�����a�����-����o��鬹JJ�"/���ּ2��8�2��$u��5�~�FX����f>�����RL�=������=lՖ݊.�{�Y,�uQG����U&���H�����ߖ��?���	�j�5�\��^��Fݚ��p� lE�،3�@l�����o�Ɵ�}+�<��xq�5u�x5oo�#B�ْ2r�Ymt�=k)��;�\<�#�g��_��n�s�y�u
2x�=���\�v��&T���t�d��-G�ܥo����~=��<�U��� �j쩦�\W�?�����&�]���G������o&�:��Sd��O���Ďy������v���Nu���4��:c����M�V��W\��$~5ܣ30����p�qHȘ�|"Qq�奛�:������?e +y�` �ˑ�e[� �����0+c�e/�e<�M����w�������� �2P���F�tؐ�(��s�@g�=����CI1��R䇤ϯ��w��3���`1��� [�;]���pe)P�ńc�RI'Kq�'�����3��o�7�5��s�Y=�
ȭJ"�/W��]�8��JS�f
.��)����ʊ���Z�+K���DM�#�E�M�F܄�Kp����cGC��������
'��A_���՞XsU��]E$0r�@��v���B��o*tc�n/c�d��L<A�*�|�=��C�i����kB�j/}s�k���*��@��Iإ U&y�%q��"��:Ke�K����w�0�c�z��9�r����m�|�/dЪJ��bׯ�D��
��8�Tp�>�Xa(jH�f���4����#
#~��kt~��m��ZcV�0ĲT1QDt�x
�6��=���cֿ2�����V uK�-\��>) ��Ӑ�R����+7�Q��v:$�Ǵ�� ��`5WW�����da�/&�=�z���=6��;����cz�6���_���؎m�:oUC��B�Hؽ��>����dHݩ�D �P��a{|�lr~� V�u���T0�칳�&���;��8T��=���.z��
��cO������R%
��~�Ǜ���$$MaV�y��x�)
+��絈��A�d�e�ʚh8��u4�H�ձ�����V5z��h�'M�޷�/h�� �g���Z�j��	��H���A�+1��!%�����"m�"�p ���.���˅�l����/
%J�W�:U*Ҋr~�`�t�
�xV!����A�p8�H0����e�/A��g�\P����U�]�'��:tv`^�4���ԁD�b@�D�	C,??-�70_?��E�#�-�����;����ై�C��ai�i�dD[�W;Q��l�G�xfq2�М��D���i�JtU/�]��E����'�F�>������\s�q�Enx��y�g��(���~p���Ve�W�f )��xř�8��Y��z"�Jݚ�\�����oa�,�h̪�d����#�S=��C�YS( @��EPO���A�O~P��`�*��}�cNx�fVC�%��=�p@>��û�S���ݧ�G�A��l���6=KDg��׫p��d$��r�����n�u���yg����������:w�^T���ы2�.Vg`�q�"L���qj�O>ۘ^1Pn�EGL�=��]1y���#Brqv?AX�����\~ި�;��pVk�����"ږ'e��4&E��>��=�:���x��>~v��`�ʛb�<�A]7�R�({�O�q���Ec���SS$����Z��JU`�*Z����zou�8�d��%z���%Dheb3S�-�S���^�du�� C��=�ո=��\����\���Q5�j��d5�����5����5H����9���^dF�s�[l�;X�)���OW�����[���gӸ-Zj�:�&l�f�����AҁR�`>jB���	���G�_�h|��h�F����i�#T;;��H
;������Luy�M���M�q��!��suk�C8��Е�b��`H��~7&�
��^�70x����N�lK�����z'B0E�g)$�O2>X��?�4�U���<���ny)K��ȱ#��]�_�u0Qf0^N������Z��3��M���tҐ50a�hz��E�aQ�·�b���\�'/j��������>`c^��DhGF�z���� ���֬w�11v������"��xp���C�?�Qoi�~��ɓ�$�;r�1�����G�Hy��N�A[�Od>���3H`A�`��g���p�2:����h�+uͿ�uw�x�G)[�ti��Y�/��.�X����j�Q+z�g<�O%"��y�'�&�u�r�����NˑN���pV/T��`Ucd,���s��]$���c=���J�D !�)n�N-�?8��70p^zSu���Tp����'
a<fD�SݰR�í�GFL?��Xt�mW^0X��A�+v�#�s��mK�!�̝O��j����+��:E�H��x`��v���N�(y�X@J"�,�9{�&Y�9tA�(������'�+���`�p.�;)�j_�<�; II73C�K0�$��>?��e��N�_��
������ C V�|g���4Kt<[��1ה��OzS;z�uY}Q�@%���H2{گ$�p�����9������V�4���^��oP���=YP]r#/"�N�R�l�\��)�� ����f/z8+;&~����# ��[���䞽ݴ3�S:r��=vD�J�� z  �|�l��{<���ߴ���읜�r!��3:�/ԻL�\�bc���Ϟ��]$*v����n��s���`0��������ʀ}��A�^յ"��\Τv3�.ۮ��p7�Hk*��Sh'BH���~�^�k�Q`�{��xcx�a'�&���x)�k�@9� D�-�^�1x�MW�75Wŀ�aT��#݆�l��."n$tf9�N��"�@��\�be`��F�ʘ�7u,~�?T�bxD9�
:{ς/��,\T�m���y���U'pe�u���	v���4�0p $aGX1��@C�a��.G����*���3^"�E�rBc�9�:��{�MA�Nqk
BOj���n���\L���h+�5��N��*�m��d�w�D.pQw�§鳎ͬm�&����2�^?�e}$0�Ȝ�����č��X�a���.R�e��0������nl)[7VG�Y���|[��x�_iW�Goop�tb����w���k���st�O��݋T߱���ᮛ�~�Σ}$�O��}2�/+^г��]��gc��n�����,$)��S�vz-�V�\�������7����7��1�v\��8�7�;i�k�[ខ�Ԧ��j'C��ᦜg�R;�<�'���\� r �f���9������u�	=�L�{`��,���(�5��wa�2s
��[e�0�}RU��Ʈ�.�c�}����*^�G���"�Z(�rF�R�p?U��ξ�f�*?���X)�.\�����Aٶ�ͦX^��dR<�*�*č��͎^�h���9�������ՙ���X\0w.�����i�1�K:�>W/�����=��A���!��`���®!O�o��V��U�ڲ1x�M�Ֆ�2.s��);:��䉳?7*{D&�̱��C��o���`j�����Q1*C��]<ߙ���GT�;�U�cߓ.VQqt���q>I�y]ռ���
�A� T�7�49��q�V�7�=�렅���2[PN�2Q�5�{���|���O��{�م��>�fb���:�.3�Hm\5���c,����)���������4t�YU'C>���U��̇�q�Q��qN�Ւ���e��~��i��l��o�����OJ�L��+��=Y������?`��-����l�\��ԉ������i�|�;j������(x��C= �V=,��S���)�����f: ury�Kcc �;��O���}�8>M���hH[�&�T;����PL/����Z�>�u��^�+b���x�9K1'�/��+��vqBe�j�ʱ���p��C!<�R�py�Ow��/���ş���e��	[ڦ��F1�����M;U�=���(7?��z���4޲�� �r	�_�����S����G�j}[��m�к�S� ���u��xlO��~|6�a�6�l��Q����YO�����i�k<��K<�)J�[	�V�Ώ1���z���f��m:�һ|D����&�6����G���Fj�;j���8���2GzwCq`inw��cp��X�?����w�_��+�ɴ��{�x*���Y���'Z�4f����<�A�������:ߏGݬ�܎�+���Q�V&�)�����x�˦?�	Nn�����H�9�]Q�qәV�>�r]��]�_އ�.�������@�S��i�jF
Jg�Nxf]��bh{����<��6h�9�8y�FOU��{��t����$��_�jR�P!��7��Vg�2,]s�-���
xQ���H
��9�*�58��.��Ҁ�{$9���im��C8�������{�~�?��
t������>Y?�?��=��v}+�/l��x׊:s���=���3"&84��������m��      �   ]   x���1�  gxE_`�~���@C+~_�Ȣ�%w7*c#%�b8V:��/y��@2H@hd��ƍIPO��8�7����~�䈅��:h�^iB�      �   �  x�m�ɒ�@�3�}�3�mY\P4�R,���b���c;�Dؗ���UFFV��=$���'=����D|0���|�GS��.��v��,���kPirĽ��0�=��5��9�S�faB�ħC�o=lqE<꫼o��T��=Y˥1��΁����l=���w�&Z���/�A����4*�]y�����:wl��U���J����[�L!��y&���	"H��W��3�籠1�>d�U�Q�+;�l�J�xj6���f:G�k~&�8ϟx�.�`������[h��^?�\�*`�9�3�ʎ����δk4�]�K?�vX��|����x��C��r{����M���$��F_f�������8P�� R�?�*0�_��y�{)Xy����;��]�5kg���zJ�9�E�6x�F�:~�av_H����/��3�DY]��LU�J����!�4;��S�Φފ	�*`�'G+x������Z��<�Ln�3�
NdV�5?��M�������`'w�;������]�w�e)��DL�3KT��J����Kt�?+i�2�����߷r�����g'�Kv{D^o��R�I|Z+J|�%�`4Hu]���f|�t����\ZH|�+_1NOK��b��ޤ��coՀ��mh܃��v͓!��������2MS�_��ʣ�
.���jr+K ���<�y���n��D����<���I������y      �   _  x����o�@����o�r�nbvY�r��Vm�iҌr�)�@g@�}A٬��^�@�}9�wf	hN�����H0�\��ARx��l�Hh�Hx�ȕI����,e�nn2�M����{���M#��`�͞���{�>�4q!�%S[�f������h)j��V��J�܀]A�P��aWg�M�@W&��D:c��;�J�H^�6�"6
�|L�U�(�	1�S�
uO�e�����d�	�2`|/�H)t�� C�ޒ6t�_� K�7��ƹD���Y,�#S+C+k^L<�zB�y9���Ȣ����c��|���Μ�c@g������_��Dt�x-t���>ĚpW6p�]��G�7g[�G`���g�i ^���8rG���C���?�e�����V���x�O��ϥT$:�mK}o&��� 
�:�%��=��������Σ0{z�+�x6���{Ƭ�O
l6@Ux���	��N�P�i��,�@�2�X��>6��D��G8�/��v��G��\��(h�ju3���x~|�����{PV���
��{`=HB���Sp�	��!G�g�������c`�05��:0�Q���EQ�;���ݗk�<��n�     