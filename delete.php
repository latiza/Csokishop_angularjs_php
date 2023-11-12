<?php
// Ellenőrizzük, hogy a kérési módszer DELETE-e
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Adatbázis kapcsolati részleteket tartalmazó fájl beolvasása
    require_once 'connect.php';

    // Az azonosító lekérése az URL-ből
    $id = intval($_GET['id']);

    // TODO: Adja hozzá az adatbázis törlési lekérdezését itt
    $sql = "DELETE FROM csokik WHERE id = $id";

    if ($dbconn->query($sql) === TRUE) {
        $rowCount = $dbconn->affected_rows;

        if ($rowCount > 0) {
            http_response_code(204); // Nincs tartalom (No Content)
        } else {
            http_response_code(404); // Nem található (Not Found)
        }
    } else {
        echo "Hiba: " . $sql . "<br>" . $dbconn->error;
        http_response_code(500); // Belső szerverhiba
    }

    $dbconn->close();
} else {
    http_response_code(405); // Nem megengedett kérési módszer
}
?>
