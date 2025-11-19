export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  avatarUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export enum BookingStep {
  SELECT_SERVICE = 0,
  AI_DIAGNOSIS = 1,
  CONTACT_DETAILS = 2,
  SUCCESS = 3
}
