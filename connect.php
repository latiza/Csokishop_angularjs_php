<?php
// Beállítja a válasz típusát szöveg/html formátumra, UTF-8 karakterkódolással
header("Content-Type: text/html; charset=utf-8");

// Adatbázis kapcsolati információk konstansként definiálása
define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", "");
define("DBNAME", "csokik");

// Mysqli kapcsolat létrehozása
$dbconn = @mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME) or die("Hiba az adatbázis csatlakozásakor!");

// Mysqli karakterkódolás beállítása UTF-8-ra
mysqli_set_charset($dbconn, "utf8");

// Kapcsolat ellenőrzése
if (!$dbconn) {
    // Ha a kapcsolat sikertelen, akkor hibaüzenetet ad ki és leáll a script
    die("Kapcsolat sikertelen: " . mysqli_connect_error());
}

/**Header Beállítás: Beállítja a HTTP válasz fejlécét a szöveg/HTML típusra, UTF-8 karakterkódolással. Ez biztosítja, hogy az oldal megfelelően kezelje az ékezetes karaktereket.

Adatbázis Kapcsolati Információk Definiálása: Konstansként definiál néhány adatbázis kapcsolati információt, mint például a hosztnevet, felhasználónevet, jelszót és az adatbázis nevét.

Mysqli Kapcsolat Létrehozása: A mysqli_connect függvény segítségével létrehozza az adatbáziskapcsolatot. Az @ jel elnyomja az esetleges kapcsolati hibák kimenetét, és a die függvény a kapcsolat létrehozása esetén sikertelen kapcsolat esetén kilép a scriptből, és hibaüzenetet jelenít meg.

Karakterkódolás Beállítása: Beállítja az adatbázis kapcsolat karakterkódolását UTF-8-ra, ami biztosítja, hogy az ékezetes karakterek megfelelően kezelődjenek az adatbázisban.

Kapcsolat Ellenőrzése: Megvizsgálja, hogy a kapcsolat sikeresen létrejött-e. Ha nem, akkor kiír egy hibaüzenetet, és a script leáll. */
?>
