-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2024 at 02:01 PM
-- Server version: 10.4.32-MariaDB
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `is_verified` int(11) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `email_verified_at` varchar(100) DEFAULT NULL,
  `user_type` varchar(100) DEFAULT NULL,
  `address_lon` double DEFAULT NULL,
  `address_lat` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `profile_img`, `is_verified`, `remember_token`, `email_verified_at`, `user_type`, `address_lon`, `address_lat`) VALUES
(41, 'Ikra Chowdhury', 'donor@gmail.com', '$2y$12$7TcJYdT6uf.ovuhd6i8LDeNGH58bW38med6nvWB2brJg7aHTmlQt6', '01712882189', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727867880/wz7pg7iadjsi04djvhoj.webp', 1, '', '2024-10-01 12:31:58', 'donor', 91.098559213214, 22.790103998541),
(42, 'Sanzida Sultana', 'normaldonee@gmail.com', '$2y$12$34/5rg50S3sKz1QBvgWpKOBMQBzXt9XyUM/aYRrMuu1i4XyANVq0i', '01882428980', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-01 12:55:53', 'donee', 91.100983930164, 22.794535200522),
(44, 'Admin', 'admin@gmail.com', '$2y$12$RUUI6wYIHe9SyBa2XxToT..hwWEIYEhjcEq84Y7bFvXr3AJnfPpJK', '01882428980', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-01 12:55:53', 'Admin', 91.100983930164, 22.794535200522),
(45, 'Organization', 'org@gmail.com', '$2y$12$B8u6zzx8lnZEDq65dnUHgekdrUns1tAETaoqgVkFQb6e7bWL3rFlC', '01634858752', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-01 13:17:34', 'organization', 91.103344274096, 22.789292914731),
(46, 'Rider1', 'rider1@gmail.com', '$2y$12$XLEM5BkYp6WOO5UQtdcdPORZd/s/jbFtPftEXvYq.m8Q4aAAecmkm', '01875560507', 'Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-02 11:40:58', 'rider', 91.101559226095, 22.790330086854),
(47, 'Arnab Dey', 'rider2@gmail.com', '$2y$12$h.2rBXt40eR2LMxgsgm8m.E3CzWTlN1nqVLf3wIjjYSvIQsVth/c6', '01875560507', 'Banoful And Co Maijdee Noakhali, Noakhali', 'http://res.cloudinary.com/de0xjzms6/image/upload/v1727786587/d7uylxxrm9wbjey8ejqg.png', 1, '', '2024-10-02 11:46:38', 'rider', 91.097746727236, 22.8639385924);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
