<?php
// Adatbázis kapcsolati részleteket tartalmazó fájl beolvasása
require_once 'connect.php';

// Ellenőrizze, hogy a kérési módszer GET-e
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Válassza ki az összes sort a 'csokik' táblából
        $sql = "SELECT * FROM csokik";
        $result = mysqli_query($dbconn, $sql);

        if (!$result) {
            // Kezelje a lekérdezési hibát
            http_response_code(500); // Belső szerverhiba
            die("Hiba a kiválasztásnál: " . mysqli_error($dbconn));
        }

        // Fetch minden sort asszociatív tömbként
        $csoki = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $csoki[] = $row;
        }

        // Zárja le az adatbázis kapcsolatot
        mysqli_close($dbconn);

        // Küldje el a JSON választ
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($csoki, JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        // Kezelje a többi kivételt
        http_response_code(500); // Belső szerverhiba
        echo "Hiba: " . $e->getMessage();
    }
} else {
    // Kezelje az érvénytelen kérési módszert
    http_response_code(405); // Nem megengedett kérési módszer
}
?>
