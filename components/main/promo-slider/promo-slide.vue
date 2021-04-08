<template>
    <div class="promo-slide">
        <img :src="src" :alt="alt" class="pormo-slide__img" />
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    props: {
        src: String,
        alt: String,
    },
};
</script>