<template>
  <div class="relative">
    <BubbleMenu
      v-if="editor"
      class="editorBubble"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
      <!-- 粗體 -->
      <button
        v-if="allowBold"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_bold</span>
      </button>
      <!-- 斜體 -->
      <button
        v-if="allowItalic"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_italic</span>
      </button>
      <!-- 刪除線 -->
      <button
        v-if="allowStrike"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_strikethrough</span>
      </button>
      <!-- H2 -->
      <button
        v-if="allowH2"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <span class="text-xl text-white align-middle material-icons">title</span>
      </button>
      <!-- H1 -->
      <button
        v-if="allowH1"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <span class="text-2xl text-white align-middle material-icons">title</span>
      </button>
      <!-- 連結 -->
      <button
        v-if="allowLink"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('link') }"
        @click="editor.isActive('link') ? editor.chain().focus().unsetLink().run() : setLink(editor)"
      >
        <span class="text-xl text-white align-middle material-icons">link</span>
      </button>
      <!-- list -->
      <button
        v-if="allowBullet"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_list_bulleted</span>
      </button>
      <button
        v-if="allowOrder"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <span class="text-xl text-white align-middle material-icons">format_list_numbered</span>
      </button>
      <!-- Code Block -->
      <button
        v-if="allowCode"
        class="editorBubbleBtn"
        :class="{ 'bg-gray-500': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <span class="text-xl text-white align-middle material-icons">code</span>
      </button>
    </BubbleMenu>
    <!-- 電腦版顯示 -->
    <div
      v-if="allowImage"
      class="hidden absolute left-0 p-2 mt-2 bg-[#333] rounded-lg opacity-50 hover:opacity-100 transition-all translate-x-[-150%] md:block"
    >
      <!-- Image -->
      <button
        class="p-1 bg-[#333] editorBubbleBtn"
        @click="addImage"
      >
        <span class="text-white align-middle material-icons">image</span>
      </button>
    </div>
    <!-- 手機板顯示 -->
    <div
      v-if="allowImage"
      class="flex justify-end md:hidden"
    >
      <Menu
        as="div"
        class="inline-block relative text-left"
      >
        <MenuButton
          class="flex items-end"
        >
          <span class="block text-3xl text-myBrown material-icons">more_horiz</span>
        </MenuButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 z-30 px-1 mt-2 bg-[#333] rounded-md divide-y divide-gray-100 focus:outline-none shadow-lg origin-top-right"
          >
            <div class="p-1">
              <MenuItem as="div">
                <!-- Image -->
                <button
                  class="editorBubbleBtn"
                  @click="addImage"
                >
                  <span class="text-white align-middle material-icons">image</span>
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <div>
      <!-- Image -->
      <!-- <button
        class="editorBubbleBtn"
        @click="addImage"
      >
        <span class="text-xl text-white align-middle material-icons">image</span>
      </button> -->
    </div>
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
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import lowlight from 'lowlight'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
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
    },
    allowBold: {
      type: Boolean,
      default: true,
    },
    allowItalic: {
      type: Boolean,
      default: true,
    },
    allowStrike: {
      type: Boolean,
      default: true,
    },
    allowH1: {
      type: Boolean,
      default: true,
    },
    allowH2: {
      type: Boolean,
      default: true,
    },
    allowLink: {
      type: Boolean,
      default: true,
    },
    allowBullet: {
      type: Boolean,
      default: true,
    },
    allowOrder: {
      type: Boolean,
      default: true,
    },
    allowCode: {
      type: Boolean,
      default: true,
    },
    allowImage: {
      type: Boolean,
      default: false,
    },
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
        }),
        Image.configure({
          HTMLAttributes: {
            class: ''
          },
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
    addImage() {
      const url = window.prompt('請輸入圖片網址')
      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
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