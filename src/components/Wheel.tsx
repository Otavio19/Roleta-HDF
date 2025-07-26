import React, { useEffect, useState, useRef } from 'react';
import { Cliente } from '../utils/api';

interface WheelProps {
  clientes: Cliente[];
  onWinnerSelected: (winner: Cliente) => void;
}

const Wheel: React.FC<WheelProps> = ({ clientes, onWinnerSelected }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wheelData = clientes.slice(0, 15); // Limit to 15

  useEffect(() => {
    if (!canvasRef.current || wheelData.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    const drawWheel = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const anglePerSection = 2 * Math.PI / wheelData.length;

      wheelData.forEach((cliente, index) => {
        const startAngle = index * anglePerSection + rotation * Math.PI / 180;
        const endAngle = (index + 1) * anglePerSection + rotation * Math.PI / 180;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = index % 2 === 0 ? '#9333ea' : '#6366f1';
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + anglePerSection / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px sans-serif';
        ctx.fillText(cliente.nome, radius - 10, 5);
        ctx.restore();
      });

      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
      ctx.fillStyle = '#f9f9f9';
      ctx.fill();
    };

    drawWheel();
  }, [wheelData, rotation]);

  const handleSpin = () => {
    if (isSpinning || wheelData.length === 0) return;

    setIsSpinning(true);

    const startRotation = rotationRef.current;
    const extraSpins = 5;
    const targetRotation = startRotation + 360 * extraSpins + Math.random() * 360;
    const duration = 5000;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentRotation = startRotation + (targetRotation - startRotation) * easeOut(progress);

      rotationRef.current = currentRotation;
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);

        const finalAngle = (currentRotation % 360 + 360) % 360;
        const winnerIndex = Math.floor((wheelData.length - finalAngle / (360 / wheelData.length)) % wheelData.length);
        onWinnerSelected(wheelData[winnerIndex]);
      }
    };

    requestAnimationFrame(animate);
  };

  if (wheelData.length === 0) {
    return (
      <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Nenhum participante cadastrado</h3>
        <p>Adicione participantes na página de cadastro para iniciar o sorteio.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 relative">
        <canvas ref={canvasRef} width={400} height={400} className="rounded-full" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-yellow-400"></div>
        </div>
      </div>
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSpinning ? 'Girando...' : 'Girar Roleta'}
      </button>
      <p className="mt-4 text-sm text-gray-300">
        {wheelData.length} participantes na roleta{' '}
        {wheelData.length < clientes.length ? `(mostrando ${wheelData.length} de ${clientes.length})` : ''}
      </p>
    </div>
  );
};

export default Wheel;
