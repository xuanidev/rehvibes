const genero = {
  fieldName: 'genero',
  question: '¿Cuál es tú genero?',
  options: ['Hombre', 'Mujer', 'Prefiero no contestar', 'Otro'],
  fieldType: 'Options',
  src: '/src/assets/genero.png',
};
const birthDate = {
  fieldName: 'dateOfBirth',
  fieldType: 'BirthDate',
};
const weigthAndHeigth = {
  fieldType: 'WeigthAndHeigth',
  fieldName: 'weigthAndHeigth',
  question1: '¿Cuál es tu estatura?',
  question2: '¿Cuál es tu peso?',
};

const imcMessage = {
  infrapeso: 'Sufres infrapeso, tu actual peso puede ser perjudicial para tu salud.',
  normal: 'Tienes un aspecto fantástico, !Sigue así!',
  sobrepeso: 'Sufres sobrepeso.',
  obeso1: 'Sufres obesidad clase I, tu actual peso puede ser perjudicial para tu salud.',
  obeso2: 'Sufres obesidad clase II, tu actual peso puede ser perjudicial para tu salud.',
  obeso3: 'Sufres obesidad clase III, tu actual peso puede ser perjudicial para tu salud.',
};

const operationCuello = {
  fieldName: 'operationCuello',
  question: '¿Qué lesión tienes en el cuello?',
  options: [
    'Esguince cervical',
    'Cervicobraquialgia',
    'Hernia de disco cervical',
    'Contractura cervical',
    'Artritis cervical',
    'Latigazo cervical',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationColumna = {
  fieldName: 'operationColumna',
  question: '¿Qué lesión tienes en la columna vertebral?',
  options: [
    'Hernia de disco lumbar',
    'Esteriosis espiral',
    'Espondiolistesis',
    'Fractura vertebral',
    'Escoliosis',
    'Sindrome facetario',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationHombro = {
  fieldName: 'operationHombro',
  question: '¿Qué lesión tienes en el hombro?',
  options: [
    'Luxación de hombro',
    'Lesión del manguito rotador',
    'Tendinitis',
    'Bursitis',
    'Síndrome de impacto',
    'Capsulitis adhesiva',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationEspalda = {
  fieldName: 'operationEspalda',
  question: '¿Qué lesión tienes en la espalda?',
  options: [
    'Dolor lumbar',
    'Lesión deportiva',
    'Distensión muscular',
    'Sobrecarga',
    'Postura incorrecta',
    'Dolor de cuello asociado con la espalda',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationCadera = {
  fieldName: 'operationCadera',
  question: '¿Qué lesión tienes en la cadera?',
  options: [
    'Artrosis de cadera',
    'Fractura de cadera',
    'Desgarro muscular',
    'Displasia de cadera',
    'Tenidinitis',
    'Síndrome del piramidal',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationCodo = {
  fieldName: 'operationCodo',
  question: '¿Qué lesión tienes en el codo?',
  options: [
    'Codo de tenista',
    'Codo de golfista',
    'Síndrome del túnel cubital',
    'Fractura de codo',
    'Lesión del ligamento',
    'Síndrome de sobrecarga del codo',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationMuneca = {
  fieldName: 'operationMuneca',
  question: '¿Qué lesión tienes en la muñeca?',
  options: [
    'Esguince de muñeca',
    'Fractura de muñeca',
    'Síndrome del túnel carpiano',
    'Artritis de muñeca',
    'Artritis de muñeca',
    'Tenosinovitis',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationRodilla = {
  fieldName: 'operationRodilla',
  question: '¿Qué lesión tienes en la rodilla?',
  options: [
    'Ligamento cruzado',
    'Menisco',
    'Cartílago articular',
    'Tendinitis',
    'Síndrome de fricción de la banda iliotibial',
    'Rotura',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationPie = {
  fieldName: 'operationPie',
  question: '¿Qué lesión tienes en el pie?',
  options: [
    'Fascitis plantar',
    'Fractura de pie',
    'Metatarsalgia',
    'Neuroma de Morton',
    'Síndrome del túnel del tarso',
    'Espolón calcáneo',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const operationTobillo = {
  fieldName: 'operationTobillo',
  question: '¿Qué lesión tienes en el tobillo?',
  options: [
    'Esguince de tobillo',
    'Fractura de tobillo',
    'Tendinitis de Aquiles',
    'Tendinitis peroneal',
    'Lesión de tejidos blandos',
    'Inestabilidad crónica del tobillo',
  ],
  otherText: 'Otro',
  fieldType: 'OptionsAndInput',
};

const goals = {
  fieldName: 'goals',
  question: '¿Qué es lo que más te motiva para unirte a Revibes?',
  options: [
    'Superar una lesión o limitación física',
    'Mantenerme activo y en forma',
    'Tener más energía y dormir mejor',
    'Reducir el estrés y la ansiedad',
    'Mejorar mi calidad de vida',
    'Crear hábitos saludables',
  ],
  fieldType: 'Options',
};

const desire = {
  fieldName: 'desire',
  question: '¿Qué deseas alcanzar con Revibes?',
  options: ['Tengo molestias y quiero mejorar mis hábitos', 'Recuperarme de una lesión o cirugía'],
  conditionOption: 'Recuperarme de una lesión o cirugía',
  fieldType: 'Options',
};

const zones = {
  fieldName: 'zones',
  question: '¿Qué zonas son tus puntos débiles o en las que tienes molestias?',
  options: [
    'Cuello',
    'Lumbar',
    'Hombro',
    'Isquios',
    'Espalda',
    'Pelvis',
    'Cadera',
    'Pectoral',
    'Codo',
    'Tobillos',
    'Muñeca',
    'Pies',
    'Rodilla',
    'Gluteos',
  ],
  fieldType: 'MultipleChoices',
};

const lastOperation = {
  fieldName: 'lastOperation',
  question: '¿Has tenido alguna operación recientemente?',
  options: ['Si', 'No', 'No, pero hace más de 3 sí'],
  fieldType: 'Options',
};

const lesionZones = {
  fieldName: 'lesionZones',
  question: '¿Qué zonas son tus puntos débiles o en las que tienes molestias?',
  options: [
    'Cuello',
    'Muñeca',
    'Hombro',
    'Rodilla',
    'Espalda',
    'Pie',
    'Cadera',
    'Tobillo',
    'Codo',
    'Columna vertebral',
  ],
  fieldType: 'Options',
};

const lesionBeforeZones = {
  fieldName: 'lesionBeforeZones',
  question: '¿Has sufrido alguna lesión en estas zonas?',
  exclusiveOption: 'No',
  options: ['Cuello', 'Hombro', 'Espalda', 'Cadera', 'Muñeca', 'Pies', 'No'],
  fieldType: 'MultipleChoices',
};

const rehabilitation = {
  fieldName: 'rehabilitation',
  question: '¿Has realizado rehabilitación o entrenamiento referente a la lesión u operación que deseas tratar?',
  options: ['Si', 'Hace más de 6 meses', 'No'],
  fieldType: 'Options',
};
const objetivos = {
  fieldName: 'objetivos',
  question: '¿Cuál es tu objetivo principal?',
  options: [
    'Mejorar la movilidad y flexibilidad',
    'Aumentar mi fuerza muscular',
    'Reducir el dolor crónico',
    'Corregir mi postura',
    'Reducir mi porcentaje de grasa corporal',
    'Prevenir o aliviar enfermedades',
    'Mejorar mi salud mental y reducir el estrés',
  ],
  fieldType: 'Options',
};

const tipoEjercicios = {
  fieldName: 'tipoEjercicios',
  question: 'Elige el tipo de ejercicios que prefieras',
  options: [
    'Fuerza',
    'Cardio',
    'Yoga',
    'Entrenamiento funcional',
    'Flexibilidad y movilidad',
    'Equilibrio y coordinación',
    'Sin preferencias',
  ],
  fieldType: 'Options',
};

const nivel = {
  fieldName: 'nivel',
  question: 'Elige el nivel de entrenamiento que prefieras:',
  options: ['Principiante', 'Intermedio', 'Avanzado'],
  fieldType: 'Options',
};

const lugar = {
  fieldName: 'lugar',
  question: 'Elige el nivel el lugar para tu entrenamiento:',
  options: [
    'En casa: quiero ejercitarme en la comodidad y privacidad de mi hogar',
    'En el gimnasio: utilizando el equipamiento disponible de mi gimnasio',
    'Al aire libre: realizar ejercicios conectando con el medio ambiente',
    'En cualquier lugar: deja que Revibes decida por ti',
  ],
  fieldType: 'Options',
};

const equipamiento = {
  fieldName: 'equipamiento',
  question: '¿Tienes acceso a equipamiento en casa?',
  exclusiveOption: 'Ninguna de las anteriores',
  options: ['Mancuernas', 'Pesa rusa', 'Esterilla de yoga', 'Comba', 'Ninguna de las anteriores'],
  fieldType: 'MultipleChoices',
};

const condiciones = {
  fieldName: 'condiciones',
  question: '¿Tienes alguna de estas condiciones médicas crónicas?',
  exclusiveOption: 'Ninguna',
  options: [
    'Artritis',
    'Tendinitis',
    'Artrosis',
    'Espondilosis cervical',
    'Fibromialgia',
    'Dolor crónico',
    'Osteoporosis',
    'Diabetes',
    'Esclerosis múltiple',
    'Ninguna',
  ],
  fieldType: 'MultipleChoicesAndInput',
  otherText: 'Otra',
};
const movilidad = {
  fieldName: 'movilidad',
  question: '¿Tienes alguna limitación de movilidad?',
  exclusiveOption: 'Ninguna',
  options: [
    'Movilidad reducida en las extremidades inferiores',
    'Movilidad reducida en las extremidades inferiores',
    'Rigidez articular',
    'Falta de equilibrio',
    'Ninguna',
  ],
  fieldType: 'MultipleChoices',
};
const enfermedadCardiovascular = {
  fieldName: 'enfermedadCardiovascular',
  question: '¿Tienes alguna de estas enfermedades cardiovasculares?',
  exclusiveOption: 'Ninguna',
  options: [
    'Hipertensión arterial',
    'Enfermedad cardíaca coronaria',
    'Insuficiencia cardíaca',
    'Arritmia',
    'Accidente cerebrovascular previo',
    'Ninguna',
  ],
  fieldType: 'MultipleChoicesAndInput',
  otherText: 'Otra',
};
const condicionRespiratoria = {
  fieldName: 'condicionRespiratoria',
  question: '¿Tienes alguna de estas condiciones respiratorias?',
  exclusiveOption: 'Ninguna',
  options: [
    'Asma',
    'Enfermedad pulmonar obstructiva crónica',
    'Bronquitis crónica',
    'Fibrosis pulmonar',
    'Apnea del sueño',
    'Ninguna',
  ],
  fieldType: 'MultipleChoicesAndInput',
  otherText: 'Otra',
};
const nivelActividadActual = {
  fieldName: 'nivelActividadActual',
  question: '¿Cuál es tu nivel de actividad física actual?',
  options: [
    'Sedentario: no hago ningún tipo de ejercicio',
    'Poco activo: hago algo de ejercicio',
    'Moderadamente activo: hago ejercicio 2 o 3 veces por semanas',
    'Muy activo: hago ejercicio todos o casi todos los días',
  ],
  fieldType: 'Options',
};
const practicaRegular = {
  fieldName: 'practicaRegular',
  question: '¿Practicas algún deporte o actividad física de manera regular?',
  options: ['Si', 'No'],
  fieldType: 'Options',
};
const trabajoSentado = {
  fieldName: 'trabajoSentado',
  question: '¿Tienes un trabajo en el que estés la mayor parte del tiempo sentado?',
  options: ['Si', 'No'],
  fieldType: 'Options',
};
const estres = {
  fieldName: 'estres',
  question: '¿Te sientes estresado en tu día a día?',
  options: [
    'Sí, la mayor parte del tiempo',
    'Sí, de vez en cuando me siento estresado',
    'No, nunca me siento estresado',
  ],
  fieldType: 'Options',
};
const rehabilitacionPreviamente = {
  fieldName: 'rehabilitacionPreviamente',
  question: '¿Has realizado algún tipo de programa de rehabilitación o entrenamiento anteriormente?',
  options: ['Si', 'No'],
  fieldType: 'Options',
};
const dolor = {
  fieldName: 'dolor',
  question: '¿Cuál es tu nivel de dolor actualmente?',
  options: ['Leve: me duele un poco', 'Moderado: me duele pero es soportable', 'Intenso: me duele muchísimo'],
  fieldType: 'Options',
};

export const operationComponents = {
  'Cuello': operationCuello,
  'Hombro': operationHombro,
  'Espalda': operationEspalda,
  'Cadera': operationCadera,
  'Codo': operationCodo,
  'Muñeca': operationMuneca,
  'Rodilla': operationRodilla,
  'Pie': operationPie,
  'Tobillo': operationTobillo,
  'Columna vertebral': operationColumna,
};

export {
  operationCuello,
  operationColumna,
  operationHombro,
  operationEspalda,
  operationCadera,
  operationCodo,
  operationMuneca,
  operationRodilla,
  operationPie,
  operationTobillo,
  goals,
  desire,
  zones,
  lastOperation,
  lesionZones,
  lesionBeforeZones,
  rehabilitation,
  objetivos,
  tipoEjercicios,
  nivel,
  lugar,
  equipamiento,
  condiciones,
  condicionRespiratoria,
  dolor,
  enfermedadCardiovascular,
  estres,
  movilidad,
  nivelActividadActual,
  practicaRegular,
  rehabilitacionPreviamente,
  trabajoSentado,
  genero,
  birthDate,
  weigthAndHeigth,
  imcMessage,
};
