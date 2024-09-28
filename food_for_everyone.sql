-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2024 at 10:38 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_for_everyone`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donation_posts`
--

CREATE TABLE `donation_posts` (
  `donation_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `post_name` varchar(255) NOT NULL,
  `post_description` varchar(5000) NOT NULL,
  `serves` int(10) NOT NULL,
  `expiredate` varchar(100) NOT NULL,
  `last_receive_date` varchar(100) NOT NULL,
  `receive_time` varchar(100) NOT NULL,
  `donee_type` varchar(100) NOT NULL,
  `pickup_location` varchar(100) NOT NULL,
  `categories` varchar(100) NOT NULL,
  `location_lon` double DEFAULT NULL,
  `location_lat` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donation_posts`
--

INSERT INTO `donation_posts` (`donation_id`, `user_id`, `post_name`, `post_description`, `serves`, `expiredate`, `last_receive_date`, `receive_time`, `donee_type`, `pickup_location`, `categories`, `location_lon`, `location_lat`) VALUES
(36, 8, 'Chicken Burger Delivered', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 1, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad, Chittagong', 'Cooked Food', 91.8193, 22.33474),
(50, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food', 91.81202, 22.33797),
(51, 8, 'Burger1', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food', 91.8019, 22.33316),
(63, 8, 'Armanur Rashid', 'dfd', 2, '04/08/2024', '12/08/2024', '10:00 AM', 'Organization', 'Kodomtoli Bus Station, Kodomtoli', 'Cooked Food', 91.83354, 22.34789),
(71, 8, 'Armanur Rashid', 'rtr', 2, '23/08/2024', '06/08/2024', '10:00 AM', 'Organization', 'Kodomtoli Bus Station, Kodomtoli', 'Cooked Food', 91.84024, 22.3493),
(73, 8, 'Armanur Rashid', 'd', 2, '20/08/2024', '04/08/2024', '10:00 AM', 'Individual Person', 'Kodomtoli Bus Station, Kodomtoli', 'Cooked Food', 91.8190444, 22.3348346),
(82, 8, 'love', 'love', 3, '29/09/2024', '17/09/2024', '10:00 AM', 'Organization', 'Kodomtoli Bus Station, Kodomtoli', 'Cooked Food', 91.81836737262807, 22.332451956859842),
(83, 8, 'Armanur Rashid', 'w4yg', 2, '23/08/2024', '31/08/2024', '10:00 AM', 'Organization', 'Noakhali, Noakhali', 'Cooked Food', 91.1018542, 22.7946316),
(84, 8, 'Organization1', 'wgrw', 2, '26/09/2024', '31/08/2024', '10:00 AM', 'Organization', 'Noakhali, Noakhali', 'Cooked Food', 91.1018493, 22.7946196),
(85, 8, 'Individual1', 'sawrgf', 2, '15/09/2024', '25/08/2024', '10:00 AM', 'Individual Person', 'Noakhali, Noakhali', 'Cooked Food', 91.1018488, 22.7946201),
(86, 8, 'Anyone1', 'wefg', 5, '20/09/2024', '17/08/2024', '10:00 AM', 'Anyone', 'Noakhali, Noakhali', 'Cooked Food', 91.1018652, 22.7946405);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inbox`
--

CREATE TABLE `inbox` (
  `inbox_id` int(100) NOT NULL,
  `doner_id` int(100) NOT NULL,
  `reciever_id` int(100) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `masg_type` varchar(100) NOT NULL,
  `creation_time` varchar(100) NOT NULL,
  `last_msg_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messeges`
--

CREATE TABLE `messeges` (
  `msg_id` int(100) NOT NULL,
  `inbox_id` int(100) NOT NULL,
  `msg` varchar(100) NOT NULL,
  `msg_sender_id` int(100) NOT NULL,
  `reply_id` int(11) NOT NULL,
  `msg_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(6, '0001_01_01_000000_create_users_table', 1),
(7, '0001_01_01_000001_create_cache_table', 1),
(8, '0001_01_01_000002_create_jobs_table', 1),
(9, '2024_05_16_150920_add_two_factor_columns_to_users_table', 1),
(10, '2024_05_16_151005_create_personal_access_tokens_table', 1),
(11, '2024_05_18_045617_drop_two_factor_columns_from_users_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `noti_id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`noti_id`, `user_id`, `description`, `status`) VALUES
(1, 9, 'Your request for Chicken Burger has been accepted.', 'success'),
(3, 9, 'Your request for Burger has been rejected.', 'danger'),
(9, 23, 'The running request for Armanur Rashid that you were assigned to has been canceled.', 'danger'),
(10, 9, 'Your request for Armanur Rashid has been accepted.', 'success'),
(11, 9, 'Your request for Armanur Rashid has been accepted.', 'success'),
(12, 9, 'Your request for Armanur Rashid has been accepted.', 'success'),
(14, 9, 'The rider has accepted your delivery for Armanur Rashid ', 'success'),
(15, 9, 'The donee has received Armanur Rashid ', 'success'),
(16, 9, 'The rider has picked up the food for Armanur Rashid ', 'success'),
(17, 9, 'The rider has picked up the food for Armanur Rashid', 'success'),
(18, 9, 'The rider has picked up the food for Armanur Rashid', 'success'),
(20, 9, 'Your request for Armanur Rashid has been accepted.', 'success'),
(31, 9, 'Your request for Anyone1 has been accepted.', 'success'),
(38, 8, 'eutrj', 'success');

-- --------------------------------------------------------

--
-- Table structure for table `organization_information`
--

CREATE TABLE `organization_information` (
  `org_id` int(255) NOT NULL,
  `org_name` varchar(1000) NOT NULL,
  `office_time` varchar(1000) NOT NULL,
  `org_about` varchar(1000) NOT NULL,
  `admin_approval` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `organization_information`
--

INSERT INTO `organization_information` (`org_id`, `org_name`, `office_time`, `org_about`, `admin_approval`) VALUES
(13, 'Food Supporter', '8:00AM - 9:00PM', 'Our company help the needy people. We Donate the food so that poor people can eat those food.', 'accepted'),
(14, 'gr', 'as', 'etr', 'accepted'),
(27, 'MR Food', '8:00AM - 9:00PM', 'Our company help the needy people. We Donate the food so that poor people can eat those food.', 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_images`
--

CREATE TABLE `post_images` (
  `image_id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `image_path` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_images`
--

INSERT INTO `post_images` (`image_id`, `donation_id`, `image_path`) VALUES
(89, 50, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(90, 50, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg'),
(91, 51, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(92, 51, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529553/eztefvpgq4xzm6oqdu5t.jpg'),
(93, 51, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg'),
(102, 36, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(103, 36, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg'),
(150, 63, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg'),
(151, 63, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg'),
(155, 73, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725023940/vkldgqclxxy15yf9xhxx.jpg'),
(156, 73, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725023940/c9atpsgwwdogs7bct1nf.webp'),
(157, 73, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725023940/j2nrgytdpks8q8z61jba.webp'),
(158, 73, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725023940/hvdepw5conuezrmt2i0n.jpg'),
(162, 71, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725030697/jprmizgnhcrthutnbhzv.webp'),
(163, 71, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725030697/qmykxrlyglyx8acastdu.webp'),
(188, 81, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725320062/mdfpe3tip4ktrw3jkkyt.jpg'),
(189, 81, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725320062/pgo27gubncicktqqvqxb.jpg'),
(190, 82, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725320289/uurja7vpwrctkik39srf.jpg'),
(194, 83, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1726207719/tkc9raooxjewhqehljx1.png'),
(195, 84, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1726327236/jnu7hfzgixlnw5vlkslx.webp'),
(196, 85, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1726327370/ynwtvalpuhp6kbltu6v7.jpg'),
(197, 86, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1726330352/i1nedjehrxrzxnovzoob.webp');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rating_id` int(255) NOT NULL,
  `req_id` int(255) NOT NULL,
  `rating` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`rating_id`, `req_id`, `rating`) VALUES
(14, 12, 2),
(15, 20, 3),
(16, 18, 4);

-- --------------------------------------------------------

--
-- Table structure for table `requestdonation`
--

CREATE TABLE `requestdonation` (
  `req_id` int(255) NOT NULL,
  `donation_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `accept_status` varchar(100) NOT NULL,
  `run_status` varchar(100) NOT NULL,
  `delivery` varchar(1000) NOT NULL,
  `rider_id` int(255) DEFAULT NULL,
  `rider_status` varchar(255) DEFAULT NULL,
  `rider_allocation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requestdonation`
--

INSERT INTO `requestdonation` (`req_id`, `donation_id`, `user_id`, `accept_status`, `run_status`, `delivery`, `rider_id`, `rider_status`, `rider_allocation`) VALUES
(12, 50, 9, 'delivered', 'delivered', 'Delivery', 7, 'delivered', 'yes'),
(18, 73, 9, 'delivered', 'delivered', 'Pickup', 7, 'pending', 'yes'),
(20, 82, 9, 'canceled', 'Pending', 'Pickup', 23, 'pending', 'no'),
(21, 36, 9, 'delivered', 'delivered', 'Pickup', NULL, NULL, NULL),
(22, 51, 9, 'rejected', 'Pending', 'Pickup', NULL, NULL, NULL),
(32, 86, 9, 'accepted', 'running', 'Pickup', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rider_approval`
--

CREATE TABLE `rider_approval` (
  `rider_id` int(11) NOT NULL,
  `admin_approval` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rider_approval`
--

INSERT INTO `rider_approval` (`rider_id`, `admin_approval`) VALUES
(32, 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `rider_availability`
--

CREATE TABLE `rider_availability` (
  `rider_id` int(11) NOT NULL,
  `availability` varchar(255) NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rider_availability`
--

INSERT INTO `rider_availability` (`rider_id`, `availability`) VALUES
(7, 'no'),
(23, 'yes'),
(32, 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('ITRQqxDNWxhis5Cz6pgwhHpj5YbzxdbxA5WUVCJ0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFNERGczQlRvWEt4QzJrdDloRDJJMkp2UnVwNDdCcEJqSjJQOWtkdyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC92ZXJpZnktbWFpbC9jbGhMWHdhRFczc01IQlB1Ykl4NFBJbXpsaTU2azd0MVVpNnNUZFRQIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1726156785);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified` int(11) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_lon` double DEFAULT NULL,
  `address_lat` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `profile_img`, `is_verified`, `remember_token`, `email_verified_at`, `user_type`, `address_lon`, `address_lat`) VALUES
(1, 'Ikra Chowdhury', 'ikra@gmail.com', '$2y$12$v.nI7BfI57gIShiG8WKojOprX16xpDSsA9KjbAT2rsGOolBXhdBwe', '1234567890', 'Mogotuli', 'asasd.com', 1, '', '', '/donerRegistration', 0, 0),
(2, 'Arman', 'admin@gmail.com', '$2y$12$TpNISDnV/tIYkkqkAqPCl.TQuXBN70pNDOC0c.b3rb41yMAl0azrW', '1875560507', NULL, NULL, 1, '', '2024-06-13 12:41:48', 'Admin', 0, 0),
(7, 'Armanur Rashid', 'armanurr2514@student.nstu.edu.bd', '$2y$12$gkUs4L9ZjN4sJTQ/92N5TeuGY3WgtXQBtFFIzWGSiYvW9Ip8UvxFW', '1875560507', 'Karnaphuli Market, Chowmuhuni\r\n', NULL, 1, '', '2024-06-21 16:27:52', 'rider', 91.81956, 22.33589),
(8, 'Armanur Rashid', 'armanur@student.nstu.edu.bd', '$2y$12$.bVTVbgMRq.1I29o0l7i0e.gbMWPd.7mh1gsQGh2VNF4Xrgu1HJA6', '012833', 'sonapur', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725365793/kaa6ikwpaou15dixswvd.jpg', 1, '', '2024-06-22 18:44:23', 'donor', 91.81387, 22.33807),
(9, 'Arman', 'armanur2514@student.nstu.edu.bd', '$2y$12$YWle3I/e.1EqKnS4GJ//qe0valE9xTSdV2DtGkqf77zUzCLg3AYg2', '01875560507', 'Noakhali, Noakhali', NULL, 1, '', '2024-06-22 18:53:10', 'donee', 91.100584168544, 22.794117321179),
(14, 'Rashid', 'aranur2514@student.nstu.edu.bd', '123456', '12345678732', 'asa', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725365793/kaa6ikwpaou15dixswvd.jpg', 1, '', '2024-08-17 21:12:18', 'organization', 0, 0),
(23, 'Armanur Rashid', 'armanur25@student.nstu.edu.bd', '$2y$12$yIgXabqdF92iWfRb.Mxd8ue7R0U98vmfWuWhAgMaeJm4Tz/eVwaUG', '01875560507', 'Dewanhat More, S.K. Mujib Road', NULL, 1, '', '2024-08-30 18:55:24', 'rider', 91.813867685479, 22.338071150543),
(27, 'Amir Hamza', 'organization@student.nstu.edu.bd', '$2y$12$pI6bN6XRWGjMwl2uH0l3o.4M8nSxJhv7WuiXDC7V9rpJfmjrIHYrm', '234567890', 'Kodomtoli Bus Station, Kodomtoli', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1725365793/kaa6ikwpaou15dixswvd.jpg', 1, '', '2024-09-03 13:06:10', 'organization', 91.8178656, 22.3315539),
(32, 'Rider Boy', 'rider@gmail.com', '$2y$12$IptsrkemWqkqHdSaR3cYmO3BPkkEm3hgizMstv3RaRv5xMRYV1PHO', '123456', 'Kodomtoli Bus Station, Kodomtoli', NULL, 1, '', '2024-09-03 15:02:08', 'rider', 91.817884, 22.3315703),
(34, 'wfgr', 'kra2514@student.nstu.edu.bd', '$2y$12$3MkwKaNZ4Z81n9DkVKZFX.UGhoYEUD0EFwv1hWczPRYPJydHRj.2q', '457', 'Kodomtoli Bus Station, Kodomtoli', 'https://res-console.cloudinary.com/de0xjzms6/thumbnails/v1/image/upload/v1725364995/c3pldjZ6NnhkcGdlbGM3dXNvNjY=/drilldown', 1, '', '2024-09-03 18:59:49', 'donor', 91.8190444, 22.3348346),
(39, 'Armanur Rashid', 'ikra2514@student.nstu.edu.bd', '$2y$12$zZprsH30mTL7iSDLt3aYFuRQc1NZFkil9RsHo2Lo0MAHD6Mg2lr9S', '01875560507', 'Noakhali, Noakhali', 'https://res-console.cloudinary.com/de0xjzms6/thumbnails/v1/image/upload/v1725364995/c3pldjZ6NnhkcGdlbGM3dXNvNjY=/drilldown', 1, '', '2024-09-12 15:59:45', 'donor', 91.1018667, 22.794648);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `donation_posts`
--
ALTER TABLE `donation_posts`
  ADD PRIMARY KEY (`donation_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `inbox`
--
ALTER TABLE `inbox`
  ADD PRIMARY KEY (`inbox_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messeges`
--
ALTER TABLE `messeges`
  ADD PRIMARY KEY (`msg_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`noti_id`);

--
-- Indexes for table `organization_information`
--
ALTER TABLE `organization_information`
  ADD PRIMARY KEY (`org_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `post_images`
--
ALTER TABLE `post_images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rating_id`);

--
-- Indexes for table `requestdonation`
--
ALTER TABLE `requestdonation`
  ADD PRIMARY KEY (`req_id`);

--
-- Indexes for table `rider_approval`
--
ALTER TABLE `rider_approval`
  ADD PRIMARY KEY (`rider_id`);

--
-- Indexes for table `rider_availability`
--
ALTER TABLE `rider_availability`
  ADD PRIMARY KEY (`rider_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donation_posts`
--
ALTER TABLE `donation_posts`
  MODIFY `donation_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inbox`
--
ALTER TABLE `inbox`
  MODIFY `inbox_id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messeges`
--
ALTER TABLE `messeges`
  MODIFY `msg_id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `noti_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `requestdonation`
--
ALTER TABLE `requestdonation`
  MODIFY `req_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
