import NotFoundErrorImg from '@/assets/react.svg?react'
import ServerErrorImg from '@/assets/vite.svg?react'

export const errorConfig = {
  notFoundError: {
    Illustration: NotFoundErrorImg,
    title: 'Страница не найдена',
    description:
      'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже',
  },
  serverError: {
    Illustration: ServerErrorImg,
    title: 'На сервере произошла ошибка',
    description: 'Попробуйте позже или вернитесь на главную страницу',
  },
} as const;

export type ErrorType = keyof typeof errorConfig;
