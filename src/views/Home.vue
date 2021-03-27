<template>
  <v-app>
    <div class="home">
      <tiptap-vuetify v-model="content" :extensions="extensions"/>
    </div>
  </v-app>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { VBtn } from 'vuetify/lib'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
  TodoList,
  TodoItem,
  Table,
  TableCell,
  TableHeader,
  TableRow
} from 'tiptap-vuetify';

export default {
  name: "Home",
  components: {
    TiptapVuetify
  },
  data() {
    return {
      extensions: [
        History,
        Table,
        TableCell,
        TableHeader,
        TableRow,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        Image,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        TodoList,
        [TodoItem, {
          options: {
            nested: true
          }
        }],
        Paragraph,
        HardBreak
      ],
      content: `
      <h1>Most basic use</h1>
    `
    }
  }
};
</script>

<style lang="scss" scroped>

</style>
