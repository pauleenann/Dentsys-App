-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2024 at 04:58 PM
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
(155, 91, 'Oral prophylaxis (Teeth Cleaning)', '2024-12-06', '4:00 PM - 5:00 PM', 'cancelled'),
(156, 92, 'Oral prophylaxis (Teeth Cleaning)', '2024-12-06', '4:00 PM - 5:00 PM', 'finished'),
(157, 93, 'Oral prophylaxis (Teeth Cleaning)', '2024-12-08', '4:00 PM - 5:00 PM', 'accepted');

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
(30, '54', '2024-12-06', '2024-12-06', 1000.00, 'pending'),
(31, '55', '2024-12-06', '2024-12-06', 10000.00, 'pending'),
(32, '56', '2024-12-06', '2024-12-06', 1000.00, 'pending'),
(33, '57', '2024-12-06', '2024-12-06', 3000.00, 'pending'),
(34, '58', '2024-12-06', '2024-12-06', 3000.00, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `option_name` varchar(45) DEFAULT NULL,
  `option_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`option_id`, `service_id`, `option_name`, `option_price`) VALUES
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
(54, 38, '2024-12-06', '9:00 AM - 10:00 AM', 'Oral prophylaxis (Teeth Cleaning)', '{\"1\":true,\"2\":true,\"3\":true,\"4\":true,\"5\":true,\"6\":true,\"7\":true,\"8\":true,\"9\":true,\"10\":true,\"11\":true,\"12\":true,\"13\":true,\"14\":true,\"15\":true,\"16\":true,\"17\":true,\"18\":true,\"19\":true,\"20\":true,\"21\":true,\"22\":true,\"23\":true,\"24\":true,\"25\":true,\"26\":true,\"27\":true,\"28\":true,\"29\":true,\"30\":true,\"31\":true,\"32\":true}', 'Dingcong', 'Mild'),
(55, 38, '2024-12-07', '11:00 AM - 12:00 PM', 'Wisdowm Tooth Removal', '{\"6\":true,\"13\":true}', 'Dingcong', 'Upper'),
(56, 38, '2024-12-06', '9:00 AM - 10:00 AM', 'Oral prophylaxis (Teeth Cleaning)', '{\"1\":true,\"2\":true,\"3\":true,\"4\":true,\"5\":true,\"6\":true,\"7\":true,\"8\":true,\"9\":true,\"10\":true,\"11\":true,\"12\":true,\"13\":true,\"14\":true,\"15\":true,\"16\":true,\"17\":true,\"18\":true,\"19\":true,\"20\":true,\"21\":true,\"22\":true,\"23\":true,\"24\":true,\"25\":true,\"26\":true,\"27\":true,\"28\":true,\"29\":true,\"30\":true,\"31\":true,\"32\":true}', 'Dingcong', 'Mild'),
(57, 38, '2024-12-10', '11:00 AM - 12:00 PM', 'Oral Surgery', '{\"11\":true,\"13\":true,\"16\":true}', 'Dingcong', 'gingivectomy (per gums)'),
(58, 38, '2024-12-07', '10:00 AM - 11:00 AM', 'Oral Surgery', '{\"12\":true,\"13\":true,\"14\":true}', 'Dingcong', 'gingivectomy (per gums)');

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
(38, 'Jeonghan', 'Yoon', '', '', NULL, NULL, 'tontonwinstonnn@gmail.com', '09270477362');

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
(93, 'lance', 'BERNAL', 'RABANDABAN', '', 'lancewrt@gmail.com', '09695295926');

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
  `u_lname` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `account_type`, `u_fname`, `u_lname`) VALUES
(1, 'admin', 'admin_123', 'staff', 'Giolliana2', 'Plandez'),
(2, 'admin2', 'admin_123', 'admin', 'Pauleen', 'Dingcong'),
(3, 'lance', 'llllllll', 'admin', 'Lance', 'Bernal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `opt_service_id_idx` (`service_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
