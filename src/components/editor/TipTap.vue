<template>
  <div>
    <BubbleMenu
      v-if="editor"
      class="editorBubble"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
      <!-- 粗體 -->
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_bold</span>
      </button>
      <!-- 斜體 -->
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_italic</span>
      </button>
      <!-- 刪除線 -->
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_strikethrough</span>
      </button>
      <!-- H2 -->
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <span class="text-xl text-white align-middle material-icons">title</span>
      </button>
      <!-- H1 -->
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <span class="text-2xl text-white align-middle material-icons">title</span>
      </button>
      <!-- 連結 -->
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('link') }"
        @click="editor.isActive('link') ? editor.chain().focus().unsetLink().run() : setLink(editor)"
      >
        <span class="text-xl text-white align-middle material-icons">link</span>
      </button>
      <!-- list -->
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_list_bulleted</span>
      </button>
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_list_numbered</span>
      </button>
      <!-- Code Block -->
      <button
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <span class="text-xl text-white align-middle material-icons">code</span>
      </button>
    </BubbleMenu>
    <EditorContent
      class="p-2 rounded-md border-2 border-myBrown"
      :class="customClass"
      :editor="editor"
      @click="editClickHandler"
    ></EditorContent>
  </div>
</template>

<script>
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Code from '@tiptap/extension-code'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import ListItem from '@tiptap/extension-list-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import lowlight from 'lowlight'

export default {
  components: {
    EditorContent,
    BubbleMenu,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '請輸入內容',
    },
    customClass: {
      type: String,
      default: ''
    },
    wordLimit: {
      type: [String, Number],
      default: 99999,
    }
  },
  emits: ['update:modelValue', 'word-count', 'check-empty'],
  data() {
    return {
      editor: null,
    }
  },
  watch: {
    modelValue(newVal) {
      const isSame = this.editor.getHTML() === newVal
      if (isSame) return
      this.editor.commands.setContent(newVal, false)
    }
  },
  mounted() {
    const vm = this
    // --- 初始化 Tiptap Editor ---
    this.editor = new Editor({
      content: this.modelValue,
      editorProps: {
        attributes: {
          class: 'mx-auto focus:outline-none'
        }
      },
      // 雙向綁定
      onUpdate() {
        let wordCount = vm.editor.storage.characterCount.characters()
        vm.$emit('update:modelValue', vm.editor.getHTML())
        vm.$emit('word-count', wordCount)
        vm.$emit('check-empty', vm.editor.isEmpty)
      },
      // 擴充功能
      extensions: [
        BubbleMenu,
        StarterKit,
        Document,
        Placeholder.configure({
          placeholder: this.placeholder,
        }),
        Heading.configure({
          levels: [1, 2],
          HTMLAttributes: {
            class: 'editor-heading',
          }
        }),
        Paragraph,
        Text,
        Code,
        Link.configure({
          HTMLAttributes: {
            class: 'text-blue-600 hover:text-blue-800 visited:text-purple-600 cursor-pointer px-0.5',
          },
          autolink: true,
          openOnClick: true,
          linkOnPaste: true,
        }),
        CharacterCount.configure({
          limit: parseInt(this.wordLimit, 10),
        }),
        ListItem,
        CodeBlockLowlight.configure({
          HTMLAttributes: {
            class: 'bg-[#282c34] text-white rounded px-2 py-1 mb-2'
          },
          languageClassPrefix: 'language-',
          defaultLanguage: 'javascript',
          lowlight,
        })
      ]
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      let url = window.prompt('URL', previousUrl)
      if (url === null) return
      if (url === '') {
        this.editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }
      const urlRegex = /https?:\/\//
      if (urlRegex.test(url)) {
        this.editor.chain().focus().extendMarkRange('link').setLink({
          href: `${url}`,
        }).run()
      } else {
        this.editor.chain().focus().extendMarkRange('link').setLink({
          href: `http://${url}`,
        }).run()
      }
    },
    editClickHandler() {
      this.editor.chain().focus().run()
    },
  },
}
</script>

<style lang="sass" scope>
  .is-editor-empty::before,
  .is-empty::before
    content: attr(data-placeholder)
    float: left
    color: #aaa
    pointer-events: none
    height: 0

  .ProseMirror
    ul,
    ol
      padding: 0 1rem
      margin-left: .5rem
    ul
      list-style: disc
      ul
        list-style: circle
        ul
          list-style: square
    ol
      list-style: decimal
      ol
        list-style: lower-alpha

  h1.editor-heading, h2.editor-heading
    letter-spacing: 0.025rem

  h1.editor-heading
    font-size: 1.5rem
  h2.editor-heading
    font-size: 1.25rem

  .hljs-comment,
  .hljs-quote
    color: #616161

  .hljs-variable,
  .hljs-template-variable,
  .hljs-attribute,
  .hljs-tag,
  .hljs-name,
  .hljs-regexp,
  .hljs-link,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class
    color: #F98181

  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params
    color: #FBBC88

  .hljs-string,
  .hljs-symbol,
  .hljs-bullet
    color: #B9F18D

  .hljs-title,
  .hljs-section
    color: #FAF594

  .hljs-keyword,
  .hljs-selector-tag
    color: #70CFF8

  .hljs-emphasis
    font-style: italic

  .hljs-strong
    font-weight: 700

</style>