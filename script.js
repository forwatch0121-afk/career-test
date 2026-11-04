const questions = [
    // Оставляем твои 6 вопросов без изменений
    {
        text: "Вопрос 1. Чем бы ты хотел заниматься в свободное время?\n1. Разобрал бы старый компьютер или механизм\n2. Занялся бы спортом или активным отдыхом\n3. Нарисовал бы плакат, написал историю или смонтировал видео\n4. Пошел бы в лес, чтобы понаблюдать за животными\n5. Придумал бы, как заработать деньги\n6. Пошел бы на тренировку по стрельбе или единоборствам",
        options: {
            "1": { tech: 1 },
            "2": { sport: 1 },
            "3": { creative: 1 },
            "4": { nature: 1 },
            "5": { business: 1 },
            "6": { power: 1 }
        }
    },
    {
        text: "Вопрос 2. Что для тебя важнее всего в будущей профессии?\n1. Четкость, порядок и стабильность\n2. Соревнование и победа\n3. Возможность выразить свои идеи\n4. Помощь людям или животным\n5. Деньги и независимость\n6. Адреналин и риск",
        options: {
            "1": { tech: 1, business: 1 },
            "2": { sport: 1, power: 1 },
            "3": { creative: 1 },
            "4": { social: 1, nature: 1 },
            "5": { business: 1 },
            "6": { power: 1, sport: 1 }
        }
    },
    {
        text: "Вопрос 3. Выбери хобби, которое тебе ближе всего:\n1. Сборка и ремонт техники\n2. Командные виды спорта (футбол, страйкбол)\n3. Музыка, рисование, фотография\n4. Походы, рыбалка, выживание\n5. Изучение экономики и бизнеса\n6. Единоборства или тактическая подготовка",
        options: {
            "1": { tech: 1 },
            "2": { sport: 1, social: 1 },
            "3": { creative: 1 },
            "4": { nature: 1, power: 1 },
            "5": { business: 1 },
            "6": { power: 1 }
        }
    },
    {
        text: "Вопрос 4. Как ты предпочитаешь решать сложные задачи?\n1. Логически, по шагам, в одиночку\n2. Обсуждая с командой\n3. Ища нестандартный творческий подход\n4. Пробуя разные варианты на практике\n5. Анализируя, где можно получить выгоду\n6. Действуя быстро и решительно",
        options: {
            "1": { tech: 1 },
            "2": { social: 1 },
            "3": { creative: 1 },
            "4": { nature: 1 },
            "5": { business: 1 },
            "6": { power: 1 }
        }
    },
    {
        text: "Вопрос 5. Где бы ты хотел работать в будущем?\n1. В мастерской или лаборатории с техникой\n2. На спортивной арене или тренировочной базе\n3. В творческой студии или мастерской\n4. На природе, в поле или в лесу\n5. В офисе крупной компании\n6. В спецслужбах или на службе спасения",
        options: {
            "1": { tech: 1 },
            "2": { sport: 1 },
            "3": { creative: 1 },
            "4": { nature: 1 },
            "5": { business: 1 },
            "6": { power: 1 }
        }
    },
    {
        text: "Вопрос 6. Что бы ты делал, если бы тебе поручили важное задание?\n1. Составил бы подробный план действий\n2. Собрал бы команду для обсуждения\n3. Придумал бы что-то новое и необычное\n4. Сразу начал бы делать, разбираясь по ходу\n5. Оценил бы, какую выгоду это принесет\n6. Взял бы всю ответственность на себя",
        options: {
            "1": { tech: 1, business: 1 },
            "2": { social: 1, sport: 1 },
            "3": { creative: 1 },
            "4": { nature: 1, power: 1 },
            "5": { business: 1 },
            "6": { power: 1 }
        }
    }
];

// Профессии и их описания для вывода
const professions = {
    tech: "Технический специалист (Программист / Инженер / Геймдизайнер)",
    social: "Коммуникатор (Врач / Психолог / Учитель / Менеджер)",
    creative: "Креативщик (Дизайнер / Художник / Видеомейкер)",
    nature: "Специалист по природе (Ветеринар / Биолог / Эколог)",
    business: "Деловой человек (Предприниматель / Маркетолог / Аналитик)",
    power: "Силовая структура (Военный / Полицейский / Спасатель)",
    sport: "Эксперт по спорту (Спортсмен / Тренер / Инструктор по выживанию)"
};

let currentQuestionIndex = 0;
let scores = { tech: 0, social: 0, creative: 0, nature: 0, business: 0, power: 0, sport: 0 };
let userName = ""; 
let isWaitingForName = true; 

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
    addBotMessage("Привет! Я твой персональный помощник по профориентации. Давай найдем твой путь.");
    setTimeout(() => {
        addBotMessage("Как я могу к тебе обращаться? Напиши свое имя.");
        userInput.placeholder = "Напиши свое имя...";
    }, 1000);
}

function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    addUserMessage(text);
    userInput.value = "";

    if (isWaitingForName) {
        userName = text;
        isWaitingForName = false;
        userInput.placeholder = "Введи 1, 2 или 3...";
        
        setTimeout(() => {
            addBotMessage(`Очень приятно, ${userName}! Теперь ответь на несколько вопросов.`);
            setTimeout(() => {
                addBotMessage(questions[currentQuestionIndex].text);
            }, 800);
        }, 500);
        return;
    }

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
            showFinalResult();
        }
    } else {
        setTimeout(() => {
            addBotMessage("Пожалуйста, введи только цифру от 1 до 6.");
        }, 500);
    }
}

function showFinalResult() {
    addBotMessage(`Отличная работа, ${userName}! Анализ завершен.`);
    
    // Сортируем все профессии по количеству набранных баллов (от большего к меньшему)
    let sortedProfessions = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    
    // Берем только первые 3
    let top1 = sortedProfessions[0];
    let top2 = sortedProfessions[1];
    let top3 = sortedProfessions[2];

    setTimeout(() => {
        addBotMessage(`Основываясь на твоих ответах, вот 3 сферы, которые подходят тебе больше всего:\n\n1. ${professions[top1]}\n2. ${professions[top2]}\n3. ${professions[top3]}`);
        setTimeout(() => {
            addBotMessage(`Твой главный вектор — это ${professions[top1]}. Но ты также склонен к другим сферам. У тебя многогранная личность. Удачи на пути!`);
        }, 1500);
    }, 1000);
}

startChat();

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
