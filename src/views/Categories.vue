<!-- eslint-disable -->
<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>

        <CategoryEdit :categories="categories" :key="categories.length + updateCount" @updated="updateCategories" v-if="categories.length"/>
        <p v-else>{{ 'NoCategories' | localize }}</p>
      </div>
    </section>
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
import CategoryCreate from '@/components/CategoryCreate';
// eslint-disable-next-line import/extensions
import CategoryEdit from '@/components/CategoryEdit';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('Menu_Categories'),
    };
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount += 1;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  components: { CategoryCreate, CategoryEdit },
};
</script>
