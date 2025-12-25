<template>
  <ClientOnly>
    <TiptapProvider
      :editor="editor"
      :class="
        cn(
          'border-input rounded-md border',
          'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
        )
      "
    >
      <TiptapToolbar class="text-foreground" />
      <TiptapContent
        class="paragraph-regular bg-light-900 dark:bg-dark-300 text-dark-300 dark:text-light-700 border-light-700 dark:border-dark-400 min-h-12 rounded-sm"
      />
      <TiptapStatusBar show-char-count />
    </TiptapProvider>
  </ClientOnly>
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/vue-3';
import { cn } from '@/lib/utils';

const { content } = defineProps<{
  id: string;
  name: string;
  content: string;
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: 'input', text: string): void;
}>();

const editor = useEditor({
  content,
  extensions: [StarterKit],
  onUpdate({ editor }) {
    emit('input', editor.getHTML());
  },
});
</script>
