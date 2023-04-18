-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2023 at 03:37 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id_user` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `privilege` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `session` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id_user`, `username`, `password`, `date_created`, `privilege`, `session`, `status`) VALUES
('USR001', 'admin2', '123123', '2023-04-18 16:11:15', 'admin', '', 'active'),
('USR002', 'admin1', '123123', '2023-04-18 16:11:43', 'admin', '', 'active'),
('USR003', 'syphu', '123123', '2023-04-18 16:11:01', 'customer', '', 'active'),
('USR004', 'khaphi', '123123', '2023-04-18 16:11:19', 'customer', '', 'idle'),
('USR005', 'minhthao', '123123', '2023-04-18 16:16:08', 'customer', '', 'active'),
('USR006', 'congmenh', '123123', '2023-04-18 16:16:06', 'customer', '', 'active'),
('USR007', 'manager1', '123123', '2023-04-18 16:16:00', 'manager', '', 'active'),
('USR008', 'manager2', '123123', '2023-04-18 16:15:58', 'manager', '', 'active'),
('USR009', 'phuu', '123123', '2023-04-18 16:15:56', 'sales', '', 'active'),
('USR010', 'phii', '123123', '2023-04-18 16:15:53', 'sales', '', 'active'),
('USR011', 'thao', '123123', '2023-04-18 16:15:47', 'sales', '', 'active'),
('USR012', 'menh', '123123', '2023-04-18 16:15:45', 'sales', '', 'active'),
('USR014', 'phideptraihehee', '123123', '2023-04-18 16:15:36', 'sales', '', 'active'),
('USR016', 'admin3', '123123', '2023-04-18 16:11:12', 'admin', '', 'active'),
('USR017', 'someoneyoulove', '123123', '2023-04-18 16:11:11', 'admin', '', 'idle');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id_customer` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_color` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_size` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id_customer`, `id_product`, `id_color`, `id_size`, `amount`, `price`) VALUES
('KH001', 'AO00000002', '#ffffff', 'AOXL', 2, 400000),
('KH002', 'AO00000002', '#ffffff', 'AOXL', 2, 400000),
('KH002', 'QU00000001', '#000000', 'QUXL', 2, 560000),
('KH003', 'AO00000001', '#000000', 'AOS', 3, 320000),
('KH003', 'QU00000002', '#ffffff', 'QUS', 3, 240000);

-- --------------------------------------------------------

--
-- Table structure for table `classify`
--

CREATE TABLE `classify` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id_big_classify` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classify`
--

INSERT INTO `classify` (`id`, `name`, `image`, `id_big_classify`, `gender`) VALUES
('AO', 'Áo', 'Link hỏi Phú', NULL, NULL),
('AOSOMI', 'Sơ mi', 'Link hỏi Phú', 'AO', 'nam'),
('AOTHUN', 'Áo Thun', 'Link hỏi Phú', 'AO', 'nam'),
('QU', 'Quần', 'Link hỏi Phú', NULL, NULL),
('QUTAY', 'Quần Tây', 'Link hỏi Phú', 'QU', 'nam'),
('QUTHUN', 'Quần Thun', 'Link hỏi Phú', 'QU', 'nam');

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`id`, `name`) VALUES
('#ffffff', 'Trắng'),
('#000000', 'Đen');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `numberphone` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `id_user` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `birthday`, `numberphone`, `image`, `address`, `gender`, `id_user`) VALUES
('KH001', 'Phú', '2002-11-30 00:00:00', '394142892', NULL, 'HCM', 'nam', 'USR003'),
('KH002', 'Phi', '2002-06-28 00:00:00', '394142894', NULL, 'HCM', 'nam', 'USR004'),
('KH003', 'Mềnh', '2002-02-18 00:00:00', '394142896', NULL, 'HCM', 'nam', 'USR006'),
('KH004', 'Thao', '2002-07-29 00:00:00', '394142898', NULL, 'HCM', 'nam', 'USR005');

-- --------------------------------------------------------

--
-- Table structure for table `detail_import_coupon`
--

CREATE TABLE `detail_import_coupon` (
  `id_import_coupon` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_color` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_size` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `price_input` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_import_coupon`
--

INSERT INTO `detail_import_coupon` (`id_import_coupon`, `id_product`, `id_color`, `id_size`, `amount`, `price_input`) VALUES
('NHAP001', 'AO00000001', '#000000', 'AOS', 20, 280000),
('NHAP001', 'AO00000001', '#000000', 'AOXL', 20, 280000),
('NHAP001', 'AO00000002', '#ffffff', 'AOS', 20, 350000),
('NHAP001', 'AO00000002', '#ffffff', 'AOXL', 20, 350000),
('NHAP002', 'QU00000001', '#000000', 'QUS', 20, 500000),
('NHAP002', 'QU00000001', '#000000', 'QUXL', 20, 500000),
('NHAP002', 'QU00000002', '#ffffff', 'QUS', 20, 200000),
('NHAP002', 'QU00000002', '#ffffff', 'QUXL', 20, 200000);

-- --------------------------------------------------------

--
-- Table structure for table `detail_promotion`
--

CREATE TABLE `detail_promotion` (
  `id_promotion` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_promotion`
--

INSERT INTO `detail_promotion` (`id_promotion`, `id_product`) VALUES
('KM001', 'AO00000001'),
('KM001', 'AO00000002');

-- --------------------------------------------------------

--
-- Table structure for table `detail_receipt`
--

CREATE TABLE `detail_receipt` (
  `id_receipt` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_size` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_color` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_import_coupon` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_receipt`
--

INSERT INTO `detail_receipt` (`id_receipt`, `id_size`, `id_color`, `id_product`, `id_import_coupon`, `amount`, `price`) VALUES
('HD000', 'AOS', '#000000', 'AO00000001', 'NHAP001', 3, 320000),
('HD000', 'QUS', '#ffffff', 'QU00000002', 'NHAP002', 3, 240000),
('HD001', 'AOXL', '#ffffff', 'AO00000002', 'NHAP001', 2, 400000),
('HD001', 'QUXL', '#ffffff', 'QU00000002', 'NHAP002', 2, 240000),
('HD002', 'AOS', '#ffffff', 'AO00000002', 'NHAP001', 2, 320000),
('HD002', 'AOXL', '#ffffff', 'AO00000002', 'NHAP001', 2, 400000);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `timestamp` int(50) NOT NULL,
  `detail` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `severity` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `actor` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`timestamp`, `detail`, `severity`, `type`, `actor`) VALUES
(1086300660, 'Add new account - USR007', 'harmless', 'add', 'admin2'),
(1440535999, 'Add new account - USR005', 'harmless', 'add', 'admin2'),
(1481419816, 'Add new account - USR002', 'harmless', 'add', 'admin2'),
(1656308120, 'Add new account - USR003', 'harmless', 'add', 'admin2'),
(1681119441, 'Add new account - USR007', 'harmless', 'add', 'admin2'),
(1778994355, 'Add new account - USR004', 'harmless', 'add', 'admin2');

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`id`) VALUES
('nam'),
('nữ'),
('unisex');

-- --------------------------------------------------------

--
-- Table structure for table `image_product`
--

CREATE TABLE `image_product` (
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `link_image` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name_image` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image_product`
--

INSERT INTO `image_product` (`id_product`, `link_image`, `name_image`) VALUES
('AO00000001', 'Link hỏi Phú', NULL),
('AO00000002', 'Link hỏi Phú', NULL),
('AO00000003', '0button.png', NULL),
('AO00000003', '1car.png', NULL),
('AO00000003', '2close.png', NULL),
('AO00000004', '0WmGBjpW6kqs.png', NULL),
('AO00000004', '1world.png', NULL),
('AO00000004', '2Xác nhận khóa tài khoản.png', NULL),
('QU00000001', 'Link hỏi Phú', NULL),
('QU00000002', 'Link hỏi Phú', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `import_coupon`
--

CREATE TABLE `import_coupon` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date_init` datetime DEFAULT NULL,
  `id_staff` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `note` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `import_coupon`
--

INSERT INTO `import_coupon` (`id`, `date_init`, `id_staff`, `note`) VALUES
('NHAP001', '2023-02-11 00:00:00', 'NV001', NULL),
('NHAP002', '2023-02-11 00:00:00', 'NV001', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `input_country`
--

CREATE TABLE `input_country` (
  `id` varchar(10) NOT NULL,
  `name` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `input_country`
--

INSERT INTO `input_country` (`id`, `name`) VALUES
('ct001', 'Việt Nam'),
('ct002', 'Trung Quốc'),
('ct003', 'Hàn Quốc'),
('ct004', 'Nhật Bản');

-- --------------------------------------------------------

--
-- Table structure for table `parameters`
--

CREATE TABLE `parameters` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `variable1` int(11) NOT NULL,
  `variable2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parameters`
--

INSERT INTO `parameters` (`id`, `variable1`, `variable2`) VALUES
('TUOIKH', 16, 70),
('TUOINV', 18, 40);

-- --------------------------------------------------------

--
-- Table structure for table `privilege`
--

CREATE TABLE `privilege` (
  `table_affect` varchar(30) NOT NULL,
  `code` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privilege`
--

INSERT INTO `privilege` (`table_affect`, `code`) VALUES
('account_password', '--U---U---U-crud'),
('account_username', '-RU--r---RU-crud'),
('classify', '-r---r--crudcrud'),
('coupon', '-R------crudcrud'),
('customer', '-RUD-----RUDcrud'),
('parameter', '-r---r--crudcrud'),
('product', '-r---r--crudcrud'),
('size', '-r---r--crudcrud'),
('staff', '------------crud');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `madein` varchar(10) NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `idstatus` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `madein`, `description`, `idstatus`) VALUES
('AO00000001', 'Áo thun', 'ct001', 'Áo thun có cổ', 'TT01'),
('AO00000002', 'Áo sơ mi ', 'ct002', 'Áo sơ mi sọc', 'TT01'),
('AO00000003', 'áo thun bông', 'ct001', '', 'TT01'),
('AO00000004', 'vcl', 'ct002', 'vip vcl', 'TT02'),
('AO00000005', 'áo thun bông 234', 'ct003', 'okok', 'TT01'),
('AO00000006', 'áo thun bông 2345', 'ct003', 'okok', 'TT01'),
('AO00000007', 'áo thun bông 23456', 'ct004', 'okok', 'TT01'),
('QU00000001', 'Quần tây', 'ct001', 'Quần tây dài', 'TT01'),
('QU00000002', 'Quần thun', 'ct002', 'Quần thun ngắn', 'TT01');

-- --------------------------------------------------------

--
-- Table structure for table `product_in_stock`
--

CREATE TABLE `product_in_stock` (
  `id_import_coupon` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_size` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_color` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `price_input` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_in_stock`
--

INSERT INTO `product_in_stock` (`id_import_coupon`, `id_product`, `id_size`, `id_color`, `amount`, `price_input`) VALUES
('NHAP001', 'AO00000001', 'AOS', '#000000', 17, 280000),
('NHAP001', 'AO00000001', 'AOXL', '#000000', 20, 280000),
('NHAP001', 'AO00000002', 'AOS', '#ffffff', 20, 350000),
('NHAP001', 'AO00000002', 'AOXL', '#ffffff', 18, 350000),
('NHAP002', 'QU00000001', 'QUS', '#000000', 20, 500000),
('NHAP002', 'QU00000001', 'QUXL', '#000000', 20, 500000),
('NHAP002', 'QU00000002', 'QUS', '#ffffff', 17, 200000),
('NHAP002', 'QU00000002', 'QUXL', '#ffffff', 18, 200000);

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_size` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_color` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_list`
--

INSERT INTO `product_list` (`id_product`, `id_size`, `id_color`, `price`) VALUES
('AO00000001', 'AOS', '#000000', 320000),
('AO00000002', 'AOXL', '#ffffff', 400000),
('QU00000001', 'QUS', '#000000', 560000),
('QU00000002', 'QUXL', '#ffffff', 240000);

-- --------------------------------------------------------

--
-- Table structure for table `product_list_classify`
--

CREATE TABLE `product_list_classify` (
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_classify` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_list_classify`
--

INSERT INTO `product_list_classify` (`id_product`, `id_classify`) VALUES
('AO00000001', 'AOTHUN'),
('AO00000002', 'AOSOMI'),
('AO00000003', 'AOSOMI'),
('AO00000004', 'AOSOMI'),
('AO00000005', 'AOTHUN'),
('AO00000006', 'AOSOMI'),
('AO00000006', 'AOTHUN'),
('AO00000007', 'AOSOMI'),
('AO00000007', 'AOTHUN'),
('QU00000001', 'QUTAY'),
('QU00000002', 'QUTHUN');

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `id` varchar(19) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `discount_price` int(11) DEFAULT NULL,
  `discount_percent` decimal(3,2) DEFAULT NULL,
  `begin_date` datetime NOT NULL,
  `finish_date` datetime NOT NULL,
  `id_status` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`id`, `name`, `image`, `content`, `discount_price`, `discount_percent`, `begin_date`, `finish_date`, `id_status`) VALUES
('KM001', '0.25', NULL, 'Giảm 25%', NULL, '0.25', '2023-02-11 00:00:00', '2023-04-30 00:00:00', 'TT10'),
('KM002', '0.35', NULL, 'Giảm 35%', NULL, '0.35', '2023-02-12 00:00:00', '2023-05-01 00:00:00', 'TT10'),
('KM003', '-200k', NULL, 'Giảm 200k', 200000, NULL, '2023-02-13 00:00:00', '2023-05-02 00:00:00', 'TT10');

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date_init` datetime NOT NULL,
  `date_confirm` datetime DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `id_staff` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_customer` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_status` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`id`, `date_init`, `date_confirm`, `address`, `note`, `id_staff`, `id_customer`, `id_status`) VALUES
('HD000', '2023-02-12 00:00:00', '2023-02-12 00:00:00', '84/177 Phan Văn Trị, P.2, Q.5, TP.HCM', NULL, 'NV001', 'KH001', 'TT07'),
('HD001', '2023-02-12 00:00:00', '2023-02-12 00:00:00', '84/173 Phan Văn Trị, P.2, Q.5, TP.HCM', NULL, 'NV002', 'KH002', 'TT09'),
('HD002', '2023-02-12 00:00:00', '2023-02-12 00:00:00', '84/170 Phan Văn Trị, P.2, Q.5, TP.HCM', NULL, 'NV003', 'KH004', 'TT08');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `breast` int(11) DEFAULT NULL,
  `waist` int(11) DEFAULT NULL,
  `butt` int(11) DEFAULT NULL,
  `foot` int(11) DEFAULT NULL,
  `hand` int(11) DEFAULT NULL,
  `thigh` int(11) DEFAULT NULL,
  `back` int(11) DEFAULT NULL,
  `id_status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `breast`, `waist`, `butt`, `foot`, `hand`, `thigh`, `back`, `id_status`) VALUES
('AOS', 40, NULL, NULL, NULL, 60, NULL, 60, 'TT12'),
('AOXL', 60, NULL, NULL, NULL, 80, NULL, 80, 'TT12'),
('QUS', NULL, 27, 60, 70, NULL, 40, NULL, 'TT12'),
('QUXL', NULL, 30, 70, 80, NULL, 60, NULL, 'TT12');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `note` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id_user` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `name`, `birthday`, `gender`, `phone`, `address`, `note`, `id_user`) VALUES
('NV001', 'Sỹ Phú', '2002-11-30 00:00:00', 'nam', '828049515', 'HCM', NULL, 'USR009'),
('NV002', 'Khả Phi', '2002-06-28 00:00:00', 'nam', '828049516', 'HCM', NULL, 'USR010'),
('NV003', 'Cỏng Mềnh', '2002-02-18 00:00:00', 'nam', '828049517', 'Đồng Nai', NULL, 'USR012'),
('NV004', 'Minh Thao', '2002-07-29 00:00:00', 'nam', '828049518', 'Long AN', NULL, 'USR011'),
('NV005', 'Sy Phi', '2002-11-30 00:00:00', 'nam', '828049515', 'HCM', '', 'USR016');

-- --------------------------------------------------------

--
-- Table structure for table `staff_position`
--

CREATE TABLE `staff_position` (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_position`
--

INSERT INTO `staff_position` (`id`, `name`) VALUES
('CV002', 'Nhân viên'),
('CV001', 'Quản lý');

-- --------------------------------------------------------

--
-- Table structure for table `staff_position_list`
--

CREATE TABLE `staff_position_list` (
  `id_staff` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_position` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_position_list`
--

INSERT INTO `staff_position_list` (`id_staff`, `id_position`) VALUES
('NV001', 'CV001'),
('NV002', 'CV002'),
('NV003', 'CV002'),
('NV004', 'CV002');

-- --------------------------------------------------------

--
-- Table structure for table `status_product`
--

CREATE TABLE `status_product` (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_product`
--

INSERT INTO `status_product` (`id`, `name`) VALUES
('TT01', 'Còn bán'),
('TT02', 'Hết bán');

-- --------------------------------------------------------

--
-- Table structure for table `status_promotion`
--

CREATE TABLE `status_promotion` (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_promotion`
--

INSERT INTO `status_promotion` (`id`, `name`) VALUES
('TT10', 'Bình thường'),
('TT11', 'Đã xóa');

-- --------------------------------------------------------

--
-- Table structure for table `status_receipt`
--

CREATE TABLE `status_receipt` (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_receipt`
--

INSERT INTO `status_receipt` (`id`, `name`) VALUES
('TT09', 'Chưa xử lý'),
('TT08', 'Đã hủy'),
('TT07', 'Đã xác nhận');

-- --------------------------------------------------------

--
-- Table structure for table `status_size`
--

CREATE TABLE `status_size` (
  `id` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_size`
--

INSERT INTO `status_size` (`id`, `name`) VALUES
('TT12', 'Đang sử dụng'),
('TT13', 'Ngưng sử dụng');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `id` (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_customer`,`id_product`,`id_size`,`id_color`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `id_size` (`id_size`);

--
-- Indexes for table `classify`
--
ALTER TABLE `classify`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`),
  ADD KEY `id_big_classify` (`id_big_classify`),
  ADD KEY `classify_ibfk_2` (`gender`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numberphone` (`numberphone`),
  ADD KEY `customer_ibfk_2` (`gender`),
  ADD KEY `customer_ibfk_3` (`id_user`);

--
-- Indexes for table `detail_import_coupon`
--
ALTER TABLE `detail_import_coupon`
  ADD PRIMARY KEY (`id_import_coupon`,`id_product`,`id_size`,`id_color`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_color` (`id_color`);

--
-- Indexes for table `detail_promotion`
--
ALTER TABLE `detail_promotion`
  ADD PRIMARY KEY (`id_promotion`,`id_product`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `detail_receipt`
--
ALTER TABLE `detail_receipt`
  ADD PRIMARY KEY (`id_receipt`,`id_import_coupon`,`id_product`,`id_size`,`id_color`),
  ADD KEY `id_import_coupon` (`id_import_coupon`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_color` (`id_color`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`timestamp`),
  ADD UNIQUE KEY `timestamp` (`timestamp`),
  ADD KEY `event_ibfk_1` (`actor`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_product`
--
ALTER TABLE `image_product`
  ADD PRIMARY KEY (`id_product`,`link_image`);

--
-- Indexes for table `import_coupon`
--
ALTER TABLE `import_coupon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_staff` (`id_staff`);

--
-- Indexes for table `input_country`
--
ALTER TABLE `input_country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privilege`
--
ALTER TABLE `privilege`
  ADD UNIQUE KEY `table_affect` (`table_affect`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`),
  ADD KEY `fk_statusprod` (`idstatus`),
  ADD KEY `fk_madein` (`madein`);

--
-- Indexes for table `product_in_stock`
--
ALTER TABLE `product_in_stock`
  ADD PRIMARY KEY (`id_import_coupon`,`id_product`,`id_size`,`id_color`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_color` (`id_color`);

--
-- Indexes for table `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`id_product`,`id_size`,`id_color`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_color` (`id_color`);

--
-- Indexes for table `product_list_classify`
--
ALTER TABLE `product_list_classify`
  ADD PRIMARY KEY (`id_product`,`id_classify`),
  ADD KEY `id_classify` (`id_classify`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`),
  ADD UNIQUE KEY `image` (`image`),
  ADD KEY `id_status` (`id_status`);

--
-- Indexes for table `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_staff` (`id_staff`),
  ADD KEY `id_customer` (`id_customer`),
  ADD KEY `id_status` (`id_status`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_size_status` (`id_status`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`),
  ADD KEY `staff_ibfk_2` (`gender`);

--
-- Indexes for table `staff_position`
--
ALTER TABLE `staff_position`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Indexes for table `staff_position_list`
--
ALTER TABLE `staff_position_list`
  ADD PRIMARY KEY (`id_position`,`id_staff`),
  ADD KEY `id_staff` (`id_staff`);

--
-- Indexes for table `status_product`
--
ALTER TABLE `status_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Indexes for table `status_promotion`
--
ALTER TABLE `status_promotion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Indexes for table `status_receipt`
--
ALTER TABLE `status_receipt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Indexes for table `status_size`
--
ALTER TABLE `status_size`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`id_color`) REFERENCES `color` (`id`),
  ADD CONSTRAINT `cart_ibfk_4` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`);

--
-- Constraints for table `classify`
--
ALTER TABLE `classify`
  ADD CONSTRAINT `classify_ibfk_1` FOREIGN KEY (`id_big_classify`) REFERENCES `classify` (`id`),
  ADD CONSTRAINT `classify_ibfk_2` FOREIGN KEY (`gender`) REFERENCES `gender` (`id`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`gender`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `customer_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `account` (`id_user`);

--
-- Constraints for table `detail_import_coupon`
--
ALTER TABLE `detail_import_coupon`
  ADD CONSTRAINT `detail_import_coupon_ibfk_1` FOREIGN KEY (`id_import_coupon`) REFERENCES `import_coupon` (`id`),
  ADD CONSTRAINT `detail_import_coupon_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product_list` (`id_product`),
  ADD CONSTRAINT `detail_import_coupon_ibfk_3` FOREIGN KEY (`id_size`) REFERENCES `product_list` (`id_size`),
  ADD CONSTRAINT `detail_import_coupon_ibfk_4` FOREIGN KEY (`id_color`) REFERENCES `product_list` (`id_color`);

--
-- Constraints for table `detail_promotion`
--
ALTER TABLE `detail_promotion`
  ADD CONSTRAINT `detail_promotion_ibfk_1` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id`),
  ADD CONSTRAINT `detail_promotion_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

--
-- Constraints for table `detail_receipt`
--
ALTER TABLE `detail_receipt`
  ADD CONSTRAINT `detail_receipt_ibfk_1` FOREIGN KEY (`id_receipt`) REFERENCES `receipt` (`id`),
  ADD CONSTRAINT `detail_receipt_ibfk_2` FOREIGN KEY (`id_import_coupon`) REFERENCES `product_in_stock` (`id_import_coupon`),
  ADD CONSTRAINT `detail_receipt_ibfk_3` FOREIGN KEY (`id_product`) REFERENCES `product_in_stock` (`id_product`),
  ADD CONSTRAINT `detail_receipt_ibfk_4` FOREIGN KEY (`id_size`) REFERENCES `product_in_stock` (`id_size`),
  ADD CONSTRAINT `detail_receipt_ibfk_5` FOREIGN KEY (`id_color`) REFERENCES `product_in_stock` (`id_color`);

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`actor`) REFERENCES `account` (`username`);

--
-- Constraints for table `image_product`
--
ALTER TABLE `image_product`
  ADD CONSTRAINT `image_product_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

--
-- Constraints for table `import_coupon`
--
ALTER TABLE `import_coupon`
  ADD CONSTRAINT `import_coupon_ibfk_1` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_madein` FOREIGN KEY (`madein`) REFERENCES `input_country` (`id`),
  ADD CONSTRAINT `fk_statusprod` FOREIGN KEY (`idstatus`) REFERENCES `status_product` (`id`);

--
-- Constraints for table `product_in_stock`
--
ALTER TABLE `product_in_stock`
  ADD CONSTRAINT `product_in_stock_ibfk_1` FOREIGN KEY (`id_import_coupon`) REFERENCES `detail_import_coupon` (`id_import_coupon`),
  ADD CONSTRAINT `product_in_stock_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `detail_import_coupon` (`id_product`),
  ADD CONSTRAINT `product_in_stock_ibfk_3` FOREIGN KEY (`id_size`) REFERENCES `detail_import_coupon` (`id_size`),
  ADD CONSTRAINT `product_in_stock_ibfk_4` FOREIGN KEY (`id_color`) REFERENCES `detail_import_coupon` (`id_color`);

--
-- Constraints for table `product_list_classify`
--
ALTER TABLE `product_list_classify`
  ADD CONSTRAINT `product_list_classify_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `product_list_classify_ibfk_2` FOREIGN KEY (`id_classify`) REFERENCES `classify` (`id`);

--
-- Constraints for table `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `promotion_ibfk_1` FOREIGN KEY (`id_status`) REFERENCES `status_promotion` (`id`);

--
-- Constraints for table `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id`),
  ADD CONSTRAINT `receipt_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `receipt_ibfk_3` FOREIGN KEY (`id_status`) REFERENCES `status_receipt` (`id`);

--
-- Constraints for table `size`
--
ALTER TABLE `size`
  ADD CONSTRAINT `fk_size_status` FOREIGN KEY (`id_status`) REFERENCES `status_size` (`id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`gender`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `staff_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `account` (`id_user`);

--
-- Constraints for table `staff_position_list`
--
ALTER TABLE `staff_position_list`
  ADD CONSTRAINT `staff_position_list_ibfk_1` FOREIGN KEY (`id_position`) REFERENCES `staff_position` (`id`),
  ADD CONSTRAINT `staff_position_list_ibfk_2` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;