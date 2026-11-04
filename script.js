const questions = [
    {
        text: "Вопрос 1. Представь, что у тебя есть свободный день. Чем бы ты занялся?\n1. Разобрал бы старый компьютер\n2. Позвал бы друзей на пробежку\n3. Нарисовал бы плакат или историю\n4. Пошел бы в лес к животным\n5. Придумал бы, как заработать деньги\n6. Пошел бы на тренировку по стрельбе",
        options: {
            "1": { tech: 3, creative: 1 },
            "2": { sport: 3, social: 1 },
            "3": { creative: 3 },
            "4": { nature: 3 },
            "5": { business: 3 },
            "6": { power: 3, sport: 1 }
        }
    },
    {
        text: "Вопрос 2. Что тебе важнее в будущей работе?\n1. Четкость и порядок\n2. Соревнование и победа\n3. Выразить свои идеи\n4. Помощь людям или животным\n5. Деньги и независимость\n6. Адреналин и риск",
        options: {
            "1": { tech: 3 },
            "2": { sport: 3, power: 1 },
            "3": { creative: 3 },
            "4": { social: 2, nature: 2 },
            "5": { business: 3 },
            "6": { power: 3, sport: 1 }
        }
    },
    {
        text: "Вопрос 3. Если бы тебе предложили выбрать хобби, что бы ты выбрал?\n1. Сборка и ремонт техники\n2. Командные виды спорта\n3. Музыка, рисование, фото\n4. Походы, рыбалка, выживание\n5. Изучение экономики и бизнеса\n6. Единоборства и тактика",
        options: {
            "1": { tech: 3 },
            "2": { sport: 3, social: 1 },
            "3": { creative: 3 },
            "4": { nature: 3, power: 1 },
            "5": { business: 3 },
            "6": { power: 3, sport: 2 }
        }
    },
    {
        text: "Вопрос 4. Как ты решаешь проблемы?\n1. Логически и по шагам\n2. Собираю команду\n3. Ищу нестандартный подход\n4. Пробую на практике\n5. Анализирую выгоду\n6. Действую быстро и решительно",
        options: {
            "1": { tech: 3 },
            "2": { social: 3, sport: 1 },
            "3": { creative: 3 },
            "4": { nature: 3 },
            "5": { business: 3 },
            "6": { power: 3, sport: 1 }
        }
    },
    {
        text: "Вопрос 5. Что бы ты хотел делать в зомби-апокалипсисе?\n1. Чинить оружие и технику\n2. Командовать отрядом\n3. Создавать ловушки и убежища\n4. Охранять базу и сражаться\n5. Искать ресурсы и договариваться\n6. Воевать в ближнем бою",
        options: {
            "1": { tech: 3 },
            "2": { social: 3, power: 1 },
            "3": { creative: 3, tech: 1 },
            "4": { power: 3, sport: 2 },
            "5": { business: 3, social: 1 },
            "6": { power: 3, sport: 2 }
        }
    }
];

// ТВОИ ПРОФЕССИИ (добавлен СПОРТ)
const professions = {
    tech: "Технический геймдизайнер / Программист / Инженер",
    social: "Врач / Психолог / Учитель / Менеджер",
    creative: "Дизайнер / Художник / Видеомейкер",
    nature: "Ветеринар / Биолог / Эколог / Кинолог",
    business: "Предприниматель / Маркетолог / Аналитик",
    power: "Военный / Полицейский / Спасатель",
    sport: "Спортсмен / Тренер / Инструктор по выживанию / Спасатель-экстремал"
};

let currentQuestionIndex = 0;
let scores = { tech: 0, social: 0, creative: 0, nature: 0, business: 0, power: 0, sport: 0 };

const chatBox = document.getElementById("chat-box");
const inputArea = document.getElementById("input-area");
const userInput = document.getElementById("user-input");

function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "message bot-message";
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "message user-message";
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function startChat() {
    addBotMessage("Система инициализирована. Приготовься к сканированию.");
    setTimeout(() => {
        addBotMessage(questions[currentQuestionIndex].text);
    }, 1000);
}

function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    addUserMessage(text);
    userInput.value = "";

    const currentQ = questions[currentQuestionIndex];
    const answer = currentQ.options[text];

    if (answer) {
        for (let key in answer) {
            scores[key] += answer[key];
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            setTimeout(() => {
                addBotMessage(questions[currentQuestionIndex].text);
            }, 800);
        } else {
            inputArea.style.display = "none";
            setTimeout(() => {
                let best = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
                addBotMessage("Анализ завершен.");
                setTimeout(() => {
                    addBotMessage(`Твой профиль: ${professions[best]}.\n\nЭто твой путь. Не сверни с него.`);
                }, 1000);
            }, 1000);
        }
    } else {
        setTimeout(() => {
            addBotMessage("Пожалуйста, введи только цифру от 1 до 6.");
        }, 500);
    }
}

startChat();

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
