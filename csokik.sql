
CREATE TABLE `csokik` (
  `id` tinyint(5) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `ara` varchar(255) NOT NULL,
  `raktaron` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

INSERT INTO `csokik` (`id`, `nev`, `ara`, `raktaron`) VALUES
(1, 'Mogyorós csoki', '2500', 1),
(2, 'Fehér csoki', '333', 0),
(3, 'Lyukas csoki', '111', 0);


ALTER TABLE `csokik`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `csokik`
  MODIFY `id` tinyint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;
