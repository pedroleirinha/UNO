<?php
header('Access-Control-Allow-Origin: *');  

if (isset($_GET)) {
    $connection = mysqli_connect("localhost", "root", "", "poleirinha_u") or mysqli_die();
    $query = "SELECT cards.id, categorias.descricao_categoria, cores.descricao_cor, cards.quantidade, numero from cards INNER JOIN categorias ON categorias.id = cards.id_categoria INNER JOIN cores ON cores.id = cards.id_cor";
    $result = mysqli_query($connection, $query);

    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    printf(json_encode($rows));
} else {
    echo "FAIL";
}
