import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Save, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Zap,
  Moon,
  Users,
  BarChart3,
  User,
  ArrowLeft
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useProfilePicture } from '../../hooks/useProfilePicture';

interface MobileGameInterfaceProps {
  onBack: () => void;
}

interface GameState {
  day: number;
  currentRoom: number;
  isPlaying: boolean;
  gameSpeed: number;
  score: number;
  factors: {
    health: number;
    energy: number;
    sleep: number;
    social: number;
    productivity: number;
  };
}

const MobileGameInterface: React.FC<MobileGameInterfaceProps> = ({ onBack }) => {
  const { isDark } = useTheme();
  const { profilePicture, hasProfilePicture } = useProfilePicture();
  
  const [gameState, setGameState] = useState<GameState>({
    day: 1,
    currentRoom: 0,
    isPlaying: false,
    gameSpeed: 1,
    score: 1250,
    factors: {
      health: 75,
      energy: 60,
      sleep: 45,
      social: 80,
      productivity: 55
    }
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const rooms = [
    { 
      name: 'Sala', 
      background: 'from-green-500/30 to-emerald-600/30',
      emoji: '🛋️',
      description: 'Relaxe e assista TV'
    },
    { 
      name: 'Academia', 
      background: 'from-gray-500/30 to-slate-600/30',
      emoji: '🏋️‍♂️',
      description: 'Exercite-se e ganhe energia'
    },
    { 
      name: 'Quarto', 
      background: 'from-purple-500/30 to-indigo-600/30',
      emoji: '🛏️',
      description: 'Durma e recupere o sono'
    },
    { 
      name: 'Banheiro', 
      background: 'from-blue-500/30 to-cyan-600/30',
      emoji: '🚿',
      description: 'Cuide da higiene pessoal'
    },
    { 
      name: 'Cozinha', 
      background: 'from-orange-500/30 to-red-600/30',
      emoji: '🍳',
      description: 'Prepare refeições saudáveis'
    }
  ];

  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const factors = [
    { key: 'health', name: 'Saúde', icon: Heart, color: 'bg-red-500' },
    { key: 'energy', name: 'Energia', icon: Zap, color: 'bg-yellow-500' },
    { key: 'sleep', name: 'Sono', icon: Moon, color: 'bg-indigo-500' },
    { key: 'social', name: 'Social', icon: Users, color: 'bg-pink-500' },
    { key: 'productivity', name: 'Produtividade', icon: BarChart3, color: 'bg-emerald-500' }
  ];

  const handleRoomChange = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setGameState(prev => ({
      ...prev,
      currentRoom: direction === 'next' 
        ? (prev.currentRoom + 1) % rooms.length
        : (prev.currentRoom - 1 + rooms.length) % rooms.length
    }));

    setTimeout(() => setIsTransitioning(false), 300);
  };

  const togglePlay = () => {
    setGameState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const saveGame = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
    // Implementar lógica de salvamento aqui
  };

  const resetGame = () => {
    setGameState({
      day: 1,
      currentRoom: 0,
      isPlaying: false,
      gameSpeed: 1,
      score: 0,
      factors: {
        health: 50,
        energy: 50,
        sleep: 50,
        social: 50,
        productivity: 50
      }
    });
  };

  const setGameSpeed = (speed: number) => {
    setGameState(prev => ({ ...prev, gameSpeed: speed }));
  };

  const currentRoom = rooms[gameState.currentRoom];

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-white via-emerald-50/80 to-emerald-100/60'
    }`}>
      
      {/* SEÇÃO SUPERIOR - 15% da altura */}
      <header className={`h-[15vh] px-4 py-2 border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-slate-900/95 border-slate-800' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="h-full flex items-center justify-between">
          
          {/* Lado Esquerdo - Controles do Jogo */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDark 
                  ? 'hover:bg-slate-800 text-white' 
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlay}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                gameState.isPlaying
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {gameState.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            <button
              onClick={saveGame}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDark 
                  ? 'hover:bg-slate-800 text-emerald-400' 
                  : 'hover:bg-gray-100 text-emerald-600'
              }`}
            >
              <Save className="w-4 h-4" />
            </button>
            
            <button
              onClick={resetGame}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDark 
                  ? 'hover:bg-slate-800 text-orange-400' 
                  : 'hover:bg-gray-100 text-orange-600'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Centro - Perfil do Alex */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-500/30">
              {hasProfilePicture ? (
                <img
                  src={profilePicture!}
                  alt="Alex"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-emerald-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="text-center">
              <div className={`text-sm font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Alex
              </div>
              <div className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
                {weekDays[(gameState.day - 1) % 7]}
              </div>
            </div>
          </div>

          {/* Lado Direito - Velocidade e Pontuação */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              {[1, 2, 4].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setGameSpeed(speed)}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all duration-200 ${
                    gameState.gameSpeed === speed
                      ? 'bg-emerald-500 text-white'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
            <div className={`text-xs font-bold transition-colors duration-300 ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {gameState.score.toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      {/* SEÇÃO DO MEIO - 65% da altura */}
      <main className="h-[65vh] relative overflow-hidden">
        
        {/* Cenário do Cômodo */}
        <div className={`h-full relative transition-all duration-300 ${
          isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        }`}>
          <div className={`h-full bg-gradient-to-br ${currentRoom.background} flex flex-col items-center justify-center relative ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            
            {/* Emoji do Cômodo */}
            <div className="text-8xl mb-4 animate-pulse">
              {currentRoom.emoji}
            </div>
            
            {/* Nome do Cômodo */}
            <h2 className="text-2xl font-bold mb-2">
              {currentRoom.name}
            </h2>
            
            {/* Descrição */}
            <p className={`text-sm text-center px-4 transition-colors duration-300 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {currentRoom.description}
            </p>

            {/* Indicador de Cômodo */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {rooms.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === gameState.currentRoom
                      ? 'bg-emerald-500 w-6'
                      : isDark
                        ? 'bg-slate-600'
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Setas de Navegação */}
        <button
          onClick={() => handleRoomChange('prev')}
          disabled={isTransitioning}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
            isDark 
              ? 'bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700' 
              : 'bg-white/90 hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-lg'
          } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => handleRoomChange('next')}
          disabled={isTransitioning}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
            isDark 
              ? 'bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700' 
              : 'bg-white/90 hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-lg'
          } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </main>

      {/* SEÇÃO INFERIOR - 20% da altura */}
      <footer className={`h-[20vh] px-4 py-3 border-t transition-colors duration-300 ${
        isDark 
          ? 'bg-slate-900/95 border-slate-800' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="h-full flex flex-col justify-center">
          <h3 className={`text-sm font-bold mb-3 text-center transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Status de Alex
          </h3>
          
          <div className="space-y-2">
            {factors.map((factor) => {
              const value = gameState.factors[factor.key as keyof typeof gameState.factors];
              const IconComponent = factor.icon;
              
              return (
                <div key={factor.key} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-slate-800' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      value >= 70 ? 'text-green-500' :
                      value >= 40 ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {factor.name}
                      </span>
                      <span className={`text-xs font-bold transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {value}%
                      </span>
                    </div>
                    
                    <div className={`h-2 rounded-full transition-colors duration-300 ${
                      isDark ? 'bg-slate-800' : 'bg-gray-200'
                    }`}>
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          value >= 70 ? 'bg-green-500' :
                          value >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </footer>

      {/* Mensagem de Save */}
      {showSaveMessage && (
        <div className="fixed top-20 right-4 z-50">
          <div className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
            isDark ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
          }`}>
            <div className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Jogo salvo!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileGameInterface;