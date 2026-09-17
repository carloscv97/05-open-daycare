export type ParentStatus = 'active' | 'pending';

export type Parent = {
  name: string;
  relation: 'mother' | 'father';
  status: ParentStatus;
  avatarVariant: string;
};

export type Kid = {
  slug: string;
  name: string;
  birthDate: string;
  ageLabel: string;
  room: string;
  enrollmentLabel: string;
  avatarVariant: string;
  alertNote?: string;
  listBadge?: string;
  parents: Parent[];
};

export const kids: Kid[] = [
  {
    slug: 'mateo-fernandez',
    name: 'Mateo Fernández',
    birthDate: '12 mar 2022',
    ageLabel: '3 años',
    room: 'Estrellas',
    enrollmentLabel: 'feb 2025',
    avatarVariant: 'blue',
    alertNote: 'Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.',
    listBadge: 'MANÍ',
    parents: [
      {
        name: 'Lucía Fernández',
        relation: 'mother',
        status: 'active',
        avatarVariant: 'purple',
      },
      {
        name: 'Diego Fernández',
        relation: 'father',
        status: 'pending',
        avatarVariant: 'blue',
      },
    ],
  },
  {
    slug: 'sofia-mendez',
    name: 'Sofía Méndez',
    birthDate: '5 ago 2023',
    ageLabel: '2 años',
    room: 'Soles',
    enrollmentLabel: 'mar 2025',
    avatarVariant: 'pink',
    parents: [
      {
        name: 'Mariana Méndez',
        relation: 'mother',
        status: 'active',
        avatarVariant: 'peach',
      },
    ],
  },
  {
    slug: 'benjamin-ruiz',
    name: 'Benjamín Ruiz',
    birthDate: '24 ene 2022',
    ageLabel: '3 años',
    room: 'Soles',
    enrollmentLabel: 'feb 2025',
    avatarVariant: 'green',
    parents: [
      {
        name: 'Paula Ruiz',
        relation: 'mother',
        status: 'active',
        avatarVariant: 'pink',
      },
      {
        name: 'Andrés Ruiz',
        relation: 'father',
        status: 'active',
        avatarVariant: 'blue',
      },
    ],
  },
  {
    slug: 'valentina-soto',
    name: 'Valentina Soto',
    birthDate: '18 nov 2023',
    ageLabel: '2 años',
    room: 'Soles',
    enrollmentLabel: 'abr 2025',
    avatarVariant: 'yellow',
    listBadge: 'VINCULAR',
    parents: [],
  },
  {
    slug: 'tomas-diaz',
    name: 'Tomás Díaz',
    birthDate: '7 may 2022',
    ageLabel: '3 años',
    room: 'Soles',
    enrollmentLabel: 'feb 2025',
    avatarVariant: 'purple',
    alertNote: 'Intolerancia a la lactosa. Ofrecer siempre alternativas sin lácteos.',
    listBadge: 'LACTOSA',
    parents: [
      {
        name: 'Camila Díaz',
        relation: 'mother',
        status: 'active',
        avatarVariant: 'yellow',
      },
    ],
  },
  {
    slug: 'emma-castro',
    name: 'Emma Castro',
    birthDate: '30 sep 2023',
    ageLabel: '2 años',
    room: 'Soles',
    enrollmentLabel: 'mar 2025',
    avatarVariant: 'pink',
    parents: [
      {
        name: 'Julián Castro',
        relation: 'father',
        status: 'active',
        avatarVariant: 'green',
      },
    ],
  },
  {
    slug: 'lucas-romero',
    name: 'Lucas Romero',
    birthDate: '14 feb 2022',
    ageLabel: '3 años',
    room: 'Soles',
    enrollmentLabel: 'feb 2025',
    avatarVariant: 'blue',
    parents: [
      {
        name: 'Elena Romero',
        relation: 'mother',
        status: 'active',
        avatarVariant: 'purple',
      },
    ],
  },
  {
    slug: 'olivia-vega',
    name: 'Olivia Vega',
    birthDate: '9 jun 2023',
    ageLabel: '2 años',
    room: 'Soles',
    enrollmentLabel: 'mar 2025',
    avatarVariant: 'green',
    parents: [
      {
        name: 'Sergio Vega',
        relation: 'father',
        status: 'active',
        avatarVariant: 'peach',
      },
    ],
  },
];

export function getKidBySlug(slug: string) {
  return kids.find(kid => kid.slug === slug);
}
