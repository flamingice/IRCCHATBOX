import { ref, onMounted } from 'vue';

const isDark = ref(false);

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  updateTheme();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches;
      updateTheme();
    }
  });
};

export const useTheme = () => {
  onMounted(() => {
    initTheme();
  });

  return {
    isDark,
    toggleTheme
  };
};
