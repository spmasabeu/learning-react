console.log(2 + 2);

// Prototipo de TSR!! MOTIVACION

import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const lineRefs = useRef([]);

  // 🔧 Puedes modificar esta constante para cambiar la velocidad:
  const VELOCIDAD_MS = 400; // más bajo = más rápido

  const texto = [
    "Línea 1: Este es un ejemplo de texto con algo de contenido para rellenar visualmente.",
    "Línea 2: Puedes reemplazarlo por lo que quieras, y se ajustará automáticamente.",
    "Línea 3: Este punto no cambia el layout, solo ayuda a guiar la lectura línea por línea.",
    "Línea 4: Visualmente se verá mucho mejor si cada línea se estira hasta el final.",
    "Línea 5: Ideal para mejorar lectura rápida, entrenando los ojos.",
    "Línea 6: Sigue leyendo... no pierdas el ritmo.",
    "Línea 7: Aquí va más contenido para mantener la línea llena.",
    "Línea 8: El punto va al inicio y final de cada línea de manera sincronizada.",
    "Línea 9: Así se puede mejorar velocidad de lectura con entrenamiento visual.",
    "Línea 10: Fin del ejemplo, puedes agregar más líneas si lo deseas.",
  ];

  const totalSteps = texto.length * 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % totalSteps);
    }, VELOCIDAD_MS);
    return () => clearInterval(interval);
  }, [totalSteps, VELOCIDAD_MS]);

  lineRefs.current = texto.map(
    (_, i) => lineRefs.current[i] || React.createRef()
  );

  const lineaActual = Math.floor(stepIndex / 2);
  const alInicio = stepIndex % 2 === 0;

  let puntoPos = { top: 0, left: 0 };
  const currentRef = lineRefs.current[lineaActual];
  if (currentRef?.current) {
    const rect = currentRef.current.getBoundingClientRect();
    const containerRect =
      currentRef.current.parentElement.getBoundingClientRect();

    puntoPos.top = rect.top - containerRect.top + rect.height / 2 - 5;
    puntoPos.left = alInicio ? 0 : rect.width - 10;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        padding: "20px",
        border: "1px solid #ccc",
        fontFamily: "monospace",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Punto guía */}
      <div
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          backgroundColor: "red",
          borderRadius: "50%",
          top: puntoPos.top,
          left: puntoPos.left,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Texto distribuido */}
      {texto.map((linea, i) => (
        <div
          key={i}
          ref={lineRefs.current[i]}
          style={{
            display: "flex",
            width: "100%",
            height: "24px",
            lineHeight: "24px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "justify",
              paddingRight: "10px",
              fontSize: "16px",
            }}
          >
            {linea}
          </div>
        </div>
      ))}
    </div>
  );
}
