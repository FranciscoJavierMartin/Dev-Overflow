<template>
  <template v-for="link in sidebarLinks" :key="link.label">
    <SheetClose v-if="isMobileNav" as-child>
      <NavigationNavLink v-bind="link" user-id="1" />
    </SheetClose>
    <NavigationNavLink v-else v-bind="link" user-id="1" />
  </template>
</template>

<script setup lang="ts">
import {
  Home,
  Star,
  User,
  Users,
  Briefcase,
  Tag,
  CircleQuestionMark,
} from 'lucide-vue-next';

defineProps<{ isMobileNav?: boolean }>();

const sidebarLinks = [
  {
    icon: Home,
    route: '/',
    label: 'Home',
  },
  {
    icon: Users,
    route: '/community',
    label: 'Community',
  },
  {
    icon: Star,
    route: '/collection',
    label: 'Collection',
  },
  {
    icon: Briefcase,
    route: '/jobs',
    label: 'Find Jobs',
  },
  {
    icon: Tag,
    route: '/tags',
    label: 'Tags',
  },
  {
    icon: User,
    route: '/profile',
    label: 'Profile',
  },
  {
    icon: CircleQuestionMark,
    route: '/ask-question',
    label: 'Ask a Question',
  },
];
</script>
