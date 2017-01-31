# Wordpress Template

This repository is meant to be used as a starting point for any wordpress project. It was created to fulfill these requirements:
 
* Parent theme as a solid foundation to build on and reuse in every WP theme we create going forward (Scratch: http://scratchtheme.com)
    * Reusable snippets
    * Wordpress enhancements / fixes / normalisation
    * Commonly needed helper functions
* Child theme demonstrating how to override and reuse code from the parent theme
* Plugins commonly used across all projects
* Git branch structure that will reflect the supported version of Wordpress
* Simplified development setup / configuration


## Setup
 
```sh
$ npm install
```

This installs gulp’s module dependencies, and then runs gulp init automatically. 

This will ask you for a **theme name** and a **host url**. Then:
* It updates the gulpfile with your variables. **(update-gulpfile)**
* Copies the child template from the scratch/child-template directory **(copy-child-template)**
* Changes the theme’s name in style.css **(create-theme)**
* Updates your wp-config.php **(update-wp-config)** with:
    * Salts from [https://api.wordpress.org/secret-key/1.1/salt/]
    * DB_NAME as THEME
    * WP_SITEURL as HOST_URL
    * WP_HOME as HOST_URL
* Compiles the base template SASS and auto-prefixes into scratch/public/base-main.css **(base-styles)**
* Concatenates base template scripts into scratch/public/base-main.js **(base-javascript)**

```sh
$ gulp
```

* Starts up BrowserSync
* Compiles, minifies and auto-prefixes child template SASS
* Compiles, minifies and uglifies child template javascript
* Watches for changes in child SASS, javascript, PHP, HTML files and reloads the page through BrowserSync
* Watches for image changes and optimises them automatically

## What's already included

### Config

There are just 2 environment configs Development and Production. They are stored in the root folder **/env** and will be loaded based on the environment variable **WP_ENV**.

The main difference between the files is that development has the default settings for the database to be the internal **webdev.candyspace.com** and production retrieves that information from environment variables.

### Plugins

| Plugin                             |                                                                                                                              Description                                                                                                                             | Licence Required |
|------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------:|
| ACF Pro                            |                                                                                           Extend any Wordpress post type, taxonomy or term with a variety of custom fields                                                                                           |        yes       |
| WPML                               | The most popular Wordpress translation tool available. Included by default as most websites we have create have either requested or have plans to implement this feature. It's not activated by default but we have unlimited licences so not reason not to have it. |        yes       |
| WPML - ACF Integration             |                                                                                                                   Need this if we have ACF and WPML                                                                                                                  |        yes       |
| All in One WP Security & Firewall  |                                                                                                         Various tools to help with security gaps in Wordpress                                                                                                        |        No        |
| SearchWP                           |                                                         This plugin extends the default Wordpress search to allow for granular control of how results are returned to the user. We have an unlimited licence.                                                        |        Yes       |
| WP Sync DB                         |                                                                                           A useful developer tool for safely migrating DBs from one environment to the next                                                                                          |        No        |
| Yoast SEO                          |                                                                                                          SEO plugin to add correct meta data across the site                                                                                                         |        No        |
| ACF Content Analysis for Yoast SEO |                                                                                                         SEO plugin extention to properly use ACF data for SEO                                                                                                        |        No        |
| Super Socializer                   |                                                                                     Social integration plugin that handles authentication, sharing, syncing user account and much more                                                                               |        No        |