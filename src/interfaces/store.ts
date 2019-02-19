import { IChat } from "src/models/chat";
import { IMessage } from "src/models/message";
import { IDocument, IDocumentUpload } from "src/models/document";
import { IAudioMessage } from "src/models/audio";
import langages from "src/language";

export enum MODALS_ID {CREATE_CHAT, NULL}
export enum LANGUAGES {RUSSIAN, ENGLISH}
export const LANGUAGES_PACK: Map<LANGUAGES, string> = new Map<LANGUAGES, string>();
LANGUAGES_PACK.set(LANGUAGES.RUSSIAN, "Russian");
LANGUAGES_PACK.set(LANGUAGES.ENGLISH, "English");

export interface IAppStore {
  modal: MODALS_ID;
  changeModal: (type: MODALS_ID) => void;
  menu: boolean;
  changeMenu: (val: boolean) => void;
}

export interface IChatStore {
  chats: IChat[];
  currentChat: IChat;
  chooseChat: (chat: IChat) => void;
  loadChats: () => void;
  createChat: (name: string) => void;
  clear: () => void;
}

export interface IUserStore {
  data: IUser;
  enter: (login: string, pass: string) => void;
  create: (login: string, pass: string) => void;
  checkUserWasSignIn: () => Promise<boolean>;
  enterAsAnonymus: () => void;
  setLang: (lang: string) => void;
  logout: () => void;
}

export interface IMessagesStore {
  messages: Map<number, IChatsMessages>;
  loadMessages: (chatID: number) => void;
  getImage: (fileID: number, ext: string) => Promise<string>;
  downloadFile: (fileID: number,  name: string) => void;
  clear: () => void;
}

export interface IChatsMessages {
  messages: IMessage[];
  allLoaded: boolean;
}

export interface IInputStore {
  voiceRecording: boolean;
  voiceVolumes: number[];
  voiceMessages: Map<number, IAudioMessage>;
  chatsInputData: Map<number, IInputData>;
  setTextInput: (text: string) => void;
  uploadDocuments: (docs: IDocumentUpload[]) => void;
  deleteDocument: (doc: IDocumentUpload) => void;
  cancelVoiceRecording: () => void;
  sendMessage: () => void;
  changeRecording: (val: boolean) => void;
  stopRecording: () => void;
  clear: () => void;
}

export interface IInputData {
  documents: IDocumentUpload[];
  text: string;
}

export interface IUser {
  login: string;
  token: string;
  ID: number;
  lang: string;
}
