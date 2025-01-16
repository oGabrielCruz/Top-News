import { useState, useEffect } from "react";

function Home() {
  const [countdown, setCountdown] = useState(10); // Contagem regressiva começando de 10 segundos
  const [isVisible, setIsVisible] = useState(true); // Controle de visibilidade para o efeito de piscar

  useEffect(() => {
    // Contagem regressiva
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval); // Limpa o intervalo quando a contagem regressiva chega a 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Efeito de tela piscando
    const blinkInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // A cada 500ms (meio segundo), o texto pisca

    // Limpeza dos intervalos ao desmontar o componente
    return () => {
      clearInterval(countdownInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div>
      {isVisible && <h1>Vai explodirr! Contagem regressiva: {countdown}</h1>}
    </div>
  );
}

export default Home;
