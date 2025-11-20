
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Garden } from './components/Garden';
import { Logo } from './components/Logo';
import { InfoTooltip } from './components/InfoTooltip';
import { 
  UserData, 
  MoodType, 
  NavigationTab, 
  MoodEntry, 
  AchievementEntry,
  Practice,
  NotificationSettings,
  Article,
  SubscriptionLevel
} from './types';
import { 
  APP_NAME, 
  MOOD_OPTIONS, 
  STATIC_PRACTICES,
  ARTICLES,
  SUBSCRIPTION_TIERS
} from './constants';
import { 
  saveUser, 
  getUser, 
  saveMoodEntry, 
  getMoodHistory,
  saveAchievement,
  getAchievements, 
  completePractice 
} from './services/storageService';
import { getDailyWisdom } from './services/geminiService';
import { 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Calendar,
  X,
  Sparkles,
  BookOpen,
  Flower,
  Smile,
  ExternalLink,
  Bell,
  Clock,
  ToggleRight,
  ToggleLeft,
  Droplets,
  Sprout,
  Trophy,
  Star,
  Plus,
  Sun, 
  Moon, 
  Wind, 
  Anchor, 
  Heart, 
  Zap,
  Lock,
  FileText
} from 'lucide-react';

// --- Views ---

const Onboarding: React.FC<{ onComplete: (name: string, mood: MoodType) => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="min-h-screen overflow-hidden bg-stone-50 relative">
       {/* Animated Background Blobs for Onboarding */}
       <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[50%] bg-rose-100/40 rounded-full blur-3xl animate-float pointer-events-none"></div>
       <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[50%] bg-amber-100/40 rounded-full blur-3xl animate-float-delayed pointer-events-none"></div>

      {step === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-slide-up z-10">
          <div className="relative mb-12 group cursor-pointer" onClick={nextStep}>
             <div className="absolute inset-0 bg-rose-100 rounded-full blur-2xl opacity-60 animate-breathe"></div>
             <div className="w-56 h-56 rounded-full overflow-hidden border-[8px] border-white shadow-[0_20px_50px_rgba(244,63,94,0.15)] relative z-10 bg-white flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                <div className="w-full h-full p-4">
                  <Logo className="w-full h-full" />
                </div>
             </div>
          </div>
          
          <h1 className="text-4xl font-serif text-stone-800 mb-4 tracking-wide animate-slide-up delay-100">{APP_NAME}</h1>
          <p className="text-stone-500 mb-12 leading-relaxed max-w-xs font-light animate-slide-up delay-200 text-lg">
            Пространство внутренней поддержки,<br/>спокойствия и расцвета.
          </p>
          <div className="animate-slide-up delay-300 w-full max-w-xs">
            <Button onClick={nextStep} fullWidth className="py-4 text-lg shadow-rose-200/50">
              Войти
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="absolute inset-0 flex flex-col justify-center p-8 animate-slide-up z-10">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-serif text-stone-800 mb-3">Давай знакомиться</h2>
            <p className="text-stone-500 mb-10 text-lg">Как к тебе обращаться?</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Твоё имя"
              className="w-full p-5 bg-white border border-stone-200 rounded-2xl text-xl shadow-sm focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all mb-10 placeholder:text-stone-300"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && name.trim() && nextStep()}
            />
            <Button 
              onClick={nextStep} 
              disabled={!name.trim()} 
              fullWidth
              className="py-4 text-lg"
            >
              Продолжить
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="absolute inset-0 flex flex-col justify-center p-6 animate-slide-up z-10">
          <div className="max-w-md mx-auto w-full h-full flex flex-col justify-center">
            <h2 className="text-3xl font-serif text-stone-800 mb-2">Добро пожаловать,<br/><span className="text-[#D4A373]">{name}</span></h2>
            <p className="text-stone-500 mb-6 text-lg">Как ты себя сейчас чувствуешь?</p>
            
            <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[60vh] pr-1 pb-4 no-scrollbar">
              {MOOD_OPTIONS.map((mood, idx) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.type;
                // If something is selected, others are dimmed
                const isOtherSelected = selectedMood !== null && !isSelected;

                return (
                  <button
                    key={mood.type}
                    onClick={() => {
                        setSelectedMood(mood.type);
                        // Short delay to visualize selection before moving on
                        setTimeout(() => onComplete(name, mood.type), 600);
                    }}
                    className={`
                        relative flex flex-col items-center justify-center gap-2 p-4 rounded-[2rem] border transition-all duration-500 ease-out group aspect-[4/3]
                        ${isSelected 
                            ? `${mood.bgColor} ${mood.borderColor} ring-2 ring-offset-2 ${mood.selectColor} shadow-xl scale-[1.02] z-10` 
                            : `bg-white border-stone-100 hover:border-stone-200 hover:shadow-md hover:-translate-y-1 ${isOtherSelected ? 'opacity-40 scale-95 grayscale-[0.5]' : 'scale-100'}`
                        }
                        animate-slide-up
                    `}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm animate-pop text-stone-800">
                            <CheckCircle size={14} strokeWidth={3} className={mood.color} />
                        </div>
                    )}

                    <div className={`
                        p-3 rounded-full transition-all duration-500 mb-1
                        ${isSelected ? 'bg-white shadow-sm scale-110' : `bg-stone-50 ${mood.color} group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm`}
                    `}>
                      <Icon size={28} strokeWidth={isSelected ? 2.5 : 2} className={`transition-transform duration-500 ${isSelected ? 'animate-breathe' : ''}`} />
                    </div>
                    <div>
                      <div className={`font-bold text-sm leading-tight transition-colors ${isSelected ? 'text-stone-800' : 'text-stone-700'}`}>{mood.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomeView: React.FC<{ 
  user: UserData, 
  onMoodCheck: () => void,
  onPracticeStart: (p: Practice) => void,
  onOpenNotifications: () => void,
  dailyWisdom: string | null
}> = ({ user, onMoodCheck, onPracticeStart, onOpenNotifications, dailyWisdom }) => {
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Доброе утро' : hour < 18 ? 'Добрый день' : 'Добрый вечер';

  // Check if any notification is enabled to show indicator
  const hasNotifications = user.notifications.morningEnabled || user.notifications.eveningEnabled || user.notifications.weeklyEnabled;

  return (
    <div className="px-6 py-8 animate-slide-up">
      <header className="mb-8 flex items-start justify-between">
        <div>
            <div className="text-stone-400 text-xs uppercase tracking-widest mb-2 font-semibold">{today}</div>
            <h1 className="text-3xl font-serif text-stone-800 leading-tight tracking-tight">
              {greeting},<br/>
              <span className="text-stone-600">{user.name}</span>
            </h1>
        </div>
        
        <button 
            onClick={onOpenNotifications}
            className="w-12 h-12 rounded-full border border-stone-100 shadow-sm overflow-hidden bg-white shrink-0 animate-fade-in flex items-center justify-center text-stone-400 hover:text-[#D4A373] hover:shadow-md transition-all active:scale-95 group relative"
        >
             <Bell size={24} className={hasNotifications ? "fill-[#D4A373] text-[#D4A373]" : ""} />
             {hasNotifications && (
                 <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
             )}
        </button>
      </header>
      
      {dailyWisdom && (
        <div className="mb-8 p-5 bg-gradient-to-br from-rose-50/80 to-amber-50/80 rounded-2xl border border-rose-100/50 shadow-[0_2px_20px_rgba(244,63,94,0.05)] animate-scale-in origin-top">
            <div className="flex gap-4">
              <div className="text-rose-300 mt-0.5 p-1.5 bg-white rounded-full shadow-sm h-fit"><Sparkles size={16}/></div>
              <p className="text-[15px] text-stone-600 italic leading-relaxed font-serif">"{dailyWisdom}"</p>
            </div>
        </div>
      )}

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-stone-700 ml-1">Мой день</h2>
        
        {/* Morning Ritual */}
        <div onClick={() => onPracticeStart(STATIC_PRACTICES[0])} className="cursor-pointer relative group overflow-hidden rounded-[2rem] bg-white shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-orange-400 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 origin-top-right">
                <Play size={80} />
            </div>
            <div className="relative z-10">
                <div className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] uppercase tracking-wider font-bold mb-3 border border-orange-100">Утро</div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-[#D4A373] transition-colors">Утренний ритуал</h3>
                <p className="text-stone-500 text-sm mb-5 leading-relaxed">Короткий настрой, дыхание,<br/>фокус на день.</p>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-[#D4A373] group-hover:text-white transition-all">
                    <Play size={12} fill="currentColor" className="ml-0.5"/>
                  </span>
                  <span className="text-xs font-medium text-stone-400">2 мин</span>
                </div>
            </div>
        </div>

        {/* Mood Checkin */}
        <div onClick={onMoodCheck} className="cursor-pointer rounded-[2rem] bg-[#F2F0E9] border border-[#E6E2D6] p-6 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:bg-[#EDEADF] active:scale-[0.98] relative overflow-hidden group">
            <div className="absolute right-[-10px] top-[-10px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 text-stone-500">
                <Smile size={100} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-medium text-stone-800">Чек-ин эмоций</h3>
                  <InfoTooltip 
                    title="Зачем отмечать эмоции?" 
                    text="Регулярный чек-ин помогает заметить, как меняется ваше состояние, и понять, какие события наполняют вас ресурсом, а какие — забирают силы." 
                  />
                </div>
                <p className="text-stone-500 text-xs">Отметь своё состояние</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-stone-400 transition-transform group-hover:translate-x-1 relative z-10">
                <ChevronRight size={20} />
            </div>
        </div>

        {/* Evening Practice */}
        <div onClick={() => onPracticeStart(STATIC_PRACTICES[3])} className="cursor-pointer relative group overflow-hidden rounded-[2rem] bg-[#2C3E50] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="absolute bottom-0 right-0 p-8 opacity-10 text-white group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 origin-bottom-right">
                <Play size={80} />
            </div>
             <div className="relative z-10">
                <div className="inline-flex items-center px-3 py-1 bg-white/10 text-white/90 rounded-full text-[10px] uppercase tracking-wider font-bold mb-3 backdrop-blur-sm">Вечер</div>
                <h3 className="text-xl font-serif mb-2 text-white">Вечерняя практика</h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">Мягкая практика расслабления<br/>и подведения итогов.</p>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#2C3E50] transition-all">
                    <Play size={12} fill="currentColor" className="ml-0.5"/>
                  </span>
                  <span className="text-xs font-medium text-white/40">5 мин</span>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

const NotificationModal: React.FC<{ 
    settings: NotificationSettings, 
    onSave: (settings: NotificationSettings) => void,
    onClose: () => void 
}> = ({ settings, onSave, onClose }) => {
    const [localSettings, setLocalSettings] = useState<NotificationSettings>(settings);

    const requestPermission = async () => {
        if (!("Notification" in window)) {
            alert("Этот браузер не поддерживает уведомления");
            return false;
        }
        if (Notification.permission === "granted") return true;
        if (Notification.permission !== "denied") {
            const permission = await Notification.requestPermission();
            return permission === "granted";
        }
        return false;
    };

    const handleToggle = async (key: keyof NotificationSettings) => {
        const newValue = !localSettings[key];
        
        // If turning ON, request permission
        if (newValue === true) {
            const granted = await requestPermission();
            if (!granted) {
                // Fallback: still allow visual toggle in UI for demo purposes
            }
        }

        setLocalSettings(prev => ({ ...prev, [key]: newValue }));
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSettings(prev => ({ ...prev, wakeUpTime: e.target.value }));
    };

    const handleSave = () => {
        onSave(localSettings);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] bg-stone-900/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
             <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] p-6 pb-8 animate-slide-up shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-serif text-stone-800">Напоминания</h3>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-400"><X size={24} /></button>
                </div>

                {/* "Watering" Metaphor Banner */}
                <div className="mb-8 bg-blue-50/80 rounded-2xl p-5 flex items-start gap-4 border border-blue-100">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 text-blue-400 shadow-sm">
                        <Droplets size={20} fill="currentColor" className="opacity-50" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-stone-700 mb-1">Регулярность — это полив</h4>
                        <p className="text-xs text-stone-500 leading-relaxed mb-2">
                            Уведомления помогают не забывать поливать свой внутренний сад.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-blue-500">
                            <Sprout size={12} />
                            <span>Завершённый месяц = цветущая клумба</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    {/* Morning */}
                    <div className="p-5 rounded-2xl border border-stone-100 bg-stone-50/50 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                                    <Sun size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-stone-800">Утренний ритуал</h4>
                                    <p className="text-xs text-stone-500">За час до пробуждения</p>
                                </div>
                            </div>
                            <button onClick={() => handleToggle('morningEnabled')} className={`transition-colors ${localSettings.morningEnabled ? 'text-[#D4A373]' : 'text-stone-300'}`}>
                                {localSettings.morningEnabled ? <ToggleRight size={40} fill="currentColor" className="opacity-100" /> : <ToggleLeft size={40} />}
                            </button>
                        </div>
                        
                        {localSettings.morningEnabled && (
                            <div className="mt-2 pt-3 border-t border-stone-200/50 flex items-center justify-between animate-slide-up">
                                <span className="text-sm text-stone-600">Я просыпаюсь в:</span>
                                <div className="relative">
                                    <input 
                                        type="time" 
                                        value={localSettings.wakeUpTime}
                                        onChange={handleTimeChange}
                                        className="p-2 bg-white border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-[#D4A373]"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Evening */}
                    <div className="p-5 rounded-2xl border border-stone-100 bg-stone-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#2C3E50]/10 text-[#2C3E50] flex items-center justify-center">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-800">Вечерняя практика</h4>
                                <p className="text-xs text-stone-500">Ежедневно в 21:00</p>
                            </div>
                        </div>
                        <button onClick={() => handleToggle('eveningEnabled')} className={`transition-colors ${localSettings.eveningEnabled ? 'text-[#D4A373]' : 'text-stone-300'}`}>
                            {localSettings.eveningEnabled ? <ToggleRight size={40} fill="currentColor" /> : <ToggleLeft size={40} />}
                        </button>
                    </div>

                    {/* Weekly */}
                    <div className="p-5 rounded-2xl border border-stone-100 bg-stone-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-800">Итоги недели</h4>
                                <p className="text-xs text-stone-500">Еженедельная рефлексия</p>
                            </div>
                        </div>
                        <button onClick={() => handleToggle('weeklyEnabled')} className={`transition-colors ${localSettings.weeklyEnabled ? 'text-[#D4A373]' : 'text-stone-300'}`}>
                            {localSettings.weeklyEnabled ? <ToggleRight size={40} fill="currentColor" /> : <ToggleLeft size={40} />}
                        </button>
                    </div>
                </div>

                <Button 
                    fullWidth 
                    onClick={handleSave} 
                    className="py-4 text-lg shadow-lg shadow-stone-100"
                >
                    Сохранить настройки
                </Button>
             </div>
        </div>
    );
};

const PracticesView: React.FC<{ onOpenPractice: (p: Practice) => void }> = ({ onOpenPractice }) => {
  
  const categories = [
    { id: 'breathing', label: 'Дыхание', icon: Wind, color: 'bg-blue-50 text-blue-500' },
    { id: 'yoga', label: 'Йога', icon: Anchor, color: 'bg-green-50 text-green-600' }, // Anchor as placeholder for Yoga
    { id: 'meditation', label: 'Медитации', icon: Heart, color: 'bg-rose-50 text-rose-500' },
    { id: 'sos', label: 'SOS', icon: Zap, color: 'bg-amber-50 text-amber-500' },
    { id: 'all', label: 'Все', icon: Sparkles, color: 'bg-stone-100 text-stone-500' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPractices = selectedCategory === 'all' 
    ? STATIC_PRACTICES 
    : STATIC_PRACTICES.filter(p => p.category === selectedCategory || (selectedCategory === 'meditation' && p.category === 'calm'));

  return (
    <div className="px-6 py-8 animate-slide-up">
       <h2 className="text-2xl font-serif text-stone-800 mb-6 ml-1">Библиотека практик</h2>
       
       {/* Categories */}
       <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-4">
         {categories.map(cat => {
           const Icon = cat.icon;
           const isSelected = selectedCategory === cat.id;
           return (
             <button
               key={cat.id}
               onClick={() => setSelectedCategory(cat.id)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                 isSelected 
                 ? 'bg-[#D4A373] text-white shadow-md' 
                 : 'bg-white border border-stone-100 text-stone-500 hover:bg-stone-50'
               }`}
             >
               <Icon size={14} />
               {cat.label}
             </button>
           )
         })}
       </div>

       <div className="space-y-4">
         {filteredPractices.map((practice, i) => (
           <div 
             key={practice.id}
             onClick={() => !practice.isLocked && onOpenPractice(practice)}
             className={`p-5 rounded-2xl border transition-all duration-300 group animate-slide-up ${
               practice.isLocked 
               ? 'bg-stone-50 border-stone-100 opacity-80' 
               : 'bg-white border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
             }`}
             style={{ animationDelay: `${i * 50}ms` }}
           >
             <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md transition-colors bg-stone-100 text-stone-500`}>
                    {practice.category === 'calm' ? 'meditation' : practice.category}
                </span>
             </div>
             <h3 className="font-medium text-lg text-stone-800 mb-1 group-hover:text-[#D4A373] transition-colors">{practice.title}</h3>
             <p className="text-stone-500 text-sm mb-4 leading-snug">{practice.description}</p>
             <div className="flex items-center justify-between border-t border-stone-50 pt-3">
                 <div className="text-xs text-stone-400 font-medium flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                     {practice.duration}
                 </div>
                 {!practice.isLocked && <div className="text-[#D4A373] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300"><Play size={16} fill="currentColor"/></div>}
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};

const GardenView: React.FC<{ user: UserData }> = ({ user }) => {
    return (
        <div className="px-6 py-8 animate-slide-up flex flex-col h-full">
            <header className="mb-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-2xl font-serif text-stone-800">Твой цветущий сад</h2>
                  <InfoTooltip 
                    title="Как растет сад?" 
                    text="Сад — это визуализация вашей заботы о себе. Каждая завершённая практика распускается новым цветком. Чем чаще вы уделяете время себе, тем прекраснее становится ваш сад." 
                  />
                </div>
                <p className="text-stone-500 text-sm max-w-xs mx-auto">
                    Каждая практика — это цветок. Регулярность создает красоту.
                </p>
            </header>
            
            <Garden flowerCount={user.flowers} />
            
            <div className="mt-8 grid grid-cols-2 gap-4 animate-slide-up delay-200">
                {/* Total Practices Widget */}
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50/20 p-5 rounded-3xl shadow-[0_8px_30px_rgba(212,163,115,0.1)] text-center border border-amber-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
                    <div className="absolute -right-8 -bottom-8 text-amber-200 opacity-20 group-hover:opacity-30 transition-opacity duration-500 rotate-12">
                       <Flower size={110} strokeWidth={1} />
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[100px]">
                        <div className="text-5xl font-serif text-[#D4A373] mb-1 tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform duration-500">{user.flowers}</div>
                        <div className="text-[10px] text-amber-800/50 uppercase tracking-widest font-bold bg-amber-50/80 px-3 py-1 rounded-full backdrop-blur-sm">Всего практик</div>
                    </div>
                </div>

                {/* Streak Widget */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50/20 p-5 rounded-3xl shadow-[0_8px_30px_rgba(74,222,128,0.1)] text-center border border-green-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
                    <div className="absolute -right-6 -bottom-6 text-green-200 opacity-25 group-hover:opacity-35 transition-opacity duration-500 rotate-[-12deg]">
                       <Sparkles size={110} strokeWidth={1} />
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[100px]">
                        <div className="text-5xl font-serif text-green-600 mb-1 tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform duration-500">{user.streak}</div>
                        <div className="text-[10px] text-green-800/50 uppercase tracking-widest font-bold bg-green-50/80 px-3 py-1 rounded-full backdrop-blur-sm">Дней подряд</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const JournalView: React.FC<{ onOpenMoodModal: () => void, onOpenAchievementModal: () => void }> = ({ onOpenMoodModal, onOpenAchievementModal }) => {
    const [mode, setMode] = useState<'mood' | 'achievements'>('mood');
    const moods = getMoodHistory();
    const achievements = getAchievements();

    return (
        <div className="px-6 py-8 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif text-stone-800 ml-1">Дневник</h2>
                {mode === 'achievements' && (
                    <button 
                        onClick={onOpenAchievementModal} 
                        className="bg-[#D4A373] text-white p-2 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all"
                    >
                        <Plus size={20} />
                    </button>
                )}
            </div>

            {/* Toggle Switch */}
            <div className="bg-stone-100 p-1 rounded-2xl flex mb-8 shadow-inner">
                <button 
                    onClick={() => setMode('mood')} 
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${mode === 'mood' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-400 hover:text-stone-500'}`}
                >
                    Состояния
                </button>
                <button 
                    onClick={() => setMode('achievements')} 
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${mode === 'achievements' ? 'bg-white shadow-sm text-[#D4A373]' : 'text-stone-400 hover:text-stone-500'}`}
                >
                    <span>Хвастушки</span>
                    {mode !== 'achievements' && <Trophy size={12} />}
                </button>
            </div>

            {mode === 'mood' ? (
                <div className="animate-fade-in">
                    {moods.length === 0 ? (
                        <div className="text-center py-20 text-stone-400">
                            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen size={24} className="opacity-50" />
                            </div>
                            <p>Записей пока нет.</p>
                            <Button variant="ghost" className="mt-4" onClick={onOpenMoodModal}>Сделать чек-ин</Button>
                        </div>
                    ) : (
                        <div className="space-y-6 relative pl-6 border-l-2 border-stone-100 ml-2 pb-10">
                            {moods.map((entry, i) => {
                                const moodOption = MOOD_OPTIONS.find(m => m.type === entry.mood);
                                const date = new Date(entry.date);
                                return (
                                    <div key={entry.id} className="relative mb-8 last:mb-0 animate-slide-up group" style={{ animationDelay: `${i * 100}ms` }}>
                                        <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm ${moodOption?.bgColor || 'bg-gray-200'} transition-transform group-hover:scale-125`}></div>
                                        <div className="text-xs text-stone-400 mb-2 font-medium tracking-wide pl-1">
                                            {date.toLocaleDateString('ru-RU')} • {date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${moodOption?.bgColor} ${moodOption?.color} border ${moodOption?.borderColor}`}>
                                                    {moodOption?.label}
                                                </span>
                                            </div>
                                            {entry.note && <p className="text-stone-600 text-sm italic leading-relaxed">"{entry.note}"</p>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <div className="animate-fade-in">
                    {achievements.length === 0 ? (
                        <div className="text-center py-20 text-stone-400">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373]">
                                <Trophy size={24} className="opacity-50" />
                            </div>
                            <p>Здесь пока пусто.</p>
                            <p className="text-sm mt-2 opacity-70 max-w-[200px] mx-auto">Ты точно сделала что-то хорошее сегодня. Похвали себя!</p>
                            <Button variant="primary" className="mt-6" onClick={onOpenAchievementModal}>Добавить хвастушку</Button>
                        </div>
                    ) : (
                         <div className="grid grid-cols-1 gap-4">
                            {achievements.map((entry, i) => (
                                <div 
                                    key={entry.id} 
                                    className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-2xl border border-amber-100 shadow-sm animate-slide-up relative overflow-hidden group"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-400">
                                        <Star size={60} fill="currentColor" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-3 relative z-10">
                                        <div className="bg-white p-1.5 rounded-full shadow-sm text-amber-400">
                                            <Trophy size={14} />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600/60">
                                            {new Date(entry.date).toLocaleDateString('ru-RU')}
                                        </span>
                                    </div>
                                    <p className="text-stone-700 font-medium leading-relaxed relative z-10">{entry.text}</p>
                                </div>
                            ))}
                         </div>
                    )}
                </div>
            )}
        </div>
    );
};

const AchievementModal: React.FC<{ onClose: () => void, onSave: (text: string) => void }> = ({ onClose, onSave }) => {
    const [text, setText] = useState('');

    return (
        <div className="fixed inset-0 z-[60] bg-stone-900/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] p-6 pb-8 animate-slide-up shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-[#D4A373]">
                            <Star size={20} fill="currentColor" />
                        </div>
                        <h3 className="text-xl font-serif text-stone-800">Моя хвастушка</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X size={24} className="text-stone-400" /></button>
                </div>
                
                <p className="text-stone-500 text-sm mb-4">
                    Даже самая маленькая победа достойна внимания. Запиши, за что ты благодарна себе сегодня.
                </p>

                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Я сегодня молодец, потому что..."
                    className="w-full p-4 bg-stone-50 rounded-2xl text-base mb-6 focus:outline-none resize-none h-32 border border-transparent focus:border-[#D4A373] focus:bg-white focus:ring-4 focus:ring-amber-50 transition-all placeholder:text-stone-400"
                    autoFocus
                />

                <Button 
                    fullWidth 
                    onClick={() => text.trim() && onSave(text)} 
                    disabled={!text.trim()} 
                    className="py-4 shadow-lg shadow-amber-100 text-lg"
                >
                    Записать в дневник
                </Button>
            </div>
        </div>
    );
}


// Updated Library View - Telegram Link + Content List
const LibraryView: React.FC<{ user: UserData, onArticleClick: (article: Article) => void }> = ({ user, onArticleClick }) => {
    const telegramLink = "https://t.me/+gRNX04COeHsxMWUy";

    // Helper to check lock status
    const isLocked = (requiredTier: SubscriptionLevel, userTier: SubscriptionLevel) => {
        const levels = { 'free': 0, 'basic': 1, 'extended': 2, 'premium': 3 };
        return levels[userTier] < levels[requiredTier];
    };

    return (
        <div className="px-6 py-8 animate-slide-up h-full flex flex-col">
            <h2 className="text-2xl font-serif text-stone-800 mb-6 ml-1">Знания</h2>
            
            {/* Telegram Channel Banner - Made the whole card a link for better clickability */}
            <a 
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-[#0088cc] to-[#32a6e6] rounded-2xl p-6 text-white shadow-lg shadow-blue-200/50 mb-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]"
            >
                <div className="absolute top-0 right-0 p-6 opacity-10 transform rotate-12 scale-150 pointer-events-none">
                    <ExternalLink size={100} fill="currentColor"/>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold font-serif tracking-wide">Сообщество</h3>
                        <ExternalLink size={18} className="opacity-80"/>
                    </div>
                    <p className="text-white/95 text-sm mb-6 max-w-[90%] leading-relaxed font-medium">
                        Присоединяйся к нашему закрытому телеграм-каналу. Здесь мы общаемся, поддерживаем друг друга и делимся полезными материалами.
                    </p>
                    <div 
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#0088cc] rounded-full font-bold text-sm shadow-sm group-hover:bg-blue-50 transition-colors"
                    >
                        Перейти в канал
                    </div>
                </div>
            </a>

            {/* Materials List */}
            <h3 className="text-lg font-serif text-stone-700 mb-4 ml-1">Материалы</h3>
            <div className="space-y-3 pb-10">
                {ARTICLES.map((article, i) => {
                    const locked = isLocked(article.requiredTier, user.subscriptionLevel);
                    return (
                        <div 
                            key={article.id}
                            onClick={() => onArticleClick(article)}
                            className={`
                                relative p-5 rounded-2xl border transition-all duration-300 group cursor-pointer animate-slide-up
                                ${locked 
                                    ? 'bg-stone-50 border-stone-100 opacity-90' 
                                    : 'bg-white border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                                }
                            `}
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md transition-colors bg-stone-100 text-stone-500`}>
                                    {article.category}
                                </span>
                                {locked && <Lock size={16} className="text-stone-400" />}
                            </div>
                            <h4 className="font-medium text-base text-stone-800 mb-1 group-hover:text-[#D4A373] transition-colors line-clamp-2">
                                {article.title}
                            </h4>
                            <div className="flex items-center gap-1 mt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                                <span className="text-xs text-stone-400">
                                    {locked ? `Доступно на тарифе ${SUBSCRIPTION_TIERS.find(t => t.id === article.requiredTier)?.name || 'выше'}` : 'Читать'}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const ArticleModal: React.FC<{ article: Article, onClose: () => void }> = ({ article, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] bg-stone-900/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
             <div className="bg-white w-full max-w-2xl rounded-t-[2rem] sm:rounded-[2.5rem] p-6 pb-8 animate-slide-up shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar relative">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full text-stone-400 transition-colors"><X size={24} /></button>
                
                <div className="mt-2">
                    <span className="inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-500 mb-4">
                        {article.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 mb-6 leading-tight">
                        {article.title}
                    </h2>
                    
                    <div className="prose prose-stone prose-lg max-w-none text-stone-600 leading-relaxed whitespace-pre-wrap">
                        {article.content}
                    </div>

                    <div className="mt-12 pt-6 border-t border-stone-100 flex justify-center">
                        <Button variant="secondary" onClick={onClose}>Закрыть</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SubscriptionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheck = () => {
        setIsLoading(true);
        // Simulate API check
        setTimeout(() => {
            setIsLoading(false);
            alert("Подписка пока не обнаружена. Убедитесь, что оплатили тариф в боте.");
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[60] bg-stone-900/40 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-[2.5rem] p-6 pb-8 animate-slide-up shadow-2xl max-h-[95vh] overflow-y-auto no-scrollbar">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-serif text-stone-800">Доступ к знаниям</h3>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-400"><X size={24} /></button>
                </div>

                <p className="text-stone-500 mb-8 leading-relaxed">
                    Этот материал доступен по подписке. Выберите подходящий тариф, чтобы открыть доступ к библиотеке знаний, вебинарам и встречам.
                </p>

                <div className="space-y-4 mb-8">
                    {SUBSCRIPTION_TIERS.map((tier) => (
                        <div key={tier.id} className={`p-5 rounded-2xl border transition-all ${tier.id === 'premium' ? 'bg-gradient-to-r from-stone-800 to-stone-900 text-white border-transparent shadow-lg' : 'bg-white border-stone-200 text-stone-800'}`}>
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-lg font-bold">{tier.name}</h4>
                                <span className="text-xl font-serif">{tier.price}</span>
                            </div>
                            <ul className="space-y-2 mb-4">
                                {tier.features.map((feat, i) => (
                                    <li key={i} className="text-sm opacity-80 flex items-center gap-2">
                                        <CheckCircle size={14} /> {feat}
                                    </li>
                                ))}
                            </ul>
                            <Button 
                                fullWidth 
                                variant={tier.id === 'premium' ? 'secondary' : 'primary'}
                                onClick={() => window.open("https://t.me/YOUR_BOT_NAME", "_blank")}
                            >
                                Оформить
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-xs text-stone-400 mb-3">Уже оплатили в боте?</p>
                    <Button variant="ghost" onClick={handleCheck} disabled={isLoading}>
                        {isLoading ? "Проверяем..." : "Проверить подписку"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const PracticeModal: React.FC<{ practice: Practice, onClose: () => void, onComplete: () => void }> = ({ practice, onClose, onComplete }) => {
    const [stage, setStage] = useState<'intro' | 'doing' | 'done'>('intro');
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (stage === 'doing') {
            // Fake timer for visual feedback
            const interval = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
            
            const finishTimer = setTimeout(() => setStage('done'), 5000); // 5 seconds for demo
            
            return () => {
                clearInterval(interval);
                clearTimeout(finishTimer);
            };
        }
    }, [stage]);

    return (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col animate-fade-in">
            <div className="p-6 flex justify-end absolute top-0 right-0 z-20 w-full">
                <button onClick={onClose} className="p-2 bg-stone-100 rounded-full text-stone-500 hover:bg-stone-200 transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                {stage === 'intro' && (
                    <div className="animate-slide-up max-w-xs w-full">
                        <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-8 mx-auto text-[#D4A373] shadow-[0_0_30px_rgba(0,0,0,0.05)]">
                            <Play size={40} fill="currentColor" className="ml-1"/>
                        </div>
                        <h2 className="text-3xl font-serif mb-4 text-stone-800">{practice.title}</h2>
                        <p className="text-stone-500 mb-12 leading-relaxed">{practice.description}</p>
                        <Button onClick={() => setStage('doing')} fullWidth className="py-4 text-lg">Начать практику</Button>
                    </div>
                )}

                {stage === 'doing' && (
                    <div className="animate-fade-in flex flex-col items-center">
                        <h2 className="text-2xl font-serif mb-8 text-stone-600 animate-pulse">Вдох... Выдох...</h2>
                        <div className="relative flex items-center justify-center">
                            <div className="w-64 h-64 bg-rose-50/50 rounded-full animate-breathe absolute inset-0 blur-xl"></div>
                            <div className="w-48 h-48 bg-rose-100/80 rounded-full animate-breathe flex items-center justify-center relative z-10 shadow-inner">
                                <div className="w-32 h-32 bg-white/50 rounded-full backdrop-blur-sm"></div>
                            </div>
                        </div>
                        <p className="mt-8 text-stone-400 font-medium tabular-nums">00:0{5 - Math.min(timer, 5)}</p>
                    </div>
                )}

                {stage === 'done' && (
                    <div className="animate-scale-in max-w-xs w-full">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 mx-auto text-green-500 shadow-sm animate-pop">
                            <CheckCircle size={40} strokeWidth={2} />
                        </div>
                        <h2 className="text-3xl font-serif mb-3 text-stone-800">Практика завершена</h2>
                        <p className="text-stone-500 mb-12">Ты сделала важный шаг к себе.</p>
                        <Button onClick={onComplete} fullWidth className="bg-green-600 hover:bg-green-700 shadow-green-200">В Сад</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

const MoodModal: React.FC<{ onClose: () => void, onSave: (mood: MoodType, note: string) => void }> = ({ onClose, onSave }) => {
    const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
    const [note, setNote] = useState('');

    return (
        <div className="fixed inset-0 z-[60] bg-stone-900/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
            <div 
                className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] p-6 pb-8 animate-slide-up shadow-2xl h-[90vh] sm:h-auto flex flex-col transition-all duration-500 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                 <div className="flex justify-between items-center mb-6 px-2 shrink-0">
                    <h3 className="text-2xl font-serif text-stone-800">Как ты сейчас?</h3>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X size={24} className="text-stone-400" /></button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar mb-4 px-1">
                     <div className="grid grid-cols-2 gap-4 pb-2">
                        {MOOD_OPTIONS.map((option, idx) => {
                            const Icon = option.icon;
                            const isSelected = selectedMood === option.type;
                            // If something is selected, others are dimmed
                            const isOtherSelected = selectedMood !== null && !isSelected;
                            
                            return (
                                <button 
                                    key={option.type} 
                                    onClick={() => setSelectedMood(option.type)}
                                    className={`
                                        relative flex flex-col items-center justify-center gap-3 p-4 rounded-[2rem] border transition-all duration-500 ease-out group
                                        ${isSelected 
                                            ? `${option.bgColor} ${option.borderColor} ring-2 ring-offset-2 ${option.selectColor} shadow-xl scale-[1.02] z-10` 
                                            : `bg-white border-stone-100 hover:border-stone-200 hover:shadow-lg hover:-translate-y-1 ${isOtherSelected ? 'opacity-40 scale-95 grayscale-[0.5] hover:opacity-60 hover:scale-95 hover:grayscale-0' : 'scale-100'}`
                                        }
                                        animate-scale-in
                                    `}
                                    style={{ animationDelay: `${idx * 40}ms` }}
                                >
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm animate-pop text-stone-800">
                                            <CheckCircle size={14} strokeWidth={3} className={option.color} />
                                        </div>
                                    )}
                                    
                                    <div className={`
                                        p-4 rounded-full transition-all duration-500
                                        ${isSelected ? 'bg-white shadow-sm scale-110 rotate-[-5deg]' : `bg-stone-50 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm`}
                                        ${option.color}
                                    `}>
                                        <Icon size={32} strokeWidth={isSelected ? 2.5 : 2} className={`transition-transform duration-500 ${isSelected ? 'animate-breathe' : ''}`} />
                                    </div>
                                    
                                    <div className="text-center relative z-10">
                                        <span className={`block font-bold text-base mb-1 transition-colors duration-300 ${isSelected ? 'text-stone-800' : 'text-stone-700'}`}>{option.label}</span>
                                        <span className={`block text-[11px] font-medium leading-tight transition-colors duration-300 ${isSelected ? 'text-stone-600' : 'text-stone-400'}`}>{option.description}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className={`shrink-0 transition-all duration-500 ${selectedMood ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                    <textarea 
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Пара слов о твоем состоянии... (необязательно)"
                        className="w-full p-4 bg-stone-50 rounded-2xl text-sm mb-4 focus:outline-none resize-none h-24 border border-transparent focus:border-rose-200 focus:bg-white focus:ring-4 focus:ring-rose-50 transition-all placeholder:text-stone-400"
                        disabled={!selectedMood}
                    />

                    <Button fullWidth onClick={() => selectedMood && onSave(selectedMood, note)} disabled={!selectedMood} className="py-4 shadow-lg shadow-rose-100 text-lg">
                        Сохранить состояние
                    </Button>
                </div>
            </div>
        </div>
    )
}

// --- Main App Component ---

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [activePractice, setActivePractice] = useState<Practice | null>(null);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [dailyWisdom, setDailyWisdom] = useState<string | null>(null);

  useEffect(() => {
    const loadedUser = getUser();
    if (loadedUser) {
      // Migration checks
      if (!loadedUser.notifications) {
          loadedUser.notifications = {
              wakeUpTime: '07:00',
              morningEnabled: false,
              eveningEnabled: false,
              weeklyEnabled: false
          };
          saveUser(loadedUser);
      }
      if (!loadedUser.subscriptionLevel) {
          loadedUser.subscriptionLevel = 'free';
          saveUser(loadedUser);
      }
      setUser(loadedUser);
    }
  }, []);

  const handleOnboardingComplete = async (name: string, initialMood: MoodType) => {
    const newUser: UserData = {
      name,
      isOnboarded: true,
      subscriptionLevel: 'free',
      flowers: 0,
      streak: 1,
      lastVisit: new Date().toISOString(),
      notifications: {
        wakeUpTime: '07:00',
        morningEnabled: false,
        eveningEnabled: false,
        weeklyEnabled: false
      }
    };
    
    saveUser(newUser);
    
    const entry: MoodEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mood: initialMood,
        note: 'Первый вход в приложение'
    };
    saveMoodEntry(entry);
    
    setUser(newUser);

    // Fetch specific wisdom for the first time
    const wisdom = await getDailyWisdom(initialMood, name);
    setDailyWisdom(wisdom);
  };

  const handlePracticeComplete = () => {
    if (!user) return;
    const updatedUser = completePractice(user);
    setUser(updatedUser);
    setActivePractice(null);
    setActiveTab('garden');
  };

  const handleMoodSave = async (mood: MoodType, note: string) => {
      const entry: MoodEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          mood,
          note
      };
      saveMoodEntry(entry);
      setShowMoodModal(false);
      
      if (user) {
        const wisdom = await getDailyWisdom(mood, user.name);
        setDailyWisdom(wisdom);
      }
  };

  const handleAchievementSave = (text: string) => {
      const entry: AchievementEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          text
      };
      saveAchievement(entry);
      setShowAchievementModal(false);
  };

  const handleNotificationSave = (settings: NotificationSettings) => {
      if (!user) return;
      const updatedUser = { ...user, notifications: settings };
      setUser(updatedUser);
      saveUser(updatedUser);
  };

  const handleArticleClick = (article: Article) => {
      if (!user) return;
      const levels = { 'free': 0, 'basic': 1, 'extended': 2, 'premium': 3 };
      
      if (levels[user.subscriptionLevel] < levels[article.requiredTier]) {
          setShowSubscriptionModal(true);
      } else {
          setSelectedArticle(article);
      }
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && (
        <HomeView 
            user={user} 
            onMoodCheck={() => setShowMoodModal(true)} 
            onPracticeStart={setActivePractice}
            onOpenNotifications={() => setShowNotificationModal(true)}
            dailyWisdom={dailyWisdom}
        />
      )}
      {activeTab === 'practices' && <PracticesView onOpenPractice={setActivePractice} />}
      {activeTab === 'garden' && <GardenView user={user} />}
      {activeTab === 'journal' && <JournalView onOpenMoodModal={() => setShowMoodModal(true)} onOpenAchievementModal={() => setShowAchievementModal(true)} />}
      {activeTab === 'library' && <LibraryView user={user} onArticleClick={handleArticleClick} />}

      {activePractice && (
          <PracticeModal 
            practice={activePractice} 
            onClose={() => setActivePractice(null)} 
            onComplete={handlePracticeComplete} 
          />
      )}

      {showMoodModal && (
          <MoodModal onClose={() => setShowMoodModal(false)} onSave={handleMoodSave} />
      )}

      {showAchievementModal && (
          <AchievementModal onClose={() => setShowAchievementModal(false)} onSave={handleAchievementSave} />
      )}

      {showNotificationModal && (
          <NotificationModal 
            settings={user.notifications} 
            onSave={handleNotificationSave} 
            onClose={() => setShowNotificationModal(false)} 
          />
      )}

      {showSubscriptionModal && (
          <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
      )}

      {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </Layout>
  );
}
