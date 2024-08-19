-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2024 at 08:30 PM
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
  `categories` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donation_posts`
--

INSERT INTO `donation_posts` (`donation_id`, `user_id`, `post_name`, `post_description`, `serves`, `expiredate`, `last_receive_date`, `receive_time`, `donee_type`, `pickup_location`, `categories`) VALUES
(36, 8, 'Chicken Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 1, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(40, 8, 'Biriyani', 'Biriyani biriyani', 7, '20/08/2025', '20/08/2023', '12:00 AM', 'Organization', 'Bangladesh', 'Cooked'),
(41, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(42, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(43, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(44, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(45, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(46, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(47, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(48, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(49, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(50, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food'),
(51, 8, 'Burger', 'Burger is a yummy food. A hamburger, or simply a burger, is a dish consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.', 2, '20/08/2024', '17/08/2024', '10:00 AM', 'Organization', 'Agrabad', 'Cooked Food');

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
(14, 'gr', 'as', 'etr', 'accepted');

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
(41, 40, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(42, 40, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529553/eztefvpgq4xzm6oqdu5t.jpg'),
(43, 40, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(44, 40, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529553/eztefvpgq4xzm6oqdu5t.jpg'),
(45, 43, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(46, 43, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529553/eztefvpgq4xzm6oqdu5t.jpg'),
(47, 43, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg'),
(48, 43, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529553/lopgcezcvyxoa47sbzad.jpg'),
(89, 50, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(90, 50, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg'),
(91, 51, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(92, 51, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529553/eztefvpgq4xzm6oqdu5t.jpg'),
(93, 51, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg'),
(96, 36, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/qx8yxlt4uwfkdfp3jaby.jpg'),
(97, 36, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1722529552/f3e7jxqchij9nzgdycr6.jpg');

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
(14, 12, 2);

-- --------------------------------------------------------

--
-- Table structure for table `requestdonation`
--

CREATE TABLE `requestdonation` (
  `req_id` int(255) NOT NULL,
  `donation_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `location` varchar(1000) NOT NULL,
  `accept_status` varchar(100) NOT NULL,
  `run_status` varchar(100) NOT NULL,
  `delivery` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requestdonation`
--

INSERT INTO `requestdonation` (`req_id`, `donation_id`, `user_id`, `location`, `accept_status`, `run_status`, `delivery`) VALUES
(6, 36, 9, 'Sonapur', 'accepted', 'Pending', 'Rider'),
(12, 40, 9, 'Bangladesh', 'delivered', 'delivered', 'Delivery');

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
('6u2nWNgkiUsR1fVl1w5skl8lvWB3IHgpz2x8bhZ7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMzNjQmJIYUd5MG1vT2hRS1haeHRHTUhadHRXenhZZEVRcFFQRklyQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC92ZXJpZnktbWFpbC9PRHBIWWZ0b3M4ODFpSUh6UU1rRUpwYWFQZnpyQzVUMXlCOHFhMWp1Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1723929138),
('9E23tqlRWnpyQm0N5eLZogyg28tT64QQZtfMQPwf', NULL, '127.0.0.1', 'PostmanRuntime/7.40.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieThUVTRPelEzdWJkZjhhYkNBUUlYd3dmM3JtOG93Vk1xUnRidmVTMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1722697585),
('lJj1LEwU29VSFwgPAGcBJNXlcHmA2nRdpKyVPNwH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRzRVelVndE1TTHpzdmp4aGxjRWZ1M2FSdjV2RG9UaFo0ajd3VjJPWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC92ZXJpZnktbWFpbC9ScVozOWdSalBoQ3NjYUFsbk03S2cwZEVTSUJkU01oVEF5SHo1bTZSIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1718987272),
('moKwjhqxtvsTPUhnZ9ALdOHdble5BBdACpRopiNH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaWFPSzdscjZZVU54czZsTXVQeWdCMjdhYXhPNWpYZlJscWlFVm9sdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC92ZXJpZnktbWFpbC9wNTM0YjMzYXBYQzNIZmxGMUJ1TFE1T094SWdjamJLU1FvbW9qenBFIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1718282508),
('tnXjNBSjRnFItvlsX9z6Unrsq4ktXS69SFSp2H0g', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmZqNHhYaDNFaWFyMlplNDl6bk5SRlM0YUZJVHhvZmVYZXVHVERPbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC92ZXJpZnktbWFpbC9YeElmd1pXZ1Bsb0FtOFZuSFlBc2I3RWFXcm5Tem9FM3dITzFYWjdtIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1719082390);

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
  `is_verified` int(11) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `is_verified`, `remember_token`, `email_verified_at`, `user_type`) VALUES
(1, 'Ikra Chowdhury', 'ikra@gmail.com', '$2y$12$v.nI7BfI57gIShiG8WKojOprX16xpDSsA9KjbAT2rsGOolBXhdBwe', '1234567890', 'Mogotuli', 1, '', '', '/donerRegistration'),
(2, 'Arman', 'aarmanur2514@student.nstu.edu.bd', '$2y$12$TpNISDnV/tIYkkqkAqPCl.TQuXBN70pNDOC0c.b3rb41yMAl0azrW', '1875560507', NULL, 1, '', '2024-06-13 12:41:48', 'Admin'),
(7, 'Armanur Rashid', 'armanurr2514@student.nstu.edu.bd', '$2y$12$gkUs4L9ZjN4sJTQ/92N5TeuGY3WgtXQBtFFIzWGSiYvW9Ip8UvxFW', '1875560507', NULL, 1, '', '2024-06-21 16:27:52', 'rider'),
(8, 'Arman', 'armanur@student.nstu.edu.bd', '$2y$12$.bVTVbgMRq.1I29o0l7i0e.gbMWPd.7mh1gsQGh2VNF4Xrgu1HJA6', '1634858752', 'sonapur', 1, '', '2024-06-22 18:44:23', 'donor'),
(9, 'Arman', 'armanur2514@student.nstu.edu.bd', '$2y$12$Flb/Plqf/NnepQC52cYscOW2uykKyM0WDSn2LRTWXu75AGow0jFEy', '1634858752', 'Agrabad', 1, '', '2024-06-22 18:53:10', 'donee'),
(13, 'Mr Arman', 'nowshadparvin@gmail.com', '$2y$12$7QvNcYITC03fia30DlRL5uo34ezMvfaoPtMVyqD.W5OXgnFJHrGuy', '01875560507', 'Maijdee, Noakhali', 0, 'O2qCUGKEN5k5m1wb03h2WCYlRNp0c6okUTwSSGdr', NULL, 'donee'),
(14, 'Rashid', 'aranur2514@student.nstu.edu.bd', '123456', '12345678732', 'asa', 1, '', '2024-08-17 21:12:18', 'donee');

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
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `donation_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `requestdonation`
--
ALTER TABLE `requestdonation`
  MODIFY `req_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
