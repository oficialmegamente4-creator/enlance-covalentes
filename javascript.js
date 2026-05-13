function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// LABORATORIO
let labStep = 0;
const labLevels = [
    { t: "Nivel 1: Molécula de Hidrógeno (H₂)", d: "En la molécula H₂, hay un enlace simple entre dos átomos de hidrógeno. ¿Cuántos electrones comparten en total?", g: 2 },
    { t: "Nivel 2: Oxígeno Molecular (O₂)", d: "El Oxígeno forma un enlace doble consigo mismo. ¿Cuántos electrones hay en un enlace DOBLE?", g: 4 },
    { t: "Nivel 3: Gas Nitrógeno (N₂)", d: "Para ser estable, el Nitrógeno forma un enlace TRIPLE. ¿Cuántos electrones arrastrarás para completar este enlace?", g: 6 },
    { t: "Nivel 4: Etileno (C₂H₄)", d: "En el etileno, los dos carbones comparten un enlace doble (C=C). ¿Cuántos e- hay en ese enlace doble?", g: 4 }
];

function initLab() {
    const pool = document.getElementById('lab-pool');
    const drop = document.getElementById('lab-drop');
    pool.innerHTML = ''; drop.innerHTML = 'ZONA DE ENLACE';
    for (let i = 0; i < 10; i++) {
        const e = document.createElement('div');
        e.className = 'electron'; e.draggable = true; e.id = 'el-' + i; e.innerText = 'e-';
        e.addEventListener('dragstart', ev => ev.dataTransfer.setData('text', ev.target.id));
        pool.appendChild(e);
    }
    document.getElementById('lab-title').innerText = labLevels[labStep].t;
    document.getElementById('lab-desc').innerText = labLevels[labStep].d;
}

const dZone = document.getElementById('lab-drop');
dZone.ondragover = e => e.preventDefault();
dZone.ondrop = e => dZone.appendChild(document.getElementById(e.dataTransfer.getData('text')));

function checkLab() {
    if (dZone.querySelectorAll('.electron').length === labLevels[labStep].g) {
        alert("¡CORRECTO! Has formado el enlace con éxito.");
        labStep = (labStep + 1) % labLevels.length;
        initLab();
    } else {
        alert("CONFIGURACIÓN INCORRECTA: Revisa el número de electrones compartidos para ese tipo de enlace.");
        initLab();
    }
}

// SIMULACRO ICFES REAL
const questions = [
    {
        q: "1. En la molécula de Nitrógeno (N₂), existe un enlace triple que requiere el compartimiento de 6 electrones. Esto implica que hay:",
        a: "1 enlace sigma y 2 enlaces pi",
        expl: "En un enlace triple, siempre existe un enlace σ (sigma) formado por solapamiento frontal de orbitales, y dos enlaces π (pi) formados por solapamiento lateral de orbitales p."
    },
    {
        q: "2. Al comparar la longitud de enlace en H₂, O₂ y N₂, se observa que:",
        a: "N₂ < O₂ < H₂",
        expl: "El nitrógeno con enlace triple tiene la longitud más corta, luego el oxígeno con enlace doble, y finalmente el hidrógeno con enlace simple tiene la mayor longitud."
    },
    {
        q: "3. La energía de disociación de un enlace triple es mayor que la de un enlace doble porque:",
        a: "Tiene un par adicional de electrones compartido",
        expl: "A mayor número de pares de electrones compartidos, mayor fortaleza del enlace y mayor energía necesaria para romperlo."
    },
    {
        q: "4. En la molécula de Etileno (C₂H₄), el enlace C=C es un enlace doble que permite:",
        a: "La formación de isómeros geométricos debido a la restricción rotacional",
        expl: "El enlace π en los enlaces dobles impide la rotación libre alrededor del eje internuclear, permitiendo la existencia de isómeros cis-trans."
    },
    {
        q: "5. Si comparamos H-Cl (enlace simple), O=C=O (enlaces dobles) y H-C≡C-H (un enlace triple), el compuesto con la mayor energía de disociación total será:",
        a: "H-C≡C-H",
        expl: "Aunque H-Cl tiene un enlace simple muy fuerte, el acetileno (H-C≡C-H) contiene un enlace triple que es significativamente más fuerte que los demás."
    },
    {
        q: "6. La diferencia fundamental entre un enlace sigma (σ) y un enlace pi (π) es:",
        a: "El sigma se forma por solapamiento frontal y el pi por solapamiento lateral",
        expl: "El enlace σ tiene máxima densidad electrónica entre los dos núcleos (eje internuclear), mientras que el π tiene densidad electrónica en dos regiones separadas (arriba y abajo)."
    },
    {
        q: "7. En el acetileno (C₂H₂), el triple enlace C≡C contiene:",
        a: "1 enlace sigma + 2 enlaces pi",
        expl: "Todos los enlaces múltiples siempre tienen un enlace sigma. En un triple hay un sigma y dos pi, uno encima y otro debajo del eje internuclear."
    },
    {
        q: "8. Cuando una molécula con un enlace doble intenta rotar alrededor de ese enlace, encuentran resistencia debido a:",
        a: "La presencia del enlace pi que impide la libre rotación",
        expl: "El enlace pi está orientado perpendicularmente al eje internuclear. La rotación destruiría el solapamiento lateral de los orbitales p, haciendo que sea energéticamente desfavorable."
    },
    {
        q: "9. Comparando el ácido acético (CH₃COOH), que tiene un enlace doble C=O, con el etano (C₂H₆), que tiene un enlace simple C-C, podemos afirmar que:",
        a: "El enlace C=O es más corto y más fuerte que el C-C",
        expl: "Los enlaces dobles tienen mayor orden de enlace, lo que resulta en menor longitud y mayor energía de disociación en comparación con los enlaces simples."
    },
    {
        q: "10. Si un elemento X forma con el oxígeno un compuesto donde hay 2 enlaces dobles (O=X=O), el número total de pares de electrones compartidos en ese compuesto será:",
        a: "4 pares (8 electrones)",
        expl: "Cada enlace doble contiene 2 pares de electrones. Si hay 2 enlaces dobles, el total es 2 × 2 = 4 pares de electrones compartidos."
    }
];

function initQuiz() {
    const area = document.getElementById('quiz-area');
    questions.forEach((q, i) => {
        const opts = [q.a, "Solo electrones sigma", "Electrones no compartidos", "Fuerzas de Van der Waals"].sort(() => Math.random() - 0.5);
        area.innerHTML += `
                <div class="q-block">
                    <p style="font-weight:700; margin-bottom:15px;">${q.q}</p>
                    ${opts.map(o => `<label class="opt-label"><input type="radio" name="r-${i}" value="${o}"> ${o}</label>`).join('')}
                    <div id="expl-${i}" class="explanation-box" style="display:none"></div>
                </div>`;
    });
}

function gradeQuiz() {
    let score = 0;
    questions.forEach((q, i) => {
        const sel = document.querySelector(`input[name="r-${i}"]:checked`);
        const explDiv = document.getElementById(`expl-${i}`);
        explDiv.style.display = "block";

        if (sel && sel.value === q.a) {
            score++;
            explDiv.innerHTML = `<span style="color:#238636; font-weight:800">✅ CORRECTO:</span> ${q.expl}`;
        } else {
            explDiv.innerHTML = `<span style="color:#da3633; font-weight:800">❌ INCORRECTO:</span> La respuesta era <b>${q.a}</b>. <br><br><b>Justificación:</b> ${q.expl}`;
        }
    });
    alert("Simulacro Finalizado, Carlos. Puntaje: " + score + "/" + questions.length + ". Revisa las justificaciones abajo de cada pregunta.");
    document.getElementById('btn-submit').innerText = "Simulacro Calificado";
    document.getElementById('btn-submit').disabled = true;
}

window.onload = () => { initLab(); initQuiz(); };