# Varbase Media Demo Assets

Provide a pre-set of default media assets for all Varbase Media Types,
which are needed in development, testing, and demos.

Change directory to the Varbase Project in the terminal:
```
cd /var/www/html/projects/PROJECT_DIR_NAME
```

Install with Composer
```
composer require 'drupal/varbase_media_demo'
```

Enable the module by Drush ( or install it from the UI)
```
./bin/drush en varbase_media_demo
```

Open the site with the browser and navigate to `"/admin/content/media-grid"`

Media Library Grid view
![](https://www.drupal.org/files/issues/2023-08-30/varbase-media-demo-assets--Varbase-10--media-library--grid.png)

Media Library - Images
![](https://www.drupal.org/files/issues/2023-08-30/Create-Blog-post-varbase10c1--media-library--images.png)

Media Library - Remote Videos
![](https://www.drupal.org/files/issues/2023-08-30/Create-Blog-post-varbase10c1--media-library--remote_vidoes.png)

Media Library - Local Videos
![](https://www.drupal.org/files/issues/2023-08-30/Create-Blog-post-varbase10c1--media-library--local_vidoes.png)
