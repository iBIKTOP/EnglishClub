-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 06 2019 г., 14:39
-- Версия сервера: 5.6.38
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `english`
--

-- --------------------------------------------------------

--
-- Структура таблицы `userGroups`
--

CREATE TABLE `userGroups` (
  `id` int(12) NOT NULL,
  `userID` int(12) NOT NULL,
  `groupName` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `userGroups`
--

INSERT INTO `userGroups` (`id`, `userID`, `groupName`) VALUES
(1, 6, 'Group 1'),
(2, 6, 'Group 2'),
(3, 7, 'Group 3'),
(4, 7, 'Group 4');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(12) NOT NULL,
  `login` varchar(60) NOT NULL,
  `pass` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `pass`) VALUES
(6, 'viktor', '202cb962ac59075b964b07152d234b70'),
(7, 'igor', '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Структура таблицы `userWords`
--

CREATE TABLE `userWords` (
  `id` int(12) NOT NULL,
  `groupID` int(12) NOT NULL,
  `eng` text NOT NULL,
  `rus` text NOT NULL,
  `checked` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `userGroups`
--
ALTER TABLE `userGroups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `userWords`
--
ALTER TABLE `userWords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupID` (`groupID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `userGroups`
--
ALTER TABLE `userGroups`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `userWords`
--
ALTER TABLE `userWords`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `userGroups`
--
ALTER TABLE `userGroups`
  ADD CONSTRAINT `usergroups_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `userWords`
--
ALTER TABLE `userWords`
  ADD CONSTRAINT `userwords_ibfk_1` FOREIGN KEY (`groupID`) REFERENCES `db`.`userGroups` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
