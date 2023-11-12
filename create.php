<?php
// Adatbázis kapcsolati részleteket tartalmazó fájl beolvasása
require_once 'connect.php';

// Ellenőrizzük, hogy a kérési módszer POST-e
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Olvassa el és dekódolja a JSON adatokat a kérés törzséből
    $postData = json_decode(file_get_contents('php://input'), true);

    // Ellenőrizze, hogy minden szükséges adat rendelkezésre áll-e
    if (isset($postData['nev']) && isset($postData['ara']) && isset($postData['raktaron'])) {
        // Az adatok szanitizálása
        $nev = htmlspecialchars($postData['nev']);
        $ara = intval($postData['ara']);
        $raktaron = $postData['raktaron'] ? 1 : 0; // Jelölőnégyzet értékének átalakítása 1 vagy 0 értékké

        try {
            // TODO: Adatbázis beszúrásának végrehajtása PDO használatával

            // Például MySQL esetén PDO használatával
            $stmt = $dbconn->prepare("INSERT INTO csokik (nev, ara, raktaron) VALUES (?, ?, ?)");
            $stmt->execute([$nev, $ara, $raktaron]);

            http_response_code(201); // Létrehozva
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
