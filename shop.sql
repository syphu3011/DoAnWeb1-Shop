-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th5 13, 2023 lúc 11:21 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id_user` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `privilege` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `session` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id_user`, `username`, `password`, `date_created`, `privilege`, `session`, `status`) VALUES
('USR001', 'admin2', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:11:15', 'admin', '', 'active'),
('USR002', 'admin1', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:11:43', 'admin', '', 'active'),
('USR003', 'syphu', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-28 07:16:41', 'customer', '', 'idle'),
('USR004', 'khaphi', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:11:19', 'customer', '', 'idle'),
('USR005', 'minhthao', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:16:08', 'customer', '', 'active'),
('USR006', 'congmenh', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:16:06', 'customer', '', 'active'),
('USR007', 'manager1', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:16:00', 'manager', '', 'active'),
('USR008', 'manager2', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:15:58', 'manager', '', 'active'),
('USR009', 'phuu', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:15:56', 'sales', '', 'active'),
('USR010', 'phii', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:15:53', 'sales', '', 'active'),
('USR011', 'thao', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:15:47', 'sales', '', 'active'),
('USR012', 'menh', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2023-04-18 16:15:45', 'sales', '', 'active'),
('USR013', 'cicada3301', '58f3afdf1cdd0d353fc400a3bde3e19f9656d1e347aa44a4dec0fe09dd34f310', '0000-00-00 00:00:00', 'customer', '', 'active'),
('USR014', 'bbbb', '81cc5b17018674b401b42f35ba07bb79e211239c23bffe658da1577e3e646877', '0000-00-00 00:00:00', 'customer', '', 'active');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
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
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`id_customer`, `id_product`, `id_color`, `id_size`, `amount`, `price`) VALUES
('KH001', 'AO00000002', '#ffffff', 'AOXL', 2, 400000),
('KH002', 'AO00000002', '#ffffff', 'AOXL', 2, 400000),
('KH002', 'QU00000001', '#000000', 'QUXL', 2, 560000),
('KH003', 'AO00000001', '#000000', 'AOS', 3, 320000),
('KH003', 'QU00000002', '#ffffff', 'QUS', 3, 240000),
('KH004', 'AO00000002', '#ffffff', 'AOXL', 1, 500000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classify`
--

CREATE TABLE `classify` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id_big_classify` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `classify`
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
-- Cấu trúc bảng cho bảng `color`
--

CREATE TABLE `color` (
  `id` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `color`
--

INSERT INTO `color` (`id`, `name`) VALUES
('#FFA500', 'cam'),
('#ffffff', 'Trắng'),
('#0000FF', 'Xanh dương'),
('#000000', 'Đen');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
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
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`id`, `name`, `birthday`, `numberphone`, `image`, `address`, `gender`, `id_user`) VALUES
('KH001', 'phú', '2002-11-30 00:00:00', '394142892', NULL, 'hcm', 'nam', 'USR003'),
('KH002', 'phi', '2002-06-28 00:00:00', '394142894', NULL, 'HCM', 'nam', 'USR004'),
('KH003', 'mềnh', '2002-02-18 00:00:00', '394142896', NULL, 'HCM', 'nữ', 'USR006'),
('KH004', 'thao', '2002-06-29 00:00:00', '394142898', 'http://localhost/DoAnWeb1-Shop/Image/avt/User_light@3x.png', 'HCM', 'nam', 'USR005'),
('KH005', 'cicada3301', '0000-00-00 00:00:00', '113', '', 'tan binh', 'nam', 'USR013'),
('KH006', 'bbbb', '0000-00-00 00:00:00', '0123', '', 'asdasdasd', 'nam', 'USR014');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_import_coupon`
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
-- Đang đổ dữ liệu cho bảng `detail_import_coupon`
--

INSERT INTO `detail_import_coupon` (`id_import_coupon`, `id_product`, `id_color`, `id_size`, `amount`, `price_input`) VALUES
('NHAP001', 'AO00000001', '#000000', 'AOS', 20, 280000),
('NHAP001', 'AO00000001', '#000000', 'AOXL', 20, 280000),
('NHAP001', 'AO00000002', '#ffffff', 'AOS', 20, 350000),
('NHAP001', 'AO00000002', '#ffffff', 'AOXL', 20, 350000),
('NHAP001', 'AO00000003', '#000000', 'AOXL', 20, 350000),
('NHAP001', 'AO00000003', '#ffffff', 'AOXL', 20, 350000),
('NHAP001', 'AO00000009', '#000000', 'AOS', 90, 500000),
('NHAP001', 'AO00000009', '#ffffff', 'AOS', 90, 500000),
('NHAP001', 'AO00000010', '#ffffff', 'AOS', 90, 500000),
('NHAP001', 'AO00000011', '#000000', 'AOS', 200, 190000),
('NHAP001', 'AO00000012', '#ffffff', 'AOS', 200, 150000),
('NHAP001', 'AO00000012', '#000000', 'AOXL', 200, 150000),
('NHAP001', 'AO00000013', '#000000', 'AOXL', 200, 150000),
('NHAP001', 'AO00000013', '#ffffff', 'AOXL', 200, 150000),
('NHAP002', 'AO00000001', '#ffffff', 'AOS', 90, 500000),
('NHAP002', 'AO00000014', '#000000', 'AOS', 200, 150000),
('NHAP002', 'AO00000014', '#ffffff', 'AOS', 200, 150000),
('NHAP002', 'AO00000014', '#000000', 'AOXL', 200, 150000),
('NHAP002', 'AO00000014', '#ffffff', 'AOXL', 200, 150000),
('NHAP002', 'AO00000015', '#ffffff', 'AOXL', 20, 150000),
('NHAP002', 'AO00000016', '#000000', 'AOXL', 20, 150000),
('NHAP002', 'AO00000016', '#ffffff', 'AOXL', 20, 150000),
('NHAP002', 'QU00000001', '#000000', 'QUS', 20, 500000),
('NHAP002', 'QU00000001', '#000000', 'QUXL', 20, 500000),
('NHAP002', 'QU00000002', '#ffffff', 'QUS', 20, 200000),
('NHAP002', 'QU00000002', '#ffffff', 'QUXL', 20, 200000),
('NHAP002', 'QU00000003', '#FFA500', 'QUS', 20, 100000),
('NHAP002', 'QU00000003', '#000000', 'QUXL', 20, 100000),
('NHAP002', 'QU00000003', '#0000FF', 'QUXL', 20, 100000),
('NHAP002', 'QU00000003', '#ffffff', 'QUXL', 20, 100000),
('NHAP003', 'AO00000018', '#000000', 'AOS', 60, 200000),
('NHAP004', 'AO00000017', '#000000', 'AOS', 20, 200000),
('NHAP005', 'AO00000019', '#000000', 'AOS', 30, 200000),
('NHAP006', 'AO00000020', '#000000', 'AOS', 30, 200000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_promotion`
--

CREATE TABLE `detail_promotion` (
  `id_promotion` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `detail_promotion`
--

INSERT INTO `detail_promotion` (`id_promotion`, `id_product`) VALUES
('KM001', 'AO00000001'),
('KM001', 'AO00000002'),
('KM004', 'QU00000001');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_receipt`
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
-- Đang đổ dữ liệu cho bảng `detail_receipt`
--

INSERT INTO `detail_receipt` (`id_receipt`, `id_size`, `id_color`, `id_product`, `id_import_coupon`, `amount`, `price`) VALUES
('HD000', 'AOS', '#000000', 'AO00000001', 'NHAP001', 3, 320000),
('HD000', 'QUS', '#ffffff', 'QU00000002', 'NHAP002', 3, 240000),
('HD001', 'AOXL', '#ffffff', 'AO00000002', 'NHAP001', 2, 400000),
('HD001', 'QUXL', '#ffffff', 'QU00000002', 'NHAP002', 2, 240000),
('HD002', 'AOS', '#ffffff', 'AO00000002', 'NHAP001', 2, 320000),
('HD002', 'AOXL', '#ffffff', 'AO00000002', 'NHAP001', 2, 400000),
('HD005', 'AOS', '#000000', 'AO00000001', 'NHAP001', 1, 320000),
('HD006', 'QUS', '#000000', 'QU00000001', 'NHAP002', 1, 248000),
('HD007', 'QUXL', '#ffffff', 'QU00000002', 'NHAP002', 11, 2640000),
('HD008', 'AOS', '#000000', 'AO00000011', 'NHAP001', 2, 380000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `event`
--

CREATE TABLE `event` (
  `timestamp` int(50) NOT NULL,
  `detail` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `severity` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `actor` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `event`
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
-- Cấu trúc bảng cho bảng `gender`
--

CREATE TABLE `gender` (
  `id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `gender`
--

INSERT INTO `gender` (`id`) VALUES
('nam'),
('nữ'),
('unisex');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `image_product`
--

CREATE TABLE `image_product` (
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `link_image` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name_image` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `image_product`
--

INSERT INTO `image_product` (`id_product`, `link_image`, `name_image`) VALUES
('AO00000001', '0BSX911T.png', NULL),
('AO00000001', '1BSX911D.png', NULL),
('AO00000002', '0BSX1180HD.jpg', NULL),
('AO00000002', '1HX044-1.png', NULL),
('AO00000003', '0fb497ee5-c439-5c00-c16c-00199f3193ae.jpg', NULL),
('AO00000003', '18482e445-557c-6300-d2b2-00199f31a58d.jpg', NULL),
('AO00000004', '0WmGBjpW6kqs.png', NULL),
('AO00000004', '1world.png', NULL),
('AO00000004', '2Xác nhận khóa tài khoản.png', NULL),
('AO00000008', '0dsc00963_1aa604e0498848c4aa43dfc5beb66844_master.png', NULL),
('AO00000009', '0ao_so_mi_nam_cong_so_caro_ngan_tay_meriman_ma_thmos365-02_18298b730733497181a54a6f69efa6e6_master.jpeg', NULL),
('AO00000009', '1ao_so_mi_nam_cong_so_caro_ngan_tay_meriman_ma_thmos365-03_672f01bc9c2a443f9b84b0a6bf1e9228_master.jpeg', NULL),
('AO00000009', '2ao_so_mi_nam_cong_so_caro_ngan_tay_meriman_ma_thmos365-04_ca728001f4144d28b462d681a5444a7f_master.jpeg', NULL),
('AO00000009', '3ao-so-mi-caro-nam-merriman-tay-ngan-thmos365-4_cf82d1aab8cb43aa910df74870dae086_master.jpeg', NULL),
('AO00000010', '0ao_so_mi_nam_cong_so_caro_ngan_tay_meriman_ma_thmos365-02_18298b730733497181a54a6f69efa6e6_master.jpeg', NULL),
('AO00000010', '1ao_so_mi_nam_cong_so_caro_ngan_tay_meriman_ma_thmos365-03_672f01bc9c2a443f9b84b0a6bf1e9228_master.jpeg', NULL),
('AO00000010', '2ao_so_mi_nam_cong_so_caro_ngan_tay_meriman_ma_thmos365-04_ca728001f4144d28b462d681a5444a7f_master.jpeg', NULL),
('AO00000010', '3ao-so-mi-caro-nam-merriman-tay-ngan-thmos365-4_cf82d1aab8cb43aa910df74870dae086_master.jpeg', NULL),
('AO00000011', '08cf26aea90be56e00faf68.jpeg', NULL),
('AO00000011', '19d870594ffc0399e60d172.jpeg', NULL),
('AO00000011', '242e8aeff55ab93f5caba.jpeg', NULL),
('AO00000011', '3f81c530aa95e6f00364f69.jpeg', NULL),
('AO00000012', '0z4339185685648_28107e19f4ba63ee5cab64a421d1b029.jpg', NULL),
('AO00000012', '1z4339185685671_e1b6d1d5e759459d26157b9b6ee1ae3e.jpg', NULL),
('AO00000012', '2z4339185707551_3ce3f24dbaa78c039b929a3315874305.jpg', NULL),
('AO00000012', '3z4339185707573_6d41375ddabfcffb9e00626b16c30683.jpg', NULL),
('AO00000013', '0z4339188387831_fcc7dab69ba4a1d636c5349cd499ce84.jpg', NULL),
('AO00000013', '1z4339188414428_662da7b32d58718c2c25f0ab6e89b1c2.jpg', NULL),
('AO00000013', '2z4339188420058_5e23b94822921a5fdf1601c9feb352dc.jpg', NULL),
('AO00000014', '0z4339232899351_85830efa6e8dbbe32d25d64a88dadfce.jpg', NULL),
('AO00000014', '1z4339232908505_d501b8a047115c392cd7d305dde82532.jpg', NULL),
('AO00000015', '0BSX923D.jpg', NULL),
('AO00000015', '1BSX923T.jpg', NULL),
('AO00000016', '05ce5ccc3-ea5b-5200-bdd4-00199f30b721.jpg', NULL),
('AO00000016', '1b48fcd29-6294-4b00-3ce8-00199f306ba4.jpg', NULL),
('AO00000017', '09d870594ffc0399e60d172.jpeg', NULL),
('AO00000017', '142e8aeff55ab93f5caba.jpeg', NULL),
('AO00000018', '042e8aeff55ab93f5caba.jpeg', NULL),
('AO00000018', '1z4339188387831_fcc7dab69ba4a1d636c5349cd499ce84.jpg', NULL),
('AO00000018', '2z4339232899351_85830efa6e8dbbe32d25d64a88dadfce.jpg', NULL),
('AO00000019', '0z4339188354780_fbbc165c8436cde6782491f160602748 (1).jpg', NULL),
('AO00000019', '1z4339232899351_85830efa6e8dbbe32d25d64a88dadfce.jpg', NULL),
('AO00000020', '0z4339185685671_e1b6d1d5e759459d26157b9b6ee1ae3e.jpg', NULL),
('AO00000020', '1z4339185707551_3ce3f24dbaa78c039b929a3315874305.jpg', NULL),
('AO00000020', '2z4339185707573_6d41375ddabfcffb9e00626b16c30683.jpg', NULL),
('QU00000001', '010f21pfo007_-_tannin_2__2.jpg', NULL),
('QU00000001', '110f21pfo007_-_real_black_1_2_1.jpg', NULL),
('QU00000001', '210s22pfo011_-_black_4__1.jpg', NULL),
('QU00000001', '310s22pfo011-lbrown-_4__1_2.jpg', NULL),
('QU00000002', '00b9bbd04-a2b0-5d01-5fb5-0019c5c03731.jpg', NULL),
('QU00000002', '108df275b-fd6e-6001-f054-0019c5c03745.jpg', NULL),
('QU00000003', '0z4339186300095_9d95a8edec7408717c96b55ba1463664.jpg', NULL),
('QU00000003', '1z4339186300307_fe979a77041fcc0d11a23827e2f092a9.jpg', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `import_coupon`
--

CREATE TABLE `import_coupon` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date_init` datetime DEFAULT NULL,
  `id_staff` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `note` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `import_coupon`
--

INSERT INTO `import_coupon` (`id`, `date_init`, `id_staff`, `note`) VALUES
('NHAP001', '2023-02-11 00:00:00', 'NV001', NULL),
('NHAP002', '2023-02-11 00:00:00', 'NV001', NULL),
('NHAP003', '2023-05-13 10:53:28', 'NV005', ''),
('NHAP004', '2023-05-13 10:54:15', 'NV005', ''),
('NHAP005', '2023-05-13 10:59:38', 'NV005', ''),
('NHAP006', '2023-05-13 10:59:48', 'NV005', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `input_country`
--

CREATE TABLE `input_country` (
  `id` varchar(10) NOT NULL,
  `name` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `input_country`
--

INSERT INTO `input_country` (`id`, `name`) VALUES
('ct001', 'Việt Nam'),
('ct002', 'Trung Quốc'),
('ct003', 'Hàn Quốc'),
('ct004', 'Nhật Bản'),
('ct005', 'Tất cả,Việt Nam,Trung Quốc,Singapore,0'),
('ct006', 'ct005'),
('ct007', 'ct006'),
('ct008', 'ct007'),
('ct009', 'ct008'),
('ct010', 'ct009'),
('ct011', 'Tất cả,0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `parameters`
--

CREATE TABLE `parameters` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `variable1` int(11) NOT NULL,
  `variable2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `parameters`
--

INSERT INTO `parameters` (`id`, `variable1`, `variable2`) VALUES
('TUOIKH', 16, 70),
('TUOINV', 18, 40);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `privilege_action`
--

CREATE TABLE `privilege_action` (
  `id_table` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `privilege_action`
--

INSERT INTO `privilege_action` (`id_table`) VALUES
('customer'),
('import_product'),
('product'),
('promotion'),
('receipt'),
('staff'),
('statistic');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `privilege_feature`
--

CREATE TABLE `privilege_feature` (
  `id_feature` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `privilege_feature`
--

INSERT INTO `privilege_feature` (`id_feature`) VALUES
('sua'),
('them'),
('xem'),
('xoa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `privilege_general`
--

CREATE TABLE `privilege_general` (
  `id_table` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_feature` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `privilege_general`
--

INSERT INTO `privilege_general` (`id_table`, `id_feature`) VALUES
('customer', 'sua'),
('customer', 'them'),
('customer', 'xem'),
('customer', 'xoa'),
('import_product', 'sua'),
('import_product', 'them'),
('import_product', 'xem'),
('import_product', 'xoa'),
('promotion', 'sua'),
('promotion', 'them'),
('promotion', 'xem'),
('promotion', 'xoa'),
('receipt', 'sua'),
('receipt', 'them'),
('receipt', 'xem'),
('receipt', 'xoa'),
('staff', 'sua'),
('staff', 'them'),
('staff', 'xem'),
('staff', 'xoa'),
('statistic', 'them'),
('statistic', 'xem');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `privilege_general_detail`
--

CREATE TABLE `privilege_general_detail` (
  `id_table` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_feature` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_user` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `privilege_general_detail`
--

INSERT INTO `privilege_general_detail` (`id_table`, `id_feature`, `id_user`) VALUES
('customer', 'sua', 'USR001'),
('customer', 'them', 'USR001'),
('customer', 'xem', 'USR001'),
('customer', 'xem', 'USR002'),
('customer', 'xoa', 'USR001'),
('import_product', 'sua', 'USR001'),
('import_product', 'them', 'USR001'),
('import_product', 'xem', 'USR001'),
('import_product', 'xem', 'USR002'),
('import_product', 'xoa', 'USR001'),
('product', 'sua', 'USR001'),
('product', 'them', 'USR001'),
('product', 'xem', 'USR001'),
('product', 'xem', 'USR002'),
('product', 'xoa', 'USR001'),
('promotion', 'sua', 'USR001'),
('promotion', 'them', 'USR001'),
('promotion', 'xem', 'USR001'),
('promotion', 'xoa', 'USR001'),
('receipt', 'sua', 'USR001'),
('receipt', 'them', 'USR001'),
('receipt', 'xem', 'USR001'),
('receipt', 'xoa', 'USR001'),
('staff', 'sua', 'USR001'),
('staff', 'them', 'USR001'),
('staff', 'xem', 'USR001'),
('staff', 'xoa', 'USR001'),
('statistic', 'xem', 'USR001');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `madein` varchar(10) NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `idstatus` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `madein`, `description`, `idstatus`) VALUES
('AO00000001', 'Áo thun', 'ct001', 'Áo thun có cổ', 'TT01'),
('AO00000002', 'Áo sơ mi ', 'ct002', 'Áo sơ mi sọc', 'TT01'),
('AO00000003', 'áo thun bông', 'ct001', '', 'TT01'),
('AO00000004', 'vcl', 'ct002', 'vip vcl', 'TT02'),
('AO00000008', 'áo polo short black gray check', 'ct010', 'quá đẹp', 'TT01'),
('AO00000009', 'ao so mi xanh ', 'ct001', 'ao so mi', 'TT01'),
('AO00000010', 'áo sơ mi caro trắng sọc xanh', 'ct001', 'áo sơ mi nam', 'TT01'),
('AO00000011', 'áo thun đen nam', 'ct002', 'áo cotton', 'TT01'),
('AO00000012', 'áo thun mùa hè', 'ct002', 'áo thun nam cho mùa hè năng động', 'TT01'),
('AO00000013', 'ao thun hien dai', 'ct002', 'ao hien dai', 'TT01'),
('AO00000014', 'áo thun trơn', 'ct001', 'áo thun trơn', 'TT01'),
('AO00000015', 'áo thun y', 'ct001', 'áo thun đẹp', 'TT01'),
('AO00000016', 'áo thun họa tiết', 'ct011', 'thun hoa tiết', 'TT01'),
('AO00000017', 'áo thun mùa xuân', 'ct011', 'fffff', 'TT01'),
('AO00000018', 'áo thun mùa đông', 'ct011', '', 'TT01'),
('AO00000019', 'áo thun mùa thu', 'ct011', 'mua thu', 'TT01'),
('AO00000020', 'áo thun mùa hạ', 'ct011', '', 'TT01'),
('QU00000001', 'Quần tây', 'ct001', 'Quần tây dài', 'TT01'),
('QU00000002', 'Quần thun', 'ct002', 'Quần thun ngắn', 'TT01'),
('QU00000003', 'quần thun mùa hè', 'ct001', 'quàn thun nam mùa hè\r\n', 'TT01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_in_stock`
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
-- Đang đổ dữ liệu cho bảng `product_in_stock`
--

INSERT INTO `product_in_stock` (`id_import_coupon`, `id_product`, `id_size`, `id_color`, `amount`, `price_input`) VALUES
('NHAP001', 'AO00000001', 'AOS', '#000000', 17, 280000),
('NHAP001', 'AO00000001', 'AOXL', '#000000', 20, 280000),
('NHAP001', 'AO00000002', 'AOS', '#ffffff', 20, 350000),
('NHAP001', 'AO00000002', 'AOXL', '#ffffff', 18, 350000),
('NHAP001', 'AO00000003', 'AOXL', '#000000', 18, 350000),
('NHAP001', 'AO00000003', 'AOXL', '#ffffff', 18, 350000),
('NHAP001', 'AO00000009', 'AOS', '#000000', 90, 500000),
('NHAP001', 'AO00000009', 'AOS', '#ffffff', 90, 500000),
('NHAP001', 'AO00000011', 'AOS', '#000000', 198, 190000),
('NHAP001', 'AO00000011', 'AOS', '#ffffff', 200, 190000),
('NHAP001', 'AO00000012', 'AOS', '#000000', 200, 150000),
('NHAP001', 'AO00000012', 'QUXL', '#000000', 200, 150000),
('NHAP001', 'AO00000013', 'AOS', '#000000', 20, 150000),
('NHAP001', 'AO00000013', 'QUS', '#000000', 20, 150000),
('NHAP002', 'AO00000014', 'AOS', '#000000', 20, 150000),
('NHAP002', 'AO00000014', 'AOS', '#ffffff', 20, 150000),
('NHAP002', 'AO00000014', 'AOXL', '#000000', 20, 150000),
('NHAP002', 'AO00000014', 'AOXL', '#ffffff', 20, 150000),
('NHAP002', 'AO00000015', 'AOXL', '#000000', 20, 150000),
('NHAP002', 'AO00000015', 'AOXL', '#ffffff', 20, 150000),
('NHAP002', 'AO00000016', 'AOXL', '#000000', 20, 150000),
('NHAP002', 'AO00000016', 'AOXL', '#ffffff', 20, 150000),
('NHAP002', 'QU00000001', 'QUS', '#000000', 18, 500000),
('NHAP002', 'QU00000001', 'QUXL', '#000000', 20, 500000),
('NHAP002', 'QU00000002', 'QUS', '#ffffff', 17, 200000),
('NHAP002', 'QU00000002', 'QUXL', '#ffffff', 18, 200000),
('NHAP002', 'QU00000003', 'QUS', '#FFA500', 20, 100000),
('NHAP002', 'QU00000003', 'QUXL', '#0000FF', 20, 100000),
('NHAP002', 'QU00000003', 'QUXL', '#ffffff', 20, 100000),
('NHAP003', 'AO00000018', 'AOS', '#000000', 60, 200000),
('NHAP004', 'AO00000017', 'AOS', '#000000', 20, 200000),
('NHAP005', 'AO00000019', 'AOS', '#000000', 30, 200000),
('NHAP006', 'AO00000020', 'AOS', '#000000', 30, 200000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_list`
--

CREATE TABLE `product_list` (
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_size` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_color` varchar(7) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_list`
--

INSERT INTO `product_list` (`id_product`, `id_size`, `id_color`, `price`) VALUES
('AO00000001', 'AOS', '#000000', 320000),
('AO00000002', 'AOXL', '#ffffff', 500000),
('AO00000003', 'AOXL', '#000000', 500000),
('AO00000003', 'AOXL', '#ffffff', 500000),
('AO00000009', 'AOS', '#ffffff', 590000),
('AO00000010', 'AOS', '#ffffff', 400000),
('AO00000011', 'AOS', '#000000', 190000),
('AO00000011', 'AOS', '#ffffff', 190000),
('AO00000011', 'AOXL', '#000000', 190000),
('AO00000012', 'AOS', '#000000', 150000),
('AO00000012', 'AOS', '#ffffff', 150000),
('AO00000012', 'AOXL', '#ffffff', 150000),
('AO00000013', 'AOS', '#ffffff', 150000),
('AO00000013', 'AOXL', '#ffffff', 150000),
('AO00000014', 'AOS', '#000000', 150000),
('AO00000014', 'AOS', '#ffffff', 150000),
('AO00000014', 'AOXL', '#000000', 150000),
('AO00000014', 'AOXL', '#ffffff', 150000),
('AO00000015', 'AOXL', '#000000', 170000),
('AO00000015', 'AOXL', '#ffffff', 170000),
('AO00000016', 'AOXL', '#000000', 170000),
('AO00000016', 'AOXL', '#ffffff', 170000),
('AO00000017', 'AOS', '#000000', 250000),
('AO00000018', 'AOS', '#000000', 250000),
('AO00000019', 'AOS', '#000000', 300000),
('AO00000020', 'AOS', '#000000', 300000),
('QU00000001', 'QUS', '#000000', 560000),
('QU00000002', 'QUXL', '#ffffff', 240000),
('QU00000003', 'QUS', '#FFA500', 100000),
('QU00000003', 'QUXL', '#0000FF', 100000),
('QU00000003', 'QUXL', '#ffffff', 100000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_list_classify`
--

CREATE TABLE `product_list_classify` (
  `id_product` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_classify` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_list_classify`
--

INSERT INTO `product_list_classify` (`id_product`, `id_classify`) VALUES
('AO00000001', 'AOTHUN'),
('AO00000002', 'AOSOMI'),
('AO00000003', 'AOSOMI'),
('AO00000004', 'AOSOMI'),
('AO00000008', 'AOTHUN'),
('AO00000009', 'AOSOMI'),
('AO00000010', 'AOSOMI'),
('AO00000011', 'AOTHUN'),
('AO00000012', 'AOTHUN'),
('AO00000013', 'AOTHUN'),
('AO00000014', 'AOTHUN'),
('AO00000015', 'AOTHUN'),
('AO00000016', 'AOTHUN'),
('AO00000017', 'AOTHUN'),
('AO00000018', 'AOTHUN'),
('AO00000019', 'AOTHUN'),
('AO00000020', 'AOTHUN'),
('QU00000001', 'QUTAY'),
('QU00000002', 'QUTHUN'),
('QU00000003', 'QUTHUN');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion`
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
-- Đang đổ dữ liệu cho bảng `promotion`
--

INSERT INTO `promotion` (`id`, `name`, `image`, `content`, `discount_price`, `discount_percent`, `begin_date`, `finish_date`, `id_status`) VALUES
('KM001', '0.25', NULL, 'Giảm 25%', NULL, '0.25', '2023-02-11 00:00:00', '2023-04-30 00:00:00', 'TT10'),
('KM002', '0.35', NULL, 'Giảm 35%', NULL, '0.35', '2023-02-12 00:00:00', '2023-05-01 00:00:00', 'TT10'),
('KM003', '-200k', NULL, 'Giảm 200k', 200000, NULL, '2023-02-13 00:00:00', '2023-05-02 00:00:00', 'TT10'),
('KM004', 'khuyến mãi cực sốc', '', 'djkhfjhkwefkjh', 200000, '0.20', '2023-11-30 00:00:00', '2024-11-30 00:00:00', 'TT10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `receipt`
--

CREATE TABLE `receipt` (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date_init` datetime NOT NULL,
  `date_confirm` datetime DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `id_staff` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id_customer` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_status` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `receipt`
--

INSERT INTO `receipt` (`id`, `date_init`, `date_confirm`, `address`, `note`, `id_staff`, `id_customer`, `id_status`) VALUES
('HD000', '2023-02-12 00:00:00', '2023-02-12 00:00:00', '84/177 Phan Văn Trị, P.2, Q.5, TP.HCM', NULL, 'NV001', 'KH001', 'TT07'),
('HD001', '2023-02-12 00:00:00', '2023-05-11 14:03:02', '84/173 Phan Văn Trị, P.2, Q.5, TP.HCM', NULL, 'NV002', 'KH002', 'TT07'),
('HD002', '2023-02-12 00:00:00', '2023-02-12 00:00:00', '84/170 Phan Văn Trị, P.2, Q.5, TP.HCM', NULL, 'NV003', 'KH004', 'TT08'),
('HD003', '2023-05-12 10:11:36', '2023-05-12 12:54:13', 'hjgf', NULL, NULL, 'KH004', 'TT08'),
('HD004', '2023-05-12 10:14:27', '2023-05-12 12:54:15', 'đá', NULL, NULL, 'KH004', 'TT08'),
('HD005', '2023-05-12 10:17:45', '2023-05-13 05:28:02', 'đá', NULL, 'NV001', 'KH004', 'TT08'),
('HD006', '2023-05-12 10:18:39', '2023-05-13 05:29:36', 'đá', NULL, 'NV001', 'KH004', 'TT07'),
('HD007', '2023-05-12 10:20:45', '2023-05-13 03:44:49', 'test mua', NULL, NULL, 'KH004', 'TT09'),
('HD008', '2023-05-12 10:45:38', '2023-05-13 03:10:51', 'thth', NULL, NULL, 'KH004', 'TT09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `size`
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
-- Đang đổ dữ liệu cho bảng `size`
--

INSERT INTO `size` (`id`, `breast`, `waist`, `butt`, `foot`, `hand`, `thigh`, `back`, `id_status`) VALUES
('AOS', 40, NULL, NULL, NULL, 60, NULL, 60, 'TT12'),
('AOXL', 60, NULL, NULL, NULL, 80, NULL, 80, 'TT12'),
('QUS', NULL, 27, 60, 70, NULL, 40, NULL, 'TT12'),
('QUXL', NULL, 30, 70, 80, NULL, 60, NULL, 'TT12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staff`
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
-- Đang đổ dữ liệu cho bảng `staff`
--

INSERT INTO `staff` (`id`, `name`, `birthday`, `gender`, `phone`, `address`, `note`, `id_user`) VALUES
('NV001', 'Sỹ Phú', '2002-11-30 00:00:00', 'nam', '828049515', 'HCM', NULL, 'USR009'),
('NV002', 'Khả Phi', '2002-06-28 00:00:00', 'nam', '828049516', 'HCM', NULL, 'USR010'),
('NV003', 'Cỏng Mềnh', '2002-02-18 00:00:00', 'nam', '828049517', 'Đồng Nai', NULL, 'USR012'),
('NV004', 'Minh Thao', '2002-07-29 00:00:00', 'nam', '828049518', 'Long AN', NULL, 'USR011'),
('NV005', 'Sỹ Phú', '2002-11-30 00:00:00', 'nam', '828049516', 'HCM', NULL, 'USR001'),
('NV006', 'Minh Thao', '2002-07-29 00:00:00', 'nam', '828049518', 'Long AN', NULL, 'USR002');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staff_position`
--

CREATE TABLE `staff_position` (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `staff_position`
--

INSERT INTO `staff_position` (`id`, `name`) VALUES
('CV002', 'Nhân viên'),
('CV001', 'Quản lý');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staff_position_list`
--

CREATE TABLE `staff_position_list` (
  `id_staff` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_position` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `staff_position_list`
--

INSERT INTO `staff_position_list` (`id_staff`, `id_position`) VALUES
('NV001', 'CV001'),
('NV002', 'CV002'),
('NV003', 'CV002'),
('NV004', 'CV002');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status_product`
--

CREATE TABLE `status_product` (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `status_product`
--

INSERT INTO `status_product` (`id`, `name`) VALUES
('TT01', 'Còn bán'),
('TT02', 'Hết bán');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status_promotion`
--

CREATE TABLE `status_promotion` (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `status_promotion`
--

INSERT INTO `status_promotion` (`id`, `name`) VALUES
('TT10', 'Bình thường'),
('TT11', 'Đã xóa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status_receipt`
--

CREATE TABLE `status_receipt` (
  `id` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `status_receipt`
--

INSERT INTO `status_receipt` (`id`, `name`) VALUES
('TT09', 'Chưa xử lý'),
('TT08', 'Đã hủy'),
('TT07', 'Đã xác nhận');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status_size`
--

CREATE TABLE `status_size` (
  `id` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `status_size`
--

INSERT INTO `status_size` (`id`, `name`) VALUES
('TT12', 'Đang sử dụng'),
('TT13', 'Ngưng sử dụng');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `id` (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_customer`,`id_product`,`id_size`,`id_color`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `id_size` (`id_size`);

--
-- Chỉ mục cho bảng `classify`
--
ALTER TABLE `classify`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`),
  ADD KEY `id_big_classify` (`id_big_classify`),
  ADD KEY `classify_ibfk_2` (`gender`);

--
-- Chỉ mục cho bảng `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numberphone` (`numberphone`),
  ADD KEY `customer_ibfk_2` (`gender`),
  ADD KEY `customer_ibfk_3` (`id_user`);

--
-- Chỉ mục cho bảng `detail_import_coupon`
--
ALTER TABLE `detail_import_coupon`
  ADD PRIMARY KEY (`id_import_coupon`,`id_product`,`id_size`,`id_color`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_color` (`id_color`);

--
-- Chỉ mục cho bảng `detail_promotion`
--
ALTER TABLE `detail_promotion`
  ADD PRIMARY KEY (`id_promotion`,`id_product`),
  ADD KEY `id_product` (`id_product`);

--
-- Chỉ mục cho bảng `detail_receipt`
--
ALTER TABLE `detail_receipt`
  ADD PRIMARY KEY (`id_receipt`,`id_import_coupon`,`id_product`,`id_size`,`id_color`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `detail_receipt_ibfk_2` (`id_import_coupon`);

--
-- Chỉ mục cho bảng `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`timestamp`),
  ADD UNIQUE KEY `timestamp` (`timestamp`),
  ADD KEY `event_ibfk_1` (`actor`);

--
-- Chỉ mục cho bảng `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `image_product`
--
ALTER TABLE `image_product`
  ADD PRIMARY KEY (`id_product`,`link_image`);

--
-- Chỉ mục cho bảng `import_coupon`
--
ALTER TABLE `import_coupon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_staff` (`id_staff`);

--
-- Chỉ mục cho bảng `input_country`
--
ALTER TABLE `input_country`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `privilege_action`
--
ALTER TABLE `privilege_action`
  ADD PRIMARY KEY (`id_table`);

--
-- Chỉ mục cho bảng `privilege_feature`
--
ALTER TABLE `privilege_feature`
  ADD PRIMARY KEY (`id_feature`);

--
-- Chỉ mục cho bảng `privilege_general`
--
ALTER TABLE `privilege_general`
  ADD PRIMARY KEY (`id_table`,`id_feature`),
  ADD KEY `id_feature` (`id_feature`);

--
-- Chỉ mục cho bảng `privilege_general_detail`
--
ALTER TABLE `privilege_general_detail`
  ADD PRIMARY KEY (`id_table`,`id_feature`,`id_user`),
  ADD KEY `privilege_general_detail_ibfk_3` (`id_user`),
  ADD KEY `id_feature` (`id_feature`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`),
  ADD KEY `fk_statusprod` (`idstatus`),
  ADD KEY `fk_madein` (`madein`);

--
-- Chỉ mục cho bảng `product_in_stock`
--
ALTER TABLE `product_in_stock`
  ADD PRIMARY KEY (`id_import_coupon`,`id_product`,`id_size`,`id_color`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_color` (`id_color`);

--
-- Chỉ mục cho bảng `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`id_product`,`id_size`,`id_color`),
  ADD KEY `id_size` (`id_size`),
  ADD KEY `id_color` (`id_color`);

--
-- Chỉ mục cho bảng `product_list_classify`
--
ALTER TABLE `product_list_classify`
  ADD PRIMARY KEY (`id_product`,`id_classify`),
  ADD KEY `id_classify` (`id_classify`);

--
-- Chỉ mục cho bảng `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`),
  ADD KEY `id_status` (`id_status`);

--
-- Chỉ mục cho bảng `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_staff` (`id_staff`),
  ADD KEY `id_customer` (`id_customer`),
  ADD KEY `id_status` (`id_status`);

--
-- Chỉ mục cho bảng `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_size_status` (`id_status`);

--
-- Chỉ mục cho bảng `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`),
  ADD KEY `staff_ibfk_2` (`gender`);

--
-- Chỉ mục cho bảng `staff_position`
--
ALTER TABLE `staff_position`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Chỉ mục cho bảng `staff_position_list`
--
ALTER TABLE `staff_position_list`
  ADD PRIMARY KEY (`id_position`,`id_staff`),
  ADD KEY `id_staff` (`id_staff`);

--
-- Chỉ mục cho bảng `status_product`
--
ALTER TABLE `status_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Chỉ mục cho bảng `status_promotion`
--
ALTER TABLE `status_promotion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Chỉ mục cho bảng `status_receipt`
--
ALTER TABLE `status_receipt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME` (`name`);

--
-- Chỉ mục cho bảng `status_size`
--
ALTER TABLE `status_size`
  ADD PRIMARY KEY (`id`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`id_color`) REFERENCES `color` (`id`),
  ADD CONSTRAINT `cart_ibfk_4` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`);

--
-- Các ràng buộc cho bảng `classify`
--
ALTER TABLE `classify`
  ADD CONSTRAINT `classify_ibfk_1` FOREIGN KEY (`id_big_classify`) REFERENCES `classify` (`id`),
  ADD CONSTRAINT `classify_ibfk_2` FOREIGN KEY (`gender`) REFERENCES `gender` (`id`);

--
-- Các ràng buộc cho bảng `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`gender`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `customer_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `account` (`id_user`);

--
-- Các ràng buộc cho bảng `detail_import_coupon`
--
ALTER TABLE `detail_import_coupon`
  ADD CONSTRAINT `detail_import_coupon_ibfk_1` FOREIGN KEY (`id_import_coupon`) REFERENCES `import_coupon` (`id`),
  ADD CONSTRAINT `detail_import_coupon_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product_list` (`id_product`),
  ADD CONSTRAINT `detail_import_coupon_ibfk_3` FOREIGN KEY (`id_size`) REFERENCES `product_list` (`id_size`),
  ADD CONSTRAINT `detail_import_coupon_ibfk_4` FOREIGN KEY (`id_color`) REFERENCES `product_list` (`id_color`);

--
-- Các ràng buộc cho bảng `detail_promotion`
--
ALTER TABLE `detail_promotion`
  ADD CONSTRAINT `detail_promotion_ibfk_1` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id`),
  ADD CONSTRAINT `detail_promotion_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `detail_receipt`
--
ALTER TABLE `detail_receipt`
  ADD CONSTRAINT `detail_receipt_ibfk_1` FOREIGN KEY (`id_receipt`) REFERENCES `receipt` (`id`),
  ADD CONSTRAINT `detail_receipt_ibfk_2` FOREIGN KEY (`id_import_coupon`) REFERENCES `product_in_stock` (`id_import_coupon`),
  ADD CONSTRAINT `detail_receipt_ibfk_3` FOREIGN KEY (`id_product`) REFERENCES `product_in_stock` (`id_product`),
  ADD CONSTRAINT `detail_receipt_ibfk_4` FOREIGN KEY (`id_size`) REFERENCES `product_in_stock` (`id_size`),
  ADD CONSTRAINT `detail_receipt_ibfk_5` FOREIGN KEY (`id_color`) REFERENCES `product_in_stock` (`id_color`);

--
-- Các ràng buộc cho bảng `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`actor`) REFERENCES `account` (`username`);

--
-- Các ràng buộc cho bảng `image_product`
--
ALTER TABLE `image_product`
  ADD CONSTRAINT `image_product_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `import_coupon`
--
ALTER TABLE `import_coupon`
  ADD CONSTRAINT `import_coupon_ibfk_1` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id`);

--
-- Các ràng buộc cho bảng `privilege_general`
--
ALTER TABLE `privilege_general`
  ADD CONSTRAINT `privilege_general_ibfk_1` FOREIGN KEY (`id_feature`) REFERENCES `privilege_feature` (`id_feature`),
  ADD CONSTRAINT `privilege_general_ibfk_2` FOREIGN KEY (`id_table`) REFERENCES `privilege_action` (`id_table`);

--
-- Các ràng buộc cho bảng `privilege_general_detail`
--
ALTER TABLE `privilege_general_detail`
  ADD CONSTRAINT `privilege_general_detail_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `account` (`id_user`),
  ADD CONSTRAINT `privilege_general_detail_ibfk_4` FOREIGN KEY (`id_feature`) REFERENCES `privilege_general` (`id_feature`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_madein` FOREIGN KEY (`madein`) REFERENCES `input_country` (`id`),
  ADD CONSTRAINT `fk_statusprod` FOREIGN KEY (`idstatus`) REFERENCES `status_product` (`id`);

--
-- Các ràng buộc cho bảng `product_in_stock`
--
ALTER TABLE `product_in_stock`
  ADD CONSTRAINT `product_in_stock_ibfk_1` FOREIGN KEY (`id_import_coupon`) REFERENCES `detail_import_coupon` (`id_import_coupon`),
  ADD CONSTRAINT `product_in_stock_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `detail_import_coupon` (`id_product`),
  ADD CONSTRAINT `product_in_stock_ibfk_3` FOREIGN KEY (`id_size`) REFERENCES `detail_import_coupon` (`id_size`),
  ADD CONSTRAINT `product_in_stock_ibfk_4` FOREIGN KEY (`id_color`) REFERENCES `detail_import_coupon` (`id_color`);

--
-- Các ràng buộc cho bảng `product_list_classify`
--
ALTER TABLE `product_list_classify`
  ADD CONSTRAINT `product_list_classify_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `product_list_classify_ibfk_2` FOREIGN KEY (`id_classify`) REFERENCES `classify` (`id`);

--
-- Các ràng buộc cho bảng `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `promotion_ibfk_1` FOREIGN KEY (`id_status`) REFERENCES `status_promotion` (`id`);

--
-- Các ràng buộc cho bảng `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id`),
  ADD CONSTRAINT `receipt_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `receipt_ibfk_3` FOREIGN KEY (`id_status`) REFERENCES `status_receipt` (`id`);

--
-- Các ràng buộc cho bảng `size`
--
ALTER TABLE `size`
  ADD CONSTRAINT `fk_size_status` FOREIGN KEY (`id_status`) REFERENCES `status_size` (`id`);

--
-- Các ràng buộc cho bảng `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`gender`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `staff_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `account` (`id_user`);

--
-- Các ràng buộc cho bảng `staff_position_list`
--
ALTER TABLE `staff_position_list`
  ADD CONSTRAINT `staff_position_list_ibfk_1` FOREIGN KEY (`id_position`) REFERENCES `staff_position` (`id`),
  ADD CONSTRAINT `staff_position_list_ibfk_2` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
