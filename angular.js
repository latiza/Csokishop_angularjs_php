let app = angular.module('csokiApp', []);

app.controller('csokiController', function ($scope, $http, CsokiService) {

    $scope.renderCsokik = [];
    $scope.newFormVisible = false;
    $scope.newCsoki = {};
    $scope.editedCsoki = {};

    // Csokik betöltése
    $http.get('http://localhost/csokishop/read.php')
        .then(function (response) {
            $scope.renderCsokik = response.data;
            console.log($scope.renderCsokik);
        })
        .catch(function (error) {
            console.error('Hiba történt az adatok betöltésekor:', error);
        });

        // Csokik frissítése
    $scope.refreshCsokik = function () {
    $http.get('http://localhost/csokishop/read.php')
        .then(function (response) {
            $scope.renderCsokik = response.data;
        })
        .catch(function (error) {
            console.error('Hiba történt az adatok betöltésekor:', error);
        });
};

    // Törlés
    $scope.torles = function(id) {
        console.log('Selected ID törléshez:', id);
        CsokiService.deleteCsoki(id)
            .then(function () {
                $scope.renderCsokik = $scope.renderCsokik.filter(function (csoki) {
                    return csoki.id !== id;
                });
                // Frissítsd az összes csokit
            $scope.refreshCsokik();
            })
            .catch(function (error) {
                console.error('Hiba történt a törlés során:', error);
            });
    };

    // Módosítás
    $scope.modositas = function(id) {
        console.log('Selected ID módosításhoz:', id);
        CsokiService.getCsokiById(id)
        .then(function (csoki) {
            console.log('Received Csoki:', csoki);  // Új sor
            $scope.editedCsoki = angular.copy(csoki);
            console.log('Edited Csoki:', $scope.editedCsoki);
            $scope.editFormVisible = true;
        })
            .catch(function (error) {
                console.error('Hiba történt a módosítás során:', error);
            });
    };
    


    $scope.mentes = function () {
        CsokiService.updateCsoki($scope.editedCsoki)
            .then(function () {
                $scope.renderCsokik = $scope.renderCsokik.map(function (csoki) {
                    return csoki.id === $scope.editedCsoki.id ? $scope.editedCsoki : csoki;
                });
                $scope.editFormVisible = false;
            })
            .catch(function (error) {
                console.error('Hiba történt az adatok módosítása során:', error);
            });
    };

    // Felvitel
    $scope.showNewForm = function () {
        $scope.newFormVisible = true;
    };

    $scope.addNewCsoki = function (nev, ara, raktaron) {
        // Ellenőrizd, hogy a raktaron értéke boolean típusú-e
        $scope.newCsoki.raktaron = !!raktaron; // vagy más módon állítsd be a boolean értéket
    
        CsokiService.createCsoki(nev, ara, $scope.newCsoki.raktaron)
            .then(function () {
                $scope.renderCsokik.push({ nev: nev, ara: ara, raktaron: $scope.newCsoki.raktaron });
                $scope.newFormVisible = false;
                 // Töröld az input mezők tartalmát
            $scope.newCsoki = {};
            // Frissítsd az összes csokit
            $scope.refreshCsokik();
            })
            .catch(function (error) {
                console.error('Hiba történt az adatok létrehozása során:', error);
            });
    };
    
});

app.service('CsokiService', function ($http) {

    this.getCsokik = function () {
        return $http.get('http://localhost/csokishop/read.php')
            .then(function (response) {
                return response.data;
            });
    };

    this.createCsoki = function (nev, ara, raktaron) {
        let data = {
            nev: nev,
            ara: ara,
            raktaron: raktaron
        };

        return $http.post('http://localhost/csokishop/create.php', data);
    };

    this.deleteCsoki = function (id) {
        return $http.delete('http://localhost/csokishop/delete.php?id=' + id);
    };

    this.getCsokiById = function (id) {
        console.log("service id:", id);
        return $http.get('http://localhost/csokishop/read.php')
            .then(function (response) {
                // Kiválogatjuk az adott id-vel rendelkező csokit
                let csoki = response.data.find(function (cs) {
                    return cs.id === id;
                });
    
                console.log("válasz: ", csoki);
                return csoki;
            });
    };

    this.updateCsoki = function (csoki) {
        return $http.put('http://localhost/csokishop/update.php?id=' + csoki.id, csoki);
    };
});
