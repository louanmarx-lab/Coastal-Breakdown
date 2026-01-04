
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}
