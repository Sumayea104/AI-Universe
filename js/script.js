// console.log('hi its ok');
const loadAi = () => {
    const URl = 'https://openapi.programming-hero.com/api/ai/tools';

    fetch(URl)
        .then(res => res.json())
        .then(data => showAi(data.data.tools));
};

const showAi = (tools) => {
    // console.log(data);
    tools.slice(0, 6).forEach((tool) => {
        console.log(tool);
    });
};


loadAi();