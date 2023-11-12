<?php
// A kapcsolat részleteit tartalmazó fájl beolvasása
require_once 'connect.php';

// Ellenőrizze, hogy a kérési módszer PUT-e
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Az azonosító lekérése az URL-ből
    $id = intval($_GET['id']);

    // Olvassa el és dekódolja a JSON adatokat a kérés törzséből
    $putData = json_decode(file_get_contents('php://input'), true);

    // Ellenőrizze, hogy minden szükséges adat rendelkezésre áll-e
    if (isset($putData['nev']) && isset($putData['ara']) && isset($putData['raktaron'])) {
        // Az adatok szanitizálása
        $nev = htmlspecialchars($putData['nev']);
        $ara = intval($putData['ara']);
        $raktaron = $putData['raktaron'] ? 1 : 0; // A jelölőnégyzet értékének átalakítása 1 vagy 0 értékké

        try {
            // TODO: Adatbázis frissítésének végrehajtása PDO használatával

            // Például MySQL esetén PDO használatával
            $stmt = $dbconn->prepare("UPDATE csokik SET nev = ?, ara = ?, raktaron = ? WHERE id = ?");
            $stmt->execute([$nev, $ara, $raktaron, $id]);

            http_response_code(200); // OK
        } catch (PDOException $e) {
            echo "Hiba: " . $e->getMessage();
            http_response_code(500); // Belső szerverhiba
        }
    } else {
        http_response_code(400); // Rossz kérés
    }
} else {
    http_response_code(405); // Nem megengedett kérési módszer
}
?>
