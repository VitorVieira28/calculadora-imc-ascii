
const form = document.getElementById('imc-form');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const resultadoDiv = document.getElementById('resultado');

function calcularIMC(peso, altura) {
    
    if (!peso || !altura || parseFloat(peso) <= 0 || parseFloat(altura) <= 0) return 0;
    
    const imc = parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));
    return imc.toFixed(2);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            classificacao: 'Magreza',
            mensagem: 'Seu IMC indica que você está abaixo do peso ideal. É importante buscar orientação profissional.',
            corFundo: '#ffc10733', 
            corTexto: '#ffc107'    
        };
    } else if (imc <= 24.9) { 
        return {
            classificacao: 'Peso Normal',
            mensagem: 'Parabéns! Você está na faixa de peso ideal. Mantenha seus hábitos saudáveis.',
            corFundo: '#28a74533', 
            corTexto: '#28a745'    
        };
    } else if (imc <= 29.9) { 
        return {
            classificacao: 'Sobrepeso',
            mensagem: 'Atenção! Seu IMC indica sobrepeso. Considere ajustar seus hábitos.',
            corFundo: '#fd7e1433', 
            corTexto: '#fd7e14'    
        };
    } else { 
        return {
            classificacao: 'Obesidade',
            mensagem: 'Seu IMC aponta Obesidade. É essencial buscar acompanhamento médico e nutricional.',
            corFundo: '#dc354533', 
            corTexto: '#dc3545'    
        };
    }
}

function handleSubmit(event) {
    event.preventDefault(); 

    const peso = pesoInput.value;
    const altura = alturaInput.value;

    if (!peso || !altura || parseFloat(peso) <= 0 || parseFloat(altura) <= 0) {
        resultadoDiv.style.display = 'block';
        resultadoDiv.style.backgroundColor = '#f8d7da';
        resultadoDiv.style.color = '#721c24'; 
        resultadoDiv.style.borderColor = '#721c24'; 
        resultadoDiv.innerHTML = '<p>Por favor, insira valores válidos para Peso e Altura.</p>';
        return;
    }

    const imcCalculado = calcularIMC(peso, altura);
    const resultado = classificarIMC(imcCalculado);

    
    const htmlResultado = `
        <p>Seu IMC é: <strong>${imcCalculado} kg/m²</strong></p>
        <p>Classificação: <strong>${resultado.classificacao}</strong></p>
        <p>${resultado.mensagem}</p>
    `;

    resultadoDiv.style.display = 'block'; 
    resultadoDiv.style.backgroundColor = resultado.corFundo; 
    resultadoDiv.style.color = resultado.corTexto; 
    resultadoDiv.style.borderColor = resultado.corTexto; 
    resultadoDiv.innerHTML = htmlResultado;
}

form.addEventListener('submit', handleSubmit);

form.addEventListener('reset', () => {
    
    setTimeout(() => {
        resultadoDiv.style.display = 'none';
        resultadoDiv.innerHTML = '';
    }, 50);
});