const questions = [
    {
        text: "Вопрос 1. Чем бы ты хотел заниматься в свободное время?\n1. Разбирать технику, писать код\n2. Общаться, помогать друзьям\n3. Рисовать, писать, монтировать\n4. Гулять в лесу, ухаживать за животными\n5. Придумывать, как заработать\n6. Заниматься спортом",
        options: {
            "1": { tech: 3 },
            "2": { social: 3 },
            "3": { creative: 3 },
            "4": { nature: 3 },
            "5": { business: 3 },
            "6": { power: 3 }
        }
    },
    {
        text: "Вопрос 2. Какая задача интереснее?\n1. Найти ошибку в программе\n2. Успокоить человека, объяснить\n3. Создать постер или дизайн\n4. Вылечить животное\n5. Организовать проект, продать\n6. Поймать преступника, спасти",
        options: {
            "1": { tech: 3 },
            "2": { social: 3 },
            "3": { creative: 3 },
            "4": { nature: 3 },
            "5": { business: 3 },
            "6": { power: 3 }
        }
    },
    {
        text: "Вопрос 3. Как предпочитаешь работать?\n1. В одиночку, в тишине\n2. В команде, общаясь\n3. В творческой мастерской\n4. На улице, на природе\n5. В офисе с четким планом\n6. Там, где нужно рисковать",
        options: {
            "1": { tech: 3 },
            "2": { social: 3 },
            "3": { creative: 3 },
            "4": { nature: 3 },
            "5": { business: 3 },
            "6": { power: 3 }
        }
    },
    {
        text: "Вопрос 4. Что важнее в работе?\n1. Четкость и порядок\n2. Помощь людям\n3. Выразить себя\n4. Быть рядом с природой\n5. Деньги и карьера\n6. Адреналин и защита",
        options: {
            "1": { tech: 3 },
            "2": { social: 3 },
            "3": { creative: 3 },
            "4": { nature: 3 },
            "5": { business: 3 },
            "6": { power: 3 }
        }
    },
    {
        text: "Вопрос 5. Любимый предмет в школе?\n1. Информатика, Физика\n2. Обществознание, Литература\n3. ИЗО, Музыка\n4. Биология, География\n5. Математика, Экономика\n6. Физкультура, ОБЖ",
        options: {
            "1": { tech: 3 },
            "2": { social: 3 },
            "3": { creative: 3 },
            "4": { nature: 3 },
            "5": { business: 3 },
            "6": { power: 3 }
        }
    }
];

// Твои профессии (теперь их 6)
const professions = {
    tech: "Технический геймдизайнер / Программист / Инженер",
    social: "Врач / Психолог / Учитель / Менеджер",
    creative: "Дизайнер / Художник / Видеомейкер",
    nature: "Ветеринар / Биолог / Эколог / Кинолог",
    business: "Предприниматель / Маркетолог / Аналитик",
    power: "Военный / Полицейский / Спасатель"
};

// (Остальной код отправки сообщений и подсчета баллов оставляем без изменений)
let currentQuestionIndex = 0;
let scores = { tech: 0, social: 0, creative: 0, nature: 0, business: 0, power: 0 };

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