import { ROUTES } from '@/utils/constants/routes';

export const EMPTY_QUESTIONS = {
  title: 'Ahh, No Questions Yet!',
  message:
    'The question board is empty. Maybe it waiting for your questions to get things rolling',
  button: {
    text: 'Ask a Question',
    toName: ROUTES.askQuestion,
  },
};

export const EMPTY_TAGS = {
  title: 'No Tags Found',
  message: 'The tag could is empty. Add some keyword to make it rain',
  button: {
    text: 'Create Tag',
    toName: ROUTES.tags,
  },
};

export const EMPTY_ANSWERS = {
  title: 'No Answer Found',
  message: 'The Answer could is empty. Add some keyword to make it rain',
};

export const EMPTY_USERS = {
  title: 'No Users Found',
  message: 'You are not along. The only one here. more user are coming soon',
};

export const DEFAULT_ERROR = {
  title: 'Something Went Wrong',
  message: 'Even our code can have a bad day. Give it another shot',
  button: {
    text: 'Retry Request',
    toName: ROUTES.home,
  },
};
