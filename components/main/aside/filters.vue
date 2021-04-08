<template>
    <div class="filters">
        <Checkbox class="filters__checkbox" v-for="(item, index) in filters" :key="index" :text="item.name" :name="item.name" :value="item.name"></Checkbox>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filters: {
                filter1: {
                    name: "Новинки"
                },
                filter2: {
                    name: 'Есть в наличии'
                },
                filter3: {
                    name: 'Контрактные'
                },
                filter4: {
                    name: 'Эксклюзивные'
                },
                filter5: {
                    name: 'Распродажа'
                },
            }
        }
    }
}
</script>

<style lang="sass">
.filters
    &__checkbox:not(:last-child)
        margin-bottom: 15px
</style>