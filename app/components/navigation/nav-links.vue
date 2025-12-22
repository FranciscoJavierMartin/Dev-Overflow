<template>
  <template v-for="link in sidebarLinks" :key="link.label">
    <SheetClose v-if="isMobileNav" as-child>
      <NavigationNavLink v-bind="link" :user-id />
    </SheetClose>
    <NavigationNavLink v-else v-bind="link" :user-id />
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
import { ROUTES } from '@/utils/constants/routes';

defineProps<{ isMobileNav?: boolean; userId?: string }>();

const sidebarLinks = [
  {
    icon: Home,
    route: ROUTES.home,
    label: 'Home',
  },
  {
    icon: Users,
    route: ROUTES.community,
    label: 'Community',
  },
  {
    icon: Star,
    route: ROUTES.collection,
    label: 'Collection',
  },
  {
    icon: Briefcase,
    route: ROUTES.jobs,
    label: 'Find Jobs',
  },
  {
    icon: Tag,
    route: ROUTES.tags,
    label: 'Tags',
  },
  {
    icon: User,
    route: ROUTES.profile,
    label: 'Profile',
  },
  {
    icon: CircleQuestionMark,
    route: ROUTES.askQuestion,
    label: 'Ask a Question',
  },
];
</script>
