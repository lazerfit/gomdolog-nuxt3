<script setup lang=ts>
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import java from 'highlight.js/lib/languages/java'
import { createLowlight } from 'lowlight'

const lowlight = createLowlight();

lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);
lowlight.register('html', html);
lowlight.register('java', java);

const store = usePostStore();

const editor = useEditor({
  content: store.postSaveForm.content,
  onUpdate: ({ editor }) => {
    store.postSaveForm.content = editor.getHTML();
  },
  onDestroy: () => {
    store.postSaveForm.content = '';
  },
  extensions: [
    StarterKit,
    Image,
    Link.configure({
      openOnClick: 'whenNotEditable',
    }),
    CodeBlockLowlight.configure({
      lowlight,
    })
  ],
  editorProps: {
    attributes: {
      class: 'edit'
    },
  },
})

const addImage = () => {
  const url = window.prompt('URL');
  if (url) {
    editor?.value?.chain().focus().setImage({ src: url }).run()
  }
}
</script>
<template>
  <div v-if="editor" class="tip-tap-buttons">
    <bubble-menu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor">
      <button :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
        Bold
      </button>
      <button :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
        Italic
      </button>
      <button :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()">
        Code
      </button>
    </bubble-menu>
    <button :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }" class="menu-btn"
      @click="editor.chain().focus().toggleStrike().run()">
      <i class="fa-solid fa-strikethrough" />
    </button>
    <floating-menu class="floating-menu" :tippy-options="{ duration: 100 }" :editor="editor">
      <button @click="addImage">Image</button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
        H1
      </button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
        H2
      </button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
        H3
      </button>
    </floating-menu>
    <button :class="{ 'is-active': editor.isActive('bulletList') }" class="menu-btn"
      @click="editor.chain().focus().toggleBulletList().run()">
      <i class="fa-solid fa-list-ul" />
    </button>
    <button :class="{ 'is-active': editor.isActive('orderedList') }" class="menu-btn"
      @click="editor.chain().focus().toggleOrderedList().run()">
      <i class="fa-solid fa-list-ol" />
    </button>
    <button :class="{ 'is-active': editor.isActive('blockquote') }" class="menu-btn"
      @click="editor.chain().focus().toggleBlockquote().run()">
      <i class="fa-solid fa-quote-left" />
    </button>
    <button :disabled="!editor.can().chain().focus().undo().run()" class="menu-btn"
      @click="editor.chain().focus().undo().run()">
      <i class="fa-solid fa-rotate-left" />
    </button>
    <button :disabled="!editor.can().chain().focus().redo().run()" class="menu-btn"
      @click="editor.chain().focus().redo().run()">
      <i class="fa-solid fa-rotate-right" />
    </button>
  </div>
  <editor-content :editor="editor" />
</template>

<style lang='scss'>
.darkMode {
  .menu-btn {
    border: 2px solid $background-color !important;
  }
}

.tip-tap-buttons {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid #999;
  border-bottom: none;
  height: rem(50);
  align-items: center;
  border-radius: rem(10) rem(10) 0 0;

  &:has(.is-active) .is-active {
    background-color: $font-black;
    color: $font-white;
  }

  .menu-btn {
    border: 2px solid $font-black;
    border-radius: rem(8);
    background-color: $background-color;
    color: $font-black;
    padding: rem(5);
    margin-left: rem(5);

    i {
      cursor: pointer;
      font-size: rem(16);

      @media (max-width: 767px) {
        font-size: rem(14);
      }
    }
  }
}

.tiptap {

  border: 1px solid #999;
  min-height: 30rem;
  max-height: 50rem;
  overflow: auto;
  padding: rem(10);
  border-radius: 0 0 rem(10) rem(10);

  &:focus {
    outline: none;
  }

  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: "Fira Code", monospace;
    font-optical-sizing: auto;
    font-style: normal;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #F98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #FBBC88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #B9F18D;
    }

    .hljs-title,
    .hljs-section {
      color: #FAF594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70CFF8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

.bubble-menu {
  display: flex;
  background-color: #0D0D0D;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #FFF;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.3rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.floating-menu {
  display: flex;
  background-color: #0D0D0D10;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.3rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.darkMode {

  .floating-menu {
    background-color: $font-white !important;
    color: $font-black !important;
  }

  .bubble-menu {
    background-color: $font-white !important;

    button {
      color: $font-black !important;
    }
  }
}
</style>