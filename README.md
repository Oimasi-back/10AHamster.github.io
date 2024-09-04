<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>10A Kombat Clicker</title>
    <link rel="stylesheet" href="static/css/styles.css">
</head>
<body>
    <div id="app">
        <h1>Token Clicker</h1>
        <div id="token-display">
            <span id="token-count">0</span> токенов
        </div>
        <div id="click-area">
            <img src="static/image/1.jpg" id="clicker-image" alt="Click Me">
        </div>
        <div id="store">
            <h2>Магазин</h2>
            <button id="buy-autoclicker">Купить Автоклик (<span id="autoclicker-cost">50</span> токенов)</button>
            <button id="buy-power">Увеличить силу клика (<span id="power-cost">100</span> токенов)</button>
        </div>
    </div>
    <script src="static/js/app.js"></script>
</body>
</html>
