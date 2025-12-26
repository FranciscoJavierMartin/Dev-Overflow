import { ROUTES } from '@/utils/constants/routes';

export const EMPTY_QUESTION = {
  title: 'Ahh, No Questions Yet!',
  message:
    'The question board is empty. Maybe it waiting for your questions to get things rolling',
  button: {
    text: 'Ask a Question',
    href: ROUTES.askQuestion,
  },
};
