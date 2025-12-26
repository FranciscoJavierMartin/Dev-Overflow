import { ROUTES } from '@/utils/constants/routes';

export const EMPTY_QUESTION = {
  title: 'Ahh, No Questions Yet!',
  message:
    'The question board is empty. Maybe it waiting for your questions to get things rolling',
  button: {
    text: 'Ask a Question',
    toName: ROUTES.askQuestion,
  },
};

export const DEFAULT_ERROR = {
  title: 'Something Went Wrong',
  message: 'Even our code can have a bad day. Give it another shot',
  button: {
    text: 'Retry Request',
    toName: ROUTES.home,
  },
};
