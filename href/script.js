// 获取页脚内容
fetch("/footer/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

// 控制台输出文本
const fontSize = 10;
const colors = [
    '#ADD8E6', '#91C4DE', '#76B0D7', '#5B9CCF', '#4088C7',
    '#2574BF', '#0A60B8', '#094D9E', '#083A84', '#07276A',
    '#061450', '#040C3D', '#03082A'
];

console.log("%c       _      __    __                     __         \n" +
            "%c      | | /| / /__ / /______  __ _  ___   / /____     \n" +
            "%c      | |/ |/ / -_) / __/ _ \\/  ' \\/ -_) / __/ _ \\    \n" +
            "%c      |__/|__/\\__/_/\\__/\\___/_/_/_/\\__/  \\__/\\___/    \n" +
            "%c  _____                            __            _    \n" +
            "%c / ___/__  __ _________ ____ ____ / /  __ _____ ( )___\n" +
            "%c/ /__/ _ \\/ // / __/ _ `/ _ `/ -_) /__/ // / _ \\|/(_-<\n" +
            "%c\\___/\\___/\\_,_/_/  \\_,_/\\_, /\\__/____/\\_,_/\\___/ /___/\n" +
            "%c                       /___/                          \n" +
            "%c           _      __    __       _ __                 \n" +
            "%c          | | /| / /__ / /  ___ (_) /____             \n" +
            "%c          | |/ |/ / -_) _ \\(_-</ / __/ -_)            \n" +
            "%c          |__/|__/\\__/_.__/___/_/\\__/\\__/             \n",
            `font-size: ${fontSize}pt; color: ${colors[0]}`,
            `font-size: ${fontSize}pt; color: ${colors[1]}`,
            `font-size: ${fontSize}pt; color: ${colors[2]}`,
            `font-size: ${fontSize}pt; color: ${colors[3]}`,
            `font-size: ${fontSize}pt; color: ${colors[4]}`,
            `font-size: ${fontSize}pt; color: ${colors[5]}`,
            `font-size: ${fontSize}pt; color: ${colors[6]}`,
            `font-size: ${fontSize}pt; color: ${colors[7]}`,
            `font-size: ${fontSize}pt; color: ${colors[8]}`,
            `font-size: ${fontSize}pt; color: ${colors[9]}`,
            `font-size: ${fontSize}pt; color: ${colors[10]}`,
            `font-size: ${fontSize}pt; color: ${colors[11]}`,
            `font-size: ${fontSize}pt; color: ${colors[12]}`);