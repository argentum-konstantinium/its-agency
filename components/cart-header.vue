<template>
    <div class="cart__header">
            <h3 class="cart__headline">Корзина</h3>
            <NuxtLink class="cart__close" to="/">
                <svg
                    role="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Закрыть</title>
                    <path
                        d="M18 6L6 18"
                        stroke="#1F2020"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M6 6L18 18"
                        stroke="#1F2020"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </NuxtLink>
        </div>
</template>