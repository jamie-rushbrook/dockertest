<?php

/** MySQL database username */
define('DB_USER', getenv('DB_USER'));
/** MySQL database password */
define('DB_PASSWORD', getenv('DB_PASSWORD'));
/** MySQL hostname */
define('DB_HOST', getenv('DB_HOST'));

/** The name of the database for WordPress */
define('DB_NAME', getenv('DB_NAME'));
/** Site url */
define('WP_SITEURL', 'http://scratch.candyspace.com');
/** Site home */
define('WP_HOME', 'http://scratch.candyspace.com');

/** Debug Mode **/
define('WP_DEBUG', false);

/** Tracking ID **/
define('GA_ID', getenv('GA_ID'));

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');


//SALTS
define('AUTH_KEY',         '(G.{^?%RC$c]Gku&-*[n-t+9@!;h0*Qx?c%}W~9|rBVS%#i;&|#]pkVP+9-UYL7l');
define('SECURE_AUTH_KEY',  'yB1_+IPU_Ry?)7C^.4kR{8)NBjq)aQ8<o={dv Hc|VF $]GK.c{K9&%@c/[jA+|w');
define('LOGGED_IN_KEY',    ';kj;vSbwW*[]aG-P+kgR!T;RXFgDVL*Ms23)7fATx?kg}Rr|b6xP+ nsDkn>|sFy');
define('NONCE_KEY',        '/TP2,zhb3S_ifC=RiUO2fgz0=BDv7rr<{>ZK6)NRD^KWQg3W;Nzy@}EQj&e=6n}*');
define('AUTH_SALT',        'Z7gOP/[zs374],zry.DoB`]ZNEQzN|2.m94~)irbeBzoVjxm/,:R:eC:+I}5a9Kb');
define('SECURE_AUTH_SALT', 'E@pQsp{U+@iJ](,*,&eY!T;Y[z2IMF:y}r2)SqIB4a/t zs*+]{si@s.% t4|ofM');
define('LOGGED_IN_SALT',   'Vg Nh>[RG2]i-?ERwt^9~+dYhSz2k^,N};u%XybI,33l;KR `L4ly=>szn;VR>O`');
define('NONCE_SALT',       'qrcB`[l-I~x_E[$=gKj;|19NVe8+,grZ.frZ=.9{fVBjw)x[5|7FWLyHx*$:KsI');

