-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2025 at 03:24 PM
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
-- Database: `dentsysphp`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `a_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `service_` varchar(50) NOT NULL,
  `date_` date NOT NULL,
  `time_` varchar(50) NOT NULL,
  `status_` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`a_id`, `id`, `service_`, `date_`, `time_`, `status_`) VALUES
(155, 91, 'Oral prophylaxis (Teeth Cleaning)', '2024-12-06', '4:00 PM - 5:00 PM', 'cancelled'),
(156, 92, 'Oral prophylaxis (Teeth Cleaning)', '2024-12-06', '4:00 PM - 5:00 PM', 'finished'),
(157, 93, 'Oral prophylaxis (Teeth Cleaning)', '2024-12-08', '4:00 PM - 5:00 PM', 'finished'),
(158, 94, '1', '2024-12-11', '9:00 AM - 10:00 AM', 'accepted'),
(159, 94, '1', '2024-12-10', '9:00 AM - 10:00 AM', 'finished'),
(160, 95, '2', '2025-01-17', '11:00 AM - 12:00 PM', 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `audit_log`
--

CREATE TABLE `audit_log` (
  `audit_id` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `action` text NOT NULL,
  `affected_table` varchar(10) DEFAULT NULL,
  `record_id` varchar(10) DEFAULT NULL,
  `old_value` text DEFAULT NULL,
  `new_value` text DEFAULT NULL,
  `timestamp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `inv_id` int(11) NOT NULL,
  `ph_id` varchar(45) DEFAULT NULL,
  `inv_issuedate` varchar(45) DEFAULT NULL,
  `inv_duedate` varchar(45) DEFAULT NULL,
  `inv_totalamount` decimal(10,2) DEFAULT NULL,
  `inv_status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`inv_id`, `ph_id`, `inv_issuedate`, `inv_duedate`, `inv_totalamount`, `inv_status`) VALUES
(41, '82', '2024-12-10', '2024-12-10', 4000.00, 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `patienthistory`
--

CREATE TABLE `patienthistory` (
  `id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `p_date` varchar(20) NOT NULL,
  `p_time` varchar(20) NOT NULL,
  `p_service` varchar(50) NOT NULL,
  `p_selectedTeeth` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `p_dentist` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patienthistory`
--

INSERT INTO `patienthistory` (`id`, `p_id`, `p_date`, `p_time`, `p_service`, `p_selectedTeeth`, `p_dentist`) VALUES
(82, 38, '2024-12-10', '9:00 AM - 10:00 AM', '4', '[13,22,8,30]', 'Dingcong');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `p_fname` varchar(45) DEFAULT NULL,
  `p_lname` varchar(45) DEFAULT NULL,
  `p_mname` varchar(45) DEFAULT NULL,
  `p_ename` varchar(45) DEFAULT NULL,
  `p_age` int(11) DEFAULT NULL,
  `p_gender` varchar(45) DEFAULT NULL,
  `p_email` varchar(45) DEFAULT NULL,
  `p_phone` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `p_fname`, `p_lname`, `p_mname`, `p_ename`, `p_age`, `p_gender`, `p_email`, `p_phone`) VALUES
(38, 'Jeonghan', 'Yoon', '', '', NULL, NULL, 'tontonwinstonnn@gmail.com', '09270477362'),
(39, 'sample', 'sample', '', '', NULL, NULL, 'tontonwinstonnn@gmail.com', '09270477362');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `pay_id` int(11) NOT NULL,
  `inv_id` int(11) NOT NULL,
  `pay_date` date DEFAULT NULL,
  `pay_time` time DEFAULT NULL,
  `pay_method` varchar(45) DEFAULT NULL,
  `pay_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`pay_id`, `inv_id`, `pay_date`, `pay_time`, `pay_method`, `pay_amount`) VALUES
(1, 41, '2024-12-11', '00:16:00', 'CASH', 300.00),
(2, 41, '2024-12-10', '00:20:00', 'CASH', 3700.00);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`) VALUES
(1, 'oral prophylaxis (teeth cleaning)'),
(2, 'composite restoration'),
(3, 'teeth whitening'),
(4, 'veneers'),
(5, 'dental crowns'),
(6, 'dental bridges'),
(7, 'orthodontic treatment (braces)'),
(8, 'replacement of bracket'),
(9, 'recement of bracket'),
(10, 'removal of braces'),
(11, 'retainer'),
(12, 'false tooth'),
(13, 'dentures'),
(14, 'wisdom tooth removal'),
(15, 'oral surgeries'),
(16, 'root canal treatment'),
(17, 'radiograph');

-- --------------------------------------------------------

--
-- Table structure for table `servicesoptions`
--

CREATE TABLE `servicesoptions` (
  `option_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `option_name` varchar(45) DEFAULT NULL,
  `option_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicesoptions`
--

INSERT INTO `servicesoptions` (`option_id`, `service_id`, `option_name`, `option_price`) VALUES
(1, 1, 'mild (upper and lower teeth)', 1000.00),
(2, 1, 'moderate (upper and lower teeth)', 1500.00),
(3, 1, 'severe (upper and lower teeth)', 2000.00),
(4, 2, 'mild (per tooth)', 1000.00),
(5, 2, 'moderate (per tooth)', 1500.00),
(6, 2, 'severe (per tooth)', 2000.00),
(7, 3, 'teeth whitening (upper and lower teeth)', 6000.00),
(8, 4, 'direct (per tooth)', 5000.00),
(9, 4, 'indirect (per tooth)', 25000.00),
(10, 5, 'plastic (per tooth)', 3500.00),
(11, 5, 'porcelain (per tooth)', 7000.00),
(12, 5, 'zirconia (per tooth)', 20000.00),
(13, 6, 'plastic (per tooth)', 3500.00),
(14, 6, 'porcelain (per tooth)', 7000.00),
(15, 6, 'zirconia (per tooth)', 20000.00),
(16, 7, 'mild (upper and lower teeth)', 30000.00),
(17, 7, 'moderate (upper and lower teeth)', 35000.00),
(18, 7, 'severe (upper and lower teeth)', 40000.00),
(19, 7, 'mild (upper teeth)', 20000.00),
(20, 7, 'moderate (upper teeth)', 25000.00),
(21, 7, 'severe (upper teeth)', 30000.00),
(22, 8, 'per tooth', 500.00),
(23, 9, 'per tooth', 250.00),
(24, 10, 'upper and lower braces', 3000.00),
(25, 11, 'ordinary (upper and lower teeth)', 7000.00),
(26, 11, 'invisible(upper and lower teeth)', 8000.00),
(27, 12, 'per tooth', 500.00),
(28, 13, 'starting fee for 1 tooth', 3500.00),
(30, 14, 'mild (per tooth)', 3000.00),
(31, 14, 'moderate (per tooth)', 4000.00),
(32, 14, 'severe (per tooth)', 5000.00),
(33, 15, 'impacted wisdom tooth (per tooth)', NULL),
(34, 15, 'gingivectomy (per gums)', NULL),
(35, 15, 'mucocele removal', 3000.00),
(36, 16, 'per canal', 7000.00),
(37, 16, 'fiber post', 2000.00),
(38, 17, 'periapical x-ray', 500.00),
(39, 17, 'panoramic x-ray', 850.00),
(49, 7, 'mild (lower teeth)', 20000.00),
(50, 7, 'moderate (lower teeth)', 25000.00),
(51, 7, 'severe (lower teeth)', 30000.00);

-- --------------------------------------------------------

--
-- Table structure for table `temppatient`
--

CREATE TABLE `temppatient` (
  `id` int(11) NOT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `mname` varchar(45) DEFAULT NULL,
  `ename` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `temppatient`
--

INSERT INTO `temppatient` (`id`, `fname`, `lname`, `mname`, `ename`, `email`, `phone`) VALUES
(91, 'Jenwell', 'Dingcong', 'Nasorrada', '', 'tontonwinstonnn@gmail.com', '09270477362'),
(92, 'Jeonghan', 'Yoon', '', '', 'tontonwinstonnn@gmail.com', '09270477362'),
(93, 'lance', 'BERNAL', 'RABANDABAN', '', 'lancewrt@gmail.com', '09695295926'),
(94, 'sample', 'sample', '', '', 'tontonwinstonnn@gmail.com', '09270477362'),
(95, 'lance', 'lance1', 'RABANDABAN', '', 'lancewrt@gmail.com', '09695295926');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `account_type` text NOT NULL,
  `u_fname` varchar(20) NOT NULL,
  `u_lname` varchar(20) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `account_type`, `u_fname`, `u_lname`, `status`) VALUES
(1, 'admin', 'admin_123', 'staff', 'Giolliana', 'Plandez', 'active'),
(2, 'admin2', 'admin_123', 'admin', 'Pauleen', 'Dingcong', 'active'),
(3, 'lance', 'llllllll', 'admin', 'Lance', 'Bernal', 'active'),
(21, 'asasawwwwwww', '$2y$10$auL8JHvzZWRPiSs2XLJI7.9Jd8wtCSWi/F1k9kgD5Jr', 'dentist', 'Giolliana2', 'Dingcong', 'active'),
(22, 'asasawwwwwwaw', '$2y$10$OHpWJobPWQmlBeLTpDqeD.sPJvkfxvccyWwKt2BEV7O', 'dentist', 'Giolliana2', 'Dingcong', 'active'),
(23, 'asasawwwwwwawsa', '$2y$10$y.bdg.XosQoE4qCTJXNkreZRKJFxs1JiB024s18YoSB', 'dentist', 'Giolliana2', 'Dingcong', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`a_id`),
  ADD KEY `app_id_idx` (`id`);

--
-- Indexes for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`audit_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`inv_id`);

--
-- Indexes for table `patienthistory`
--
ALTER TABLE `patienthistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ph_p_id_idx` (`p_id`),
  ADD KEY `ph_pid_idx` (`p_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`pay_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `servicesoptions`
--
ALTER TABLE `servicesoptions`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `opt_service_id_idx` (`service_id`);

--
-- Indexes for table `temppatient`
--
ALTER TABLE `temppatient`
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
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `audit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `inv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `patienthistory`
--
ALTER TABLE `patienthistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `servicesoptions`
--
ALTER TABLE `servicesoptions`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `temppatient`
--
ALTER TABLE `temppatient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
