<template>
    <Select @sortEvent="sendEvent" :selectData="selectData"/>
</template>

<script>
export default {
    data() {
        return {
            selectData: {
                inputName: 'Сортировка',
                defaultValue: 'Сначала популярные',
                list: [
                    {
                        name: 'sort',
                        dataName: 'costSortingHigh',
                        value: 'Сначала дорогие'
                    },
                    {
                        dataName: 'costSortingLow',
                        name: 'sort',
                        value: 'Сначала недорогие'
                    },
                    {   
                        dataName: 'popularitySorting',
                        name: 'sort',
                        value: 'Сначала популярные'
                    },
                    {
                        dataName: 'newestSorting',
                        name: 'sort',
                        value: 'Сначала новые'
                    }
                ]

            }
        }
    },
    methods: {
        sendEvent(e) {
            
            this.$emit('sortEvent', e);
        }
    }
}
</script>