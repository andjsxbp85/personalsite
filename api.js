var personalData = {
    name: 'Anjas Muhammad Bangun',
    onboarding_desc: 'As a professional in IT industries, I have accumulated over 5 years of experience. This extensive experience has allowed me to develop a diverse set of skills, both technical and interpersonal. Get to know me better on this site!',
    contact: {
        location: 'Jakarta, Indonesia',
        whatsapp: '6281901777719',
        linkedin: 'https://www.linkedin.com/in/anjasmbe/',
        telegram: 'https://t.me/ambbbme',
        email: 'anjasmuhamadb123@gmail.com'
    },
    skills: [
        {
            id: "skills-qa",
            name: "Software QA Engineer",
            description: "BDD, Gherkin, Junit, Jbehave, Java, OOP,Selenium, Mock, Mocha Js, Serenity, Allure Report, Zalenium, Selenoid, Maven, Rest Assured, K6, Jmeter, Json Schema Validator, Xpath, CSS Selector, Testlink, Xray Cloud, Rest API, Katalon, Javascript, Shell, Testlink, Locust, Espresso, UI Automator, Katalon, Appium, GoDog, Playwright, Visual Test, Applitools, Postman, Webdriver IO, Device Farm, Browserstack, Google Light House, Android Cloud Emulator"
        },
        {
            id: "skills-software",
            name: "Software Engineer",
            description: "C++, Python, HTML, CSS, PHP, Javascript, React, Tailwind, jQuery, Bootstrap, grafana, Codeigniter, Yii, Apache, Nginx, Shell / CLI, Computer Vision (Open CV), Big Query, MySQL, PostgreSQL, Matlab, Regular Expression (Regex), REST API, Java Swing (GUI), JavaFX, Looker Data Studio, ETL"
        },
        {
            id: "skills-electronic",
            name: "Electronics and<br>Embedded System",
            description: "Assembly, C, Eagle PCB Designer, Electronics Simulator (Proteus, Ni Multisim, Circuit Maker), 32 Bit CooCoox for STM32 Family, STM Studio, Codevision AVR for ATMega, Family, Arduino Family, Raspberry PI, PWM and Other Signal, Generator, ADC/DAC, Neural Networks & Artificial Intelegence, FPGA Quartus, FPAA Anadigm Designer, Rs485, Rs232, SIM 800, Accessing Dynamixel Servomotor"
        },
        {
            id: "skills-devops",
            name: "DevOps Engineer",
            description: "Terraform, GCP, AWS, Trello, CI/CD, Travis, Docker, Jenkins, Git, Github, Gitlab, Github Action, Gitlab CI/CD pipeline, Terraform, Ansible, Grafana, Looker Studio, GCP, bash and script command, cronjob, GCP Secret Manager, GCP APIs & Service Account, GCP Compute Engine, GCP Big Query, GCP IAM & Admin, AWS, (EC2, Route 53, Cloud Front, S3 Simple Storage), MySQL, PostgreSQL"
        },
        {
            id: "skills-project",
            name: "Project Management & Others",
            description: "Jira, Pivotal Tracker, Clickup, Agile Methodology, Scrum Framework, Kanban Board, Testlink, Test Management For Jira (TM4J), Corel Draw, Paint.Net, Adobe Flash Animation, Mac OS, Windows OS, Ubuntu OS (using SSH & SFTP), aws, Linux , OS,Microsoft Office (Ms. Word, Ms. Power Point, Ms. Excel, Ms. Outlook), Adobe Audition"
        }
    ]
}

//On boarding
const nameOnboarding = document.querySelector('#name-onboarding')
const onboarding_desc = document.querySelector('#onboarding-desc')
nameOnboarding.innerHTML = `I am ${personalData.name}`
onboarding_desc.innerHTML = personalData.onboarding_desc

//My Skills
const skillContainer = document.querySelectorAll('ul#skill-lists>li')
skillContainer.forEach((el, idx) => {
    console.log("iteration ke-"+idx);
    console.log(el)
    console.log(`name=${personalData.skills[idx].name}\ndescription=${personalData.skills[idx].description}`);
    el.querySelector('h2').innerHTML = personalData.skills[idx].name
    el.querySelector('div>p').innerHTML = personalData.skills[idx].description
});

