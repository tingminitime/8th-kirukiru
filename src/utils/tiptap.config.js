import { BubbleMenu } from '@tiptap/vue-3'
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
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: '',
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
    }),
    CharacterCount.configure({
      limit: parseInt(this.wordLimit, 10),
    })
  ]
}