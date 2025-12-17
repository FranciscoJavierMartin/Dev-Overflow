<template>
  <Sheet>
    <SheetTrigger as-child>
      <Menu class="sm:hidden" />
    </SheetTrigger>
    <SheetContent side="left" class="bg-light-900 dark:bg-dark-200 border-none">
      <SheetTitle class="hidden">Navigation</SheetTitle>
      <NuxtLink :to="{ name: ROUTES.home }" class="flex items-center gap-1">
        <NuxtImg :src="siteLogo" width="23" height="23" alt="Logo" />
        <p class="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
          Dev<span class="text-primary-500">Overflow</span>
        </p>
      </NuxtLink>
      <div
        class="no-scrollbar flex h-[calc(100dvh-80px)] flex-col justify-between gap-3 overflow-y-auto"
      >
        <SheetClose as-child>
          <section class="flex h-full flex-col gap-6 pt-16">
            <NavigationNavLinks is-mobile-nav />
          </section>
        </SheetClose>

        <div class="flex flex-col gap-3">
          <SheetClose as-child>
            <NuxtLink :to="{ name: ROUTES.signIn }">
              <Button
                class="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
              >
                <span class="primary-gradient bg-clip-text">Sign In</span>
              </Button>
            </NuxtLink>
          </SheetClose>

          <SheetClose as-child>
            <NuxtLink :to="{ name: ROUTES.signUp }">
              <Button
                class="border-light-700 dark:border-dark-400 small-medium btn-tertiary text-dark-400 dark:text-light-900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
              >
                Sign Up
              </Button>
            </NuxtLink>
          </SheetClose>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
import siteLogo from '@/assets/images/site-logo.svg';
import { ROUTES } from '@/utils/constants/routes';
</script>
