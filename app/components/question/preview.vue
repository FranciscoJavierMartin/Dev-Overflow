<template>
  <section class="markdown prose grid wrap-break-word">
    <div v-html="markdown2HTML" />
  </section>
</template>

<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const content = `### Question
  
  I'm looking for tips and best practices to enhance the performance of a React application. I have a moderately complex app with multiple components, and I've noticed some performance bottlenecks. What should I focus on?
  
  #### What I've Tried:
  - Lazy loading components
  - Using React.memo on some components
  - Managing state with React Context API
  
  #### Issues:
  - The app still lags when rendering large lists.
  - Switching between pages feels sluggish.
  - Sometimes, re-renders happen unexpectedly.
  
  #### Key Areas I Need Help With:
  1. Efficiently handling large datasets.
  2. Reducing unnecessary re-renders.
  3. Optimizing state management.
  
  Here is a snippet of my code that renders a large list. Maybe I'm doing something wrong here:
  
  \`\`\`js
  import React, { useState, useMemo } from "react";
  
  const LargeList = ({ items }) => {
    const [filter, setFilter] = useState("");
  
    // Filtering items dynamically
    const filteredItems = useMemo(() => {
      return items.filter((item) => item.includes(filter));
    }, [items, filter]);
  
    return (
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter items"
        />
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default LargeList;
  \`\`\`
  
  #### Questions:
  1. Is using \`useMemo\` the right approach here, or is there a better alternative?
  2. Should I implement virtualization for the list? If yes, which library would you recommend?
  3. Are there better ways to optimize state changes when dealing with user input and dynamic data?
  
  Looking forward to your suggestions and examples!
  
  **Tags:** React, Performance, State Management
    `;

const markdown2HTML = computedAsync<string>(() =>
  marked.parse(
    DOMPurify.sanitize(content.replace(/\\/g, '').replace(/&#x20;/g, '')),
  ),
);
</script>
