<template>
    <aside
        @touchstart="startMoving"
        @touchmove="move"
        @touchend="sendTouchEvent"
        :class="{ aside_active: asideState }"
        @click="clickSend"
        class="aside"
    >
        <div ref="filters" class="filters">
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
    props: {
        asideState: false,
    },
    data() {
        return {
            filters: {
                filter1: {
                    name: "newestFiltering",
                    value: "Новинки",
                },
                filter2: {
                    name: "availabilityFiltering",
                    value: "Есть в наличии",
                },
                filter3: {
                    name: "exclusivefiltering",
                    value: "Контрактные",
                },
                filter4: {
                    name: "contractFiltering",
                    value: "Эксклюзивные",
                },
                filter5: {
                    name: "saleFiltering",
                    value: "Распродажа",
                },
            },
            cordY1: 0,
            cordY2: 0,
            resultMovingCord: 0,
            activeMoving: false,
        };
    },
    watch: {
        asideState: {
            handler(newVal) {
                if (!newVal) {
                    this.resetTransformationOnClose();
                }
                
            }
        }
    },
    methods: {
        sendEvent(event) {
            this.$emit("filterClick", event);
        },
        clickSend(e) {
            this.$emit("click", { target: e.target, ref: this.$el });
        },
        startMoving(e) {
            this.activeMoving = true;
            this.cordY1 = window.innerHeight / 2 - e.targetTouches[0].clientY;
            console.log(this.cordY1)
            console.log(e)
        },
        sendTouchEvent(e) {
            if (this.resultMovingCord > window.innerHeight * 0.75) {
                this.$emit('touchend', this.resultMovingCord);
            } else {
                this.resetTransformation();
            }
            
        },
        move(e) {
            if (this.activeMoving) {
                this.cordY2 = window.innerHeight / 2 - e.targetTouches[0].clientY;
                let moveDistance = this.cordY1 - this.cordY2
                this.setTransformation(moveDistance)
            }
        },
        setTransformation(moveDistance) { 
            this.resultMovingCord = window.innerHeight / 2 + moveDistance;
            if (this.resultMovingCord > window.innerHeight / 2) {
                this.$refs.filters.style = 'transform: translateY(' + (this.resultMovingCord) + 'px); transition: unset'
            }
        },
        resetTransformation() {
            this.$refs.filters.style = "transform: translateY(50vh); transition: 0.3s transform ease-in"
        },
        resetTransformationOnClose() {
            this.$refs.filters.style = ""

        }
    },
};
</script>

<style lang="sass">
.filters
    &__checkbox:not(:last-child)
        margin-bottom: 15px
@media(max-width: 768px)
    .aside
        position: fixed
        width: 100%
        height: 100%
        left: 0
        top: 0
        background: rgba(0, 0, 0, 0.7)
        opacity: 0
        visibility: hidden
        pointer-events: none
        z-index: 1
        @include dFlex(center, flex-end)
        &_active
            visibility: visible
            pointer-events: all
            animation: showOpacity 0.3s ease 1 forwards
            .filters
                transform: translateY(50vh)

    .filters
        background: #fff
        border-radius: 24px 24px 0 0
        width: 100%
        height: 100vh
        padding: 54px 24px 12px
        transform: translateY(100%)
        transition: 0.3s transform ease-in 0.3s
        transform-origin: top
        position: relative
        &::before
            content: ''
            position: absolute
            background: #1F2020
            opacity: 0.6
            border-radius: 40px
            width: 28px
            height: 4px
            top: 12px
            left: 0
            right: 0
            margin: 0 auto

</style>