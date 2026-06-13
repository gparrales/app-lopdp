import React, { useState } from 'react';

const PREGUNTAS_LOPDP = [
  { id: 1, categoria: "DATOS Y BASES DE LEGITIMACIÓN", texto: "¿Tiene claro qué datos personales recopila y trata su organización (por ejemplo, datos de clientes, empleados o proveedores)?" },
  { id: 2, categoria: "DATOS Y BASES DE LEGITIMACIÓN", texto: "¿Conoce para qué utiliza esos datos personales dentro de su negocio y qué procesos involucran su uso?" },
  { id: 3, categoria: "DATOS Y BASES DE LEGITIMACIÓN", texto: "¿Cuenta con la autorización o base legal necesaria (como el consentimiento explícito por parte del titular) para recopilar y utilizar los datos personales; y puede demostrarlo si se lo solicitan?" },
  { id: 4, categoria: "GESTIÓN DE RIESGOS", texto: "¿Su organización tiene un proceso definido para identificar, analizar y gestionar los riesgos relacionados con la protección de datos y la seguridad de la información?" },
  { id: 5, categoria: "GESTIÓN DE RIESGOS", texto: "¿Su organización ha realizado la evaluación de impacto que podrían generar las actividades que realiza con los datos personales?" },
  { id: 6, categoria: "GESTIÓN DE RIESGOS", texto: "¿Ha implementado, en su organización, medidas de seguridad para proteger la información, como contraseñas seguras, controles de acceso, copias de respaldo, antivirus, firewall o capacitación al personal?" },
  { id: 7, categoria: "DERECHO DE TITULARES", texto: "¿Informa de manera clara a clientes, empleados u otras personas cómo utilizará los datos personales que recopila? " },
  { id: 8, categoria: "DERECHO DE TITULARES", texto: "¿Las personas pueden solicitar fácilmente acceder, corregir, actualizar o eliminar sus datos personales cuando sea necesario?" },
  { id: 9, categoria: "CICLO DE VIDA DEL DATO E INCIDENTES", texto: "¿Utiliza los datos personales únicamente para los fines que fueron autorizados por sus titulares?" },
  { id: 10, categoria: "CICLO DE VIDA DEL DATO E INCIDENTES", texto: "¿Tiene definido cuánto tiempo conservará los datos personales que recopila?" },
  { id: 11, categoria: "CICLO DE VIDA DEL DATO E INCIDENTES", texto: "Cuando ya no necesita esos datos, ¿cuenta con un procedimiento seguro para eliminarlos, devolverlos o anonimizar la información de forma permanente?" },
  { id: 12, categoria: "CICLO DE VIDA DEL DATO E INCIDENTES", texto: "¿Dispone de un procedimiento documentado sobre como debe actuar ante una fuga, pérdida o acceso no autorizado a datos personales, incluyendo la notificación a las autoridades (SDP) y a los titulares cuando corresponda?" },
  { id: 13, categoria: "OPERACIONES", texto: "¿Ha evaluado si el volumen de datos personales que maneja su organización, en base a la MTGE (Matriz de Tratamiento a Gran Escala), la ubica dentro de una categoría especial que implique obligaciones adicionales de cumplimiento?" },
  { id: 14, categoria: "OPERACIONES", texto: "¿Tiene acuerdos o contratos de confidencialidad con empleados, proveedores y terceros que tengan acceso a información personal, para asegurar un manejo adecuado de los datos?" },
  { id: 15, categoria: "OPERACIONES", texto: "¿Realiza revisiones o auditorías periódicas para comprobar que su empresa cumple correctamente con las obligaciones legales relacionadas con la protección de datos personales?" }
];

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const totalPreguntas = PREGUNTAS_LOPDP.length;

  const seleccionarRespuesta = (valor) => {
    // 1. Guardamos la respuesta de forma segura aislada
    setRespuestas(prev => ({ ...prev, [preguntaActual]: valor }));
    
    // 2. Avanzamos el índice usando el estado previo garantizado por React (Fijación de Bug)
    setPreguntaActual((prevIndex) => {
      const siguienteSugerido = prevIndex + 1;
      if (siguienteSugerido < totalPreguntas) {
        return siguienteSugerido;
      } else {
        setPantalla('resultado');
        return prevIndex;
      }
    });
  };

  const calcularPorcentaje = () => {
    const siContados = Object.values(respuestas).filter(resp => resp === 'SI').length;
    return Math.round((siContados / totalPreguntas) * 100);
  };

  const obtenerFeedback = (porcentaje) => {
    if (porcentaje >= 90) {
      return { color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', mensaje: '¡¡¡Felicitaciones!!! Tu organización tiene un excelente nivel de implementación de la LOPDP.' };
    } else if (porcentaje >= 70) {
      return { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', mensaje: 'Tu organización tiene implementadas varias acciones en lo que respecta a la LOPDP pero necesitas mejorar para evitar sanciones.' };
    } else {
      return { color: 'text-red-600', bg: 'bg-red-50 border-red-200', mensaje: 'Tu organización tiene vacíos que pueden acarrear severas sanciones si no tomas correctivos a la brevedad posible.' };
    }
  };

  const reiniciarEvaluacion = () => {
    setRespuestas({});
    setPreguntaActual(0);
    setPantalla('inicio');
  };

  const porcentajeFinal = calcularPorcentaje();
  const feedback = obtenerFeedback(porcentajeFinal);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800">
      
      {/* Header */}
      <header className="bg-white shadow-xs py-5 px-6 border-b border-slate-200">
        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <span className="text-base md:text-lg font-bold text-(--color-geekerds-blue) tracking-wide uppercase">
            Evaluador LOPDP - Ecuador
          </span>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl p-6 md:p-10">
          
          {/* PANTALLA 1: INICIO */}
          {pantalla === 'inicio' && (
            <div className="text-center flex flex-col items-center">
              <div className="w-full max-w-md mb-8 flex justify-center">
                <img src="/logo_ServiciosTI_1200x600.png" alt="Geekerds Logo" className="max-h-24 object-contain" />
              </div>
              
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed max-w-xl mb-8">
                Conoce el nivel de cumplimiento de tu organización en temas de la <span className="text-(--color-geekerds-blue)">LOPDP</span> - Ley Orgánica de Protección de Datos Personales
              </h1>
              
              <button
                onClick={() => setPantalla('cuestionario')}
                className="w-full sm:w-auto bg-(--color-geekerds-blue) hover:opacity-90 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md transition-all text-lg cursor-pointer"
              >
                Iniciar Evaluación
              </button>
            </div>
          )}

          {/* PANTALLA 2: CUESTIONARIO */}
          {pantalla === 'cuestionario' && (
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <span className="text-sm font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-md">
                  Pregunta {preguntaActual + 1} de {totalPreguntas}
                </span>
                <span className="text-xs font-semibold text-(--color-geekerds-blue) uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded">
                  {PREGUNTAS_LOPDP[preguntaActual].categoria}
                </span>
              </div>

              {/* Barra de Progreso */}
              <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-(--color-geekerds-blue) to-(--color-geekerds-red) h-full transition-all duration-300"
                  style={{ width: `${((preguntaActual + 1) / totalPreguntas) * 100}%` }}
                ></div>
              </div>

              <div className="min-h-[120px] flex items-center mb-8">
                <h2 className="text-lg md:text-xl font-medium text-slate-800 leading-snug">
                  {PREGUNTAS_LOPDP[preguntaActual].texto}
                </h2>
              </div>

              {/* Opciones SI / NO */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <button
                  type="button"
                  onClick={() => seleccionarRespuesta('SI')}
                  className="py-5 rounded-xl font-bold text-xl border-2 bg-white border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer active:bg-emerald-500 active:text-white"
                >
                  SÍ
                </button>
                <button
                  type="button"
                  onClick={() => seleccionarRespuesta('NO')}
                  className="py-5 rounded-xl font-bold text-xl border-2 bg-white border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all cursor-pointer active:bg-red-500 active:text-white"
                >
                  NO
                </button>
              </div>
            </div>
          )}

          {/* PANTALLA 3: RESULTADOS */}
          {pantalla === 'resultado' && (
            <div className="text-center flex flex-col items-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Resultado de la Evaluación</h2>
              <p className="text-slate-500 text-sm mb-6">Índice estimado de cumplimiento normativo</p>
              
              <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-slate-50 border-4 border-slate-100 mb-6 shadow-inner">
                <span className="text-4xl font-extrabold text-slate-800">{porcentajeFinal}%</span>
              </div>

              <div className={`p-5 rounded-xl border-2 ${feedback.bg} mb-8 max-w-xl text-center`}>
                <p className={`font-medium text-base md:text-lg ${feedback.color}`}>
                  {feedback.mensaje}
                </p>
              </div>

              <hr className="w-full border-slate-200 my-4" />

              <div className="mt-4 w-full flex flex-col items-center">
                <div className="w-full max-w-xs mb-4 flex justify-center">
                  <img src="/logo_ServiciosTI_1200x600.png" alt="Geekerds Logo" className="max-h-16 object-contain" />
                </div>

                <p className="text-slate-700 font-medium max-w-md mb-6 text-sm md:text-base">
                  Si necesitas ayuda para implementar la LOPDP en tu organización no dudes en contactarme
                </p>

                <a
                  href="https://wa.me/593980700611?text=Hola,%20realicé%20el%20test%20de%20cumplimiento%20LOPDP%20y%20me%20gustaría%20recibir%20asesoría."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.479 4.884 1.479 5.429 0 9.847-4.387 9.849-9.786.001-2.615-1.013-5.074-2.855-6.918C16.632 2.083 14.181.815 11.6.815c-5.434 0-9.852 4.388-9.855 9.788-.001 1.705.469 3.371 1.359 4.818l-.979 3.572 3.659-.96c1.517.822 2.922 1.121 4.322 1.121zm11.367-7.633c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.651.075-.3-.15-1.266-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.134-.133.301-.35.451-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.519-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8 1.025-.275.95-1.05 3.125-1.125 3.275-.075.15-.15.3-.025.55.125.25.421.688.892 1.1a10.022 10.022 0 002.556 1.848c.58.27 1.031.415 1.385.527.584.185 1.114.159 1.534.097.467-.069 1.431-.584 1.631-1.15.2-.566.2-1.049.141-1.15-.059-.1-.217-.15-.517-.3z" />
                  </svg>
                  Contactar por WhatsApp
                </a>

                <span className="text-lg font-bold text-slate-700 mt-3 tracking-wide">
                  0980700611
                </span>

                <button
                  onClick={reiniciarEvaluacion}
                  className="mt-8 text-xs font-semibold text-slate-400 hover:text-(--color-geekerds-blue) transition-colors cursor-pointer"
                >
                  ↻ Repetir Diagnóstico
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-slate-100 border-t border-slate-200 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Geekerds. Todos los derechos reservados. Guayaquil, Ecuador.
      </footer>
    </div>
  );
}