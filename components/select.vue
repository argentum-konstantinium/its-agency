<template>
    <div tabindex="0" @focus="openList" class="select" @click="openList" :class="{ select_open: open }">
        <div class="select__value-container">
            {{ value }}
            <svg
                class="select__close-flag"
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M4 4.5L7.4641 0L0.535898 0L4 4.5Z" fill="#202020" />
            </svg>
        </div>
        <ul
            :class="{ select__ul_show: open, select__ul_hide: !open }"
            ref="ul"
            class="select__ul"
        >
            <li
                v-for="(item, key) in selectData.list"
                :key="key"
                class="select__item"
                :style="`order: ${key + 1}`"
                ref="item"
                :data-index="key"
            >
                <label class="select__label">
                    <input
                        type="radio"
                        :name="item.name"
                        :value="item.value"
                        :data-index="key"
                        :data-name="['dataName' in item ? item.dataName : '']"
                        ref="checkbox"
                        class="select__checkbox"
                        v-model="value"
                        @click="setParameters"
                        @change="sendEvent"
                    />
                    <span class="select__text">
                        {{ item.value }}
                    </span>
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
            value: "",
            checkedIndex: 0,
            open: false,
        };
    },
    watch: {
        checkedIndex: {
            handler(newVal, oldVal) {
                this.unsetOrder(oldVal);
                this.setOrder(newVal);
                setTimeout(() => {
                    this.hideList();
                });
            },
        },
    },
    methods: {
        changeValue() {
            this.value = event.target.value;
        },
        setOrder(index) {
            this.$refs.item[index].classList.add("select__item_order-unset");
        },
        unsetOrder(index) {
            this.$refs.item[index].classList.remove("select__item_order-unset");
        },
        setParameters(e) {
            this.checkedIndex = Number(e.target.dataset.index);
        },
        openList(event) {
            this.open = true;
        },
        hideList() {
            this.open = false;
        },
        sendEvent(e) {
            this.$emit("sortEvent", {
                name: e.target.dataset.name,
                value: e.target.checked,
            });
        },
    },
    mounted() {
        document.addEventListener("click", this.hideList.bind(this), true);
        if ("defaultValue" in this.selectData) {
            for (let i of this.$refs.checkbox) {
                if (i.value === this.selectData.defaultValue) {
                    i.checked = true;
                    this.checkedIndex = Number(i.dataset.index);
                    this.value = i.value;
                    this.setOrder(this.checkedIndex);
                    this.$emit("sortEvent", {
                        name: i.dataset.name,
                        value: i.checked,
                    });
                    break;
                }
            }
        }
    },
    beforeDestroy() {
        document.removeEventListener("click", this.hideList);
    },
};
</script>

<style lang="sass">
.select
    position: relative
    
    min-height: 49px
    overflow: hidden
    font-size: 12px
    &__value-container
        text-transform: uppercase
        @include dFlex(flex-end, center)
        height: 100%
        cursor: pointer
        padding: 1.41666em 2em
        padding-right: 0
    &__close-flag
        display: block
        margin-left: 4px
    &_open
        overflow: visible
        .select__checkbox
            &:checked ~ .select__text
                background: #7BB899

    &__ul
        @include dFlex(space-between, flex-start)
        flex-direction: column
        position: absolute
        top: 0
       
        min-width: 280px
        right: 0
        width: 100%
        background: #fff
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5)
        &_hide
            display: none
        &_show
            display: flex
    &__item
        width: 100%
        &_order-unset
            order: unset !important
    &__label

        display: block
    &__checkbox
        @include invisibleCheckbox
        &:checked ~ .select__text
            background: none
        &[data-focus-visible] ~.select__text
            box-shadow: 0 0 0 4px #fff inset
    &__text
        display: flex
        align-items: center
        padding: 1.41666em 2em
        transition: background 0.2s ease
        @include fontCfg(1em, 1.25em, 500, 0.06em)
        cursor: pointer
        text-transform: uppercase
        &:hover
            background: rgba(0, 0, 0, 0.1)
</style>