-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 08-Nov-2019 às 20:59
-- Versão do servidor: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `poleirinha_u`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cards`
--

DROP TABLE IF EXISTS `cards`;
CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_cor` int(11) NOT NULL,
  `quantidade` int(2) NOT NULL,
  `numero` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cards`
--

INSERT INTO `cards` (`id`, `id_categoria`, `id_cor`, `quantidade`, `numero`) VALUES
(1, 1, 1, 0, 0),
(2, 1, 1, 0, 1),
(3, 1, 1, 0, 1),
(4, 4, 1, 2, 10),
(5, 2, 1, 0, 10),
(6, 4, 1, 2, 10),
(7, 2, 1, 0, 10),
(8, 5, 1, 0, 10),
(10, 1, 1, 0, 2),
(11, 1, 1, 0, 2),
(12, 1, 1, 0, 3),
(13, 1, 1, 0, 3),
(14, 1, 1, 0, 4),
(15, 1, 1, 0, 4),
(16, 1, 1, 0, 5),
(17, 1, 1, 0, 5),
(18, 1, 1, 0, 6),
(19, 1, 1, 0, 6),
(20, 1, 1, 0, 7),
(21, 1, 1, 0, 7),
(22, 1, 1, 0, 8),
(23, 1, 1, 0, 8),
(24, 1, 1, 0, 9),
(25, 1, 1, 0, 9),
(26, 1, 2, 0, 0),
(27, 1, 2, 0, 1),
(28, 1, 2, 0, 1),
(29, 2, 2, 0, 10),
(30, 4, 2, 2, 10),
(31, 2, 2, 0, 10),
(32, 4, 2, 2, 10),
(33, 5, 2, 0, 10),
(34, 5, 2, 0, 10),
(35, 1, 2, 0, 2),
(36, 1, 2, 0, 2),
(37, 1, 2, 0, 3),
(38, 1, 2, 0, 3),
(39, 1, 2, 0, 4),
(40, 1, 2, 0, 4),
(41, 1, 2, 0, 5),
(42, 1, 2, 0, 5),
(43, 1, 2, 0, 6),
(44, 1, 2, 0, 6),
(45, 1, 2, 0, 7),
(46, 1, 2, 0, 7),
(47, 1, 2, 0, 8),
(48, 1, 2, 0, 8),
(49, 1, 2, 0, 9),
(50, 1, 2, 0, 9),
(51, 3, 5, 0, 10),
(52, 3, 5, 0, 10),
(53, 4, 5, 4, 10),
(54, 4, 5, 4, 10),
(55, 4, 5, 4, 10),
(56, 4, 5, 4, 10),
(57, 3, 5, 0, 10),
(58, 3, 5, 0, 10),
(59, 1, 3, 0, 0),
(60, 1, 3, 0, 1),
(61, 1, 3, 0, 1),
(62, 2, 3, 0, 10),
(63, 4, 3, 2, 10),
(64, 5, 3, 0, 10),
(65, 2, 3, 0, 10),
(66, 4, 3, 2, 10),
(67, 5, 3, 0, 10),
(68, 1, 3, 0, 2),
(69, 1, 3, 0, 2),
(70, 1, 3, 0, 3),
(71, 1, 3, 0, 3),
(72, 1, 3, 0, 4),
(73, 1, 3, 0, 4),
(74, 1, 3, 0, 5),
(75, 1, 3, 0, 5),
(76, 1, 3, 0, 6),
(77, 1, 3, 0, 6),
(78, 1, 3, 0, 7),
(79, 1, 3, 0, 7),
(80, 1, 3, 0, 8),
(81, 1, 3, 0, 8),
(82, 1, 3, 0, 9),
(83, 1, 3, 0, 9),
(84, 1, 4, 0, 0),
(85, 1, 4, 0, 1),
(86, 1, 4, 0, 1),
(87, 4, 4, 2, 10),
(88, 4, 4, 2, 10),
(89, 2, 4, 0, 10),
(90, 2, 4, 0, 10),
(91, 5, 4, 0, 10),
(92, 5, 4, 0, 10),
(93, 1, 4, 0, 2),
(94, 1, 4, 0, 2),
(95, 1, 4, 0, 3),
(96, 1, 4, 0, 3),
(97, 1, 4, 0, 4),
(98, 1, 4, 0, 4),
(99, 1, 4, 0, 5),
(100, 1, 4, 0, 5),
(101, 1, 4, 0, 6),
(102, 1, 4, 0, 6),
(103, 1, 4, 0, 7),
(104, 1, 4, 0, 7),
(105, 1, 4, 0, 8),
(106, 1, 4, 0, 8),
(107, 1, 4, 0, 9),
(108, 1, 4, 0, 9),
(110, 5, 1, 0, 10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `descricao_categoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `categorias`
--

INSERT INTO `categorias` (`id`, `descricao_categoria`) VALUES
(1, 'Number'),
(2, 'ChangeDirection'),
(3, 'ChangeColor'),
(4, 'GoGet'),
(5, 'Stop');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cores`
--

DROP TABLE IF EXISTS `cores`;
CREATE TABLE `cores` (
  `id` int(11) NOT NULL,
  `descricao_cor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cores`
--

INSERT INTO `cores` (`id`, `descricao_cor`) VALUES
(1, 'yellow'),
(2, 'blue'),
(3, 'green'),
(4, 'red'),
(5, 'neutral');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`) USING BTREE,
  ADD KEY `fk_cor` (`id_cor`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cores`
--
ALTER TABLE `cores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cores`
--
ALTER TABLE `cores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cor` FOREIGN KEY (`id_cor`) REFERENCES `cores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
