
import { MoodType, Practice, Article } from './types';
import { 
  Sun, Moon, Wind, Anchor, Heart, 
  CloudRain, Zap, Smile, Coffee, Frown
} from 'lucide-react';

export const APP_NAME = "Я-Ресурс";
export const LOGO_URL = "https://i.imgur.com/8qFk2mN.png"; 

export const MOOD_OPTIONS = [
  {
    type: MoodType.JOY,
    label: "Радость",
    description: "Легкость и свет внутри",
    icon: Smile,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    selectColor: "ring-amber-200"
  },
  {
    type: MoodType.GRATITUDE,
    label: "Благодарность",
    description: "Тепло и принятие",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    selectColor: "ring-rose-200"
  },
  {
    type: MoodType.ENERGY,
    label: "Энергия",
    description: "Сила действовать",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    selectColor: "ring-yellow-200"
  },
  {
    type: MoodType.CALM,
    label: "Спокойствие",
    description: "Баланс и тишина",
    icon: Anchor,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    selectColor: "ring-teal-200"
  },
  {
    type: MoodType.TIRED,
    label: "Усталость",
    description: "Нужна пауза и отдых",
    icon: Coffee,
    color: "text-stone-500",
    bgColor: "bg-stone-100",
    borderColor: "border-stone-200",
    selectColor: "ring-stone-200"
  },
  {
    type: MoodType.ANXIETY,
    label: "Тревога",
    description: "Беспокойные мысли",
    icon: Wind,
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    selectColor: "ring-violet-200"
  },
  {
    type: MoodType.SADNESS,
    label: "Грусть",
    description: "Хочется поплакать",
    icon: CloudRain,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    selectColor: "ring-blue-200"
  },
  {
    type: MoodType.IRRITATION,
    label: "Раздражение",
    description: "Всё бесит",
    icon: Frown,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    selectColor: "ring-red-200"
  }
];

export const STATIC_PRACTICES: Practice[] = [
  {
    id: 'p1',
    title: 'Утренний настрой',
    description: 'Короткая практика благодарности новому дню.',
    duration: '2 мин',
    category: 'morning',
    isLocked: false,
  },
  {
    id: 'p2',
    title: 'Дыхание "Квадрат"',
    description: 'Быстрое снятие напряжения через ритмичное дыхание.',
    duration: '4 мин',
    category: 'stress',
    isLocked: false,
  },
  {
    id: 'p3',
    title: 'Заземление',
    description: 'Вернись в тело, почувствуй опору под ногами.',
    duration: '3 мин',
    category: 'grounding',
    isLocked: false,
  },
  {
    id: 'p4',
    title: 'Вечернее отпускание',
    description: 'Мягко завершаем день и отпускаем тревоги.',
    duration: '5 мин',
    category: 'evening',
    isLocked: false,
  },
  {
    id: 'p5',
    title: 'Сканирование тела',
    description: 'Глубокое расслабление перед сном.',
    duration: '10 мин',
    category: 'calm',
    isLocked: true, 
  },
  {
    id: 'p6',
    title: 'Приветствие Солнцу',
    description: 'Мягкая йога для пробуждения тела.',
    duration: '7 мин',
    category: 'yoga',
    isLocked: false, 
  },
  {
    id: 'p7',
    title: 'Дыхание 4-7-8',
    description: 'Техника для быстрого засыпания.',
    duration: '5 мин',
    category: 'breathing',
    isLocked: false, 
  },
  {
    id: 'p8',
    title: 'SOS: Стряхни стресс',
    description: 'Активная техника для сброса напряжения.',
    duration: '1 мин',
    category: 'sos',
    isLocked: false, 
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Как пользоваться библиотекой',
    category: 'Заметка',
    content: 'Здесь собраны полезные материалы. Часть из них доступна всем, а глубокие разборы и вебинары — по подписке.',
    requiredTier: 'free'
  },
  {
    id: 'a2',
    title: 'Эмоциональное выгорание: признаки',
    category: 'Статья',
    content: 'Разбор основных стадий выгорания и первые шаги к восстановлению. Читать далее...',
    requiredTier: 'free'
  },
  {
    id: 'a3',
    title: 'Разбор: "Синдром самозванца"',
    category: 'Разбор',
    content: 'Глубокий психологический разбор причин неуверенности в себе и техники работы с внутренним критиком. (Доступно на тарифе Базовый)',
    requiredTier: 'basic'
  },
  {
    id: 'a4',
    title: 'Гайд: "Утренние ритуалы"',
    category: 'Доп. материалы',
    content: 'PDF-файл с конструктором идеального утра под твой тип энергии. (Доступно на тарифе Базовый)',
    requiredTier: 'basic'
  },
  {
    id: 'a5',
    title: 'Вебинар: "Женские архетипы"',
    category: 'Вебинар',
    content: 'Запись закрытого эфира о том, как разные роли проявляются в нашей жизни. (Доступно на тарифе Расширенный)',
    requiredTier: 'extended'
  },
  {
    id: 'a6',
    title: 'Аудио-настройка на неделю',
    category: 'Аудио',
    content: 'Голосовая практика для настройки фокуса внимания. (Доступно на тарифе Расширенный)',
    requiredTier: 'extended'
  },
  {
    id: 'a7',
    title: 'Личная супервизия',
    category: 'Премиум',
    content: 'Инструкция по записи на личную работу с наставником. (Доступно на тарифе Премиум)',
    requiredTier: 'premium'
  }
];

export const SUBSCRIPTION_TIERS = [
  {
    id: 'basic',
    name: 'Базовый',
    price: '999 ₽',
    features: ['Ежедневные практики', 'Доступ в сообщество', '2 вебинара в записи']
  },
  {
    id: 'extended',
    name: 'Расширенный',
    price: '2 999 ₽',
    features: ['Всё из Базового', '2 офлайн встречи', 'Расширенная библиотека']
  },
  {
    id: 'premium',
    name: 'Премиум',
    price: '8 990 ₽',
    features: ['Всё включено', 'Личные консультации', 'Закрытые мероприятия']
  }
];
