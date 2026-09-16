export type PostType = "achievement" | "activity" | "announcement";

export type FeedPost = {
  id: string;
  type: PostType;
  author: string;
  audience: string;
  time: string;
  body: string;
  likes: number;
  comments: number;
  hasPhoto?: boolean;
};

export const feedPosts: FeedPost[] = [
  {
    id: "mateo-orinal",
    type: "achievement",
    author: "Mateo",
    audience: "familia de Mateo",
    time: "14:20",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "mateo-temperas",
    type: "activity",
    author: "Mateo",
    audience: "familia de Mateo",
    time: "09:40",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    likes: 5,
    comments: 2,
    hasPhoto: true,
  },
  {
    id: "salida-al-parque",
    type: "announcement",
    author: "Anuncio general",
    audience: "toda la sala",
    time: "07:50",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];
