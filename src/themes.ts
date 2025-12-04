export interface ColorTheme {
  id: string;
  name: string;
  colors: {
    intensity0: string;
    intensity1: string;
    intensity2: string;
    intensity3: string;
    intensity4: string;
  };
}

export const colorThemes: ColorTheme[] = [
  {
    id: 'github-green',
    name: 'GitHub Green',
    colors: {
      intensity0: '#ebedf0',
      intensity1: '#c6e48b',
      intensity2: '#7bc96f',
      intensity3: '#239a3b',
      intensity4: '#196127',
    },
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    colors: {
      intensity0: '#e8f4f8',
      intensity1: '#9dd9f3',
      intensity2: '#4db8e8',
      intensity3: '#1a8ccc',
      intensity4: '#0d5a8f',
    },
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    colors: {
      intensity0: '#fff4e6',
      intensity1: '#ffd8a8',
      intensity2: '#ffa94d',
      intensity3: '#ff8c00',
      intensity4: '#cc6600',
    },
  },
  {
    id: 'purple-dream',
    name: 'Purple Dream',
    colors: {
      intensity0: '#f3e5f5',
      intensity1: '#ce93d8',
      intensity2: '#ab47bc',
      intensity3: '#8e24aa',
      intensity4: '#6a1b9a',
    },
  },
  {
    id: 'fire-red',
    name: 'Fire Red',
    colors: {
      intensity0: '#ffebee',
      intensity1: '#ef9a9a',
      intensity2: '#ef5350',
      intensity3: '#e53935',
      intensity4: '#c62828',
    },
  },
  {
    id: 'monochrome-gray',
    name: 'Monochrome Gray',
    colors: {
      intensity0: '#f5f5f5',
      intensity1: '#d0d0d0',
      intensity2: '#9e9e9e',
      intensity3: '#616161',
      intensity4: '#212121',
    },
  },
];

export const getThemeById = (id: string): ColorTheme => {
  return colorThemes.find(theme => theme.id === id) || colorThemes[0];
};

export const applyTheme = (theme: ColorTheme) => {
  const root = document.documentElement;
  root.style.setProperty('--intensity-0', theme.colors.intensity0);
  root.style.setProperty('--intensity-1', theme.colors.intensity1);
  root.style.setProperty('--intensity-2', theme.colors.intensity2);
  root.style.setProperty('--intensity-3', theme.colors.intensity3);
  root.style.setProperty('--intensity-4', theme.colors.intensity4);
};
