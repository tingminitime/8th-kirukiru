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
    </BubbleMenu>
    <EditorContent
      class="p-2 rounded-md border-2 border-myBrown"
      :class="customClass"
      :editor="editor"
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
  emits: ['update:modelValue', 'word-count'],
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
        Paragraph.configure({
          HTMLAttributes: {
            class: '',
          }
        }),
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
      const urlRegex = /https?:\/\//g
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

  h1.editor-heading, h2.editor-heading
    letter-spacing: 0.025rem

  h1.editor-heading
    font-size: 1.5rem
  h2.editor-heading
    font-size: 1.25rem

</style>