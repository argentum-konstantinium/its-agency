<template>
    <Select :selectData="selectData"/>
</template>

<script>
export default {
    data() {
        return {
            selectData: {
                inputName: 'Сортировка',
                defaultValue: 'Сначала дорогие',
                list: [
                    {
                        name: 'sort',
                        value: 'Сначала дорогие'
                    },
                    {
                        name: 'sort',
                        value: 'Сначала недорогие'
                    },
                    {
                        name: 'sort',
                        value: 'Сначала популярные'
                    },
                    {
                        name: 'sort',
                        value: 'Сначала новые'
                    }
                ]

            }
        }
    }
}
</script>