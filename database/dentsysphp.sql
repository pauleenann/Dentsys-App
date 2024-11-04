-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2024 at 05:53 AM
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
(84, 61, 'Oral prophylaxis (Teeth Cleaning)', '2024-10-04', '11:00 AM - 12:00 PM', 'finished'),
(85, 62, 'Composite Restoration', '2024-10-04', '12:00 PM - 1:00 PM', 'finished'),
(86, 63, 'Oral prophylaxis (Teeth Cleaning)', '2024-11-04', '3:00 PM - 4:00 PM', 'finished');

-- --------------------------------------------------------

--
-- Table structure for table `dentist`
--

CREATE TABLE `dentist` (
  `d_id` int(11) NOT NULL,
  `d_fname` varchar(45) DEFAULT NULL,
  `d_lname` varchar(45) DEFAULT NULL,
  `d_email` varchar(45) DEFAULT NULL,
  `d_mobile` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dentist`
--

INSERT INTO `dentist` (`d_id`, `d_fname`, `d_lname`, `d_email`, `d_mobile`) VALUES
(1, 'Pauleen', 'Dingcong', 'pau@gmail.com', '09278837486'),
(2, 'Lance', 'Bernal', 'lance@gmail.com', '09267863541');

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
(25, '49', '2024-10-04', '2024-10-04', 1500.00, 'partial'),
(26, '50', '2024-10-04', '2024-10-04', 12000.00, 'paid'),
(27, '51', '2024-10-04', '2024-10-04', 1000.00, 'pending');

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
  `p_dentist` varchar(50) NOT NULL,
  `p_severity_material` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patienthistory`
--

INSERT INTO `patienthistory` (`id`, `p_id`, `p_date`, `p_time`, `p_service`, `p_selectedTeeth`, `p_dentist`, `p_severity_material`) VALUES
(49, 14, '2024-10-05', '9:00 AM - 10:00 AM', 'Radiograph', '{\"14\":true,\"21\":true,\"23\":true}', 'Dingcong', 'periapical x-ray'),
(50, 14, '2024-10-04', '10:00 AM - 11:00 AM', 'Teeth Whitening', '{\"11\":true,\"13\":true}', 'Dingcong', 'Standard'),
(51, 14, '2024-10-05', '9:00 AM - 10:00 AM', 'Radiograph', '{\"11\":true,\"13\":true}', 'Dingcong', 'periapical x-ray');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `p_fname` varchar(45) NOT NULL,
  `p_lname` varchar(45) NOT NULL,
  `p_mname` varchar(45) NOT NULL,
  `p_ename` varchar(45) NOT NULL,
  `p_age` int(11) NOT NULL,
  `p_gender` varchar(45) NOT NULL,
  `p_email` varchar(45) NOT NULL,
  `p_phone` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `p_fname`, `p_lname`, `p_mname`, `p_ename`, `p_age`, `p_gender`, `p_email`, `p_phone`) VALUES
(13, 'lance', 'lance', 'RABANDABAN', '', 20, '', 'lancewrt@gmail.com', '09162121212'),
(14, 'NEMIA', 'BERNAL', 'RABANDABAN', '', 20, '', 'lancewrt@gmail.com', '09162121212');

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
(38, 25, '2024-10-18', '10:40:00', 'CASH', 200.00),
(39, 26, '2024-10-04', '13:02:00', 'CASH', 12000.00);

-- --------------------------------------------------------

--
-- Table structure for table `servicedetails`
--

CREATE TABLE `servicedetails` (
  `sd_id` int(11) NOT NULL,
  `s_id` int(11) DEFAULT NULL,
  `sd_description` varchar(255) DEFAULT NULL,
  `sd_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicedetails`
--

INSERT INTO `servicedetails` (`sd_id`, `s_id`, `sd_description`, `sd_price`) VALUES
(1, 1, 'Mild', 1000.00),
(2, 1, 'Moderate', 1500.00),
(3, 1, 'Severe', 2000.00),
(4, 2, 'Mild', 1000.00),
(5, 2, 'Moderate', 1500.00),
(6, 2, 'Severe', 2000.00),
(7, 3, 'Standard', 6000.00),
(8, 4, 'Direct Veneers (per tooth)', 5000.00),
(9, 4, 'Indirect Veneers (per tooth)', 25000.00),
(10, 5, 'Plastic (per tooth)', 3500.00),
(11, 5, 'Porcelain (per tooth)', 7000.00),
(12, 5, 'Zirconia (per tooth)', 20000.00),
(13, 6, 'Plastic (per tooth)', 3500.00),
(14, 6, 'Porcelain (per tooth)', 7000.00),
(15, 6, 'Zirconia (per tooth)', 20000.00),
(16, 7, 'Mild', 30000.00),
(17, 7, 'Moderate', 35000.00),
(18, 7, 'Severe', 40000.00),
(33, 14, 'starting fee for 1 tooth', 3500.00),
(34, 15, 'Upper', 5000.00),
(35, 15, 'Lower erupted', 5000.00),
(36, 16, 'Impacted Wisdom tooth', 15000.00),
(37, 16, 'gingivectomy (per gums)', 1000.00),
(38, 16, 'Mucocele removal', 3000.00),
(39, 17, 'Per canal', 7000.00),
(40, 17, 'Fiber post', 2000.00),
(41, 18, 'periapical x-ray', 500.00),
(42, 18, 'panoramic x-ray', 850.00);

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
(1, 'Oral prophylaxis (Teeth Cleaning)'),
(2, 'Composite Restoration'),
(3, 'Teeth Whitening'),
(4, 'Veneers'),
(5, 'Dental Crowns'),
(6, 'Dental Bridges'),
(7, 'Orthodontic Treatment (Braces)'),
(14, 'Dentures'),
(15, 'Wisdowm Tooth Removal'),
(16, 'Oral Surgery'),
(17, 'Root Canal Treatment'),
(18, 'Radiograph');

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
(60, 'lance', 'lance', 'RABANDABAN', '', 'lancewrt@gmail.com', '09695295926'),
(61, 'NEMIA', 'BERNAL', 'RABANDABAN', '', 'lancewrt@gmail.com', '09695295926'),
(62, 'Edward', 'Cruz', '', '', 'edward@gmail.com', '09219161482'),
(63, 'jojo', 'Siwa', 'Marie', '', 'jojosiwa@gmail.com', '09999999999');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `account_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `account_type`) VALUES
(1, 'admin', 'admin_123', 'admin'),
(2, 'lance', 'llllllll', 'admin'),
(3, 'gio', 'llllllll', 'dentist');

-- --------------------------------------------------------

--
-- Table structure for table `user_sessions`
--

CREATE TABLE `user_sessions` (
  `s_id` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `login_time` varchar(255) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`s_id`, `session_id`, `user_agent`, `ip_address`, `username`, `login_time`) VALUES
(55, 'ijx85bt40', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '222.127.152.44', 'lance', '2024-11-04 12:17:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`a_id`),
  ADD KEY `fk_id_idx` (`id`);

--
-- Indexes for table `dentist`
--
ALTER TABLE `dentist`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`inv_id`);

--
-- Indexes for table `patienthistory`
--
ALTER TABLE `patienthistory`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `servicedetails`
--
ALTER TABLE `servicedetails`
  ADD PRIMARY KEY (`sd_id`),
  ADD KEY `service_id_idx` (`s_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

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
-- Indexes for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`s_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `dentist`
--
ALTER TABLE `dentist`
  MODIFY `d_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `inv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `patienthistory`
--
ALTER TABLE `patienthistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `servicedetails`
--
ALTER TABLE `servicedetails`
  MODIFY `sd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `temppatient`
--
ALTER TABLE `temppatient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `servicedetails`
--
ALTER TABLE `servicedetails`
  ADD CONSTRAINT `fk_service_id` FOREIGN KEY (`s_id`) REFERENCES `services` (`service_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
