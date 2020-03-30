-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2020 m. Kov 30 d. 07:56
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `keliones`
--

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `keliones`
--

CREATE TABLE `keliones` (
  `id` int(10) UNSIGNED NOT NULL,
  `pav` varchar(255) COLLATE utf8_lithuanian_ci NOT NULL,
  `apras` text COLLATE utf8_lithuanian_ci,
  `flag_poilsines` tinyint(3) UNSIGNED DEFAULT NULL,
  `flag_pazintines` tinyint(3) UNSIGNED DEFAULT NULL,
  `flag_viskas_isk` tinyint(3) UNSIGNED DEFAULT NULL,
  `kaina` decimal(12,2) UNSIGNED NOT NULL,
  `trukme_val` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `keliones`
--

INSERT INTO `keliones` (`id`, `pav`, `apras`, `flag_poilsines`, `flag_pazintines`, `flag_viskas_isk`,`kaina`, `trukme_val`) VALUES
(1, 'po LDK pilis ir pilaites', 'visos LDK pilys Baltarusijoje', 1, 1, 1, '150.00', 36),
(3, 'Ventės ragas', 'paukščių žiedavimas ir kt. ', 1, 1, NULL, '60.00', 12);

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `keliones_miestai`
--

CREATE TABLE `keliones_miestai` (
  `id` int(10) UNSIGNED NOT NULL,
  `miestai_id` int(10) UNSIGNED NOT NULL,
  `keliones_id` int(10) UNSIGNED NOT NULL,
  `trukme_val` int(10) UNSIGNED NOT NULL DEFAULT '3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `keliones_miestai`
--

INSERT INTO `keliones_miestai` (`id`, `miestai_id`, `keliones_id`, `trukme_val`) VALUES
(1, 1, 1, 3),
(2, 2, 1, 3),
(3, 3, 1, 2),
(4, 4, 1, 4),
(5, 3, 1, 4),
(6, 6, 3, 4),
(7, 7, 3, 3);

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `miestai`
--

CREATE TABLE `miestai` (
  `id` int(10) UNSIGNED NOT NULL,
  `pav` varchar(64) COLLATE utf8_lithuanian_ci NOT NULL,
  `kodas_salies` char(3) COLLATE utf8_lithuanian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci;

--
-- Sukurta duomenų kopija lentelei `miestai`
--

INSERT INTO `miestai` (`id`, `pav`, `kodas_salies`) VALUES
(1, 'Lyda', ''),
(2, 'Gardinas', ''),
(3, 'Nesvyžius', ''),
(4, 'Naugardukas', ''),
(5, 'Myras', ''),
(6, 'Rusnė', ''),
(7, 'Šilutė', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `keliones`
--
ALTER TABLE `keliones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keliones_miestai`
--
ALTER TABLE `keliones_miestai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `keliones_id` (`keliones_id`),
  ADD KEY `miestai_id` (`miestai_id`);

--
-- Indexes for table `miestai`
--
ALTER TABLE `miestai`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `keliones`
--
ALTER TABLE `keliones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `keliones_miestai`
--
ALTER TABLE `keliones_miestai`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `miestai`
--
ALTER TABLE `miestai`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Apribojimai eksportuotom lentelėm
--

--
-- Apribojimai lentelei `keliones_miestai`
--
ALTER TABLE `keliones_miestai`
  ADD CONSTRAINT `keliones_miestai_ibfk_1` FOREIGN KEY (`keliones_id`) REFERENCES `keliones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `keliones_miestai_ibfk_2` FOREIGN KEY (`miestai_id`) REFERENCES `miestai` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
