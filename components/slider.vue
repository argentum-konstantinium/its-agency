<template>
    <div
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
        class="slider"
        :class="elemsClass.slider"
    >
        <button
            v-if="sliderOptions.control"
            ref="prevBtn"
            @click="switchToPrev"
            class="slider__btn slider__btn_prev"
            :class="[
                elemsClass.buttonsClass.common,
                elemsClass.buttonsClass.prev,
            ]"
        >
            <slot name="prev-btn"></slot>
        </button>
        <div
            @mousedown="toggleSwipe"
            @mouseup="swipe"
            @mousemove="calculateCords"
            @mouseleave="swipe"
            class="slider__wrapper"
        >
            <div
                :style="transformation"
                class="slider__track"
                ref="sliderWrapper"
            >
                <slot name="slides"></slot>
                <div
                    class="slider__slide"
                    :class="[
                        String(item.classList),

                        elemsClass.slides.common,
                        index === activeSlide ? 'slider__slide_active' : '',
                        index === activeSlide ? elemsClass.slides.active : '',
                    ]"
                    v-for="(item, index) in slides"
                    :key="index"
                    :data-index="index"
                    v-html="item.innerHTML"
                    @dragstart.prevent=""
                ></div>
            </div>
        </div>
        <button
            v-if="sliderOptions.control"
            ref="nextBtn"
            aria-label=""
            @click="switchToNext"
            class="slider__btn slider__btn_next"
            :class="[
                elemsClass.buttonsClass.common,
                elemsClass.buttonsClass.next,
            ]"
        >
            <slot name="next-btn"></slot>
        </button>
        <div
            v-if="sliderOptions.pagination"
            class="slider__pagination"
            :class="elemsClass.pagination.common"
        >
            <ul class="slider__pagination-ul">
                <li
                    :key="n"
                    v-for="n in paginationNumbers"
                    class="slider__pagination-item"
                >
                    <button
                        @click="paginationSwitch"
                        :data-index="n"
                        class="slider__pagination-btn"
                        :class="[
                            elemsClass.pagination.buttons,
                            n === activeSlide
                                ? 'slider__pagination-btn_active'
                                : '',
                            n === activeSlide
                                ? elemsClass.pagination.activeButton
                                : '',
                        ]"
                    >
                        {{ n }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: Object,
        elemsClass: {
            type: Object,
            default() {
                return {
                    slider: "",
                    destroyPoint: 0,
                    slides: {
                        common: "",
                        active: "",
                    },
                    buttonsClass: {
                        common: "",
                        next: "",
                        prev: "",
                    },
                    pagination: {
                        common: "",
                        button: "",
                        activeButton: "",
                    }
                };
            },
        },
    },
    data() {
        return {
            slides: Array,
            sliderLength: 0,
            activeSlide: 1,
            transformation: "transform: translateX(-100%)",
            timer: "",
            paginationNumbers: [],
            swiping: true,
            activateSwipe: false,
            swipeCordX1: 0,
            swipeCordX2: 0,
            slideCenter: 0,
            slideWidth: 0,
            distance: 0,
            windowWidth: 0,
            defaultOptions: {
                autoplay: false,
                destroyPoint: 0,
                timout: 0,
                easing: "linear",
                speed: 400,
                pagination: false,
                control: true,
            },

            sliderOptions: {},
        };
    },
    computed: {
        paginationBtn() {
            return {
                "slider__pagination-btn_active": n === activeSlide,
            };
        },
    },
    watch: {
        destroyPoint: {
            handler(newVal) {
                if (newVal <= 768) {
                    
                }
            }
        }
    },
    methods: {
        paginationSwitch() {
            let target = Number(event.target.dataset.index);
            this.goTo(target);
        },
        goTo(target) {
            this.disableSliderControl(this.$refs.nextBtn);
            this.disableSliderControl(this.$refs.prevBtn);

            this.activeSlide = target;
            this.calculateTransformation();
        },
        swipe() {
            if (this.swiping) {
                this.activateSwipe = false;

                if (this.distance > this.slideCenter / 2) {
                    this.switchToNext();
                } else if (this.distance < -this.slideCenter / 2) {
                    this.switchToPrev();
                } else {
                    this.swipeTransformReset();
                }
                this.distance = 0;
                this.swipeCordX1 = 0;
                this.swipeCordX2 = 0;
                this.slideCenter = 0;
                this.slideWidth = 0;
            }
        },
        calculateCords(event) {
            if (this.activateSwipe && this.swiping && this.slideCenter != 0) {
                this.swipeCordX2 = (this.slideCenter - event.clientX) * -1;

                this.distance = -(this.swipeCordX2 - this.swipeCordX1);

                this.setSwipeTransform(this.slideWidth, this.distance);
            }
        },
        setSwipeTransform(width, dx) {
            this.transformation =
                "transform: translateX(" +
                (-this.activeSlide * width - dx) +
                "px);";
        },
        switchToNext(event) {
            this.disableSliderControl(this.$refs.nextBtn);
            this.disableSliderControl(this.$refs.prevBtn);

            this.activeSlide += 1;
            this.calculateTransformation();

            if (this.activeSlide == this.sliderLength - 1) {
                this.activeSlide = 1;
                this.resetTransformationNext();
            }
        },
        switchToPrev(event) {
            this.disableSliderControl(this.$refs.prevBtn);
            this.disableSliderControl(this.$refs.nextBtn);

            this.activeSlide -= 1;
            this.calculateTransformation();

            if (this.activeSlide === 0) {
                this.activeSlide = this.sliderLength - 2;
                this.resetTransformationPrev();
            }
        },
        calculateTransformation() {
            this.transformation =
                "transform: translateX(" +
                100 * -this.activeSlide +
                "%); transition: transform " +
                this.sliderOptions.speed +
                "ms " +
                this.sliderOptions.easing +
                ";";
        },
        disableSliderControl(btn) {
            this.swiping = false;
            btn.setAttribute("disabled", "disabled");
            this.enableSliderControl(btn);
        },
        enableSliderControl(btn) {
            let self = this;
            setTimeout(() => {
                btn.removeAttribute("disabled");
                self.swiping = true;
            }, self.sliderOptions.speed);
        },
        swipeTransformReset() {
            this.transformation =
                "transform: translateX(" +
                100 * -this.activeSlide +
                "%); transition: transform " +
                this.speed +
                "ms " +
                this.easing +
                ";";
        },
        resetTransformationNext() {
            let self = this;
            setTimeout(() => {
                self.transformation =
                    "transform: translateX(-100%); transition: transform 0s ease;";
            }, self.sliderOptions.speed);
        },
        resetTransformationPrev() {
            let self = this;
            setTimeout(() => {
                self.transformation =
                    "transform: translateX(" +
                    100 * (-self.sliderLength + 2) +
                    "%); transition: transform 0s ease;";
            }, self.sliderOptions.speed);
        },
        createSlides() {
            this.slides = Array.prototype.slice.call(
                this.$refs.sliderWrapper.childNodes
            );
            if (this.sliderOptions.pagination) this.createPagination();
            this.slides.pop();
            this.slides.push(this.slides[0]);
            this.slides.unshift(this.slides[this.slides.length - 2]);
            this.$refs.sliderWrapper.innerHTML = null;
            this.sliderLength = this.slides.length;
        },
        createPagination() {
            for (let i = 1; i < this.slides.length; i++) {
                this.paginationNumbers.push(i);
            }
        },
        startAutoplay() {
            let self = this;
            self.timer = setInterval(() => {
                self.switchToNext.call(self);
            }, self.sliderOptions.timeout);
        },
        stopAutoplay() {
            clearInterval(this.timer);
        },
        toggleSwipe(event) {
            event.button === 0
                ? (this.activateSwipe = true)
                : (this.activateSwipe = false);
            if (this.slideCenter === 0 && this.swiping) {
                let width = event.target.offsetWidth;
                this.slideWidth = width;
                let center = width / 2;
                this.slideCenter = center;
                let cordX1 = (center - event.clientX) * -1;
                this.swipeCordX1 = cordX1;
            }
        },
    },
    mounted() {
        Object.assign(this.sliderOptions, this.defaultOptions, this.options);
        this.createSlides();
        if (this.sliderOptions.autoplay) this.startAutoplay();
    },
    destroyed() {
        this.stopAutoplay();
    }
};
</script>

<style lang="sass">
.slider
    &__wrapper
        overflow: hidden
    &__slide
        flex-shrink: 0
    &__track
        display: flex
        perspective-origin: 0
        transform-style: preserve-3d
        will-change: transform

        img
            user-select: none
            pointer-events: none
            @include fluidImg
    &__btn
        display: block
        &:disabled
            opacity: 0.5
</style>