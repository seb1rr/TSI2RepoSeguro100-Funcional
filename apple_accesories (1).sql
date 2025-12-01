-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2025 at 09:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apple_accesories`
--

-- --------------------------------------------------------

--
-- Table structure for table `ajustes`
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
-- Dumping data for table `ajustes`
--

INSERT INTO `ajustes` (`cod_ajuste`, `cod_pedido`, `tipo_ajuste`, `cantidad`, `descripcion`, `fecha`, `cod_usuario`, `cod_producto`) VALUES
(1, NULL, 1, 5, 'Compra de inventario adicional', '2025-11-07', '12345678-9', 'IPH01'),
(2, NULL, 0, 2, 'Producto dañado en almacén', '2025-11-07', '12345678-9', 'IPH01'),
(3, NULL, 1, 12, 'a', '2025-11-29', '22141060-2', 'IPA01'),
(4, NULL, 1, 12, 'a', '2025-11-29', '22141060-2', 'IPH01');

-- --------------------------------------------------------

--
-- Table structure for table `carrito`
--

CREATE TABLE `carrito` (
  `cod_carrito` int(11) NOT NULL,
  `cod_usuario` varchar(10) NOT NULL,
  `cod_producto` varchar(10) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` int(11) NOT NULL,
  `cod_pedido` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `carrito`
--

INSERT INTO `carrito` (`cod_carrito`, `cod_usuario`, `cod_producto`, `cantidad`, `precio_unitario`, `cod_pedido`) VALUES
(16, '22141060-2', 'ACC02', 1, 30000, NULL),
(18, '22141060-2', 'IPH02', 2, 270000, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `cod_categoria` varchar(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`cod_categoria`, `nombre`, `descripcion`) VALUES
('CAT01', 'Mac', 'Computadores Apple: MacBook y iMac'),
('CAT02', 'iPads', 'Tablets Apple'),
('CAT03', 'iPhone', 'Smartphones Apple'),
('CAT04', 'Accesorios', 'Accesorios oficiales de Apple');

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
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
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`cod_usuario`, `nombre_apellido`, `correo`, `direccion`, `telefono`, `contraseña`) VALUES
('12345678-9', 'JUAN PERE', 'dsfdfs@gmail.com', 'dfvdfv', '342423', '$2b$10$3k1dlqncH/OL3b.FaJV84utgeYGScJLUuOxKaACJPjnENPgJbgTFC'),
('22046310-9', 'Vicente Olmos', 'vicente@gmail.com', 'Playa Ancha', '910131848', '$2b$10$Y9wRY6aj7052791rlMqC4eR/SuhKeEaf1dsecMwhUVnMQXXzwqKS2'),
('22141060-2', 'Sebastian Galea', 'sebastian@gmail.com', 'Casa Blanca', '998589993', '$2b$10$PSZTRB/qKI37w1dWxD2I2e3lbqtfyYsQBtewDzxFlNuIwRlVkoUCy'),
('22151060-2', 'SebaGalea', 'jose@gmail.com', 'MAs pa alla q pa aca', '998589993', '$2b$10$l4/xV3ptMK20tuOC/IgKiefWnkHh23agrQXJ8iJ2MUWLDOrX9Tihe'),
('22161060-2', 'seba', 'seba@gmail.com', 'aknfanf', '914019481', '$2b$10$ggWj7SuEPJ/wWLB8dKnZU.NP/rgqnKRjCS8ggvScwPwwUZ19kqk0i'),
('22181060-2', 'SebitaKitKat', 'amarogalea40@gmail.com', 'por ahi noma', '998589993', '$2b$10$WpHX1UvnObv/wkZUvOOtpO9cLlMM/JojnFEChR4YKPkW9sgUJliHm'),
('34874653-4', 'Jennifer Reymer', 'Jenny@gmail.com', 'playa ancha', '847020013', '$2b$10$mX5D3L7pGuMcARN7XF/O9OhkRsvi/SY/goa6YsiqUf5aeUq0PtWQG');

-- --------------------------------------------------------

--
-- Table structure for table `pedido`
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
-- Dumping data for table `pedido`
--

INSERT INTO `pedido` (`cod_pedido`, `fecha`, `estado`, `total`, `comprobante`, `empresa_envio`, `fecha_envio`, `fecha_entrega`, `cantidad`, `anulado`, `fecha_pedido`) VALUES
('PED001', '2024-01-14', 'pendiente', 299999, 'COMP001', 'DHL Express', '2024-01-15', '2024-01-19', 3, 0, '2024-01-14'),
('PED002', '2024-01-14', 'entregado', 56765756, 'COMP002', 'Starken', '2025-12-01', '2025-12-01', 9, 0, '2024-01-14'),
('PED003', '2025-12-01', 'enviado', 570000, 'COMP003', 'Starken', '2025-12-01', NULL, 3, 0, '2025-12-01');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
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
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`cod_producto`, `nombre`, `descripcion`, `precio_unitario`, `stock`, `imagen`, `cod_categoria`) VALUES
('ACC01', 'MACBOOK ', 'MACKNOOK 54 PULGADAS', 9999, 2, 'mackbook.png', 'CAT04'),
('ACC02', 'Audífonos AirPods', 'Audífonos inalámbricos Apple AirPods', 30000, 40, 'airpods.png', 'CAT04'),
('ACC03', 'GALEAAAAAAA', 'Productro', 1, 12, 'galea.png', 'CAT04'),
('IPA01', 'iPad Air', 'Tablet Apple iPad Air de 10.9 pulgadas', 120000, 37, 'ipadair.png', 'CAT02'),
('IPA02', 'iPad Pro 11', 'Tablet Apple iPad Pro de 11 pulgadas', 180000, 20, 'ipadpro11.png', 'CAT02'),
('IPH01', 'iPhone 14', 'Smartphone Apple iPhone 14', 220000, 45, 'iphone14.png', 'CAT03'),
('IPH02', 'iPhone 14 Pro', 'Smartphone Apple iPhone 14 Pro', 270000, 18, 'iphone14pro.png', 'CAT03'),
('MAC01', 'MacBook Pro 16', 'Laptop Apple MacBook Pro de 16 pulgadas', 250000, 10, 'mackbookpro16.png', 'CAT01'),
('MAC02', 'Mac Mini M1', 'Computadora de escritorio Mac Mini con c', 150000, 15, 'macmini.png', 'CAT01'),
('MAC03', 'MACBOOK Pro', 'Macbook pro', 120000, 2, 'mackbookpro.png', 'CAT01');

-- --------------------------------------------------------

--
-- Table structure for table `seguimiento`
--

CREATE TABLE `seguimiento` (
  `nro_seguimiento` varchar(10) NOT NULL,
  `cod_pedido` varchar(20) NOT NULL,
  `fecha_cambio` datetime NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `cod_usuario` varchar(10) NOT NULL,
  `nombre_usuario` varchar(20) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `tipo_usuario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`cod_usuario`, `nombre_usuario`, `contraseña`, `tipo_usuario`) VALUES
('12345678-9', 'JUAN PERE', '$2b$10$//k0MvG8X3T2z62GaJGYmeKk46eCa52klceUkcWZSjCasJ9w/CK7K', 0),
('22046310-9', 'Vicente Olmos', '$2b$10$hsjRFr3ooMBWG/qx3LrLpOP6IiosIzqwfPgFND1opl.4jUjKhxj8S', 1),
('22141060-2', 'Sebastian Galea', '$2b$10$4XNG4EU49QOk6M3VEa3i5OahTiUrmSzwHQwwdhd57tegzHhFQvmRq', 1),
('22151060-2', 'SebaGalea', '$2b$10$khx.wxjaLWut38KY7jMWiOvGrEi.nWjp60SgZ9SllPgwV0J0VL842', 0),
('22161060-2', 'seba', '$2b$10$v.Tp.ZYlp08sg4xw0LVvN.AtGBOnx7LYMZnblpOZXrXNSaWM9ijEG', 0),
('22181060-2', 'SebitaKitKat', '$2b$10$8Q37lwlGV691LLR/XsSCrOuxMLET8W1/y1VRiEzwTedAXwkXAYoKC', 0),
('34874653-4', 'Jennifer Reymer', '$2b$10$RcdNy0dyf5PUBNhWb5p93OdEjO4AiIEpOVkHOASgyfG4ZeyX8GlI.', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ajustes`
--
ALTER TABLE `ajustes`
  ADD PRIMARY KEY (`cod_ajuste`),
  ADD KEY `cod_usuario` (`cod_usuario`),
  ADD KEY `cod_producto` (`cod_producto`);

--
-- Indexes for table `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`cod_carrito`),
  ADD KEY `cod_usuario` (`cod_usuario`),
  ADD KEY `cod_producto` (`cod_producto`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`cod_categoria`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cod_usuario`);

--
-- Indexes for table `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`cod_pedido`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`cod_producto`),
  ADD KEY `cod_categoria` (`cod_categoria`);

--
-- Indexes for table `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD PRIMARY KEY (`nro_seguimiento`),
  ADD KEY `cod_pedido` (`cod_pedido`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`cod_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ajustes`
--
ALTER TABLE `ajustes`
  MODIFY `cod_ajuste` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carrito`
--
ALTER TABLE `carrito`
  MODIFY `cod_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ajustes`
--
ALTER TABLE `ajustes`
  ADD CONSTRAINT `ajustes_ibfk_1` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`),
  ADD CONSTRAINT `ajustes_ibfk_2` FOREIGN KEY (`cod_producto`) REFERENCES `productos` (`cod_producto`);

--
-- Constraints for table `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`cod_usuario`) REFERENCES `usuario` (`cod_usuario`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`cod_producto`) REFERENCES `productos` (`cod_producto`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`cod_categoria`) REFERENCES `categorias` (`cod_categoria`);

--
-- Constraints for table `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD CONSTRAINT `seguimiento_ibfk_1` FOREIGN KEY (`cod_pedido`) REFERENCES `pedido` (`cod_pedido`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
