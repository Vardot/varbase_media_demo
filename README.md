# Varbase Media Demo Assets

Provide a pre-set of default media assets for all Varbase Media Types,
which are needed in development, testing, and demos.

Change directory to you Varbase Project in the terminal:
```
cd /var/www/html/projects/PROJECT_DIR_NAME
```

Install with Composer
```
composer require 'drupal/varbase_media_demo:~9.0'
```

Enable the module by Drush ( or install it from the UI)
```
drush en varbase_media_demo
```

Open the site with the browser and navigate to `"/admin/content/media-grid"`
