<template>
  <div class="bg-light-850 dark:bg-dark-100 relative">
    <Head>
      <Link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />
    </Head>
    <div class="flex">
      <main
        class="flex min-h-screen flex-1 flex-col px-6 pt-36 pb-6 max-md:pb-14 sm:px-14"
      >
        <div class="mx-auto w-full max-w-5xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
