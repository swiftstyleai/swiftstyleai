export interface TweetData {
  text: string;
  user: string;
  name?: string;
  profilePictureUrl?: string;
  publishedDate?: string;
}

export interface GenerateReplyParams {
  message: TweetData;
  input?: string;
  replies?: TweetData[];
}

export interface GenerateTweetParams {
  input: string;
}

export interface GenerateReplyResponse {
  response: string;
}
