<template>
    <div class="select">
        <input
            type="text"
            :name="selectData.inputName"
            class="select__input"
            :value="value"
            disabled
        />
        <ul class="select__ul">
            <li
                v-for="(item, key) in selectData.list"
                :key="key"
                class="select__item"
            >
                <label class="select__label">
                    <input
                        type="radio"
                        :name="item.name"
                        :value="item.value"
                        v-bind="{
                            checked: 'defaultValue' in selectData ? item.value === selectData.defaultValue : false,
                        }"
                        class="select__checkbox"
                        @click='changeValue'
                    />
                    <span class="select__text" v-html="item.value"></span>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        selectData: Object,
    },
    data() {
        return {
            value: '',
        }
    },
    methods: {
        changeValue() {
            this.value = event.target.value;
        }
    }, 
    mounted() {
        this.value = "defaultValue" in this.selectData ? this.selectData.defaultValue : '';
    }
};
</script>