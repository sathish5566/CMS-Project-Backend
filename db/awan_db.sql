-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2022 at 11:38 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `awan_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `superadmin`
--

CREATE TABLE `superadmin` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_by` int(1) NOT NULL DEFAULT 0,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `superadmin`
--

INSERT INTO `superadmin` (`id`, `name`, `username`, `password`, `email`, `created_by`, `created_date`, `updated_date`) VALUES
(1, 'Super Admin', NULL, '$2a$10$AxnlV6B.cD8xUxY8nQm/CuZVxzASQEJCjf2L4q0kBydWlckhuW05a', 'superadmin@gmail.com', 0, '2022-06-25 06:05:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `users` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` int(12) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'default 0,default 1-APPROVED,',
  `approved_by` int(4) DEFAULT NULL,
  `approved_date` timestamp NULL DEFAULT NULL,
  `create_by` tinyint(1) NOT NULL DEFAULT 0,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `users`, `name`, `phone`, `address`, `email`, `password`, `salt`, `status`, `approved_by`, `approved_date`, `create_by`, `ip_address`, `created_date`, `updated_date`) VALUES
(1, NULL, 'Five King', 2147483647, 'MDR', 'fiveking@gmail.com', '$2a$10$vQ51Gyh.L8HvLPHCmxdjwOcRWmiRY9q16638aOVS1vozCUmRaSbdi', '', 1, 1, '2022-06-25 09:28:32', 0, '::1', '2022-06-25 05:28:55', '2022-06-25 09:28:32'),
(2, NULL, 'Five King1', 2147483641, 'MDR1', 'fivekingq@gmail.com', '$2a$10$vQ51Gyh.L8HvLPHCmxdjwOcRWmiRY9q16638aOVS1vozCUmRaSbdi', '', 0, NULL, NULL, 0, '::1', '2022-06-25 05:28:55', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `superadmin`
--
ALTER TABLE `superadmin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `superadmin`
--
ALTER TABLE `superadmin`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
