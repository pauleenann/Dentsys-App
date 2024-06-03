-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2024 at 06:59 PM
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
(18, 16, 'Oral prophylaxis (Teeth Cleaning)', '2024-05-08', '9:00 AM - 10:00 AM', 'cancelled'),
(19, 17, 'Veneers', '2024-05-14', '9:00 AM - 10:00 AM', 'cancelled'),
(20, 18, 'Oral Surgery', '2024-05-27', '9:00 AM - 10:00 AM', 'cancelled'),
(21, 19, 'Oral Surgery', '0000-00-00', '', 'cancelled'),
(22, 20, 'Composite Restoration', '2024-05-28', '9:00 AM - 10:00 AM', 'accepted'),
(23, 21, 'Oral prophylaxis (Teeth Cleaning)', '2024-05-30', '9:00 AM - 10:00 AM', 'pending'),
(24, 22, 'Oral prophylaxis (Teeth Cleaning)', '2024-05-29', '4:00 PM - 5:00 PM', 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `patienthistory`
--

CREATE TABLE `patienthistory` (
  `id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `p_date` varchar(20) NOT NULL,
  `p_time` varchar(20) NOT NULL,
  `service_` varchar(50) NOT NULL,
  `p_selectedTeeth` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `p_dentist` varchar(50) NOT NULL,
  `p_payment` varchar(20) NOT NULL,
  `p_paidamount` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patienthistory`
--

INSERT INTO `patienthistory` (`id`, `p_id`, `p_date`, `p_time`, `service_`, `p_selectedTeeth`, `p_dentist`, `p_payment`, `p_paidamount`) VALUES
(1, 6, '2024-05-29', '4:00 PM - 5:00 PM', 'Oral prophylaxis (Teeth Cleaning)', '{\"7\":true,\"8\":true,\"15\":true}', 'Dr. Bernal', 'CASH', 500),
(2, 6, '2024-05-27', '', 'Oral prophylaxis (Teeth Cleaning)', '{\"8\":true,\"16\":true}', 'Dr. Bernal', 'CASH', 700),
(3, 6, '2024-05-29', '4:00 PM - 5:00 PM', 'Oral prophylaxis (Teeth Cleaning)', '{\"8\":true,\"16\":true,\"32\":true}', 'Dr. Bernal', 'CASH', 900),
(4, 6, '2024-05-21', '4:00 PM - 5:00 PM', 'Oral prophylaxis (Teeth Cleaning)', '{\"5\":true,\"8\":true,\"14\":true}', 'Dr. Bernal', 'CASH', 966),
(5, 6, '2024-06-07', '12:00 PM - 1:00 PM', 'Composite Restoration', '{\"10\":true,\"12\":true,\"14\":true}', 'Dr. Dingcong', 'CASH', 8444);

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
(6, 'Pauleen Ann', 'Dingcong', 'Nasorrada', '', 20, 'Female', 'pau@gmail.com', '43423452'),
(7, 'Damon', 'Salvatore', '', '', 21, 'Male', 'sample@gmail.com', '234234');

-- --------------------------------------------------------

--
-- Table structure for table `servicedetails`
--

CREATE TABLE `servicedetails` (
  `sd_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `sd_description` varchar(255) DEFAULT NULL,
  `sd_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicedetails`
--

INSERT INTO `servicedetails` (`sd_id`, `service_id`, `sd_description`, `sd_price`) VALUES
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
(1, 'damon', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(2, 'damon', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(3, 'damon', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(4, 'damon', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(5, 'damon', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(6, 'damon', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(7, 'elna', '', 'salvatore', '', 'asa@gmail.com', '2342134'),
(8, 'damon', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(9, 'stefan', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(10, 'stefan', 'salvatore', '', '', 'damon@gmail.com', '09102983'),
(11, 'Damon', 'Salvatore', '', '', 'damon@gmail.com', '89898989'),
(12, 'Elena', 'Gilbert', '', '', 'pau@gmail.com', '19292840'),
(13, 'Elena', 'Gilbert', '', '', 'pau@gmail.com', '19292840'),
(14, 'Caroline', 'Forbes', '', '', 'pau@gmail.com', '19292840'),
(15, 'Caroline', 'Forbes', '', '', 'pau@gmail.com', '19292840'),
(16, 'Caroline', 'Forbes', '', '', 'pau@gmail.com', '19292840'),
(17, 'Elena', 'Gilbert', '', '', 'pau@gmail.com', '19292840'),
(18, 'pau', 'dingcong', '', '', 'pau@gmail.com', '19292840'),
(19, 'damon', 'salvatore', '', '', 'pau@gmail.com', '19292840'),
(20, 'Mama', 'Mo', '', '', 'mama@gmail.com', '098231972389'),
(21, 'LANCE', 'BERNAL', 'RABANDABAN', '', 'lancewrt@gmail.com', '09695295926'),
(22, 'NEMIA', 'BERNAL', 'RABANDABAN', '', 'lancewrt@gmail.com', '09695295926');

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
(1, 'dent_gio', '11111111', 'dentist');

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
-- Indexes for table `patienthistory`
--
ALTER TABLE `patienthistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`p_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicedetails`
--
ALTER TABLE `servicedetails`
  ADD PRIMARY KEY (`sd_id`),
  ADD KEY `service_id_idx` (`service_id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `patienthistory`
--
ALTER TABLE `patienthistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patienthistory`
--
ALTER TABLE `patienthistory`
  ADD CONSTRAINT `patient_id` FOREIGN KEY (`p_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `servicedetails`
--
ALTER TABLE `servicedetails`
  ADD CONSTRAINT `fk_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
