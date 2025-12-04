const fs = require('fs');
const path = require('path');

const questions = [
  { q: "What is the shortcut for 'Align Center Vertically' in CorelDRAW?", options: ["Ctrl+C", "Ctrl+E", "Ctrl+H", "Ctrl+V"], correct: 0 },
  { q: "What is the shortcut for 'Undo' in CorelDRAW?", options: ["Ctrl+Z", "Ctrl+Y", "Ctrl+C", "Ctrl+V"], correct: 0 },
  { q: "What is the shortcut for 'Redo' in CorelDRAW?", options: ["Ctrl+Y", "Ctrl+Z", "Ctrl+R", "Ctrl+U"], correct: 0 },
  { q: "What is the shortcut for 'Copy' in CorelDRAW?", options: ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+A"], correct: 0 },
  { q: "What is the shortcut for 'Paste' in CorelDRAW?", options: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], correct: 0 },
  { q: "What is the shortcut for 'Cut' in CorelDRAW?", options: ["Ctrl+X", "Ctrl+C", "Ctrl+V", "Ctrl+A"], correct: 0 },
  { q: "What is the shortcut for 'Select All' in CorelDRAW?", options: ["Ctrl+A", "Ctrl+S", "Ctrl+D", "Ctrl+F"], correct: 0 },
  { q: "What is the shortcut for 'Save' in CorelDRAW?", options: ["Ctrl+S", "Ctrl+O", "Ctrl+N", "Ctrl+P"], correct: 0 },
  { q: "What is the shortcut for 'Open' in CorelDRAW?", options: ["Ctrl+O", "Ctrl+S", "Ctrl+N", "Ctrl+P"], correct: 0 },
  { q: "What is the shortcut for 'New' in CorelDRAW?", options: ["Ctrl+N", "Ctrl+O", "Ctrl+S", "Ctrl+P"], correct: 0 },
  { q: "What is the shortcut for 'Print' in CorelDRAW?", options: ["Ctrl+P", "Ctrl+S", "Ctrl+O", "Ctrl+N"], correct: 0 },
  { q: "What is the shortcut for 'Zoom In' in CorelDRAW?", options: ["F2", "F3", "F4", "F5"], correct: 0 },
  { q: "What is the shortcut for 'Zoom Out' in CorelDRAW?", options: ["F3", "F2", "F4", "F5"], correct: 0 },
  { q: "What is the shortcut for 'Zoom to Fit' in CorelDRAW?", options: ["F4", "F3", "F2", "F5"], correct: 0 },
  { q: "What is the shortcut for 'Group' in CorelDRAW?", options: ["Ctrl+G", "Ctrl+U", "Ctrl+L", "Ctrl+R"], correct: 0 },
  { q: "What is the shortcut for 'Ungroup' in CorelDRAW?", options: ["Ctrl+U", "Ctrl+G", "Ctrl+L", "Ctrl+R"], correct: 0 },
  { q: "What is the shortcut for 'Duplicate' in CorelDRAW?", options: ["Ctrl+D", "Ctrl+C", "Ctrl+V", "Ctrl+X"], correct: 0 },
  { q: "What is the shortcut for 'Delete' in CorelDRAW?", options: ["Delete", "Backspace", "Ctrl+D", "Ctrl+X"], correct: 0 },
  { q: "What is the shortcut for 'Bring to Front' in CorelDRAW?", options: ["Ctrl+Home", "Ctrl+End", "Ctrl+Page Up", "Ctrl+Page Down"], correct: 0 },
  { q: "What is the shortcut for 'Send to Back' in CorelDRAW?", options: ["Ctrl+End", "Ctrl+Home", "Ctrl+Page Up", "Ctrl+Page Down"], correct: 0 },
  { q: "What is the shortcut for 'Bring Forward' in CorelDRAW?", options: ["Ctrl+Page Up", "Ctrl+Page Down", "Ctrl+Home", "Ctrl+End"], correct: 0 },
  { q: "What is the shortcut for 'Send Backward' in CorelDRAW?", options: ["Ctrl+Page Down", "Ctrl+Page Up", "Ctrl+Home", "Ctrl+End"], correct: 0 },
  { q: "What is the shortcut for 'Lock' in CorelDRAW?", options: ["Ctrl+L", "Ctrl+U", "Ctrl+G", "Ctrl+D"], correct: 0 },
  { q: "What is the shortcut for 'Unlock' in CorelDRAW?", options: ["Ctrl+U", "Ctrl+L", "Ctrl+G", "Ctrl+D"], correct: 0 },
];

const baseHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Q{num}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6fb;
    }

    .flex-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      max-width: 400px;
      margin: 10px auto;
    }

    .number-box {
      width: 70px;
      height: 50px;
      background: linear-gradient(135deg, #ffffff, #d3d3d3);
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .answered {
      background: green !important;
      color: white !important;
    }

    .option {
      background: white;
      padding: 10px;
      margin: 8px 0;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      color: black;
    }

    .option:hover {
      background: #ddd;
    }

    .correct {
      background: green !important;
      color: white !important;
    }

    .wrong {
      background: red !important;
      color: white !important;
    }

    .disabled {
      pointer-events: none;
      opacity: 0.7;
    }
  </style>
</head>

<body>

<div style="text-align: center; color: green;">
  <h3>List of questions and answered ones</h3>
</div>

<div class="flex-container">
  <a href="./q1.html"><div class="number-box" id="btn1">1</div></a>
  <a href="./q2.html"><div class="number-box" id="btn2">2</div></a>
  <a href="./q3.html"><div class="number-box" id="btn3">3</div></a>
  <a href="./q4.html"><div class="number-box" id="btn4">4</div></a>
  <a href="./q5.html"><div class="number-box" id="btn5">5</div></a>
  <a href="./q6.html"><div class="number-box" id="btn6">6</div></a>
  <a href="./q7.html"><div class="number-box" id="btn7">7</div></a>
  <a href="./q8.html"><div class="number-box" id="btn8">8</div></a>
  <a href="./q9.html"><div class="number-box" id="btn9">9</div></a>
  <a href="./q10.html"><div class="number-box" id="btn10">10</div></a>
  <a href="./q11.html"><div class="number-box" id="btn11">11</div></a>
  <a href="./q12.html"><div class="number-box" id="btn12">12</div></a>
  <a href="./q13.html"><div class="number-box" id="btn13">13</div></a>
  <a href="./q14.html"><div class="number-box" id="btn14">14</div></a>
  <a href="./q15.html"><div class="number-box" id="btn15">15</div></a>
  <a href="./q16.html"><div class="number-box" id="btn16">16</div></a>
  <a href="./q17.html"><div class="number-box" id="btn17">17</div></a>
  <a href="./q18.html"><div class="number-box" id="btn18">18</div></a>
  <a href="./q19.html"><div class="number-box" id="btn19">19</div></a>
  <a href="./q20.html"><div class="number-box" id="btn20">20</div></a>
  <a href="./q21.html"><div class="number-box" id="btn21">21</div></a>
  <a href="./q22.html"><div class="number-box" id="btn22">22</div></a>
  <a href="./q23.html"><div class="number-box" id="btn23">23</div></a>
  <a href="./q24.html"><div class="number-box" id="btn24">24</div></a>
  <a href="./q25.html"><div class="number-box" id="btn25">25</div></a>
  <a href="./q26.html"><div class="number-box" id="btn26">26</div></a>
  <a href="./q27.html"><div class="number-box" id="btn27">27</div></a>
  <a href="./q28.html"><div class="number-box" id="btn28">28</div></a>
  <a href="./q29.html"><div class="number-box" id="btn29">29</div></a>
  <a href="./q30.html"><div class="number-box" id="btn30">30</div></a>
  <a href="./q31.html"><div class="number-box" id="btn31">31</div></a>
  <a href="./q32.html"><div class="number-box" id="btn32">32</div></a>
  <a href="./q33.html"><div class="number-box" id="btn33">33</div></a>
  <a href="./q34.html"><div class="number-box" id="btn34">34</div></a>
  <a href="./q35.html"><div class="number-box" id="btn35">35</div></a>
  <a href="./q36.html"><div class="number-box" id="btn36">36</div></a>
  <a href="./q37.html"><div class="number-box" id="btn37">37</div></a>
  <a href="./q38.html"><div class="number-box" id="btn38">38</div></a>
  <a href="./q39.html"><div class="number-box" id="btn39">39</div></a>
  <a href="./q40.html"><div class="number-box" id="btn40">40</div></a>
  <a href="./q41.html"><div class="number-box" id="btn41">41</div></a>
  <a href="./q42.html"><div class="number-box" id="btn42">42</div></a>
  <a href="./q43.html"><div class="number-box" id="btn43">43</div></a>
  <a href="./q44.html"><div class="number-box" id="btn44">44</div></a>
  <a href="./q45.html"><div class="number-box" id="btn45">45</div></a>
  <a href="./q46.html"><div class="number-box" id="btn46">46</div></a>
  <a href="./q47.html"><div class="number-box" id="btn47">47</div></a>
  <a href="./q48.html"><div class="number-box" id="btn48">48</div></a>
  <a href="./q49.html"><div class="number-box" id="btn49">49</div></a>
  <a href="./q50.html"><div class="number-box" id="btn50">50</div></a>
</div>


<br>

<!-- ✅ QUESTION {num} -->
<div id="q{num}-container" style="width:95%; background-color: rgb(138, 138, 138); color: white; margin: auto; padding: 5px; border-radius: 10px; font-size: 12px;">
  <h1>{num}. {question}</h1>

  <div class="options">
    <div class="option" data-answer="a">A. {opt0}</div>
    <div class="option" data-answer="b">B. {opt1}</div>
    <div class="option" data-answer="c">C. {opt2}</div>
    <div class="option" data-answer="d">D. {opt3}</div>
  </div>
</div>

<br>

<div style="text-align: center;">
  <button
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
    color: white; border: none; padding: 15px 40px; font-size: 18px;
    font-weight: bold; border-radius: 50px; cursor: pointer;"
    onclick="window.location.href='../dashboard.html'">
     Back to Dashboard
  </button>
</div>

<script>
  let pointsObj = JSON.parse(localStorage.getItem("corelPoints")) || { total: 0 };
  let answeredOnce = JSON.parse(localStorage.getItem("corelAnsweredOnce")) || {};
  let userAnswers = JSON.parse(localStorage.getItem("corelUserAnswers")) || {};

  const options = document.querySelectorAll(".option");
  const correctAnswer = "{correct}";   // ✅ {correctText}
  const questionKey = "corelq{num}";

  // ✅ Auto color answered grid
  for (let i = 1; i <= 50; i++) {
    if (answeredOnce["corelq" + i]) {
      const btn = document.getElementById("btn" + i);
      if (btn) btn.classList.add("answered");
    }
  }

  // ✅ Restore previous answer
  if (answeredOnce[questionKey]) {
    const savedUserAnswer = userAnswers[questionKey];

    options.forEach(opt => {
      const ans = opt.dataset.answer;

      if (ans === savedUserAnswer) {
        opt.classList.add(ans === correctAnswer ? "correct" : "wrong");
      }

      if (ans === correctAnswer) {
        opt.classList.add("correct");
      }

      opt.classList.add("disabled");
    });
  }

  // ✅ Click handler
  options.forEach(option => {
    option.addEventListener("click", function () {
      if (answeredOnce[questionKey]) return;

      const userAnswer = this.dataset.answer;

      answeredOnce[questionKey] = true;
      userAnswers[questionKey] = userAnswer;

      localStorage.setItem("corelAnsweredOnce", JSON.stringify(answeredOnce));
      localStorage.setItem("corelUserAnswers", JSON.stringify(userAnswers));

      if (userAnswer === correctAnswer) {
        this.classList.add("correct");
        pointsObj.total += 1;
        localStorage.setItem("corelPoints", JSON.stringify(pointsObj));
      } else {
        this.classList.add("wrong");
        document.querySelector(\`[data-answer="\${correctAnswer}"]\`)
          .classList.add("correct");
      }

      document.getElementById("btn{num}").classList.add("answered");
      options.forEach(opt => opt.classList.add("disabled"));

      // ✅ Redirect to Q{next}
      setTimeout(() => {
        window.location.href = "q{next}.html";
      }, 1200);
    });
  });
</script>
</body>
</html>`;

for (let i = 0; i < questions.length; i++) {
  const num = 27 + i;
  const q = questions[i];
  let html = baseHtml.replace(/{num}/g, num)
    .replace('{question}', q.q)
    .replace('{opt0}', q.options[0])
    .replace('{opt1}', q.options[1])
    .replace('{opt2}', q.options[2])
    .replace('{opt3}', q.options[3])
    .replace('{correct}', String.fromCharCode(97 + q.correct)) // a, b, c, d
    .replace('{correctText}', q.options[q.correct])
    .replace('{next}', num + 1);

  fs.writeFileSync(path.join('CorelDRAW', `q${num}.html`), html);
}

console.log('Generated q27 to q50');