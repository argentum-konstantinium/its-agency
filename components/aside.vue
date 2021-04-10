<template>
    <aside class="aside">
        <div class="filters">
            <ColorsCheckbox
                @checkboxClick="sendEvent"
                class="filters__checkbox"
                v-for="(item, index) in filters"
                :key="index"
                :text="item.value"
                :name="item.name"
                :value="item.value"
            />
        </div>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            filters: {
                filter1: {
                    name: 'newestFiltering',
                    value: "Новинки",
                },
                filter2: {
                    name: 'availabilityFiltering',
                    value: "Есть в наличии",
                },
                filter3: {
                    name: 'exclusivefiltering',
                    value: "Контрактные",
                },
                filter4: {
                    name: 'contractFiltering',
                    value: "Эксклюзивные",
                },
                filter5: {
                    name: 'saleFiltering',
                    value: "Распродажа",
                },
            },
        };
    },
    methods: {
        sendEvent(event) {
            this.$emit('filterClick',event);
        }
    }
};
</script>

<style lang="sass">
.filters
    &__checkbox:not(:last-child)
        margin-bottom: 15px
</style>