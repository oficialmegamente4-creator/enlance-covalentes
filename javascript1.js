function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// la Actividad
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

// Preguntas del simulacro
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

function initQuiz1() {
    const area = document.getElementById(`quiz-area-1`);
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

function gradeQuiz1() {
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
    alert("Simulacro Finalizado, Estudiante. Puntaje: " + score + "/" + questions.length + ". Revisa las justificaciones abajo de cada pregunta.");
    document.getElementById('btn-submit-1').innerText = "Simulacro Calificado";
    document.getElementById('btn-submit-1').disabled = true;
}

window.addEventListener(`load`,  () => { initLab(); initQuiz1();});

// Wrapper para cargar Quiz 2
function loadQuiz2() {
    if (typeof initQuiz2 === 'function') {
        initQuiz2();
    } else {
        console.error('initQuiz2 aún no está definida');
    }
}

// ===== PREGUNTAS PRUEBA ICFES =====
const questionsICFES = [
    {
        q: `1. La siguiente ecuación representa la reacción química de la formación de agua (H₂O):<br>
            <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta2.png" alt="Imagen de la pregunta 1" width="900"><br>
            ¿Cuál de las siguientes opciones muestra correctamente los reactivos de la anterior reacción?`, 

    a: "H₂ y O₂",
    options: [
        "H₄ y O₂",
        "H₄ y O₄",
        "H₂ y O₂",
        "H₂ y O₄"
    ],
    expl: "La molécula de agua se forma a partir de hidrógeno molecular y oxígeno molecular."
},
    {
        q: `2. Considere la siguiente reacción y las masas molares de reactivos y productos: P₄ + 6 Cl₂ → 4 PCl₃.<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta18.png" alt="Imagen de la pregunta 18" width="600"><br>
        De acuerdo con la información anterior, si reaccionan 124 g de P₄ con 210 g de Cl₂, ¿cuál es el reactivo límite?`,
        a: "El Cl₂, porque reaccionan en su totalidad 210 gramos de Cl₂ y queda la mitad de P₄ sin reaccionar.",
        options: [
            "El Cl₂, porque reaccionan en su totalidad 210 gramos de Cl₂ y queda la mitad de P₄ sin reaccionar.",
            "El P₄, porque su masa en gramos es menor que la del Cl₂.",
            "El Cl₂, porque según la relación estequiométrica siempre se necesitan 6 moles de Cl₂, sin importar la cantidad de P₄.",
            "El P₄, porque su masa molar es casi el doble que la del Cl₂."
        ],
        expl: "El Cl₂ es el reactivo limitante porque se consume completamente antes de que se agote el P₄."
    },
    {
        q: `3. En la tabla se muestra la configuración electrónica de un átomo neutro y de un ion de aluminio.<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta23.png" alt="Imagen de la pregunta 23" width="900"><br>
        ¿Por qué es correcto afirmar que el estado de oxidación del ion de aluminio es 3+?`,
        a: "Porque tiene 3 electrones menos en su configuración electrónica que el aluminio neutro.",
        options: [
            "Porque el último nivel de energía de su configuración electrónica es 3.",
            "Porque tiene 3 electrones menos en su configuración electrónica que el aluminio neutro.",
            "Porque tiene 3 electrones más en su configuración electrónica que el aluminio neutro.",
            "Porque el número total de electrones en su configuración electrónica es 3."
        ],
        expl: "El ion de aluminio pierde 3 electrones, lo que le da una carga positiva de +3."
    },
    {
        q: `4. La conductividad de una disolución es la capacidad que tiene esta para conducir la corriente eléctrica.<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta30.png" alt="Imagene de la pregunta 30" width="500"><br>
        Un estudiante realiza una serie de experimentos para estudiar la conductividad del sulfato de magnesio (MgSO₄) disuelto en agua. Con base en la información anterior, ¿qué se buscaba estudiar con este experimento?`,
        a: "El efecto de la concentración de la sal sobre la conductividad de la disolución.",
        options: [
            "La influencia de la temperatura sobre la conductividad.",
            "El efecto de la conductividad de la disolución sobre la concentración de la sal.",
            "Influencia de la carga de los iones sobre la conductividad.",
            "El efecto de la concentración de la sal sobre la conductividad de la disolución."
        ],
        expl: "El experimento se diseñó para analizar cómo la concentración de la sal afecta la conductividad."
    },
    {
        q: `5. Una estudiante realiza diferentes ensayos con el objetivo de determinar el efecto de la concentración de los reactivos sobre la velocidad de formación de Z en la reacción X + Y  → Z. En cada ensayo mide la velocidad de formación de Z manteniendo constante la concentración de uno de los reactivos y variando la del otro, como se muestra en las siguientes gráficas:<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta37.png" alt="Imagen de la pregunta 37" width="500"><br>
        Teniendo en cuenta la información anterior, ¿qué se puede concluir del cambio en la velocidad de formación de Z?`,
        a: "El cambio de la velocidad de formación de Z depende de la concentración de ambos reactivos.",
        options: [
            "El cambio de la velocidad de formación de Z no depende de la concentración de los reactivos.",
            "El cambio de la velocidad de formación de Z depende de la concentración de ambos reactivos.",
            "El cambio de la velocidad de formación de Z depende solamente de la concentración de X. ",
            "El cambio de la velocidad de formación de Z depende solamente de la concentración de Y."

        ],
        expl: "La velocidad de formación de Z está influenciada por las concentraciones de X y Y, como se observa en las gráficas."
    },
    {
        q: `6. Los alcoholes pueden ser oxidados a cetonas, aldehídos o ácidos carboxílicos de acuerdo con el tipo de alcohol que reacciona, como se muestra en la imagen.<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/preguta41.1.png" alt="Imagen de la pregunta 41" width="500"><br>
        Para reconocer el tipo de compuesto que se forma en una oxidación se realizan las siguientes pruebas.<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta41.2.png" alt="Imagen de la pregunta 41" width="500"><br>
        Si en un laboratorio se oxida un alcohol de 6 carbonos y se aplican las pruebas de reconocimiento de grupos funcionales obteniendo un espejo de plata y coloración morada con almidón, ¿cuál es la mezcla que se espera se haya formado después de la oxidación?`,
        a: "CH₃-CH₂-CH₂-CH₂-CH₂-CHO y CH₃-CH₂-CH₂-CH₂-CH₂-COOH",
        options: [
            "CH₃-CH₂-CH₂-CH₂-CH₂-CHO y CH₃-CH₂-CH₂-CH₂-CH₂-COOH",
            "CH₃-CH₂-CH₂-CH₂-CH₂-CH₂-CHO y CH₃-CH₂-CH₂-CH₂-CH₂-CH₂-COOH",
            "CH₃-CH₂-CH₂-CH₂-CH₂-COOH y CH₃-CH₂-CH₂-CH₂-CH₂-CH₂-COOH",
            "CH₃-CH₂-CH₂-CH₂-CH₂-CHO y CH₃-CH₂-CH₂-CH₂-CH₂-CH₂-CHO"
        ],
        expl: "El espejo de plata indica la presencia de un aldehído, mientras que la coloración morada con almidón indica la formación de un ácido carboxílico."
    },
    {
        q: `7. En clase, el profesor explica que la acidez de un alcohol está relacionada con su estructura y muestra la siguiente tabla con la estructura de los alcoholes de mayor a menor acidez:<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta50.1.png" alt="Imagen de la pregunta 50" width="300"><br>
        Luego le pide a sus estudiantes que revisen la siguiente tabla con la estructura de cuatro alcoholes:<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta50.2.png" alt="Imagen de la pregunta 50" width="500"><br>
        De acuerdo con lo anterior, ¿cuál es el alcohol que presenta la menor acidez?`,
        a: "2-metil-2-propanol.",
        options: [
            "2-butanol.",
            "Etanol.",
            "2-metil-2-propanol.",
            "2-propanol."
        ],
        expl: "El alcohol terciario tiene la menor acidez debido a la mayor estabilización del ion alcóxido formado."
    },
    {
        q: `8. Un estudiante analiza cómo cambia la solubilidad de una sal de sodio; para esto, disuelve distintas cantidades de la sal en 20 gramos de agua destilada y registra la temperatura exacta a la cual se logra disolver completamente. Los resultados se muestran a continuación.<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta3.png" alt="Imagen de la pregunta 3" width="500"><br>
        Teniendo en cuenta lo observado con 20 gramos de agua destilada, el estudiante cree que si a 83 °C se agregan 50 gramos de la sal de sodio en 40 gramos de agua destilada no se solubilizará completamente esta cantidad de sal. ¿La suposición del estudiante es correcta?`,
        a: "No, porque a partir de 65 °C se pueden disolver completamente 50 g de la sal de sodio en 40 gramos de agua, por lo que a 83 °C la sal estará completamente disuelta.",
        options: [
            "Sí, porque para disolver esta cantidad de la sal de sodio en 40 gramos de agua también se necesitaría el doble de temperatura, es decir, 166 °C.",
            "No, porque al tener el doble de agua, es más probable que la sal de sodio solo necesite la mitad de la temperatura para disolverse, es decir, 42 °C.",
            "No, porque a partir de 65 °C se pueden disolver completamente 50 g de la sal de sodio en 40 gramos de agua, por lo que a 83 °C la sal estará completamente disuelta.",
            "Sí, porque con masas mayores a 35 gramos de la sal de sodio, se necesitarían temperaturas mayores que 83 °C para disolverla en esa cantidad de agua."
        ],
        expl: "La tabla muestra que a 65 °C ya se pueden disolver 50 g de sal en 40 g de agua, por lo que a 83 °C también será posible."
    },
    {
        q: `9. Una estudiante quiere clasificar dos sustancias de acuerdo con el tipo de mezclas que son. Al buscar, encuentra que las mezclas homogéneas son uniformes en todas sus partes, pero las mezclas heterogéneas no lo son. La estudiante realiza los procedimientos que se muestran en la tabla con las sustancias 1 y 2.<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta8.png" alt="Imagen de la pregunta 8" width="400"><br>`,
        a: "La sustancia 1 es una mezcla heterogénea y la sustancia 2 es una mezcla homogénea.",
        options: [
            "A.	La sustancia 1 es una mezcla homogénea y la sustancia 2 es una mezcla heterogénea.",
            "La sustancia 1 es una mezcla heterogénea y la sustancia 2 es una mezcla homogénea.",
            "Ambas sustancias son mezclas homogéneas.",
            "Ambas sustancias son mezclas heterogéneas."

        ],
        expl: "La sustancia 1 presenta dos fases visibles, mientras que la sustancia 2 es uniforme en toda su composición."
    },
    {
        q: `10. La materia puede clasificarse analizando su composición como se muestra en el diagrama<br>
        <img src="imagenes/icfes/IMAGENES DEL ICFES/pregunta28.png" alt="Imagen de la pregunta 28" width="500"><br>
        El acero es un material que contiene los elementos hierro y carbono. Dos muestras distintas de acero tienen diferentes cantidades de estos elementos, pero ambas muestras tienen composición uniforme. Usando el diagrama anterior, ¿cómo clasificaría al acero?`,
        a: "Como una mezcla homogénea, porque está formado por diferentes elementos y es uniforme.",
        options: [
            "Como una mezcla homogénea, porque está formado por diferentes elementos y es uniforme.",
            "Como una sustancia pura, porque tiene composición uniforme y es un solo compuesto.",
            "Como una mezcla heterogénea, porque está formado por diferentes elementos.",
            "Como una sustancia pura, porque muestras distintas tienen composición diferente."

        ],
        expl: "El acero es una mezcla homogénea porque tiene una composición uniforme aunque esté formado por diferentes elementos."
    }
];

function initQuiz2() {
    const area = document.getElementById(`quiz-area-2`);
    questionsICFES.forEach((q, i) => {
        const opts = q.options;
        area.innerHTML += `
                <div class="q-block">
                    <p style="font-weight:700; margin-bottom:15px;">${q.q}</p>
                    ${opts.map(o => `<label class="opt-label"><input type="radio" name="rq2-${i}" value="${o}"> ${o}</label>`).join('')}
                    <div id="explq2-${i}" class="explanation-box" style="display:none"></div>
                </div>`;
    });
}

function gradeQuiz2() {
    let score = 0;
    questionsICFES.forEach((q, i) => {
        const sel = document.querySelector(`input[name="rq2-${i}"]:checked`);
        const explDiv = document.getElementById(`explq2-${i}`);
        explDiv.style.display = "block";

        if (sel && sel.value === q.a) {
            score++;
            explDiv.innerHTML = `<span style="color:#238636; font-weight:800">✅ CORRECTO:</span> ${q.expl}`;
        } else {
            explDiv.innerHTML = `<span style="color:#da3633; font-weight:800">❌ INCORRECTO:</span> La respuesta era <b>${q.a}</b>. <br><br><b>Justificación:</b> ${q.expl}`;
        }
    });
    alert("Simulacro Finalizado, Carlos. Puntaje: " + score + "/" + questionsICFES.length + ". Revisa las justificaciones abajo de cada pregunta.");
    document.getElementById('btn-submit-2').innerText = "Simulacro Calificado";
    document.getElementById('btn-submit-2').disabled = true;
}