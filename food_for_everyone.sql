-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2024 at 07:08 PM
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
(91, 41, 'Packet Biriyani', '10 packets of biryani were left after our function. The biryani will remain fresh until tonight.', 10, '02/10/2024', '02/10/2024', '12:00 AM', 'Anyone', 'Noakhali, Noakhali', 'Cooked Food', 91.10272200160483, 22.79315046537235);

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
  `masg_type` varchar(100) NOT NULL
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
(50, 9, 'No rider available You have to pickup food for yourself', 'success'),
(51, 9, 'Your request for baby has been accepted.', 'success'),
(52, 9, 'No rider available You have to pickup food for yourself', 'success'),
(53, 40, 'A New request for Ar.', 'success'),
(54, 9, 'Your request for Ar has been accepted.', 'success'),
(55, 9, 'No rider available You have to pickup food for yourself', 'success'),
(56, 40, 'A New request for Momos and pudding.', 'success'),
(57, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(58, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(59, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(60, 40, 'The rider has accepted your delivery for Momos and pudding ', 'success'),
(61, 9, 'The rider has accepted your delivery for Momos and pudding ', 'success'),
(62, 40, 'A New request for baby.', 'success'),
(63, 9, 'Your request for baby has been accepted.', 'success'),
(64, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(65, 9, 'Your request for baby has been accepted.', 'success'),
(66, 9, 'Your request for baby has been accepted.', 'success'),
(67, 9, 'Your request for baby has been accepted.', 'success'),
(68, 40, 'The rider has accepted your delivery for baby ', 'success'),
(69, 9, 'The rider has accepted your delivery for baby ', 'success'),
(70, 9, 'Your request for baby has been accepted.', 'success'),
(71, 9, 'Your request for baby has been accepted.', 'success'),
(72, 9, 'No rider available You have to pickup food for yourself', 'success'),
(73, 9, 'Your request for baby has been accepted.', 'success'),
(74, 9, 'No rider available You have to pickup food for yourself', 'success'),
(75, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(76, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(77, 40, 'A New request for baby.', 'success'),
(78, 40, 'A New request for Momos and pudding.', 'success'),
(79, 9, 'Your request for baby has been accepted.', 'success'),
(80, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(81, 40, 'The donee has received baby ', 'success'),
(82, 40, 'The donee has received Momos and pudding ', 'success'),
(83, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(84, 9, 'Your request for Momos and pudding has been accepted.', 'success'),
(85, 9, 'No rider available You have to pickup food for yourself', 'success'),
(86, 9, 'Your request for baby has been accepted.', 'success'),
(87, 40, 'The rider has accepted your delivery for baby ', 'success'),
(88, 9, 'The rider has accepted your delivery for baby ', 'success'),
(89, 41, 'A New request for Packet Biriyani.', 'success');

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
(45, 'Cholo Paltai Bangladesh', '9:00AM - 10:00 PM', 'Seba ebong subidha bonchito manusher pashe daraie sototar sathe kaj kora e amader prottoy', 'accepted');

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
(207, 91, 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727789125/cfedmlycltusopsndnqn.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rating_id` int(255) NOT NULL,
  `req_id` int(255) NOT NULL,
  `rating` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(42, 91, 42, 'Pending', 'Pending', 'Pickup', NULL, NULL, NULL);

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
(43, 'accepted');

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
(43, 'no');

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
('ByApIJawc9XMzBRaeBbxTjAgOkPFefysJEG10fbT', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVVRuUktpSFJ2Zk43YzlGTmRJdFVpU2NuUk5URFJJdU9WWHk2NFUzWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC92ZXJpZnktbWFpbC9acFJjMlJaelVNR0s4RGZ0eTRLeTFUOHMzVVNGbFdzMmlsNmdITTM2Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1727788654),
('fEIpuuYZOZUigvdhbtdZucs49BA0pc4KA3PMavCz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHJMcnRrMWVsd2NBdk1EOUpHQWVtUFVqUXdsQ2lrOWFXOVBIdWF5SCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC92ZXJpZnktbWFpbC9RbTZoT3Q5Vm1iZUFDRm8yOHg2WGxrQktvUWlicE5rQWZna25GWFpjIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1727685386),
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
(41, 'Ikra Chowdhury', 'donor@gmail.com', '$2y$12$gbAtOE4pkxAmthxGBbVueuP7mPSiek8AItkmFo2uO1CIZI8DB6ofa', '01814940719', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-01 12:31:58', 'donor', 91.098559213214, 22.790103998541),
(42, 'Sanzida Sultana', 'normaldonee@gmail.com', '$2y$12$34/5rg50S3sKz1QBvgWpKOBMQBzXt9XyUM/aYRrMuu1i4XyANVq0i', '01882428980', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-01 12:55:53', 'donee', 91.100983930164, 22.794535200522),
(43, 'Arnab Dey', 'rider1@gmail.com', '$2y$12$wpVLzdLMF2llPA/yv0yh4Oj7yghGwLJEX7Os084TMDYS8IM.jVk0q', '01725017282', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-01 12:55:53', 'rider', 91.098829338817, 22.858772173557),
(44, 'Admin', 'admin@gmail.com', '$2y$12$RUUI6wYIHe9SyBa2XxToT..hwWEIYEhjcEq84Y7bFvXr3AJnfPpJK', '01882428980', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-01 12:55:53', 'Admin', 91.100983930164, 22.794535200522),
(45, 'Organization', 'org@gmail.com', '$2y$12$B8u6zzx8lnZEDq65dnUHgekdrUns1tAETaoqgVkFQb6e7bWL3rFlC', '01634858752', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-01 13:17:34', 'organization', 91.103344274096, 22.789292914731);

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
  MODIFY `donation_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inbox`
--
ALTER TABLE `inbox`
  MODIFY `inbox_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messeges`
--
ALTER TABLE `messeges`
  MODIFY `msg_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `noti_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rating_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `requestdonation`
--
ALTER TABLE `requestdonation`
  MODIFY `req_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
