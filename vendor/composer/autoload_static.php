<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd0c322ea27415053c00f585faef9c6bd
{
    public static $files = array (
        '48483d6c44b015b6d6d681c009d084a7' => __DIR__ . '/../..' . '/src/helpers.php',
    );

    public static $prefixLengthsPsr4 = array (
        'G' => 
        array (
            'GameOfLife\\Tests\\' => 17,
            'GameOfLife\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'GameOfLife\\Tests\\' => 
        array (
            0 => __DIR__ . '/../..' . '/tests',
        ),
        'GameOfLife\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd0c322ea27415053c00f585faef9c6bd::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd0c322ea27415053c00f585faef9c6bd::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}