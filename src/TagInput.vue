<template>
  <autocomplete
    :initial-items="availableTags"
    :src="src"
    :limit="limit"
    :clear-on-select="true"
    :partial-input="true"
    :autocomplete-on-blur="true"
    :autocomplete-keys="[13, 188, 9]"
    dropdown-class="dropdown-tags"
    @autocompleted="addTag"
    @deleted="onDelete"
    @error="error => $emit('error', error)"
  >
    <template scope="{ autocompleteBindings, autocompleteHandlers }">
      <div class="tags form-control">
        <div class="tag" v-for="tag in tags">
          <span class="name" :title="tag.length > 35 ? tag : false">{{ truncateTag(tag) }}</span><a class="close" tabindex="-1" @click.prevent="removeTag(tag)">&times;</a>
        </div>
        <input type="text"
          v-bind="autocompleteBindings"
          v-on="autocompleteHandlers"
          :id="id"
          :placeholder="placeholder"
          class="tag-input"
          autocomplete="off"
          tabindex="0"
        />
      </div>
      <input type="hidden" :value="formattedTags" v-if="hiddenInputName" :name="hiddenInputName">
    </template>
  </autocomplete>
</template>

<script>
import Autocomplete from './Autocomplete.vue';

export default {
  components: {
    Autocomplete
  },
  props: {
    availableTags: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Array, String],
      default: () => []
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    hiddenInputName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tags: []
    };
  },
  computed: {
    formattedTags () {
      return this.tags.join(', ');
    }
  },
  methods: {
    addTag (tag) {
      let value = typeof tag === 'object' ? tag.value : tag;

      value = value.trim();

      if (!value || this.tags.includes(value)) {
        return;
      }

      this.tags.push(value);

      this.$emit('input', this.tags);
    },
    removeTag (tag) {
      this.tags = this.tags.filter(t => t !== tag);

      this.$emit('input', this.tags);
    },
    onDelete (value) {
      const tag = this.tags.slice(-1).pop();

      if (!value && tag) {
        this.removeTag(tag);
      }
    },
    truncateTag (tag) {
      return tag.length > 35 ? tag.substring(0, 32) + '...' : tag;
    }
  },
  created () {
    if (this.value instanceof Array) {
      this.tags = this.value;
    } else {
      this.tags = this.value ? this.value.split(', ') : [];
    }
  }
};
</script>

<style scoped>
  .tags {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 8px 0 8px;
    height: auto;
    min-height: 37px;
  }

  .tag {
    border-radius: 2px;
    display: inline-block;
    border: 1px solid #d9d9d9;
    background-color: #ededed;
    white-space: nowrap;
    margin: -2px 5px 5px 0;
    height: 22px;
    vertical-align: top;
    cursor: default;
  }

  .tag:hover {
    border-color: #b9b9b9;
  }

  .tag .name {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 4px;
    vertical-align: top;
  }

  .tag .close {
    font-family: Arial;
    display: inline-block;
    font-size: 1.1em;
    line-height: 1.4em;
    margin-left: 5px;
    float: none;
    height: 100%;
    vertical-align: top;
    padding-right: 4px;
    outline: none;
    text-decoration: none;
  }

  .tag-input {
    flex-grow: 1;
    border: 0;
    padding: 0;
    outline: none;
    margin: -2px 5px 5px 0;
  }
</style>
