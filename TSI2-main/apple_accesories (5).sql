-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2025 a las 17:35:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `apple_accesories`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ajustes`
--

CREATE TABLE `ajustes` (
  `cod_ajuste` int(11) NOT NULL,
  `cod_pedido` varchar(10) DEFAULT NULL,
  `tipo_ajuste` tinyint(1) NOT NULL,
  `cantidad` tinyint(4) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` date NOT NULL,
  `cod_usuario` varchar(10) DEFAULT NULL,
  `cod_producto` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `ajustes`
--

INSERT INTO `ajustes` (`cod_ajuste`, `cod_pedido`, `tipo_ajuste`, `cantidad`, `descripcion`, `fecha`, `cod_usuario`, `cod_producto`) VALUES
(1, NULL, 1, 5, 'Compra de inventario adicional', '2025-11-07', '12345678-9', 'IPH01'),
(2, NULL, 0, 2, 'Producto dañado en almacén', '2025-11-07', '12345678-9', 'IPH01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `cod_carrito` int(11) NOT NULL,
  `cod_usuario` varchar(10) NOT NULL,
  `cod_producto` varchar(10) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` int(11) NOT NULL,
  `cod_pedido` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `cod_categoria` varchar(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`cod_categoria`, `nombre`, `descripcion`) VALUES
('CAT01', 'Mac', 'Computadores Apple: MacBook y iMac'),
('CAT02', 'iPads', 'Tablets Apple'),
('CAT03', 'iPhone', 'Smartphones Apple'),
('CAT04', 'Accesorios', 'Accesorios oficiales de Apple');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `cod_usuario` varchar(10) NOT NULL,
  `nombre_apellido` varchar(20) DEFAULT NULL,
  `correo` varchar(40) DEFAULT NULL,
  `direccion` varchar(40) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `contraseña` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`cod_usuario`, `nombre_apellido`, `correo`, `direccion`, `telefono`, `contraseña`) VALUES
('12345678-9', 'JUAN PERE', 'dsfdfs@gmail.com', 'dfvdfv', '342423', '$2b$10$3k1dlqncH/OL3b.FaJV84utgeYGScJLUuOxKaACJPjnENPgJbgTFC'),
('22046310-9', 'Vicente Olmos', 'vicente@gmail.com', 'Playa Ancha', '910131848', '$2b$10$Y9wRY6aj7052791rlMqC4eR/SuhKeEaf1dsecMwhUVnMQXXzwqKS2'),
('22141060-2', 'Sebastian Galea', 'sebastian@gmail.com', 'Casa Blanca', '998589993', '$2b$10$PSZTRB/qKI37w1dWxD2I2e3lbqtfyYsQBtewDzxFlNuIwRlVkoUCy'),
('34874653-4', 'Jennifer Reymer', 'Jenny@gmail.com', 'playa ancha', '847020013', '$2b$10$mX5D3L7pGuMcARN7XF/O9OhkRsvi/SY/goa6YsiqUf5aeUq0PtWQG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `cod_pedido` varchar(10) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(20) NOT NULL,
  `total` int(11) NOT NULL,
  `comprobante` varchar(60) DEFAULT NULL,
  `empresa_envio` varchar(20) DEFAULT NULL,
  `fecha_envio` date DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `cantidad` tinyint(4) NOT NULL,
  `anulado` tinyint(1) NOT NULL,
  `fecha_pedido` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`cod_pedido`, `fecha`, `estado`, `total`, `comprobante`, `empresa_envio`, `fecha_envio`, `fecha_entrega`, `cantidad`, `anulado`, `fecha_pedido`) VALUES
('PED001', '2024-01-14', 'pendiente', 299999, 'COMP001', 'DHL Express', '2024-01-15', '2024-01-19', 3, 0, '2024-01-14'),
('PED002', '2024-01-14', 'pendiente', 56765756, 'COMP002', 'VIXIN OLMIS', '2024-01-15', '2024-01-19', 9, 0, '2024-01-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `cod_producto` varchar(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(40) DEFAULT NULL,
  `precio_unitario` float NOT NULL,
  `stock` tinyint(4) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `cod_categoria` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`cod_producto`, `nombre`, `descripcion`, `precio_unitario`, `stock`, `imagen`, `cod_categoria`) VALUES
('ACC01', 'MACBOOK ', 'MACKNOOK 54 PULGADAS', 9999, 2, 'https://PUM.com/imagen.jpg', 'CAT04'),
('ACC02', 'Audífonos AirPods', 'Audífonos inalámbricos Apple AirPods', 30000, 40, 'https://PUM.com/airpods.jpg', 'CAT04'),
('IPA01', 'iPad Air', 'Tablet Apple iPad Air de 10.9 pulgadas', 120000, 25, 'https://PUM.com/ipadair.jpg', 'CAT02'),
('IPA02', 'iPad Pro 11', 'Tablet Apple iPad Pro de 11 pulgadas', 180000, 20, 'https://PUM.com/ipadpro11.jpg', 'CAT02'),
('IPH01', 'iPhone 14', 'Smartphone Apple iPhone 14', 220000, 33, 'https://PUM.com/iphone14.jpg', 'CAT03'),
('IPH02', 'iPhone 14 Pro', 'Smartphone Apple iPhone 14 Pro', 270000, 18, 'https://PUM.com/iphone14pro.jpg', 'CAT03'),
('MAC01', 'MacBook Pro 16', 'Laptop Apple MacBook Pro de 16 pulgadas', 250000, 10, 'https://PUM.com/macbookpro16.jpg', 'CAT01'),
('MAC02', 'Mac Mini M1', 'Computadora de escritorio Mac Mini con c', 150000, 15, 'https://PUM.com/macmini.jpg', 'CAT01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento`
--

CREATE TABLE `seguimiento` (
  `nro_seguimiento` varchar(10) NOT NULL,
  `cod_pedido` varchar(20) NOT NULL,
  `fecha_cambio` datetime NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `cod_usuario` varchar(10) NOT NULL,
  `nombre_usuario` varchar(20) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `tipo_usuario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`cod_usuario`, `nombre_usuario`, `contraseña`, `tipo_usuario`) VALUES
('12345678-9', 'JUAN PERE', '$2b$10$//k0MvG8X3T2z62GaJGYmeKk46eCa52klceUkcWZSjCasJ9w/CK7K', 0),
('22046310-9', 'Vicente Olmos', '$2b$10$hsjRFr3ooMBWG/qx3LrLpOP6IiosIzqwfPgFND1opl.4jUjKhxj8S', 1),
('22141060-2', 'Sebastian Galea', '$2b$10$4XNG4EU49QOk6M3VEa3i5OahTiUrmSzwHQwwdhd57tegzHhFQvmRq', 1),
('34874653-4', 'Jennifer Reymer', '$2b$10$RcdNy0dyf5PUBNhWb5p93OdEjO4AiIEpOVkHOASgyfG4ZeyX8GlI.', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ajustes`
--
ALTER TABLE `ajustes`
  ADD PRIMARY KEY (`cod_ajuste`),
  ADD KEY `cod_usuario` (`cod_usuario`),
  ADD KEY `cod_producto` (`cod_producto`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`cod_carrito`),
  ADD KEY `cod_usuario` (`cod_usuario`),
  ADD KEY `cod_producto` (`cod_producto`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`cod_categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cod_usuario`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`cod_pedido`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`cod_producto`),
  ADD KEY `cod_categoria` (`cod_categoria`);

--
-- Indices de la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD PRIMARY KEY (`nro_seguimiento`),
  ADD KEY `cod_pedido` (`cod_pedido`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`cod_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ajustes`
--
ALTER TABLE `ajustes`
  MODIFY `cod_ajuste` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `cod_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ajustes`
--
ALTER TABLE `ajustes`
  ADD CONSTRAINT `ajustes_ibfk_1` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`),
  ADD CONSTRAINT `ajustes_ibfk_2` FOREIGN KEY (`cod_producto`) REFERENCES `productos` (`cod_producto`);

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`cod_producto`) REFERENCES `productos` (`cod_producto`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`cod_categoria`) REFERENCES `categorias` (`cod_categoria`);

--
-- Filtros para la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD CONSTRAINT `seguimiento_ibfk_1` FOREIGN KEY (`cod_pedido`) REFERENCES `pedido` (`cod_pedido`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
